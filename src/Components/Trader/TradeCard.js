import { Button, TextField } from "@material-ui/core";
import Web3 from "web3";

import { BiRupee } from "react-icons/bi";
import { useState, useEffect } from "react";
import axios from "axios";

const Timer = () => {
  const [remainingTime, setReaminingTime] = useState({});

  useEffect(() => {
    let year = new Date().getFullYear();
    let difference = +new Date(`10/01/${year}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    setReaminingTime(timeLeft);
  }, [remainingTime]);

  return (
    <div className="timerContainer">
      <div>
        <span className="timerText">
          {remainingTime.days < 10
            ? "0" + remainingTime.days
            : remainingTime.days}
        </span>
        <span>:</span>
        <span className="timerText">
          {remainingTime.hours < 10
            ? "0" + remainingTime.hours
            : remainingTime.hours}
        </span>{" "}
        <span>:</span>
        <span className="timerText">
          {remainingTime.minutes < 10
            ? "0" + remainingTime.minutes
            : remainingTime.minutes}
        </span>{" "}
        <span>:</span>
        <span className="timerText">
          {remainingTime.seconds < 10
            ? "0" + remainingTime.seconds
            : remainingTime.seconds}
        </span>
      </div>
      <div>
        <span>{"days"}</span>
        <span>:</span>
        <span>{"hrs"}</span> <span>:</span>
        <span>{"min"}</span> <span>:</span>
        <span>{"sec"}</span>
      </div>
    </div>
  );
};

export default function CropCard({ contractAddress }) {
  var [HarvestName, setHarvestName] = useState("");
  var [HarvestQuantity, setHarvestQuantity] = useState("");
  var [sellerId, setSellerId] = useState("");
  var [HarvesDisc, setHarvestDisc] = useState("");
  var [timeLeft, setTimeLeft] = useState("Time is over");
  var [time, setTime] = useState();
  var [highestBid, setHighestBid] = useState();
  var [highestBidder, setHighestBidder] = useState("");
  var [quantityUnit, setQuantityUnit] = useState("");
  var [minAmount, setMinAmount] = useState("");
  var [disabled, isDisabled] = useState(false);
  var [myOffer, setMyOffer] = useState();
  var [farmer, setFarmer] = useState();
  var [disableMakePayment, setDisableMakePayment] = useState(false);
  var [disableTransferMonet, setDisableTrasferMoney] = useState(false);
  const [bid, setBid] = useState("");
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

  const makePayment = async () => {
    var value = Number(highestBid);
    const web3 = new Web3("http://127.0.0.1:7545");

    var contract = new web3.eth.Contract(abi, contractAddress, {
      from: localStorage.getItem("meta"),
    });

    await contract.methods
      .biddingAcceptAndEnd()
      .send({
        from: localStorage.getItem("meta"),
        gas: "6721975",
        value: value,
      })
      .then((res) => {
        setDisableMakePayment(true);
        setDisableTrasferMoney(false);
        window.location.reload();
      });
  };

  const transferMoney = async () => {
    const web3 = new Web3("http://127.0.0.1:7545");

    var contract = new web3.eth.Contract(abi, contractAddress, {
      from: localStorage.getItem("meta"),
    });
    await contract.methods
      .Checkbalance()
      .call()
      .then(async (res) => {
        if (res == Number(highestBid)) {
          console.log(farmer);
          await contract.methods
            .TransferMoney(farmer)
            .send()
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
          await contract.methods
            .Checkbalance()
            .call()
            .then((res) => {
              console.log("Inside Check Balance", res);
              var details = {
                date: new Date(),
                Amount: highestBid,
                Description: HarvesDisc,
                harvest:
                  HarvestName + " " + HarvestQuantity + " " + quantityUnit,
                buyer: localStorage.getItem("uid"),
                seller: Number(sellerId),
                address: contractAddress,
              };
              axios
                .post(
                  "http://13.233.23.103/records/history/",
                  { ...details },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  setDisableTrasferMoney(true);
                  setDisableMakePayment(true);
                  window.location.reload();
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        }
      });
  };

  useEffect(async () => {
    const web3 = new Web3("http://127.0.0.1:7545");

    var contract = new web3.eth.Contract(abi, contractAddress, {
      from: localStorage.getItem("meta"),
    });

    await contract.methods
      .Description()
      .call()
      .then((res) => {
        setHarvestDisc(res);
      });
    await contract.methods
      .Fuid()
      .call()
      .then((res) => {
        setSellerId(res);
      });

    await contract.methods
      .Checkbalance()
      .call()
      .then(async (res) => {
        if (res > 0) {
          setDisableMakePayment(true);
          setDisableTrasferMoney(false);
        } else {
          contract.methods
            .State()
            .call()
            .then((res) => {
              if (res == 2) {
                setDisableMakePayment(true);
                setDisableTrasferMoney(true);
              } else {
                setDisableMakePayment(false);
                setDisableTrasferMoney(true);
              }
            });
        }
      });
    await contract.methods
      .highestBidder()
      .call()
      .then((res) => {
        setHighestBidder(res);
      });

    try {
      await contract.methods.GetTimeLeft().send();

      await contract.methods
        .GetTimeLeft()
        .call()
        .then((res) => {
          setTimeLeft(Number(res));

          var hrs = Math.floor(res / 3600);
          var minutes = Math.floor((res % 3600) / 60);
          var seconds = Math.floor((res % 3600) % 60);
          setTimeLeft(`${hrs}:${minutes}:${seconds}`);
        });
    } catch (e) {
      if (localStorage.getItem("meta") === highestBidder) {
        setTimeLeft(
          <div
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={makePayment}
              disabled={disableMakePayment}
            >
              Make Payment
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={transferMoney}
              disabled={disableTransferMonet}
            >
              Transfer Money to farmer
            </Button>
          </div>
        );
      } else {
        setTimeLeft("Time is over");
      }
      isDisabled(true);
    }

    contract.methods
      .highestBid()
      .call()
      .then((res) => {
        setHighestBid(res);
      });
    contract.methods
      .Quantity()
      .call()
      .then((res) => {
        setHarvestQuantity(res);
      });
    contract.methods
      .Harvest()
      .call()
      .then((res) => {
        setHarvestName(res);
      });
    contract.methods
      .QuantityUnit()
      .call()
      .then((res) => {
        setQuantityUnit(res);
      });
    contract.methods
      .AskingPrice()
      .call()
      .then((res) => {
        var amount = res;
        setMinAmount(amount);
      });
    contract.methods
      .GetCurrentOfferedPrice()
      .call()
      .then((res) => {
        setMyOffer(res);
      });
    contract.methods
      .Farmer()
      .call()
      .then((res) => {
        setFarmer(res);
      });
  }, [highestBidder, highestBid, farmer]);

  const placeBid = async () => {
    const web3 = new Web3("http://127.0.0.1:7545");
    var address = contractAddress;

    var meta = localStorage.getItem("meta");

    var contract = new web3.eth.Contract(abi, address, {
      from: meta,
      gas: "6721975",
    });
    if (Number(bid) > Number(minAmount) && Number(bid) > Number(highestBid)) {
      await contract.methods
        .TraderMakeOffer(Number(bid))
        .send()
        .then((res) => {
          setHighestBid(bid);
        });
      await contract.methods
        .GetCurrentOfferedPrice()
        .call()
        .then((res) => {
          setMyOffer(res);
        });
    } else {
      alert("Bid must be greater than highestBid/Minimum Amount");
    }
  };

  return (
    <div className="cardContainer" style={{ margin: "20px 10px" }}>
      <div className="cardTop">
        <div style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Button
            disabled={disabled}
            color="primary"
            variant="contained"
            onClick={async () => {
              const web3 = new Web3("http://127.0.0.1:7545");

              var contract = new web3.eth.Contract(abi, contractAddress, {
                from: localStorage.getItem("meta"),
              });
              try {
                await contract.methods.GetTimeLeft().send();
                await contract.methods
                  .GetTimeLeft()
                  .call()
                  .then((res) => {
                    if (res) {
                      setTimeLeft(Number(res));
                      var hrs = Math.floor(res / 3600);
                      var minutes = Math.floor((res % 3600) / 60);
                      var seconds = Math.floor((res % 3600) % 60);
                      setTimeLeft(`${hrs}:${minutes}:${seconds}`);
                    }
                  });
              } catch (err) {
                if (highestBidder === localStorage.getItem("meta")) {
                  alert("You won this bid now you make payment");
                  setTimeLeft(
                    <div
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={makePayment}
                        disabled={disableMakePayment}
                      >
                        Make Payment
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={transferMoney}
                      >
                        Transfer Money to farmer
                      </Button>
                    </div>
                  );
                } else {
                  setTimeLeft("Time is over");
                }
                isDisabled(true);
              }
            }}
          >
            Get Time Left
          </Button>
          <span style={{ fontSize: "1.5em" }}>Minimum Amount</span>
          <span style={{ fontSize: "1.5em" }}>Your Offer</span>
          <span style={{ fontSize: "1.5em" }}>Highest Bid</span>
        </div>
        <div style={{ justifyContent: "space-between" }}>
          <span
            className="cardDisc"
            style={{ marginBottom: "1em", marginTop: "1em" }}
          >
            {typeof timeLeft === "number" ? timeLeft + " sec" : timeLeft}
          </span>

          <span style={{ marginTop: "1em", color: "rgb(39, 75, 16)" }}>
            {minAmount} <BiRupee style={{ marginTop: "0.1em" }} />
          </span>
          <span style={{ marginTop: "1em", color: "rgb(39, 75, 16)" }}>
            {myOffer} <BiRupee style={{ marginTop: "0.1em" }} />
          </span>
          <span style={{ marginTop: "1em", color: "rgb(39, 75, 16)" }}>
            {highestBid} <BiRupee style={{ marginTop: "0.1em" }} />
          </span>
        </div>
      </div>
      <div className="cardBottom">
        <div style={{ justifyContent: "space-between", alignItems: "center" }}>
          <span className="cardTitle">
            {HarvestName + " " + HarvestQuantity + quantityUnit}
          </span>
          <TextField
            style={{ marginRight: "1em" }}
            placeholder="Enter Your offer"
            variant="outlined"
            onChange={(e) => setBid(e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={placeBid}
            disabled={disabled}
          >
            Place Bid
          </Button>
          <Button
            disabled={disabled}
            variant="contained"
            color="primary"
            onClick={async () => {
              const web3 = new Web3("http://127.0.0.1:7545");
              var address = contractAddress;

              var meta = localStorage.getItem("meta");

              var contract = new web3.eth.Contract(abi, address, {
                from: meta,
                gas: "6721975",
              });
              await contract.methods.withdrawBid().send();
              contract.methods
                .highestBid()
                .call()
                .then((res) => {
                  setHighestBid(res);
                });
              contract.methods
                .GetCurrentOfferedPrice()
                .call()
                .then((res) => {
                  setMyOffer(res);
                });
            }}
          >
            Withdraw Bid
          </Button>
        </div>

        <span style={{ marginTop: "2em" }} className="cardDisc">
          {HarvesDisc}
        </span>
      </div>
    </div>
  );
}
