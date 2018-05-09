import assertRevert from '../helpers/assertRevert'
const Token = artifacts.require('Token')
const ERC20Swap = artifacts.require('ERC20Swap')

contract('Swap', async ([alice, bob]) => {
  const TOTAL_SUPPLY = 100
  const openValue = 10
  const closeValue = 25
  const swapID = '0x261c74f7dd1ed6a069e18375ab2bee9afcb1095613f53b07de11829ac66cdfcc'
  const expiredSwapID = '0xc3b89738306a66a399755e8535300c42b1423cac321938e7fe30b252abf8fe74'
  var tokenA, tokenB, swap
  beforeEach(async () => {
    tokenA = await Token.new('ERC20 Token A', TOTAL_SUPPLY, { from: alice })
    tokenB = await Token.new('ERC20 Token b', TOTAL_SUPPLY, { from: bob })
    swap = await ERC20Swap.new()
  })
  describe('1. open: method', () => {
    describe('- swap: not open', () => {
      it('creates swap', async () => {
        await tokenA.approve(swap.address, openValue)
        await swap.open(swapID, openValue, tokenA.address, closeValue, tokenB.address, { from: alice })
        const result = await swap.check(swapID)
        assert.equal(result[0].toNumber(), openValue)
        assert.equal(result[1].toString(), tokenA.address)
        assert.equal(result[2].toNumber(), closeValue)
        assert.equal(result[3].toString(), tokenB.address)
      })
    })
    describe('- swap: open', () => {
      it('reverts', async () => {
        await tokenA.approve(swap.address, openValue)
        await swap.open(swapID, openValue, tokenA.address, closeValue, tokenB.address, { from: alice })
        await assertRevert(swap.open(swapID, openValue, tokenA.address, closeValue, tokenB.address, { from: alice }))
      })
    })
  })
  describe('2. check: method', () => {
    it('checks swap info', async () => {
      await tokenA.approve(swap.address, openValue)
      await swap.open(swapID, openValue, tokenA.address, closeValue, tokenB.address, { from: alice })
      const result = await swap.check(swapID)
      assert.equal(result[0].toNumber(), openValue)
      assert.equal(result[1].toString(), tokenA.address)
      assert.equal(result[2].toNumber(), closeValue)
      assert.equal(result[3].toString(), tokenB.address)
    })
  })
  describe('3. close: method', () => {
    describe('- swap: open', () => {
      it('closes swap', async () => {
        await tokenA.approve(swap.address, openValue)
        await swap.open(swapID, openValue, tokenA.address, closeValue, tokenB.address, { from: alice })

        await tokenB.approve(swap.address, closeValue, {from: bob})
        await swap.close(swapID, { from: bob })

        let balanceTokenA = await tokenA.balanceOf(alice)
        let balanceTokenB = await tokenB.balanceOf(alice)

        assert.equal(balanceTokenA.valueOf(), 90)
        assert.equal(balanceTokenB.valueOf(), 25)

        balanceTokenA = await tokenA.balanceOf(bob)
        balanceTokenB = await tokenB.balanceOf(bob)

        assert.equal(balanceTokenA.valueOf(), 10)
        assert.equal(balanceTokenB.valueOf(), 75)
      })
    })
    describe('- swap: not open', () => {
      it('reverts', async () => {
        await tokenA.approve(swap.address, openValue)
        await swap.open(swapID, openValue, tokenA.address, closeValue, tokenB.address, { from: alice })

        await tokenB.approve(swap.address, closeValue, {from: bob})
        await swap.close(swapID, { from: bob })
        await assertRevert(swap.close(swapID, { from: bob }))
      })
    })
  })
  describe('4. expire: method', () => {
    describe('- swap: open', () => {
      it('expires swap', async () => {
        await tokenA.approve(swap.address, openValue)
        await swap.open(swapID, openValue, tokenA.address, closeValue, tokenB.address, { from: alice })
        await swap.expire(swapID)
        await assertRevert(swap.close(swapID, { from: bob }))
      })
    })
    describe('- swap: not open', () => {
      it('reverts', async () => {
        await assertRevert(swap.expire(swapID))
      })
    })
  })
})
