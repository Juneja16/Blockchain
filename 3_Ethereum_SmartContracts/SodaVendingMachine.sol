program solidity ^0.8.20;

// A vending Machine Automated code to purchase the soda
constract VendingMachine{
    uint soda;
    address owner;

    constructor(){
        soda=100;
        owner=msg.sender;
    }

    function buySoda() public payable{
        require(msg.value == 1 ether, "You should have one ether");
        require(soda>0,"Soda Out of Stock"); 
         soda=soda-1;
    }

    function fillSoda(_quantity) public (){
        require(msg.sender== owner,"You are not the Owner");
        soda =soda +_quantity;

    }

    function withdrawBalance() public{
        require(msg.sender == owner,"You are not the Owner");
        payable (owner).transfer(address(this).balance);
    }
}