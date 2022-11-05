import React, { Component } from "react";
import Auxilary from "./hoc/Auxilary";
import AuthContext from "./contexts/authContext";
import BaseApp from "./app/BaseApp";
import axios from "axios";
import axios_firebase from "./axios";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
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
      role: null,
    });
  };

  auth = getAuth();

  // Manual Login
  loginHandler = (credentials) => {
    this.setState({
      error: false,
    });

    signInWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    )
      // axios
      //   .post(
      //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHFxB1lu0npq9fe7SqQeYl8NhKdeIZvCo",
      //     credentials
      //   )
      .then((res) => {
        console.log(res.user);
        localStorage.setItem("token", res.user.accessToken);
        this.setState({
          success: true,
          error: false,
          authenticated: true,
          token: res.user.accessToken,
        });
        axios_firebase
          .get(`/shop-owners.json`)
          .then((response) => {
            const transformed = Object.keys(response.data).map((key) => {
              return {
                key,
                ...response.data[key],
              };
            });

            // console.log(transformed);
            const user = transformed.filter((user) => {
              // console.log("user uid", user.uid);
              // console.log("res uid", res.user.uid);
              return user.userId == res.user.uid;
            });
            if (user.length == 0) {
              this.setState({
                role: "admin",
              });
            } else {
              this.setState({
                role: "shopOwner",
              });
            }
          })
          .catch((e) => {
            console.log(e);
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
          role: this.state.role,
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
