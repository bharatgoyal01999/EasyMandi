import React, { useState } from "react";
import Home from "./Home.jpg";
import Logo from "./Logo.png";
import EasyMandi from "./EasyMandi.png";
import axios from "axios";
import "../../App.css";
import { Button, TextField } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

const textButton = {
  color: "white",
  fontSize: "20px",
  marginLeft: "20px",
  fontWeight: "bold",
};

const Nav = () => {
  return (
    <div
      style={{
        flex: 0.1,

        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          marginLeft: "2px",
          marginTop: "2px",
        }}
        onClick={() => {
          console.log("Home");
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <img src={Logo} />
          <img src={EasyMandi} />
        </span>
      </span>
      <div
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "flex-end",
          paddingRight: "5%",
        }}
      >
        <span style={{ ...textButton, marginRight: "10%" }}>
          {" "}
          About&nbsp;Us
        </span>
        <span style={{ ...textButton }}> Contact&nbsp;Us</span>
      </div>
    </div>
  );
};

const InputBox = ({ label, onChange, type }) => {
  return (
    <div
      style={{
        flexDirection: "column",
        paddingLeft: "3%",
        marginBottom: "3%",
      }}
    >
      <span>{label}</span>
      <input
        type={type}
        style={{
          borderRadius: "10px",
          height: "30px",
          width: "400px",
          fontWeight: "bold",
        }}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

const RegisterTrader = ({ display, changeDisplay, heading }) => {
  return (
    <div
      className="auth"
      style={{
        display: display,
        width: window.innerWidth * 0.5,
        height: window.innerHeight * 0.5,
        marginTop: window.innerHeight * 0.15,
        marginBottom: window.innerHeight * 0.15,
      }}
    >
      <div
        onClick={changeDisplay}
        style={{
          cursor: "pointer",
          flex: 0.2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div stle={{ flex: 0.3333 }} />
        <h2>{heading}</h2>
        <span>close</span>{" "}
      </div>
      <div style={{ flex: 0.1 }} />
      <div style={{ flexDirection: "column" }}>
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
        <InputBox label="123" />
      </div>
    </div>
  );
};

const Register = ({ display, changeDisplay, heading, isFarmer }) => {
  var [farmerLogin, setFarmerLogin] = useState("none");
  var [farmerSignIn, setFarmerSignIn] = useState("flex");
  var [islogin, setIsLogin] = useState(false);
  var [username, setUserName] = useState();
  var [firstName, setFirstName] = useState();
  var [lastName, setLastName] = useState();
  var [meta, setmeta] = useState();
  var [district, setDistrict] = useState();
  var [state, setState] = useState();
  var [gender, setGender] = useState();
  var [password, setPassword] = useState();

  const funcRegisterFarmer = async () => {
    var userData = {
      username: username,
      profile: {
        firstName: firstName,
        lastName: lastName,
        meta: meta,
        district: district,
        state: state,
        gender: gender,
      },
      password: password,
    };

    await axios
      .post("http://13.233.23.103/accounts/signup/", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);

        localStorage.setItem("meta", res.data.meta);
        localStorage.setItem("uid", res.data.id);
        setIsLogin(true);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const funLoginUser = async () => {
    console.log(username);
    var userData = {
      username: username,
      password: password,
    };
    await axios
      .post("http://13.233.23.103/accounts/login/", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("meta", res.data.meta);
        localStorage.setItem("uid", res.data.id);
        setIsLogin(true);
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div
      className="auth"
      style={{
        display: display,
        width: window.innerWidth * 0.5,
        height: window.innerHeight * 0.5,
        marginTop: window.innerHeight * 0.15,
        marginBottom: window.innerHeight * 0.15,
      }}
    >
      <div
        onClick={changeDisplay}
        style={{
          cursor: "pointer",
          flex: 0.2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div stle={{ flex: 0.3333 }} />
        <h2>{heading}</h2>
        <span>close</span>{" "}
      </div>
      <div style={{ flex: 0.1 }} />
      <div style={{ flexDirection: "column", display: farmerSignIn }}>
        <InputBox
          label="username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <InputBox
          label="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <InputBox
          label="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

        <InputBox
          label="district"
          onChange={(e) => {
            setDistrict(e.target.value);
          }}
        />
        <InputBox
          label="State"
          onChange={(e) => {
            setState(e.target.value);
          }}
        />

        <InputBox
          label="MataMask Address"
          onChange={(e) => {
            setmeta(e.target.value);
          }}
        />
        <a target="_blank" href="https://metamask.io/download.html">
          Get MetaMask Address
        </a>
        <InputBox
          label="Gender"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <InputBox
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
        />

        <center>
          <button
            onClick={funcRegisterFarmer}
            style={{
              backgroundColor: "#2F5233",
              color: "white",
              fontSize: "1.5em",
              width: "4.5em",
              borderRadius: "0.5em",
            }}
          >
            Register
          </button>
        </center>

        <span
          onClick={() => {
            setFarmerLogin("flex");
            setFarmerSignIn("none");
          }}
          style={{
            color: "white",
            fontSize: "1em",
            cursor: "pointer",
            fontWeight: "700",
            alignSelf: "center",
            marginTop: "1em",
          }}
        >
          Allready have an account? LogIn!
        </span>
      </div>

      <div style={{ flexDirection: "column", display: farmerLogin }}>
        <InputBox
          label="Usrname/MataMask"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <InputBox
          label="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <center>
          <button
            onClick={funLoginUser}
            style={{
              backgroundColor: "#2F5233",
              color: "white",
              fontSize: "1.5em",
              width: "4.5em",
              marginTop: "4em",
              borderRadius: "0.5em",
            }}
          >
            LogIn
          </button>
        </center>
        {islogin && isFarmer && <Redirect to="/fhome" />}
        {islogin && !isFarmer && <Redirect to="/thome" />}

        <span
          onClick={() => {
            setFarmerLogin("none");
            setFarmerSignIn("flex");
          }}
          style={{
            color: "white",
            fontSize: "1em",
            cursor: "pointer",
            fontWeight: "700",
            alignSelf: "center",
            marginTop: "1em",
          }}
        >
          Don't have account? Register!
        </span>
      </div>
    </div>
  );
};

export default () => {
  const buttonStyle = {
    color: "white",
    backgroundColor: "#2F5233",
    width: "100%",
    borderRadius: "10px",
    fontSize: "25px",
  };

  const [traderDisplay, setTraderDisplay] = useState("none");
  const [farmerDisplay, setFarmerDisplay] = useState("none");
  const [homeDisplay, setHomeDisplay] = useState("flex");

  return (
    <div
      style={{
        flex: 1,
        flexDirection: "column",
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundImage: `url(${Home})`,
        backgroundPosition: "center",
      }}
    >
      <div
        className="homeStuff"
        style={{
          flexDirection: "column",
          justifyContent: "space-between",

          flex: 1,
          display: homeDisplay,
        }}
      >
        <Nav />

        <div
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: "200px",
            paddingLeft: "10%",
          }}
        >
          <span>
            <Button
              style={buttonStyle}
              onClick={() => {
                setTraderDisplay("flex");
                setHomeDisplay("none");
              }}
            >
              Join as Trader
            </Button>
          </span>
          <span style={{ marginLeft: "15%" }}>
            <Button
              style={buttonStyle}
              onClick={() => {
                setFarmerDisplay("flex");
                setHomeDisplay("none");
              }}
            >
              Join as Farmer
            </Button>
          </span>
        </div>
      </div>

      <Register
        isFarmer={false}
        className="traderRegisterMenu"
        display={traderDisplay}
        changeDisplay={() => {
          setTraderDisplay("none");
          setHomeDisplay("flex");
        }}
        heading="Register as Trader"
      />

      <Register
        isFarmer={true}
        className="farmerRegisterMenu"
        display={farmerDisplay}
        changeDisplay={() => {
          setFarmerDisplay("none");
          setHomeDisplay("flex");
        }}
        heading="Register as Farmer"
      />
    </div>
  );
};
