import Nav from "./Nav";
import OngoingBids from "./OngoingBids";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Thome() {
  var [contractAddresses, setContractAddresses] = useState([]);
  useEffect(async () => {
    await axios
      .get("http://13.233.23.103/records/livebid/")
      .then((res) => {
        console.log(res.data.address);
        setContractAddresses(
          res.data.map((item) => {
            return item.address;
          })
        );
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
      <OngoingBids contracts={contractAddresses} />
    </div>
  );
}
