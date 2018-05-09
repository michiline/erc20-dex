import assertRevert from '../helpers/assertRevert'
const Token = artifacts.require('Token')

contract('ERC20 Token', async ([owner, recipient, anotherAccount]) => {
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
  const TOTAL_SUPPLY = 100
  var token
  beforeEach(async () => {
    token = await Token.new('ERC20 Token', TOTAL_SUPPLY, { from: owner })
  })
  describe('1. totalSupply: method', () => {
    it('returns: total amount of all tokens', async () => {
      const totalSupply = await token.totalSupply()
      assert.equal(totalSupply, TOTAL_SUPPLY)
    })
  })

  describe('2. balanceOf: method', () => {
    describe('- account has no tokens', () => {
      it('returns: zero', async () => {
        const balance = await token.balanceOf(anotherAccount)
        assert.equal(balance, 0)
      })
    })

    describe('- account has some tokens', () => {
      it('returns: total amount of tokens', async () => {
        const balance = await token.balanceOf(owner)
        assert.equal(balance, TOTAL_SUPPLY)
      })
    })
  })

  describe('3. transfer: method', () => {
    describe('- recipient: NOT the zero address', () => {
      const to = recipient
      describe('- sender: NOT enough balance', () => {
        const amount = 101

        it('reverts', async () => {
          await assertRevert(token.transfer(to, amount, { from: owner }))
        })
      })
      describe('- sender: enough balance', () => {
        const amount = 100

        it('transfers the requested amount', async () => {
          await token.transfer(to, amount, { from: owner })

          const senderBalance = await token.balanceOf(owner)
          assert.equal(senderBalance, 0)

          const recipientBalance = await token.balanceOf(to)
          assert.equal(recipientBalance, amount)
        })

        it('emits: Transfer', async () => {
          const { logs } = await token.transfer(to, amount, { from: owner })
          assert.equal(logs.length, 1)
          assert.equal(logs[0].event, 'Transfer')
          assert.equal(logs[0].args.from, owner)
          assert.equal(logs[0].args.to, to)
        })
      })
    })
    describe('- recipient: the zero address', () => {
      const to = ZERO_ADDRESS
      it('reverts', async () => {
        await assertRevert(token.transfer(to, 100, { from: owner }))
      })
    })
  })

  describe('4. approve: method', () => {
    describe('- spender: NOT the zero address', () => {
      const spender = recipient
      describe('- sender: enough balance', () => {
        const amount = 100

        it('emits: Approval', async () => {
          const { logs } = await token.approve(spender, amount, { from: owner })
          assert.equal(logs.length, 1)
          assert.equal(logs[0].event, 'Approval')
          assert.equal(logs[0].args.tokenOwner, owner)
          assert.equal(logs[0].args.spender, spender)
        })

        describe('- spender: no approved amount before', () => {
          it('approves the requested amount', async () => {
            await token.approve(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, amount)
          })
        })

        describe('- spender: had an approved amount', () => {
          beforeEach(async () => {
            await token.approve(spender, 1, { from: owner })
          })

          it('approves the requested amount and replaces the previous one', async () => {
            await token.approve(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, amount)
          })
        })
      })

      describe('- sender: NOT enough balance', () => {
        const amount = 101

        it('emits: Approval', async () => {
          const { logs } = await token.approve(spender, amount, { from: owner })

          assert.equal(logs.length, 1)
          assert.equal(logs[0].event, 'Approval')
          assert.equal(logs[0].args.tokenOwner, owner)
          assert.equal(logs[0].args.spender, spender)
        })

        describe('- spender: no approved amount before', () => {
          it('approves the requested amount', async () => {
            await token.approve(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, amount)
          })
        })

        describe('- spender: had an approved amount', () => {
          beforeEach(async () => {
            await token.approve(spender, 1, { from: owner })
          })

          it('approves the requested amount and replaces the previous one', async () => {
            await token.approve(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, amount)
          })
        })
      })
    })

    describe('- spender: the zero address', () => {
      const amount = 100
      const spender = ZERO_ADDRESS

      it('approves the requested amount', async () => {
        await token.approve(spender, amount, { from: owner })

        const allowance = await token.allowance(owner, spender)
        assert.equal(allowance, amount)
      })

      it('emits: Approval', async () => {
        const { logs } = await token.approve(spender, amount, { from: owner })

        assert.equal(logs.length, 1)
        assert.equal(logs[0].event, 'Approval')
        assert.equal(logs[0].args.tokenOwner, owner)
        assert.equal(logs[0].args.spender, spender)
      })
    })
  })

  describe('5. transferFrom: method', () => {
    const spender = recipient
    describe('- recipient: NOT the zero address', () => {
      const to = anotherAccount
      describe('- spender: enough approved balance', () => {
        beforeEach(async () => {
          await token.approve(spender, 100, { from: owner })
        })

        describe('- owner: enough balance', () => {
          const amount = 100

          it('transfers the requested amount', async () => {
            await token.transferFrom(owner, to, amount, { from: spender })

            const senderBalance = await token.balanceOf(owner)
            assert.equal(senderBalance, 0)

            const recipientBalance = await token.balanceOf(to)
            assert.equal(recipientBalance, amount)
          })

          it('decreases the spender allowance', async () => {
            await token.transferFrom(owner, to, amount, { from: spender })

            const allowance = await token.allowance(owner, spender)
            assert(allowance.eq(0))
          })

          it('emits: Transfer', async () => {
            const { logs } = await token.transferFrom(owner, to, amount, { from: spender })
            assert.equal(logs.length, 1)
            assert.equal(logs[0].event, 'Transfer')
            assert.equal(logs[0].args.from, owner)
            assert.equal(logs[0].args.to, to)
          })
        })

        describe('- owner: NOT enough balance', () => {
          const amount = 101

          it('reverts', async () => {
            await assertRevert(token.transferFrom(owner, to, amount, { from: spender }))
          })
        })
      })

      describe('- spender: NOT enough approved balance', () => {
        beforeEach(async () => {
          await token.approve(spender, 99, { from: owner })
        })

        describe('- owner: enough balance', () => {
          const amount = 100

          it('reverts', async () => {
            await assertRevert(token.transferFrom(owner, to, amount, { from: spender }))
          })
        })

        describe('- owne: NOT enough balance', () => {
          const amount = 101

          it('reverts', async () => {
            await assertRevert(token.transferFrom(owner, to, amount, { from: spender }))
          })
        })
      })
    })

    describe('- recipient: the zero address', () => {
      const amount = 100
      const to = ZERO_ADDRESS

      beforeEach(async () => {
        await token.approve(spender, amount, { from: owner })
      })

      it('reverts', async () => {
        await assertRevert(token.transferFrom(owner, to, amount, { from: spender }))
      })
    })
  })

  describe('6. decreaseApproval: method', () => {
    describe('- spender: NOT the zero address', () => {
      const spender = recipient

      describe('- sender: enough balance', () => {
        const amount = 100

        it('emits: Approval', async () => {
          const { logs } = await token.decreaseApproval(spender, amount, { from: owner })

          assert.equal(logs.length, 1)
          assert.equal(logs[0].event, 'Approval')
          assert.equal(logs[0].args.tokenOwner, owner)
          assert.equal(logs[0].args.spender, spender)
        })

        describe('- spender: no approved amount before', () => {
          it('keeps the allowance to zero', async () => {
            await token.decreaseApproval(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, 0)
          })
        })

        describe('- spender: had an approved amount', () => {
          beforeEach(async () => {
            await token.approve(spender, amount + 1, { from: owner })
          })

          it('decreases the spender allowance subtracting the requested amount', async () => {
            await token.decreaseApproval(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, 1)
          })
        })
      })

      describe('- sender: NOT enough balance', () => {
        const amount = 101

        it('emits: Approval', async () => {
          const { logs } = await token.decreaseApproval(spender, amount, { from: owner })

          assert.equal(logs.length, 1)
          assert.equal(logs[0].event, 'Approval')
          assert.equal(logs[0].args.tokenOwner, owner)
          assert.equal(logs[0].args.spender, spender)
        })

        describe('- spender: no approved amount before', () => {
          it('keeps the allowance to zero', async () => {
            await token.decreaseApproval(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, 0)
          })
        })

        describe('- spender: had an approved amount', () => {
          beforeEach(async () => {
            await token.approve(spender, amount + 1, { from: owner })
          })

          it('decreases the spender allowance subtracting the requested amount', async () => {
            await token.decreaseApproval(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, 1)
          })
        })
      })
    })
    describe('- spender: the zero address', () => {
      const amount = 100
      const spender = ZERO_ADDRESS

      it('decreases the requested amount', async () => {
        await token.decreaseApproval(spender, amount, { from: owner })

        const allowance = await token.allowance(owner, spender)
        assert.equal(allowance, 0)
      })

      it('emits: Approval', async () => {
        const { logs } = await token.decreaseApproval(spender, amount, { from: owner })

        assert.equal(logs.length, 1)
        assert.equal(logs[0].event, 'Approval')
        assert.equal(logs[0].args.tokenOwner, owner)
        assert.equal(logs[0].args.spender, spender)
      })
    })
  })

  describe('7. increaseApproval: method', () => {
    const amount = 100

    describe('- spender: NOT the zero address', () => {
      const spender = recipient

      describe('- sender: enough balance', () => {
        it('emits: Approval', async () => {
          const { logs } = await token.increaseApproval(spender, amount, { from: owner })

          assert.equal(logs.length, 1)
          assert.equal(logs[0].event, 'Approval')
          assert.equal(logs[0].args.tokenOwner, owner)
          assert.equal(logs[0].args.spender, spender)
        })

        describe('- spender: no approved amount before', () => {
          it('approves the requested amount', async () => {
            await token.increaseApproval(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, amount)
          })
        })

        describe('- spender: had an approved amount', () => {
          beforeEach(async () => {
            await token.approve(spender, 1, { from: owner })
          })

          it('increases the spender allowance adding the requested amount', async () => {
            await token.increaseApproval(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, amount + 1)
          })
        })
      })

      describe('- sender: NOT enough balance', () => {
        const amount = 101

        it('emits: Approval', async () => {
          const { logs } = await token.increaseApproval(spender, amount, { from: owner })

          assert.equal(logs.length, 1)
          assert.equal(logs[0].event, 'Approval')
          assert.equal(logs[0].args.tokenOwner, owner)
          assert.equal(logs[0].args.spender, spender)
        })

        describe('- spender: no approved amount before', () => {
          it('approves the requested amount', async () => {
            await token.increaseApproval(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, amount)
          })
        })

        describe('- spender: had an approved amount', () => {
          beforeEach(async () => {
            await token.approve(spender, 1, { from: owner })
          })

          it('increases the spender allowance adding the requested amount', async () => {
            await token.increaseApproval(spender, amount, { from: owner })

            const allowance = await token.allowance(owner, spender)
            assert.equal(allowance, amount + 1)
          })
        })
      })
    })

    describe('- spender: the zero address', () => {
      const spender = ZERO_ADDRESS

      it('approves the requested amount', async () => {
        await token.increaseApproval(spender, amount, { from: owner })

        const allowance = await token.allowance(owner, spender)
        assert.equal(allowance, amount)
      })

      it('emits: Approval', async () => {
        const { logs } = await token.increaseApproval(spender, amount, { from: owner })

        assert.equal(logs.length, 1)
        assert.equal(logs[0].event, 'Approval')
        assert.equal(logs[0].args.tokenOwner, owner)
        assert.equal(logs[0].args.spender, spender)
      })
    })
  })
})

contract('Mintable Token', async ([owner, anotherAccount]) => {
  var token
  beforeEach(async () => {
    token = await Token.new('Mintable Token', 0, { from: owner })
  })
  describe('1. mintingFinished: bool', () => {
    describe('- minting: NOT finished', () => {
      it('returns: FALSE', async () => {
        const mintingFinished = await token.mintingFinished()
        assert.equal(mintingFinished, false)
      })
    })
    describe('- minting: finished', () => {
      it('returns: TRUE', async () => {
        await token.finishMinting({ from: owner })
        const mintingFinished = await token.mintingFinished()
        assert.equal(mintingFinished, true)
      })
    })
  })

  describe('2. finishMinting: method', () => {
    describe('- sender: owner', () => {
      describe('- minting: NOT finished', () => {
        it('finishes minting', async () => {
          await token.finishMinting({ from: owner })

          const mintingFinished = await token.mintingFinished()
          assert.equal(mintingFinished, true)
        })
        it('emits: MintFinished', async () => {
          const { logs } = await token.finishMinting({ from: owner })

          assert.equal(logs.length, 1)
          assert.equal(logs[0].event, 'MintFinished')
        })
      })
      describe('- minting: finished', () => {
        it('reverts', async () => {
          await token.finishMinting({ from: owner })
          await assertRevert(token.finishMinting({ from: owner }))
        })
      })
    })
    describe('- sender: NOT owner', () => {
      describe('- minting: NOT finished', () => {
        it('reverts', async () => {
          await assertRevert(token.finishMinting({ from: anotherAccount }))
        })
      })
      describe('- minting: finished', () => {
        it('reverts', async () => {
          await token.finishMinting({ from: owner })
          await assertRevert(token.finishMinting({ from: anotherAccount }))
        })
      })
    })
  })
  describe('3. mint: method', () => {
    const amount = 100
    describe('- sender: owner', () => {
      describe('- minting: NOT finished', () => {
        it('mints the requested amount', async () => {
          await token.mint(owner, amount, { from: owner })
          const balance = await token.balanceOf(owner)
          assert.equal(balance.valueOf(), amount)
        })
        it('emits: Mint & Transfer', async () => {
          const { logs } = await token.mint(owner, amount, { from: owner })

          assert.equal(logs.length, 2)
          assert.equal(logs[0].event, 'Mint')
          assert.equal(logs[0].args.to, owner)
          assert.equal(logs[0].args.amount, amount)
          assert.equal(logs[1].event, 'Transfer')
        })
      })
      describe('- minting: finished', () => {
        it('reverts', async () => {
          await token.finishMinting({ from: owner })
          await assertRevert(token.mint(owner, amount, { from: owner }))
        })
      })
    })
    describe('- sender: NOT owner', () => {
      describe('- minting: NOT finished', () => {
        it('reverts', async () => {
          await assertRevert(token.mint(owner, amount, { from: anotherAccount }))
        })
      })
      describe('- minting: finished', () => {
        it('reverts', async () => {
          await token.finishMinting({ from: owner })
          await assertRevert(token.mint(owner, amount, { from: anotherAccount }))
        })
      })
    })
  })
})

contract('Burnable Token', function ([owner]) {
  var token
  beforeEach(async () => {
    token = await Token.new('Burnable Token', 1000, { from: owner })
  })

  describe('1. burn: method', () => {
    const from = owner

    describe('- amount NOT greater than balance of the sender', () => {
      const amount = 100

      it('burns the requested amount', async () => {
        await token.burn(amount, { from })

        const balance = await token.balanceOf(from)
        assert.equal(balance, 900)
      })

      it('emits: Burn', async () => {
        const { logs } = await token.burn(amount, { from })
        const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
        assert.equal(logs.length, 2)
        assert.equal(logs[0].event, 'Burn')
        assert.equal(logs[0].args.burner, owner)

        assert.equal(logs[1].event, 'Transfer')
        assert.equal(logs[1].args.from, owner)
        assert.equal(logs[1].args.to, ZERO_ADDRESS)
      })
    })

    describe('- amount greater than the balance of the sender', () => {
      const amount = 1001

      it('reverts', async () => {
        await assertRevert(token.burn(amount, { from }))
      })
    })
  })
})
