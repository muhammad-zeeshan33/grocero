import React, { Component } from 'react';
import Auxilary from './hoc/Auxilary';
import AuthContext from './contexts/authContext'
import BaseApp from './app/BaseApp';
import axios from "axios"
class App extends Component {
    
  
  state = {  
    authenticated: false,
    token : null,   
    success: false,
    error: false           
  }
  
  loginHandler = (credentials) => {
    this.setState({
      error: false,      
    })
    // const credentials ={
    //   email, password
    // }
    
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7OGeB3UJunGWYFMM7GrxseZTyimpMgAI", credentials)
    .then(res=>{
      console.log(res)
      this.setState({
        success: true, 
        error: false,       
        authenticated: true,        
        token: "412313124dcasda"
      })

    })
    .catch(err=>{
      this.setState({
        error: true,        
      })
      console.log(err)
    })
    
  }

  

  render(){    

    return (      
      <AuthContext.Provider 
        value={{
            authenticated: this.state.authenticated, 
            token: this.state.token, 
            login: this.loginHandler,
            success: this.state.success,
            error: this.state.error
            }}>
        <Auxilary>
          <BaseApp loading={this.state.login}/>
        </Auxilary>      
      </AuthContext.Provider>
    );
  }
  
}

export default App;
