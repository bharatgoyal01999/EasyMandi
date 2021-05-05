import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Logo from "../Home/Logo.png";
import { BiMenu } from "react-icons/bi";
import { SwipeableDrawer } from "@material-ui/core";

export default function Nav() {
  const [showDrawer, toogleDrawer] = useState(false);
  const [isLogOut, setIsLogout] = useState(false);

  return (
    <div className="nav">
      <div style={{ flex: 0.6 }}>
        <img src={Logo} />
      </div>
      <Link className="navButton" to="/thome">
        {" "}
        Ongoing{" "}
      </Link>
      <Link className="navButton" to="/thome/placed">
        Placed{" "}
      </Link>

      {/* <Link className="navButton" to="/thome/history">
        History{" "}
      </Link> */}
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
  );
}
