// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Marketplace {
    string public name;
    uint public productCount;

    constructor() public {
        name = "Beth Marketplace";
    }
    struct Product {
        uint id;
        string name;
        string image;
        uint price;
        address payable owner;
        bool purchased;
    }
    //To Update the owners account we need to add the attribute 'payable'
    event productPurchased(
        uint id,
        string name,
        string image,
        uint price,
        address payable  owner, 
        bool purchased

    );
    event productCreated(
        uint id,
        string name,
        string image,
        uint price,
        address payable owner, 
        bool purchased

    );
    mapping(uint => Product) public products;

    function createProduct(string memory _name, uint _price, string memory _image) public {
        //Requiements
        require(bytes(_name).length > 0); //Must have a name
        require(bytes(_image).length > 0); //Must have an image
        require(_price > 0); //Must have a valid price
        productCount++;
        products[productCount] = Product(productCount,_name,_image,_price,msg.sender,false);
        emit productCreated(productCount,_name,_image,_price,msg.sender,false);
           
    }

    function purchaseProduct(uint _id) payable public {
      Product memory _product = products[_id]; //Fetch the Product
      address payable _seller = _product.owner; //Fetch the owner
      require(_product.id > 0 && _product.id <= productCount); 
      require(!_product.purchased); //Ensure the product has not been bought
      require(_seller != msg.sender); //Ensure the buyer is not the seller
      require(msg.value >= _product.price); //Ensure there is enough ether to perform transaction
      _product.owner = msg.sender; //Transfer Ownership to buyer
      _product.purchased = true; //Mark as Purchased
      products[_id] = _product;  //Update the product
      address(_seller).transfer(msg.value); //Pay the seller
      emit productPurchased(productCount,_product.name,_product.image,_product.price,_product.owner, true);

         }
} 