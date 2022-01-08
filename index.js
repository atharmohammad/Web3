const Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/18355422254843f89b21c033eda7ea24')

const account1 = Buffer.from(process.env.Account1,'hex')
const account2 = Buffer.from(process.env.Account2,'hex')
const Private_key_1 = Buffer.from(process.env.Private_key_1,'hex')
const Private_key_2 = Buffer.from(process.env.Private_key_2,'hex')

let account1_balance;
web3.eth.getBalance(account1,(err,res)=>{
    account1_balance = res;
})

const toHex = (data)=>{
    return web3.utils.toHex(data);
}

web3.eth.getTransactionCount(account1,(err,txCount)=>{
    const txObject = {
        nonce:toHex(txCount),
        to:account2,
        value:toHex(web3.utils.toWei('1','ether')),
        gasLimit:toHex(21000),
        gasPrice:toHex(web3.utils.toWei(10,'gwei'))
    }
    const tx = new Tx(txObject)
    tx.sign(Private_key_1);

    const serialzedTransaction = tx.serailize();
    const raw = '0x' + serialzedTransaction.toString('Hex');

    web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log('transaction Hash : ' , txHash)
    })
})