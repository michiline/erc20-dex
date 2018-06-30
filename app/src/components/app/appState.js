export default function appState (_this) {
  _this.state = {
    web3: null,
    swap: null,
    username: localStorage.getItem('username') || ''
  }
}
