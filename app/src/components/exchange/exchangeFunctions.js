import getWeb3js from '../../utils/getWeb3js'

export default function exchangeFunctions (_this) {
  _this.func = {
    parentWrapper: parentWrapper,
    getMarkets: getMarkets.bind(_this),
    getTokensInfo: getTokensInfo.bind(_this),
    marketPick: marketPick.bind(_this),
    buyOrder: buyOrder.bind(_this),
    sellOrder: sellOrder.bind(_this),
    getOrders: getOrders.bind(_this),
    getOpenOrders: getOpenOrders.bind(_this),
    expire: expire.bind(_this),
    getSwap: _this.props.parent.func.getSwap
  }
}

// helper functions
function parentWrapper (_this) {
  return {
    state: _this.state,
    func: _this.func
  }
}

async function getMarkets () {
  try {
    const res = await this.props.parent.api.getTokens()
    let markets = []
    for (let i = 0; i < res.data.length - 1; i++) {
      const symbol1 = res.data[i].symbol
      for (let j = i + 1; j < res.data.length; j++) {
        const symbol2 = res.data[j].symbol
        markets.push(symbol1 + '-' + symbol2)
      }
    }
    this.setState({
      markets: markets
    })
  } catch (err) {
    console.log(err)
  }
}

async function getTokensInfo () {
  try {
    const results = await getWeb3js
    const web3 = results.web3
    const accounts = await web3.eth.getAccounts()
    const address = accounts[0]
    const tokenSymbols = this.state.chosenMarket.split('-')
    const res = await this.props.parent.api.getTokens()
    const filteredTokens = res.data.filter(token => tokenSymbols.includes(token.symbol))
    const tokenContracts = filteredTokens.map(token => {
      return new web3.eth.Contract(JSON.parse(token.jsonInterface), token.address)
    })
    const balanceA = await tokenContracts[0].methods.balanceOf(address).call()
    const balanceB = await tokenContracts[1].methods.balanceOf(address).call()
    const buyOrdersRes = await this.props.parent.api.getOrders({
      addressA: tokenContracts[0].options.address,
      addressB: tokenContracts[1].options.address,
      type: 'buy',
      active: true
    })
    const sellOrdersRes = await this.props.parent.api.getOrders({
      addressA: tokenContracts[1].options.address,
      addressB: tokenContracts[0].options.address,
      type: 'sell',
      active: true
    })
    this.setState({
      contractA: tokenContracts[0],
      contractB: tokenContracts[1],
      symbolA: tokenSymbols[0],
      symbolB: tokenSymbols[1],
      balanceA: balanceA,
      balanceB: balanceB,
      buyOrders: buyOrdersRes.data,
      sellOrders: sellOrdersRes.data
    })
  } catch (err) {
    console.log(err)
  }
}

async function buyOrder (data) {
  try {
    const results = await getWeb3js
    const web3 = results.web3
    const swap = await this.props.parent.func.getSwap()
    const accounts = await web3.eth.getAccounts()
    const sender = accounts[0]
    const rate = parseFloat(data.rate, 10)
    let amountB = parseInt(data.amount, 10)
    // let amountA = amountB * rate
    let amountA
    const addressA = this.state.contractA.options.address
    const addressB = this.state.contractB.options.address
    const resOrders = await this.props.parent.api.getOrders({
      addressA: addressB,
      addressB: addressA,
      type: 'sell',
      active: 'true'
    })
    for (let i = 0; i < resOrders.data.length; i++) {
      const order = resOrders.data[i]
      const orderRate = order.remainingAmountB / order.remainingAmountA
      // if it's matching rate
      if (orderRate <= rate) {
        // if this order can't fill asked amount
        amountA = amountB * orderRate
        const currentAmountA = order.remainingAmountB <= amountA ? order.remainingAmountB : amountA
        await this.state.contractA.methods.approve(swap.options.address, currentAmountA).send({ from: sender })
        await swap.methods.fill(order.swapID, currentAmountA).send(
          { from: sender,
            gas: 1500000,
            gasPrice: '300000000000' })
        amountB -= (currentAmountA / orderRate)
        if (amountB === 0) {
          break
        }
      } else {
        break
      }
    }
    // if there's still some amount left to buy
    if (amountB > 0) {
      amountA = amountB * rate
      let swapID = web3.utils.randomHex(32)
      while (swapID.toString().length !== 64) {
        swapID = web3.utils.randomHex(32)
      }
      await this.state.contractA.methods.approve(swap.options.address, amountA).send({ from: sender })
      await swap.methods.open(swapID, amountA, amountB, addressA, addressB).send({ from: sender })
      const swapCheck = await swap.methods.check(swapID).call()
      console.log(swapCheck)
    }
    this.func.getOrders()
    this.func.getOpenOrders()
  } catch (err) {
    console.log(err)
  }
}

async function sellOrder (data) {
  try {
    const results = await getWeb3js
    const web3 = results.web3
    const swap = await this.props.parent.func.getSwap()
    const accounts = await web3.eth.getAccounts()
    const sender = accounts[0]
    const rate = parseFloat(data.rate, 10)
    let amountB = parseInt(data.amount, 10)
    let amountA = amountB * rate
    const addressA = this.state.contractA.options.address
    const addressB = this.state.contractB.options.address
    const resOrders = await this.props.parent.api.getOrders({
      addressA: addressA,
      addressB: addressB,
      type: 'buy',
      active: 'true'
    })
    for (let i = 0; i < resOrders.data.length; i++) {
      const order = resOrders.data[i]
      const orderRate = order.remainingAmountA / order.remainingAmountB
      // if it's matching rate
      if (orderRate >= rate) {
        // if this order can't fill asked amount
        const currentAmountB = order.remainingAmountB <= amountB ? order.remainingAmountB : amountB
        await this.state.contractB.methods.approve(swap.options.address, currentAmountB).send({ from: sender })
        await swap.methods.fill(order.swapID, currentAmountB).send(
          { from: sender,
            gas: 1500000,
            gasPrice: '300000000000' })
        amountB -= currentAmountB
        if (amountB === 0) {
          break
        }
      } else {
        break
      }
    }
    // if there's still some amount left to sell
    if (amountB > 0) {
      amountA = amountB * rate
      let swapID = web3.utils.randomHex(32)
      while (swapID.toString().length !== 64) {
        swapID = web3.utils.randomHex(32)
      }
      await this.state.contractB.methods.approve(swap.options.address, amountB).send({ from: sender })
      await swap.methods.open(swapID, amountB, amountA, addressB, addressA).send({ from: sender })
      const swapCheck = await swap.methods.check(swapID).call()
      console.log(swapCheck)
    }
    this.func.getOrders()
    this.func.getOpenOrders()
  } catch (err) {
    console.log(err)
  }
}

async function getOrders () {
  try {
    await this.func.getTokensInfo()
    const addressA = this.state.contractA.options.address
    const addressB = this.state.contractB.options.address
    const resBuyOrders = await this.props.parent.api.getOrders({
      addressA: addressA,
      addressB: addressB,
      type: 'buy',
      active: 'true'
    })
    const resSellOrders = await this.props.parent.api.getOrders({
      addressA: addressB,
      addressB: addressA,
      type: 'sell',
      active: 'true'
    })
    const buyOrdersRender = resBuyOrders.data.reduce((acc, curr) => {
      if (acc.length === 0 || acc[acc.length - 1].rate !== curr.rate) {
        acc.push(curr)
      } else if (acc[acc.length - 1].rate === curr.rate) {
        acc[acc.length - 1].remainingAmountA += curr.remainingAmountA
        acc[acc.length - 1].remainingAmountB += curr.remainingAmountB
      }
      return acc
    }, [])
    const sellOrdersRender = resSellOrders.data.reduce((acc, curr) => {
      if (acc.length === 0 || acc[acc.length - 1].rate !== curr.rate) {
        acc.push(curr)
      } else if (acc[acc.length - 1].rate === curr.rate) {
        acc[acc.length - 1].remainingAmountA += curr.remainingAmountA
        acc[acc.length - 1].remainingAmountB += curr.remainingAmountB
      }
      return acc
    }, [])
    this.setState({
      buyOrders: resBuyOrders.data,
      sellOrders: resSellOrders.data,
      buyOrdersRender: buyOrdersRender,
      sellOrdersRender: sellOrdersRender
    })
  } catch (err) {
    console.log(err)
  }
}

async function getOpenOrders () {
  try {
    const results = await getWeb3js
    const web3 = results.web3
    await this.func.getTokensInfo()
    const accounts = await web3.eth.getAccounts()
    const sender = accounts[0]
    const addressA = this.state.contractA.options.address
    const addressB = this.state.contractB.options.address
    const resBuyOrders = await this.props.parent.api.getOrders({
      makerAddress: sender,
      addressA: addressA,
      addressB: addressB,
      active: 'true'
    })
    const resSellOrders = await this.props.parent.api.getOrders({
      makerAddress: sender,
      addressA: addressB,
      addressB: addressA,
      active: 'true'
    })
    this.setState({
      buyOpenOrders: resBuyOrders.data,
      sellOpenOrders: resSellOrders.data
    })
  } catch (err) {
    console.log(err)
  }
}

async function expire (swapID) {
  try {
    try {
      const results = await getWeb3js
      const web3 = results.web3
      const swap = await this.props.parent.func.getSwap()
      const accounts = await web3.eth.getAccounts()
      const sender = accounts[0]
      await swap.methods.expire(swapID).send({ from: sender })
    } catch (err) {
      console.log(err)
    }
    this.func.getOrders()
    this.func.getOpenOrders()
  } catch (err) {
    console.log(err)
  }
}

function marketPick (market) {
  localStorage.setItem('chosenMarket', market)
  this.setState({
    chosenMarket: market
  })
  const url = `/exchange/${market}`
  this.props.history.push(url)
  this.func.getOrders()
  this.func.getOpenOrders()
}
