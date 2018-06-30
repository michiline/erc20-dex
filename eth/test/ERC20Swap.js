import assertRevert from '../helpers/assertRevert'
const Token = artifacts.require('Token')
const ERC20Swap = artifacts.require('ERC20Swap')

contract('Swap', async ([alice, bob, cindy, dan]) => {
  const swapID = '0x261c74f7dd1ed6a069e18375ab2bee9afcb1095613f53b07de11829ac66cdfcc'
  const expiredSwapID = '0xc3b89738306a66a399755e8535300c42b1423cac321938e7fe30b252abf8fe74'
  var tokenA, tokenB, tokenC, tokenD, swap
  beforeEach(async () => {
    tokenA = await Token.new('ERC20 Token A', 100, { from: alice })
    tokenB = await Token.new('ERC20 Token B', 100, { from: bob })
    tokenC = await Token.new('ERC20 Token C', 100, { from: cindy })
    tokenD = await Token.new('ERC20 Token D', 100, { from: dan })
    swap = await ERC20Swap.new()
  })
  // describe('1. open: method', () => {
  //   describe('- swap: not open', () => {
  //     it('creates swap', async () => {
  //       await tokenA.approve(swap.address, 10)
  //       await swap.open(swapID, 10, 20, tokenA.address, tokenB.address, { from: alice })
  //       const result = await swap.check(swapID)
  //       assert.equal(result[0].toString(), alice)
  //       assert.equal(result[1].toNumber(), 10)
  //       assert.equal(result[2].toNumber(), 20)
  //       assert.equal(result[3].toNumber(), 10)
  //       assert.equal(result[4].toNumber(), 20)
  //       assert.equal(result[5].toString(), tokenA.address)
  //       assert.equal(result[6].toString(), tokenB.address)
  //     })
  //   })
  //   describe('- swap: open', () => {
  //     it('reverts', async () => {
  //       await tokenA.approve(swap.address, 10)
  //       await swap.open(swapID, 10, 20, tokenA.address, tokenB.address, { from: alice })
  //       await assertRevert(swap.open(swapID, 10, 20, tokenA.address, tokenB.address, { from: alice }))
  //     })
  //   })
  // })
  // describe('2. check: method', () => {
  //   it('checks swap info', async () => {
  //     await tokenA.approve(swap.address, 10)
  //     await swap.open(swapID, 10, 20, tokenA.address, tokenB.address, { from: alice })
  //     const result = await swap.check(swapID)
  //     assert.equal(result[0].toString(), alice)
  //     assert.equal(result[1].toNumber(), 10)
  //     assert.equal(result[2].toNumber(), 20)
  //     assert.equal(result[3].toNumber(), 10)
  //     assert.equal(result[4].toNumber(), 20)
  //     assert.equal(result[5].toString(), tokenA.address)
  //     assert.equal(result[6].toString(), tokenB.address)
  //   })
  // })
  describe('3. fill: method', () => {
    // describe('- swap (B>A): open', () => {
    //   it('fills swap', async () => {
    //     await tokenB.approve(swap.address, 20)
    //     await swap.open(swapID, 20, 10, tokenB.address, tokenA.address, { from: alice })
    //
    //     await tokenA.approve(swap.address, 9, {from: bob})
    //     await swap.fill(swapID, 9, { from: bob })
    //
    //     let balanceTokenA = await tokenA.balanceOf(alice)
    //     let balanceTokenB = await tokenB.balanceOf(alice)
    //     assert.equal(balanceTokenA.valueOf(), 9)
    //     assert.equal(balanceTokenB.valueOf(), 80)
    //
    //     balanceTokenA = await tokenA.balanceOf(bob)
    //     balanceTokenB = await tokenB.balanceOf(bob)
    //     assert.equal(balanceTokenA.valueOf(), 91)
    //     assert.equal(balanceTokenB.valueOf(), 18)
    //
    //     const result = await swap.check(swapID)
    //
    //     assert.equal(result[0].toString(), alice)
    //     assert.equal(result[1].toNumber(), 20)
    //     assert.equal(result[2].toNumber(), 10)
    //     assert.equal(result[3].toNumber(), 2)
    //     assert.equal(result[4].toNumber(), 1)
    //     assert.equal(result[5].toString(), tokenB.address)
    //     assert.equal(result[6].toString(), tokenA.address)
    //
    //     await tokenA.approve(swap.address, 1, {from: bob})
    //     const { logs } = await swap.fill(swapID, 1, { from: bob })
    //
    //     // await tokenB.approve(swap.address, 10, {from: bob})
    //     // await swap.fill(swapID, 10, { from: bob })
    //     //
    //     // balanceTokenA = await tokenA.balanceOf(alice)
    //     // balanceTokenB = await tokenB.balanceOf(alice)
    //     // assert.equal(balanceTokenA.valueOf(), 90)
    //     // assert.equal(balanceTokenB.valueOf(), 20)
    //     //
    //     // balanceTokenA = await tokenA.balanceOf(bob)
    //     // balanceTokenB = await tokenB.balanceOf(bob)
    //     // assert.equal(balanceTokenA.valueOf(), 10)
    //     // assert.equal(balanceTokenB.valueOf(), 80)
    //   })
    // })
    describe('- swap 10 20 sell: open', () => {
      it('fills swap', async () => {
        await tokenB.approve(swap.address, 10, { from: bob })
        await swap.open(swapID, 10, 20, tokenB.address, tokenA.address, { from: bob })

        await tokenA.approve(swap.address, 18, {from: alice})
        let res = await swap.fill(swapID, 18, { from: alice })
        console.log(res.logs)
        await tokenA.approve(swap.address, 2, {from: alice})
        res = await swap.fill(swapID, 2, { from: alice })
        console.log(res.logs)

      })
    })
    describe('- swap 20 10 sell: open', () => {
      it('fills swap', async () => {
        await tokenB.approve(swap.address, 20, { from: bob })
        await swap.open(swapID, 20, 10, tokenB.address, tokenA.address, { from: bob })

        await tokenA.approve(swap.address, 9, {from: alice})
        let res = await swap.fill(swapID, 9, { from: alice })
        console.log(res.logs)
        await tokenA.approve(swap.address, 1, {from: alice})
        res = await swap.fill(swapID, 1, { from: alice })
        console.log(res.logs)
      })
    })
    describe('- swap 10 20 buy: open', () => {
      it('fills swap', async () => {
        await tokenC.approve(swap.address, 10, { from: cindy })
        await swap.open(swapID, 10, 20, tokenC.address, tokenD.address, { from: cindy })

        await tokenD.approve(swap.address, 18, {from: dan})
        let res = await swap.fill(swapID, 18, { from: dan })
        console.log(res.logs)
        await tokenD.approve(swap.address, 2, {from: dan})
        res = await swap.fill(swapID, 2, { from: dan })
        console.log(res.logs)
      })
    })
    describe('- swap 20 10 buy: open', () => {
      it('fills swap', async () => {
        await tokenC.approve(swap.address, 20, { from: cindy })
        await swap.open(swapID, 20, 10, tokenC.address, tokenD.address, { from: cindy })

        await tokenD.approve(swap.address, 9, {from: dan})
        let res = await swap.fill(swapID, 9, { from: dan })
        console.log(res.logs)
        await tokenD.approve(swap.address, 1, {from: dan})
        res = await swap.fill(swapID, 1, { from: dan })
        console.log(res.logs)
      })
    })
    // describe('- swap (A>B): open', () => {
    //   it('fills swap', async () => {
    //     await tokenA.approve(swap.address, 20)
    //     await swap.open(swapID, 20, 10, tokenA.address, tokenB.address, { from: alice })
    //
    //     await tokenB.approve(swap.address, 5, {from: bob})
    //     await swap.fill(swapID, 5, { from: bob })
    //
    //     let balanceTokenA = await tokenA.balanceOf(alice)
    //     let balanceTokenB = await tokenB.balanceOf(alice)
    //     assert.equal(balanceTokenA.valueOf(), 80)
    //     assert.equal(balanceTokenB.valueOf(), 5)
    //
    //     balanceTokenA = await tokenA.balanceOf(bob)
    //     balanceTokenB = await tokenB.balanceOf(bob)
    //     assert.equal(balanceTokenA.valueOf(), 10)
    //     assert.equal(balanceTokenB.valueOf(), 95)
    //
    //     const result = await swap.check(swapID)
    //
    //     assert.equal(result[0].toString(), alice)
    //     assert.equal(result[1].toNumber(), 20)
    //     assert.equal(result[2].toNumber(), 10)
    //     assert.equal(result[3].toNumber(), 10)
    //     assert.equal(result[4].toNumber(), 5)
    //     assert.equal(result[5].toString(), tokenA.address)
    //     assert.equal(result[6].toString(), tokenB.address)
    //
    //     await tokenB.approve(swap.address, 5, {from: bob})
    //     await swap.fill(swapID, 5, { from: bob })
    //
    //     balanceTokenA = await tokenA.balanceOf(alice)
    //     balanceTokenB = await tokenB.balanceOf(alice)
    //     assert.equal(balanceTokenA.valueOf(), 80)
    //     assert.equal(balanceTokenB.valueOf(), 10)
    //
    //     balanceTokenA = await tokenA.balanceOf(bob)
    //     balanceTokenB = await tokenB.balanceOf(bob)
    //     assert.equal(balanceTokenA.valueOf(), 20)
    //     assert.equal(balanceTokenB.valueOf(), 90)
    //   })
    // })
    // describe('- swap: not open', () => {
    //   it('reverts', async () => {
    //     await tokenA.approve(swap.address, 10)
    //     await swap.open(swapID, 10, 20, tokenA.address, tokenB.address, { from: alice })
    //     await tokenB.approve(swap.address, 20, {from: bob})
    //     await swap.fill(swapID, 20, { from: bob })
    //     await assertRevert(swap.fill(swapID, 20, { from: bob }))
    //   })
    // })
  })
  // describe('4. expire: method', () => {
  //   describe('- swap: open', () => {
  //     it('expires swap', async () => {
  //       await tokenA.approve(swap.address, 10)
  //       await swap.open(swapID, 10, 20, tokenA.address, tokenB.address, { from: alice })
  //       await swap.expire(swapID)
  //       await assertRevert(swap.fill(swapID, 20, { from: bob }))
  //     })
  //   })
  //   describe('- swap: not open', () => {
  //     it('reverts', async () => {
  //       await assertRevert(swap.expire(swapID))
  //     })
  //   })
  // })
})
