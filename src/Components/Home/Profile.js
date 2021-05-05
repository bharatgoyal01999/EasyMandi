import Nav from "../Trader/Nav";
import { useEffect } from "react";
import axios from "axios";
export default function Profile() {
  useEffect(async () => {
    await axios.get("");
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
      <div></div>
    </div>
  );
}
