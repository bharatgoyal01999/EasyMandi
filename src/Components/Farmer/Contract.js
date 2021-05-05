import Web3 from "web3";

export default function farmerGetDetails(contractAddress) {
  var details = {
    harvestName: "",
    minimumAmount: "",
    highestBid: "",
    timeLeft: "",
    Farmer: "",

    highestBidder: "",
    Quantity: "",
    QuantityUnit: "",
    Discription: "",
  };
  const web3 = new Web3("http://127.0.0.1:7545");
  var abi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "string",
          name: "harvest",
          type: "string",
        },
        {
          internalType: "string",
          name: "quantityUnit",
          type: "string",
        },
        {
          internalType: "string",
          name: "startTime",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "biddingTime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "quantity",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "winner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "AuctionEnded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "bidder",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "HighestBidIncreased",
      type: "event",
    },
    {
      inputs: [],
      name: "AskingPrice",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "Checkbalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "Description",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "Farmer",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "FarmerCancelOffer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "string",
          name: "harvest",
          type: "string",
        },
        {
          internalType: "string",
          name: "quantityUnit",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "biddingTime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "quantity",
          type: "uint256",
        },
      ],
      name: "FarmerModify",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "FarmerTerminate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "GetCurrentOfferedPrice",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "GetTimeLeft",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "Harvest",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "Quantity",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "QuantityUnit",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "StartTime",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "State",
      outputs: [
        {
          internalType: "enum easyMandi.StateType",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "TotalBiddingTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "offerPrice",
          type: "uint256",
        },
      ],
      name: "TraderMakeOffer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "user",
          type: "address",
        },
      ],
      name: "TransferMoney",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "biddingAcceptAndEnd",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "highestBid",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "highestBidder",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawBid",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  var contract = new web3.eth.Contract(abi, contractAddress, {
    from: localStorage.getItem("meta"),
  });
  contract.methods
    .Description()
    .call()
    .then((res) => {
      details.Discription = res;
    })
    .catch((e) => {
      alert(e);
    });

  contract.methods.GetTimeLeft().send();
  contract.methods
    .GetTimeLeft()
    .call()
    .then((res) => {
      details.timeLeft = res;
    });

  contract.methods
    .highestBid()
    .call()
    .then((res) => {
      details.highestBid = res;
    });
  contract.methods
    .Quantity()
    .call()
    .then((res) => {
      details.Quantity = res;
    });
  contract.methods
    .Harvest()
    .call()
    .then((res) => {
      details.harvestName = res;
    });
  contract.methods
    .QuantityUnit()
    .call()
    .then((res) => {
      details.QuantityUnit = res;
    });
  contract.methods
    .AskingPrice()
    .call()
    .then((res) => {
      details.minimumAmount = res;
    });
  contract.methods
    .highestBidder()
    .call()
    .then((res) => {
      details.highestBidder = res;
    });

  contract.methods
    .Farmer()
    .call()
    .then((res) => (details.Farmer = res));

  return details;
}
