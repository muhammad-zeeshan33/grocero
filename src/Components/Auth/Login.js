import React, { Component } from "react";
import AuthContext from "../../contexts/authContext";
import { Link } from "react-router-dom";
class Login extends Component {
  state = {
    credentials: {
      email: "",
      password: "",
    },
    loading: false,
  };

  static contextType = AuthContext;

  // Check if the user was previously logged in
  checkExistingSession = () => {
    const token = localStorage.getItem("token");
    if (token) {
      this.context.autoLogin(token);
    }
  };

  login = (e) => {
    e.preventDefault();
    console.log(this.state.credentials);
    this.setState({
      loading: true,
    });
    // /loggin in
    this.context.login(this.state.credentials);
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 2000);
  };

  inputChangedHandler = (e) => {
    const updatedCredentials = { ...this.state.credentials };
    updatedCredentials[e.target.name] = e.target.value;
    this.setState({
      credentials: updatedCredentials,
    });
  };

  render() {
    this.checkExistingSession();
    return (
      <div className='flex justify-center mt-[150px]'>
        <div class='w-full p-4 max-w-sm bg-[#fff] mr-0 rounded-lg border border-gray-200 shadow-lg shadow-gray-700 sm:p-6 lg:p-8 font-Poppins'>
          <form class='space-y-6' onSubmit={(e) => this.login(e)}>
            <div className='flex flex-col justify-center items-center'>
              <img
                src={require("../../assets/logo.png")}
                style={{ width: 50, height: 50 }}
                alt='logo'
              />
              <span style={{ fontSize: "15px", color: "#66c934" }}>
                GROCERO
              </span>
            </div>
            <h5 class='text-xl text-center font-medium text-gray-900'>
              WELCOME BACK
            </h5>

            <p className='text-center'>Login to continue</p>
            <div>
              <input
                type='email'
                className='bg-white outline-none border border-[#ddd] focus:ring-4 focus:ring-[#ddd] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
                placeholder='Email'
                name='email'
                onChange={(e) => this.inputChangedHandler(e)}
                required
              />
            </div>
            <div>
              <input
                type='password'
                className='bg-white outline-none border border-[#ddd] focus:ring-4 focus:ring-[#ddd] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
                placeholder='Password'
                name='password'
                onChange={(e) => this.inputChangedHandler(e)}
                required
              />
            </div>
            <p className='text-red-700'>
              {this.context.error && "Email or password is wrong"}
            </p>
            <div class='flex items-start'>
              <Link
                to='/forget-password'
                class=' text-md text-blue-700 hover:underline dark:text-blue-500'
              >
                Forget Password
              </Link>
            </div>
            <button
              type='submit'
              class='w-full text-white bg-[#333] hover:bg-[FEF5F9] focus:ring-4 focus:outline-none focus:ring-[#f3f3f3] font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              {this.state.loading ? "Loggin In..." : "Login to your account"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
