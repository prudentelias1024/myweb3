// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.17 <0.9.0;

contract Transactions {
    uint256  public transactionCounter;
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp);

    struct Transaction {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    Transaction[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message) payable public {
    // require(amount > 0);
    // require(bytes(message).length > 0);
    transactionCounter++;
    transactions.push(Transaction(msg.sender, receiver,amount,message, block.timestamp));
    // address(receiver).transfer(amount);
    emit Transfer(msg.sender, receiver,amount,message, block.timestamp);
    }

    function getTransactions() public view returns (Transaction[] memory){
        return transactions;
    }
    function getTransactionsCount() public view returns (uint256){
      return transactionCounter;
    }
}