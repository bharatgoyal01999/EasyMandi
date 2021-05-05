import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Logo from "../Home/Logo.png";
import { BiMenu } from "react-icons/bi";
import { SwipeableDrawer } from "@material-ui/core";

export default function Nav() {
  const [showDrawer, toogleDrawer] = useState(false);
  const [isLogOut, setIsLogout] = useState(false);

  return (
    <>
      <div className="nav">
        <div style={{ flex: 0.6 }}>
          <img src={Logo} />
        </div>
        <Link className="navButton" to="/fhome">
          Current Crops{" "}
        </Link>
        <Link className="navButton" to="/fhome/sellitem">
          {" "}
          Sell Item{" "}
        </Link>

        <Link className="navButton" to="/fhome/history">
          History{" "}
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
