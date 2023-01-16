let Transactions, walletConnected = false;
const App = {
   
  loadWeb3 : async() => {
   
    if (window.ethereum) {
   
      //
      window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable()
      } else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider); 
      } else {
        window.alert("Please install metamask");
      }

    },
    loadBlockchainData: async() => {
      transactions = await (await fetch("contracts/Transactions.json")).json()
      alert(transaction)
      const networkId = await web3.eth.net.getId();
      const networkData =   transactions.networks[networkId];
      if (networkData) {
         Transactions = new web3.eth.Contract(await transactions.abi, networkData.address);
        console.log(Transactions);
      } else{
        console.log('Transaction contract not deployed on the network')
      }
      return Transactions
    },
    connectWallet: async() =>{
       App.account = await window.ethereum.enable()
       console.log(App.account)
       walletConnected = true;
       document.getElementById('account__address').innerText = `${App.account[0].slice(0,5)}.....${App.account[0].slice(App.account[0].length - 4, App.account[0].length)}`
       document.getElementById('eth__card__account__address').innerText = `${App.account[0].slice(0,5)}.....${App.account[0].slice(App.account[0].length - 4, App.account[0].length)}`
       document.getElementById("connect__wallet").style.display = "none";
     
    },
   
    sendEth: async() => {
     let ethAddress = document.getElementById("eth__address").value
      let ethAmount = document.getElementById("eth__amount").value
      let ethMessage = document.getElementById("eth__message").value
      let parsedAmount = web3.utils.toWei(ethAmount)
       
      await web3.eth.sendTransaction({from: App.account.toString(), to: ethAddress.toString(), value:`${web3.utils.toHex(parsedAmount)}`})
      .on('receipt', (receipt) => {console.log(receipt)})
      .on('confirmation', (confirmationNumber,receipt) => {console.log(confirmationNumber)})
     let  transactionHash = await Transactions.methods.addToBlockchain(ethAddress, parsedAmount, ethMessage).send(
      {from:`${App.account}`}
     )
     console.log(await transactionHash)
     await App.getBalance()
    },
    getBalance: async() => {
      let account = await window.ethereum.enable()
       let balance =  await web3.eth.getBalance(account[0])
      balance = web3.utils.fromWei(balance,"ether")
      document.getElementById("eth__balance").innerText = balance
    },
    getAllTransactions: async() => {
      let transactionsContract =await  App.loadBlockchainData()
      let transactions = await Transactions.methods.getTransactions().call()
      let transactionCount = await Transactions.methods.getTransactionsCount().call()
      console.log(transactions)
     transactions = transactions.reverse().map((transaction) => {return  {sender:transaction.sender, receiver: transaction.receiver, amount: transaction.amount, amount: transaction.amount, message: transaction.message}})
     
    }
}
