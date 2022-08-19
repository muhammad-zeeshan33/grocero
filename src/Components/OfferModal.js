import React, {Component} from 'react';
import CheckCircle from "@mui/icons-material/CheckCircle"
import {storage} from '../firebase/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Loader } from './Loader/Loader';
import axios from "../axios"
class OfferModal extends Component {

    initialState = {
        formData: {
            title: "",
            price: "",
            type: "",
            imgURL: ""           
        },
        uploading: false,
        uploaded: false,
        progresspercent: 0,
        loading: false
    }

    state = {
        ...this.initialState
    }

    inputChangeHandler = (e) => {
        const UpdatedformData = {...this.state.formData}
        if(e.target.type == "file"){
            if (!e.target.files[0]) return;
                this.setState({
                    uploading: true
                })        
                const storageRef = ref(storage, `offerImages/${e.target.files[0].name}`);
                const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

                uploadTask.on("state_changed",
                (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);                    
                    this.setState({
                        progresspercent: progress
                    })                    
                },
                (error) => {
                        this.props.error(error.message);
                        this.setState({
                            uploading: false
                        })
                },
                () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {                    
                    UpdatedformData["imgURL"] = downloadURL
                    this.setState({
                        formData: UpdatedformData,
                        uploading: false,
                        uploaded: true
                    })                                                              
                });
                }
            )
        }
        else if(e.target.name == "price"){
            if(e.target.value.length > e.target.maxLength){
                e.target.value = e.target.value.slice(0, e.target.maxLength)
                UpdatedformData[e.target.name] = parseInt(e.target.value.slice(0, e.target.maxLength))
            }else{
                UpdatedformData[e.target.name] = parseInt(e.target.value)
            }
        }
        else{            
            UpdatedformData[e.target.name] = e.target.value
            this.setState({
                formData: UpdatedformData
            })                        
        }
        
    }

    addOfferHandler = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;   

        const data  = {
            ...this.state.formData,
            craetedAt: today 
        }
        axios.post("/offers.json", data)
        .then(() => {            
            this.props.success("Offer added!")
            this.props.close(false)
            this.setState({
                loading: false
            })
        })
        .catch(e=>{
            this.setState({
                loading: false
            })            
        })
        
    }


    componentWillUnmount(){
        this.setState({
            ...this.initialState
        })
    }

    render(){

        // pre render checks 
        let modalContent = (
            <form className="space-y-6" onSubmit={(e) => this.addOfferHandler(e)}>
            <div>
                <input 
                    type="text" 
                    className="bg-white outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0] placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" 
                    placeholder="Tilte" 
                    name="title"
                    onChange={(e) => this.inputChangeHandler(e)}
                    required     
                    />
            </div>
            <div>
                <input 
                    type="number" 
                    className="bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" 
                    placeholder="Discount Percentage (i-e 0-99)" 
                    name="price"
                    maxLength={2}
                    onChange={(e) => this.inputChangeHandler(e)}
                    required />
            </div>
            <div>
                <input 
                    type="file" 
                    className="bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5"                     
                    onChange={(e) => this.inputChangeHandler(e)}                                            
                    required />
            </div>
            {this.state.uploading && <small class="text-blue-400 mb-3">Uploading {this.state.progresspercent}% </small>}
            {this.state.uploaded && <small class="text-blue-400 mb-3"><CheckCircle/> Uploaded  </small>}
            <div>
                <textarea 
                    className='outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]'                                             
                ></textarea>
            </div>
            <div className='flex justify-evenly items-center'>
                <label>Type of Discount:</label>
                <select 
                    className='bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095]  text-sm rounded-lg block w-3/6 p-2.5 ' 
                    placeholder='Type'
                    name="type"
                    onChange={(e) => this.inputChangeHandler(e)}
                    required
                    >
                    <option value=""> --Choose Value --</option>
                    <option value="Flat"> Flat</option>
                    <option value="Upto"> Upto </option>
                </select>
            </div>
            <div >    
            </div>        
            <div className='flex justify-around'>
                <button type="submit" disabled={this.state.uploading} class="text-white bg-[#363740] border  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">{this.state.uploading ? "Waiting for upload..." : "Save"}</button>
                <button type="button" onClick = {() => this.props.close(false)} class="text-red-700 bg-white  border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Discard</button>
            </div>
        </form>
        )

        if(this.state.loading){
            modalContent = (
                <div className="text-center">
                    <Loader />
                    <p className="lead">Proccessing...</p>
                </div>
            )
        }
        return (
            <>
                <div id="authentication-modal" tabindex="-1" className="fixed top-0 right-0 left-0  z-50  items-center justify-center flex h-screen bg-gray-500 bg-opacity-50" aria-modal="true" role="dialog">
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
    
                        <div className="relative bg-[#FFF5F9] rounded-lg shadow-lg ">
                            <button onClick={() => this.props.close(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover: placeholder: rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
        
                            <div className="py-6 px-6 lg:px-8 text-colortxt">
                                <h3 className="mb-4 text-xl font-medium  ">Create Offer</h3>
                                {modalContent}
                            </div>
                            
                        </div>
                    </div>
                </div>
    
            </>
        );
    }
    
}

export default OfferModal;
