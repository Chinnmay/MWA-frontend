import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Navigation from "./navigator/navigation";
import { Container } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { AppContext, AppProvider } from "./config/Context";
import ProtectedRoute from "./navigator/ProtectedRoute";
import SimpleReactLightbox from "simple-react-lightbox";
import HttpsRedirect from 'react-https-redirect';

import Login from "./screens/Login";
import Issue from "./screens/Issue";
import Farmer from "./screens/Farmer";
import Crop from "./screens/Crop";
import AddIssue from "./screens/Issue/addIssue";
import ViewIssue from "./screens/Issue/viewIssue";
import AddFarmer from "./screens/Farmer/addFarmer";
import ViewFarmer from "./screens/Farmer/viewFarmer";
import ProductsandLabels from "./screens/ProductsandLabels";
import SignUp from "./screens/SignUp";

const dotenv = require("dotenv");
axios.interceptors.request.use(
  function (successfulReq) {
    var isResolve = false;
    if (!(successfulReq.url.split("/").splice(-1)[0] === "login")) {
      successfulReq.headers.Authorization = localStorage.getItem("accessToken");
    }
    return Promise.resolve(successfulReq);
  },
  function (error) {
    return Promise.reject(error);
  }
);

function App() {
  const isAdmin = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user")).role
        ? JSON.parse(localStorage.getItem("user")).role == "admin"
          ? true
          : false
        : false
      : false
    : false;

  return (
    <>
    <HttpsRedirect>
    <SimpleReactLightbox>
      <AppProvider>
        <Switch>
          <div>
            <Route
              path="/farmer"
              exact
              render={() => <ProtectedRoute path="/farmer" exact={true} component={Farmer} />}
            />
            <Route path="/crop" exact render={() => <ProtectedRoute path="/crop" exact={true} component={Crop} />} />
            <Route
              path="/addIssue/:mobileNumber"
              exact
              render={() => <ProtectedRoute path="/addIssue/:mobileNumber" exact={true} component={AddIssue} />}
            />
            <Route
              path="/viewIssue/:issueCode"
              exact
              render={() => (
                <ProtectedRoute path="/viewIssue/:issueCode" exact={true} component={withRouter(ViewIssue)} />
              )}
            />
            <Route
              path="/viewFarmer/:mobileNumber"
              exact
              render={() => <ProtectedRoute path="/viewFarmer/:mobileNumber" exact={true} component={ViewFarmer} />}
            />
            <Route
              path="/addFarmer"
              exact
              render={() => <ProtectedRoute path="/addFarmer" exact={true} component={AddFarmer} />}
            />
            <Route
              path="/productAndLabel"
              exact
              render={() => <ProtectedRoute path="/productAndLabel" exact={true} component={ProductsandLabels} />}
            />
            <Route
              path="/signUp"
              exact
              render={() =>
                isAdmin ? (
                  <ProtectedRoute path="/signUp" exact={true} component={SignUp} />
                ) : (
                  <Redirect to={{ pathname: "/" }} />
                )
              }
            />
            <Route path="/" exact render={() => <ProtectedRoute path="/" exact={true} component={Issue} />} />
            <Route path="/login"  component={Login} />
          </div>
        </Switch>
      </AppProvider>
      </SimpleReactLightbox>
      </HttpsRedirect>
    </>
  );
}

export default App;
