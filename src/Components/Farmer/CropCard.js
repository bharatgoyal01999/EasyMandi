import { Button } from "@material-ui/core";
// import { abi } from "./Contract";
import { BiRupee, BiEdit } from "react-icons/bi";
import { useState, useEffect, useMemo } from "react";
import Web3 from "web3";
import axios from "axios";
import { Link } from "react-router-dom";

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

  console.log("timer");
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
  console.log(contractAddress);
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

  var [HarvestName, setHarvestName] = useState();
  var [minAmount, setMinAmount] = useState();
  var [HarvestQuantity, setHarvestQuantity] = useState();
  var [HarvesDisc, setHarvestDisc] = useState();
  var [timeLeft, setTimeLeft] = useState(-10);
  var [highestBid, setHighestBid] = useState();
  var [highestBidder, setHighestBidder] = useState();
  var [quantityUnit, setQuantityUnit] = useState();
  var [minAmount, setMinAmount] = useState();
  var [disabled, isDisabled] = useState(false);
  var [showTrader, setshowTrader] = useState(false);
  var [traderInfo, setTraderInfo] = useState(
    "Trader has made paymet you will receive amount after deliviring the goods"
  );

  useEffect(async () => {
    const web3 = new Web3("http://127.0.0.1:7545");

    var contract = new web3.eth.Contract(abi, contractAddress, {
      from: localStorage.getItem("meta"),
    });
    contract.methods
      .Description()
      .call()
      .then((res) => {
        setHarvestDisc(res);
      });

    ///// Tell if terminated
    try {
      await contract.methods.GetTimeLeft().send();
      await contract.methods
        .GetTimeLeft()
        .call()
        .then((res) => {
          setTimeLeft(res);
        });
    } catch (e) {
      await axios.put(
        `http://13.233.23.103/records/livebid/${contractAddress}/`,
        {
          seller: localStorage.getItem("uid"),
          address: contractAddress,
          isTerminated: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTimeLeft("Time is over");

      isDisabled(true);
    }

    ////////////
    await contract.methods
      .Checkbalance()
      .call()
      .then((res) => {
        if (res > 0) {
          setshowTrader(true);
        }
      });

    await contract.methods

      .highestBidder()

      .call()
      .then((res) => {
        setHighestBidder(res);
      });

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
        console.log(res);

        setMinAmount(res);
      });
  }, []);

  console.log(typeof typeof traderInfo);

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
                    setTimeLeft(res);
                  });
              } catch (e) {
                setTimeLeft("Time is over");
                isDisabled(true);
              }
            }}
          >
            Get Time Left
          </Button>
          <span style={{ fontSize: "1.5em" }}>Minimum Amount</span>
          <span style={{ fontSize: "1.5em" }}>Highest Bid</span>
        </div>
        <div style={{ justifyContent: "space-between" }}>
          <span
            className="cardDisc"
            style={{ marginBottom: "1em", marginTop: "1em" }}
          >
            {timeLeft === "Time is over" ? timeLeft : timeLeft + " sec"}
          </span>

          <span style={{ marginTop: "1em", color: "rgb(39, 75, 16)" }}>
            {minAmount} <BiRupee style={{ marginTop: "0.1em" }} />
          </span>
          <span style={{ marginTop: "1em", color: "rgb(39, 75, 16)" }}>
            {highestBid} <BiRupee style={{ marginTop: "0.1em" }} />
          </span>
        </div>
        {/* <div className="cardRight" style={{ marginLeft: "2em" }}>
          <span>Highest Bid</span>
        </div> */}
      </div>
      <div className="cardBottom">
        <div style={{ justifyContent: "space-between", alignItems: "center" }}>
          <span className="cardTitle">
            {HarvestName + " " + HarvestQuantity + quantityUnit}
          </span>
          <Button
            variant="contained"
            color="primary"
            disabled={disabled}
            onClick={async () => {
              const web3 = new Web3("http://127.0.0.1:7545");
              var address = contractAddress;
              console.log(address);

              console.log(localStorage.getItem("meta"));

              var contract = new web3.eth.Contract(abi, address, {
                from: localStorage.getItem("meta"),
                gas: "6721975",
              });
              await contract.methods
                .FarmerCancelOffer()
                .send()
                .then(async (res) => {
                  console.log(res);
                  await contract.methods
                    .highestBid()
                    .call()
                    .then((res) => {
                      setHighestBid(res);
                    });
                });
            }}
          >
            Cancel Current Offer
          </Button>
          <Button
            disabled={disabled}
            variant="contained"
            color="primary"
            onClick={() => {
              const web3 = new Web3("http://127.0.0.1:7545");
              var address = contractAddress;
              console.log(address);

              console.log(localStorage.getItem("meta"));

              var contract = new web3.eth.Contract(abi, address, {
                from: localStorage.getItem("meta"),
                gas: "6721975",
              });
              try {
                contract.methods
                  .FarmerTerminate()
                  .send()
                  .then((res) => {
                    setTimeLeft("Termiated");
                    isDisabled(true);
                  });
              } catch (err) {
                setTimeLeft("Terminated");
                isDisabled(true);
              }
            }}
          >
            Terminate
          </Button>
        </div>
        <div style={{ alignItems: "center", justifyContent: "space-between" }}>
          {!showTrader && (
            <span className="cardDisc" style={{ marginTop: "2em" }}>
              {HarvesDisc}
            </span>
          )}
          {!disabled && (
            <Link to={`/fhome/edit/${contractAddress}`}>
              <BiEdit
                style={{ marginTop: "2em", fontSize: "2em", cursor: "pointer" }}
              />
            </Link>
          )}
          {disabled && showTrader && (
            <div
              style={{
                marginTop: "2em",
                fontSize: "1em",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div>
                <span>
                  {typeof traderInfo == "string" ? (
                    traderInfo
                  ) : (
                    <div style={{ flexDirection: "column" }}>
                      <span>Name - {traderInfo.Name} </span>
                      <br />
                      <span>District - {traderInfo.District} </span> <br />
                      <span>State - {traderInfo.State} </span>
                    </div>
                  )}
                </span>
              </div>
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={async () => {
                    if (highestBid > 0) {
                      await axios
                        .get(
                          `http://13.233.23.103/accounts/bidder/?meta=${highestBidder}`,
                          {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        )
                        .then((res) => {
                          var data = res.data[0];

                          var info = `Name=${data.firstName} ${data.lastName} \nDistrict=${data.district} \nState=${data.state} `;
                          setTraderInfo({
                            Name: data.firstName + " " + data.lastName,
                            District: data.district,
                            State: data.state,
                          });
                        })
                        .catch((e) => console.log(e));
                    }
                  }}
                >
                  Show Trader Info
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
