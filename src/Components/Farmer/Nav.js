import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Logo from "../Home/Logo.png";
import { BiMenu } from "react-icons/bi";
import { SwipeableDrawer } from "@material-ui/core";

export default function Nav() {
  const [showDrawer, toogleDrawer] = useState(false);
  const [isLogOut, setIsLogout] = useState(false);
  const [dash, setDash] = useState("underline");
  const [sell, setSell] = useState("none");
  const [His, setHis] = useState("none");

  return (
    <>
      <div className="nav">
        <div style={{ flex: 0.6 }}>
          <img src={Logo} />
        </div>
        <Link className="navButton" to="/fhome">
          <span
            style={{
              borderBottomColor: "white",
              textDecorationLine: dash,
            }}
            onClick={() => {
              setDash("underline");
              setSell("none");
              setHis("none");
            }}
          >
            DashBoard
          </span>
        </Link>
        <Link className="navButton" to="/fhome/sellitem">
          <span
            style={{
              borderBottomColor: "white",
              textDecorationLine: sell,
            }}
            onClick={() => {
              setDash("none");
              setSell("underline");
              setHis("none");
            }}
          >
            {" "}
            Sell Item{" "}
          </span>
        </Link>

        <Link className="navButton" to="/fhome/history">
          <span
            style={{
              borderBottomColor: "white",
              textDecorationLine: His,
            }}
            onClick={() => {
              setDash("none");
              setSell("none");
              setHis("underline");
            }}
          >
            {" "}
            History{" "}
          </span>
        </Link>
        <span
          className="navButton"
          onClick={() => {
            localStorage.removeItem("meta");
            localStorage.removeItem("uid");
            setIsLogout(true);
          }}
        >
          LogOut{" "}
        </span>
        {isLogOut && <Redirect to="/" />}
      </div>

      <div className="phoneNav">
        <div style={{ flex: 0.6 }}>
          <img src={Logo} />
        </div>
        <BiMenu onClick={() => toogleDrawer(true)} />
        <SwipeableDrawer
          anchor={"right"}
          open={showDrawer}
          //   onClose={toogleDrawer(false)}
          //   onOpen={toogleDrawer(true)}
        >
          <Link className="navButton" to="/fhome">
            Current Crops{" "}
          </Link>
          <Link className="navButton" to="/fhome/sellitem">
            {" "}
            Sell Item{" "}
          </Link>
          <Link className="navButton" to="/fhome/blogs">
            {" "}
            Blogs
          </Link>
          <Link className="navButton" to="/fhome/history">
            Hostory{" "}
          </Link>
          <Link className="navButton" to="/fhome/profile">
            Profile{" "}
          </Link>
        </SwipeableDrawer>
      </div>
    </>
  );
}
