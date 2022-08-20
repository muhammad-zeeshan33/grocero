import React, { Component } from 'react'
import AuthContext from '../../contexts/authContext'
class Login extends Component  {   

    state = {
        credentials : {
            email: "",
            password: ""
          },
        loading: false
    }

    static contextType = AuthContext

    login = (e) => {
        e.preventDefault()        
        this.setState({
            loading: true
        })
        // /loggin in  
        console.log(this.state.credentials)       
        this.context.login(this.state.credentials)        
        setTimeout(()=>{
            this.setState({
                loading: false
            })
        }, 2000)
      
    }

    inputChangedHandler = (e) => {
        const updatedCredentials = {...this.state.credentials}        
        updatedCredentials[e.target.name] = e.target.value
        this.setState({
            credentials: updatedCredentials
        })
    }

    render(){
        return (
           
                <div className='flex justify-center mt-[150px]'>
        
                    <div class="w-full p-4 max-w-sm bg-[#FEF5F9] mr-0 rounded-lg border border-gray-200 shadow-lg shadow-gray-700 sm:p-6 lg:p-8 font-Poppins">
                        <form class="space-y-6" onSubmit={(e)=> this.login(e)}>
                            <h5 class="text-xl text-center font-medium text-gray-900">WELCOME BACK</h5>
                            <p className='text-center'>Login to continue</p>
                            <div>
                                <input 
                                    type="email" 
                                    className="bg-white outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0] placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" 
                                    placeholder="Email" 
                                    name="email"
                                    onChange={(e) => this.inputChangedHandler(e)}
                                    required     
                                    />                                        
                            </div>
                            <div>
                                <input 
                                    type="password" 
                                    className="bg-white outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0] placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" 
                                    placeholder="Password" 
                                    name="password"
                                    onChange={(e) => this.inputChangedHandler(e)}
                                    required     
                                    />                                
                            </div>
                            <p className="text-red-700">{this.context.error && "Email or password is wrong"}</p>                            
                            <div class="flex items-start">
        
                                <a href="/Forgetpassword" class=" text-md text-blue-700 hover:underline dark:text-blue-500">Forget Password</a>
                            </div>
                            <button                                 
                                type="submit" 
                                class="w-full text-white bg-[#F27AAC] hover:bg-[FEF5F9] focus:ring-4 focus:outline-none focus:ring-[#F27AAC] font-medium rounded-lg text-sm px-5 py-2.5 text-center">{this.state.loading ? "Loggin In..." : "Login to your account"}</button>                            
                        </form>
                    </div>                
                </div>              
          )
    }  
}

export default Login
