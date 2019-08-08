import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../components/Landing/Landing";
import Dashboard from "../components/Dashboard/Dashboard";
import BusienssReg from "../components/BusinessReg/BusinessReg";
import Drink from "../components/Drink/Drink";
import Map from "../components/Map/Map";
import userReg from "../components/UserReg/UserReg";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/businessReg" component={BusienssReg} />
    <Route path="/drink/:id" component={Drink} />
    <Route path="/userReg" component={userReg} />
    <Route path="/map" component={Map} />
  </Switch>
);
