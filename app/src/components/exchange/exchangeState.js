export default function exchangeState (_this) {
  _this.state = {
    web3: _this.props.parent.state.web3,
    chosenMarket: _this.props.match.params.chosenMarket,
    token1Symbol: '',
    token2Symbol: '',
    token1Balance: 0,
    token2Balance: 0
  }
}
