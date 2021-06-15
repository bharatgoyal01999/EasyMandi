// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract easyMandi {
enum StateType {Active, OfferPlaced, Accepted, Terminated}
address public Farmer;
string public Fuid;
string public Description;
string public Harvest;
uint256 public AskingPrice;
uint256 public TotalBiddingTime; // in seconds
uint256 public Quantity;
StateType public State;
address public highestBidder;
uint256 public highestBid;
string public StartTime;
string public QuantityUnit;
struct Set {
address[] biddersAddress;
mapping(address => bool) is_in;
}

Set bidders;

// Allowed withdrawals of previous bids

mapping(address => uint256) pendingReturns;
mapping(address => uint256) OfferPrice;

bool ended;

event HighestBidIncreased(address bidder, uint256 amount);
event AuctionEnded(address winner, uint256 amount);

constructor(
string memory description,
string memory harvest,
string memory quantityUnit,
string memory startTime,
string memory fuid,
uint256 price,
uint256 biddingTime,
uint256 quantity
) public {
//farmer will start the contract by sharing details of his asset
Farmer = msg.sender;
AskingPrice = price; // selling price
Description = description;
Fuid=fuid;
TotalBiddingTime = block.timestamp + biddingTime;
Quantity = quantity;

Harvest = harvest;
State = StateType.Active; // active:ready for sale
QuantityUnit = quantityUnit;
StartTime = startTime;
ended = false;

}

modifier TimeOver {
require(block.timestamp <= TotalBiddingTime, "Time For Bidding Is Over");
_;
}

function GetTimeLeft() public TimeOver view returns(uint256){
require(!ended);
return TotalBiddingTime - block.timestamp ;
}

function FarmerTerminate() public TimeOver {
// if farmer is not initiating revert(allow to undo all state changes)
if (Farmer != msg.sender && !ended) {
revert();
}

State = StateType.Terminated;
ended = true;
}

function FarmerModify(
string memory description,
string memory harvest,
string memory quantityUnit,
uint256 price,
uint256 biddingTime,
uint256 quantity
) public TimeOver{
require(ended == false);
if (State == StateType.Accepted && State == StateType.Terminated) {
revert();
}
if (Farmer != msg.sender) {
revert();
}

Description = description;
AskingPrice = price;
Harvest = harvest;
TotalBiddingTime = block.timestamp + biddingTime;
Quantity = quantity;

QuantityUnit = quantityUnit;
}

function TraderMakeOffer(uint256 offerPrice) public TimeOver{
require(ended == false);
if (
offerPrice == 0 &&
offerPrice <= AskingPrice &&
offerPrice <= highestBid
) {
revert();
}
if (State == StateType.Accepted && State == StateType.Terminated) {
revert();
}
if (Farmer == msg.sender) {
revert();
}
State = StateType.OfferPlaced;
highestBidder = msg.sender;
highestBid = offerPrice;
pendingReturns[highestBidder] = highestBid;
emit HighestBidIncreased(msg.sender, offerPrice);
OfferPrice[msg.sender] = offerPrice;
if (!bidders.is_in[msg.sender]) {

bidders.biddersAddress.push(msg.sender);

}

}

function FarmerCancelOffer() public TimeOver{
if (State != StateType.OfferPlaced) {
revert();
}
if (Farmer != msg.sender) {
revert();
}

highestBidder = 0x0000000000000000000000000000000000000000;
highestBid = 0;
State = StateType.Active;
ended = false;
}

function withdrawBid() public TimeOver{
uint256 amount = pendingReturns[msg.sender];
if (amount > 0) {
OfferPrice[msg.sender] = 0;

pendingReturns[msg.sender] = 0;

if (msg.sender == highestBidder) {
if (bidders.biddersAddress.length > 1) {
highestBidder = bidders.biddersAddress[
bidders.biddersAddress.length - 2
];
highestBid = pendingReturns[highestBidder];
delete bidders.biddersAddress[
bidders.biddersAddress.length - 1
];
bidders.is_in[msg.sender] = false;
} else {
highestBidder = 0x0000000000000000000000000000000000000000;
highestBid = 0;
}
}
}
}

//external payable: means now highest bidder will be able to send the highest bid to smart contract
function biddingAcceptAndEnd() external payable{
require(msg.value == highestBid);
require(msg.sender == highestBidder);
require(!ended);

ended = true;
State = StateType.Accepted;
emit AuctionEnded(highestBidder, highestBid);
}
function TransferMoney(address payable user) external{
user.transfer(highestBid);
}

function Checkbalance() public view returns (uint256) {
return address(this).balance;
}

function GetCurrentOfferedPrice() public view returns (uint256) {
return OfferPrice[msg.sender];
}
}
