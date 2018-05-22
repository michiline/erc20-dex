import Swap from '../models/swap-model'

export default {
  async create (data) {
    const swap = new Swap(data)
    return swap.save()
  },
  async get () {
    const query = {}
    return Swap.find(query)
  },
  prepareSwapData (swap) {
    return {
      address: swap.options.address,
      jsonInterface: splitString(JSON.stringify(swap.options.jsonInterface), 1000)
    }
  }
}
function splitString (string, size) {
  const re = new RegExp('.{1,' + size + '}', 'g')
  return string.match(re)
}
