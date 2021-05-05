import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import CropContent from "./CropContent";

export default function OverBids() {
  var [contracts, setContracts] = useState([]);
  useEffect(async () => {
    var url = `http://13.233.23.103/records/livebid/?seller=${localStorage.getItem(
      "uid"
    )}`;
    await axios
      .get(url)
      .then((res) => {
        console.log("res is" + res);
        if (res.data.length > 0) {
          var addresses = res.data.filter((item) => {
            if (item.isTerminated) return item.address;
          });
          var addresses = addresses.map((item) => item.address);
          setContracts(addresses);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      <CropContent contracts={contracts} />
    </div>
  );
}
