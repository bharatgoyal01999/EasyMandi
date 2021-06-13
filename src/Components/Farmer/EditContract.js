import React, { useState, useEffect } from "react";
import { TextField, Select } from "@material-ui/core";
import Nav from "./Nav";
import farmerGetDetails from "./Contract";
import Web3 from "web3";
import { Redirect } from "react-router-dom";

export default function Edit(props) {
  var [harvestName, setHarvestName] = useState("");
  var [harvestDiscription, setHarvestDiscription] = useState();
  var [endingDate, setEndingDate] = useState();
  var [endingTime, setEndingTime] = useState();
  var [minAmount, setMinAmount] = useState();
  var [quanUnit, setQuanUnit] = useState("Kg");
  var [harvestQuantity, setHarvestQuantity] = useState();
  var [details, setDetails] = useState({});

  var [deployed, isDeployed] = useState(false);

  //   var MADDRESS = localStorage.getItem("meta");

  useEffect(() => {
    var contractAddress = props.match.params.contractAddress;

    console.log(
      farmerGetDetails(contractAddress),
      localStorage.getItem("meta"),
      "yesss"
    );
  }, []);

  const editContract = () => {
    var contractAddress = props.match.params.contractAddress;

    console.log("Contract Must Edit");

    var eDate = endingDate.split("-");
    var eTime = endingTime.split(":");

    var lastDate = new Date(
      `${eDate[1]}/${eDate[2]}/${eDate[0]} ${eTime[0]}:${eTime[1] - 1}:59`
    ).getTime();
    var now = new Date().getTime();
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
            internalType: "string",
            name: "fuid",
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
        name: "Fuid",
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
    var contract = new web3.eth.Contract(abi, contractAddress, {
      from: localStorage.getItem("meta"),
      gas: "6721975",
    });
    contract.methods
      .FarmerModify(
        harvestDiscription,
        harvestName,
        quanUnit,
        minAmount,
        (lastDate - now) / 1000,
        harvestQuantity
      )
      .send()
      .then((res) => isDeployed(true));
  };

  return (
    <div className="formContainer">
      <Nav />
      <center>
        <h2 style={{ color: "rgb(2, 43, 2)" }}>
          Please enter all data carefully{" "}
        </h2>
      </center>
      <div className="form">
        <TextField
          variant="filled"
          label="Harvest Name"
          placeholder={details.harvestName}
          onChange={(e) => {
            setHarvestName(e.target.value);
          }}
        />
        <div style={{ padding: 10 }} />
        <div>
          <TextField
            variant="outlined"
            label="Qunatity"
            type="number"
            onChange={(e) => {
              setHarvestQuantity(e.target.value);
            }}
          />
          <div style={{ padding: 10 }} />
          <Select
            native
            variant="outlined"
            onChange={(e) => {
              setQuanUnit(e.target.value);
            }}
          >
            <option value={"Kg"}>Kg</option>
            <option value={"Quintal"}>Quintal</option>
            <option value={"Ton"}>Ton</option>
          </Select>
        </div>
        <div style={{ padding: 10 }} />
        <TextField
          variant="outlined"
          label="Starting Bid (In Rupees)"
          type="number"
          onChange={(e) => {
            setMinAmount(e.target.value);
          }}
        />
        <div style={{ padding: 10 }} />
        <label style={{ opacity: 0.5, marginLeft: 5 }}>Ending Date</label>
        <div>
          <TextField
            type="Date"
            variant="outlined"
            onChange={(e) => {
              setEndingDate(e.target.value);
            }}
          ></TextField>
          <div style={{ padding: 10 }} />

          <TextField
            type="Time"
            variant="outlined"
            onChange={(e) => {
              setEndingTime(e.target.value);
            }}
          ></TextField>
        </div>
        <div style={{ padding: 10 }} />
        <TextField
          variant="outlined"
          label="discription"
          onChange={(e) => setHarvestDiscription(e.target.value)}
        />
        <div style={{ padding: 10 }} />
        <center>
          <button
            onClick={editContract}
            style={{
              backgroundColor: "#2F5233",
              color: "white",
              fontSize: "1.5em",
              width: "4em",
              marginTop: "2em",
            }}
          >
            Apply
          </button>
        </center>
      </div>
      {deployed && <Redirect to="/fhome" />}
    </div>
  );
}
