import React, { useState, useEffect } from "react";
import OnGoing from "./OngoingBids";
import Nav from "./Nav";
import axios from "axios";
import Web3 from "web3";

export default function PlaceBids() {
  const [contractAddress, setContractAddress] = useState([]);

  useEffect(async () => {
    console.log("in Hostory");
    var reqContracts = [];
    await axios
      .get(
        `http://13.233.23.103/records/history/?buyer=${localStorage.getItem(
          "uid"
        )}`
      )
      .then((res) => {
        console.log(res.data.length);
        if (res.data.length > 0) {
          console.log(res.data);
          res.data.forEach(async (item) => {
            reqContracts.push(item.address);
            setContractAddress(reqContracts);
          });
        }
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
