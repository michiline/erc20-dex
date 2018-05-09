export default function appState (_this) {
  _this.state = {
    web3: null,
    username: localStorage.getItem('username') || ''
  }
}
