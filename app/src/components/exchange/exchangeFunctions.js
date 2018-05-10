export default function exchangeFunctions (_this) {
  _this.func = {
    parentWrapper: parentWrapper,
    getMarkets: getMarkets.bind(_this),
    getTokensInfo: getTokensInfo.bind(_this),
    marketPick: marketPick.bind(_this)
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
    const accounts = await this.props.parent.state.web3.eth.getAccounts()
    const address = accounts[0]
    const tokenSymbols = this.state.chosenMarket.split('-')
    const res = await this.props.parent.api.getTokens()
    const filteredTokens = res.data.filter(token => tokenSymbols.includes(token.symbol))
    const tokenContracts = filteredTokens.map(token => {
      return new this.props.parent.state.web3.eth.Contract(JSON.parse(token.jsonInterface), token.address)
    })
    const token1Balance = await tokenContracts[0].methods.balanceOf(address).call()
    const token2Balance = await tokenContracts[1].methods.balanceOf(address).call()
    this.setState({
      token1Symbol: tokenSymbols[0],
      token2Symbol: tokenSymbols[1],
      token1Balance: token1Balance,
      token2Balance: token2Balance
    })
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
  this.func.getTokensInfo()
}
