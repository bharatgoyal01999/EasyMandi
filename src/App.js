import React, { useEffect, useState } from "react";
import Home from "./Components/Home/Home";
import Thistory from "./Components/Trader/Hostory";
import Thome from "./Components/Trader/Home";
import OverBids from "./Components/Farmer/OverBids";
import Placed from "./Components/Trader/Placed";
import EditContract from "./Components/Farmer/EditContract";
import SellItem from "./Components/Farmer/SellCrop";
import Fhome from "./Components/Farmer/Fhome";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/fhome" component={Fhome} />
        <Route
          exact
          path="/fhome/edit/:contractAddress"
          component={EditContract}
        />
        <Route exact path="/thome" component={Thome} />
        <Route exact path="/fhome/sellitem" component={SellItem} />
        <Route exact path="/thome/placed" component={Placed} />
        <Route exact path="/fhome/blogs" component={Fhome} />
        <Route exact path="/fhome/history" component={OverBids} />
        <Route exact path="/thome/history" component={Thistory} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
