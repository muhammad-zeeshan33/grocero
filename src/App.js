import React, { Component } from "react";
import Auxilary from "./hoc/Auxilary";
import AuthContext from "./contexts/authContext";
import BaseApp from "./app/BaseApp";
import axios from "axios";
class App extends Component {
  state = {
    authenticated: false,
    token: null,
    success: false,
    error: false,
  };

  // This method checks if the user is logged and reLogin again in case he refresh the page
  autoLogin = (token) => {
    this.setState({
      token: token,
      authenticated: true,
    });
  };

  // Manual Login
  loginHandler = (credentials) => {
    this.setState({
      error: false,
    });

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHFxB1lu0npq9fe7SqQeYl8NhKdeIZvCo",
        credentials
      )
      .then((res) => {
        localStorage.setItem("token", res.data.idToken);
        this.setState({
          success: true,
          error: false,
          authenticated: true,
          token: res.data.idToken,
        });
      })
      .catch((err) => {
        this.setState({
          error: true,
        });
        console.log(err);
      });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          authenticated: this.state.authenticated,
          token: this.state.token,
          login: this.loginHandler,
          success: this.state.success,
          error: this.state.error,
          autoLogin: this.autoLogin,
        }}
      >
        <Auxilary>
          <BaseApp />
        </Auxilary>
      </AuthContext.Provider>
    );
  }
}

export default App;
