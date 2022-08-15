import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Navigation from "./navigation"
 
class ProtectedRoute extends React.Component {
    

    render() {
        const Component = this.props.component;
        const isTokenExpired = localStorage.getItem("accessToken") ? Date.now() > jwt_decode(localStorage.getItem("accessToken")).exp * 1000 : false;
       
        //TODO - if token, redirect to issue from login.
        return  localStorage.getItem("accessToken") && !isTokenExpired ? (
            <><Navigation /><Component /></>
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default withRouter(ProtectedRoute);