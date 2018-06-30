export default function exchangeState (_this) {
  _this.state = {
    web3: _this.props.parent.state.web3,
    swap: _this.props.swap,
    chosenMarket: _this.props.match.params.chosenMarket,
    contractA: {},
    contractB: {},
    symbolA: '',
    symbolB: '',
    balanceA: 0,
    balanceB: 0,
    buyOrders: [],
    sellOrders: [],
    buyOrdersRender: [],
    sellOrdersRender: [],
    buyOpenOrders: [],
    sellOpenOrders: []
  }
}
