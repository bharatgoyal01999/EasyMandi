import React, { useState, useEffect } from "react";
import OnGoing from "./OngoingBids";
import Nav from "./Nav";
import axios from "axios";
import Web3 from "web3";

export default function PlaceBids() {
  const [contractAddress, setContractAddress] = useState([]);
  const abi = [
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
      inputs: [],
      name: "biddingAcceptAndEnd",
      outputs: [],
      stateMutability: "payable",
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
      name: "withdrawBid",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
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
  ];
  useEffect(async () => {
    var reqContracts = [];
    await axios
      .get("http://13.233.23.103/records/livebid/")
      .then((res) => {
        res.data.forEach(async (item) => {
          const web3 = new Web3("http://127.0.0.1:7545");

          var contract = new web3.eth.Contract(abi, item.address, {
            from: localStorage.getItem("meta"),
          });

          await contract.methods
            .GetCurrentOfferedPrice()
            .call()
            .then((res) => {
              if (res > 0) {
                console.log(res);
                reqContracts.push(item.address);
                setContractAddress(reqContracts);
                console.log(contractAddress, "contract address");
              }
            });
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight * 0.07,
        flexDirection: "column",
      }}
    >
      <Nav />
      <OnGoing contracts={contractAddress} />
    </div>
  );
}
