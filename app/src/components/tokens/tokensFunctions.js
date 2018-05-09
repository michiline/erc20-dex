export default function tokensFunctions (_this) {
  _this.func = {
    parentWrapper: parentWrapper,
    createToken: createToken.bind(_this),
    getTokens: getTokens.bind(_this),
    mintTokens: mintTokens.bind(_this)
  }
}

// helper functions
function parentWrapper (_this) {
  return {
    state: _this.state,
    func: _this.func
  }
}

async function getTokens () {
  try {
    const res = await this.props.parent.api.getTokens()
    const tokenContracts = res.data.map(token => {
      return new this.props.parent.state.web3.eth.Contract(JSON.parse(token.jsonInterface), token.address)
    })
    return tokenContracts
  } catch (err) {
    console.log(err)
  }
}

async function createToken (data) {
  try {
    const accounts = await this.props.parent.state.web3.eth.getAccounts()
    await this.props.parent.api.createToken({
      from: accounts[0],
      ...data
    })
  } catch (err) {
    console.log(err)
  }
}

async function mintTokens (symbol, amount) {
  try {
    const accounts = await this.props.parent.state.web3.eth.getAccounts()
    const res = await this.props.parent.api.mintTokens({
      from: accounts[0],
      symbol: symbol,
      amount: amount
    })
    console.log(res.data)
  } catch (err) {
    console.log(err)
  }
}
