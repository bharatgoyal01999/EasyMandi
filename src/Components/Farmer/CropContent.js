import CropCard from "./CropCard";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
export default function CropContent({ contracts }) {
  var [red, isRed] = useState(false);
  useEffect(async () => {
    setTimeout(() => {
      console.log("contracts are" + contracts.length);
      if (contracts.length > 0) isRed(false);
      else isRed(false);
    }, 1000);
  }, []);

  return (
    <div className="contentContainer">
      {!red && (
        <div className="content">
          {contracts.map((item) => {
            return <CropCard contractAddress={item} />;
          })}
        </div>
      )}
      {red && (
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <h3> No Ongoing Bidding</h3>
        </div>
      )}
    </div>
  );
}
