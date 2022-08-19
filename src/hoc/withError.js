import React, { Component } from 'react'
import Auxilary from './Auxilary'
import noInternet from '../Components/assets/internet-error.png' 

export const withError = (WrappedComponent, axios) => {    
    return class extends Component{
        state = {
            error: null
        }
        componentDidMount(){
           this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(null, error=>{
                this.setState({
                    error: error
                })
            })
        }     
        
        // componentWillUnmount(){
        //     axios.interceptors.request.eject(this.reqInterceptor)
        //     axios.interceptors.response.eject(this.resInterceptor)
        // }
        render(){
            return(
                <Auxilary>
                    <div className={!this.state.error ? 'hidden':"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center font-Poppins"}>
                        <div className="bg-white p-2 rounded w-4/12">                        
                            <div class="flex flex-col items-center pb-10 text-colortxt text-center">                                                                                
                                <img src={noInternet} style={{width: "200px", height: "150px", borderRadius: "50%"}}></img>
                                <h3 class="text-2xl mt-3">{this.state.error ? this.state.error.message : "SOMETHING WENT WRONG"}</h3>                            
                            </div>                            
                        </div>
                    </div>    
                    <WrappedComponent {...this.props}/>
            </Auxilary>
            )
        }
    }
}
