const { assert } = require('chai');
const contract = require('truffle-contract/lib/contract/index');

const Transactions = artifacts.require("Transactions");
require('chai')
.use(require('chai-as-promised'))
.should()

contract('Transaction', ([deployer, sender, receiver]) => {
    let transactions;
    before(async() => {
        transactions = await Transactions.deployed()
    })
    describe('deployment', async() => {
        it('deploys sucessfully', async() => {
            const address = await transactions.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address,  undefined);
        })

    })

    describe('transactions', async() => {
        let result, transactionCount
     before(async() => {
        let result = await transactions.addToBlockchain({from:sender}, web3.utils.toWei('3', 'Ether'),"Here is your birthday gift. 3 ETH");
        let transactionCount = await transactions.getTransactionsCount();
     })
     it('performs Transaction', async() => {
        const event = result.logs[0].args
        assert.equal(transactionCount, 1, 'transactionCount is incremented');
        assert.equal(event.receiver, receiver, 'Receiver is correct') ;
        assert.equal(event.from, sender, 'Sender is Correct');
        assert.equal(event.amount, 3000000000000000000, 'Amount is correct');
        assert.equal(event.message, "Here is your birthday gift. 3 ETH", 'message is valid');
     })
    })

})