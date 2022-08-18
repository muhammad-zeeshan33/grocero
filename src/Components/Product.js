/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Product_display from "./Product_display";
import CheckCircle from '@mui/icons-material/CheckCircle'
import {storage} from '../firebase/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "./Loader/Loader";
import noProducts from './assets/no-products.gif' 

import { withError } from "../hoc/withError";
import axios from '../axios'


function Product() {
    // hooks
    const [img, setImg] = useState(null)
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [uploading, setUploading] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [products, setProducts] = useState(null)
    const [categories, setCategories] = useState(null)
    const [loading, setLoading] = useState(false)
    const [model, setmodel] = useState(false)

    const [formData, setFromData] = useState({
        category: "",
        name: "",
        price: 0,
        description: "",
    })

    // UTILITY EVENT CATCHERS 
    const onSuccess = (msg) => toast.success(msg);
    const onError = (msg) => toast.error(msg);


    useEffect(()=>{        
        // Getting categories     
        setLoading(true)  
        axios.get('/categories.json')
        .then(res=>{            
            if(res.data !== null){  
                let keys = Object.keys(res.data)
                const updatedCategories = keys.map(key => {
                    return {
                        key, ...res.data[key],
                    }
                })
                setCategories(updatedCategories)
            }
            else{
                setCategories([])
            }                          
        })
        .catch(e=>{})

        // Getting All products from firebase
        loadData()    
            
      
    },[])


    // LOADING DATA 
    const loadData = () => {
        axios.get('/products.json')
        .then(res=>{

            if(res.data !== null){  
                let keys = Object.keys(res.data)
                const updatedProducts = keys.map(key => {
                    return {
                        key, ...res.data[key],
                    }
                })
                setProducts(updatedProducts)
            }else{
                setProducts([])                
            }
            setLoading(false)  
        }).catch(e=>{
            setLoading(false)  
        })
    }

    // INPUT CHANGE HANDLER
    const inputChangeHandler = (e) => {        
        const updatedFormData = {...formData}
        if(e.target.name == "price"){
            updatedFormData[e.target.name] = parseInt(e.target.value)    
        }else{
            updatedFormData[e.target.name] = e.target.value
        }
        setFromData(updatedFormData)
    }



    // uploading image to firebase
    const imgChangeHandler = (e) =>{            
        setImg(e.target.files[0]);
        if (!e.target.files[0]) return;
        setUploading(true)        
        const storageRef = ref(storage, `productImages/${e.target.files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

        uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(progress)
            setProgresspercent(progress)
        },
        (error) => {
          onError(error.message);
          setUploading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL)   
            console.log(downloadURL)         
            setUploading(false)
            setUploaded(true)
          });
        }
      );
    }
    
    // ADD PRODUCT REQUEST HANDLER
    const submitFormHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        // Creating current date stamp
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;      
        
        // Forming Data for post request
        const data = {
            ...formData,
            imgURL: imgUrl,
            craetedAt: today 
        }
        
        // Sending post request to firebase
        axios.post("/products.json", data)
        .then(res=>{
            loadData()
            setLoading(false)
            setmodel(!model)            
            onSuccess("Product added!")    
            // Clean up add product form
            let data = {
                name: "",
                category: "",
                price: 0,
                description: ""
            }        
            setFromData(data)
            setUploaded(false)
        })
        .catch(e=>{
            onError(e.message)
            setmodel(!model)
            setLoading(false)
        })
        
    }
  
    // MODAL TOGGLER
    const handleclick = (a) => {
        setmodel(!model)
        console.log('clicked')
        console.log(a)

    }
    
    // Pre render checks 
    let options = null
    if(categories){
        options = categories.map(ctg=>(
            <option value={ctg.name} key={ctg.key}>{ctg.name}</option>
        ))
    }



    // Default Modal Content
    let modalContent =  (
        <form onSubmit={(e) => submitFormHandler(e)}>
            <div className='flex  items-center'>
                <label>Category:</label>
                <select 
                    style={{width: "185px", marginLeft: "40px"}} 
                    className='bg-white ml-5  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095]  text-sm rounded-lg block w-3/6 p-2.5 ' 
                    placeholder='Category' 
                    required
                    name="category"
                    onChange={(e) => inputChangeHandler(e)}
                    >
                    <option value=""> --Choose Category--</option>
                    {options}
                </select>
            </div>
            <div className='flex space-x-5'>                            
                <div className='flex flex-col space-y-8 mt-2 text-colortxt '>
                    <label>Name :</label>
                    <label>Price :</label>
                    <label>Description :</label>

                </div>
                <div className='flex flex-col space-y-2 mt-2 text- text-sm'>
                    <input 
                        className="bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5"  
                        required
                        name="name"
                        value={formData.name}
                        onChange={(e) => inputChangeHandler(e)}     
                        />
                    <input  
                        type="number"
                        className="bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" 
                        required
                        name="price"
                        value={formData.price}
                        onChange={(e) => inputChangeHandler(e)}     
                        />

                </div>

            </div>
            <textarea 
                className="bg-white mt-3 outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full h-[200px] p-2.5" 
                required
                name="description"
                value={formData.description}
                onChange={(e) => inputChangeHandler(e)}     
                />
            <div className="mt-5 mb-2 flex">
                <label for="myfile" className="">Select an img</label>
                <input type="file" onChange={(e) => imgChangeHandler(e)} id="myfile" name="myfile" className="ml-2" required/>                        
            </div>
            {uploading && <small class="text-blue-400 mb-3">Uploading {progresspercent}% </small>}
            {uploaded && <small class="text-blue-400 mb-3"><CheckCircle/> Uploaded  </small>}
            <hr />
            <div className='flex justify-around mt-2'>
                <button type="submit" disabled={uploading} class="text-[#2E2E2E] bg-[#F27AAC]  border  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">{uploading ? "Waiting for upload..." : "Save"}</button>
                <button type="button" onClick={handleclick} class="text-red-700 bg-white  border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Discard</button>
            </div>
        </form>
    )

    if(loading){
          modalContent = (
            <div className="text-center">
                <Loader />
                <p className="lead">Proccessing...</p>
            </div>
          )

    }


    let productList = loading ? <Loader /> : null
    // let productList = <Loader />    
    if(products){        
            if(products.length > 0){
                productList = (  
                    <div className="grid grid-cols-3  ">
                        {
                            products.map(val => {                        
                                return <Product_display
                                    // unitility props for updating product
                                    error = {onError}
                                    success = {onSuccess}                                                        
                                    options = {options}                            
                                    loadData = {loadData}
                                    // data props displaying product info
                                    key={val.key}
                                    id={val.key}
                                    category = {val.category}
                                    name={val.name}
                                    desc={val.description}
                                    price={val.price}
                                    img={val.imgURL}
                                    createdAt = {val.craetedAt}
                                />
                            })
                        }
                    </div>
                )
            }else{
                productList = (
                    <div class="d-flex justify-center text-center">
                        <img src={noProducts} style={{width: "400px", height: "300px", borderRadius: "50%", marginLeft: "33%"}}></img>
                        <h1 class="text-3xl mt-3">No products found, Start Adding Products</h1>
                    </div>
                )
            }
        }
                  

    // RETURNING DEFAULT JSX
    return (
        <>
            <ToastContainer />                
            <div className="font-Poppins overflow-x-hidden overflow-y-hidden">
                <label className="flex p-8 text-3xl font-semibold">
                    Products
                </label>
                <hr />
                <div className="flex justify-end">
                    <button onClick={handleclick} type="button" class="text-[#2E2E2E] bg-[#F27AAC]  font-medium rounded-lg text-sm px-3 py-2  space-x-1 m-5 mr-10 " ><AddCircleOutlineIcon /><label>Add new</label></button>
                </div>
                    {productList}


            </div>
   
                <div className={!model ? 'hidden':"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center font-Poppins"}>
                    <div className="bg-[#FFF5F9] p-2 rounded w-4/12">

                        <div class="flex justify-between items-start p-4 rounded-t border-b ">
                            <h3 class="text-2xl font-semibold text-gray-900 ">
                                Add Product
                            </h3>
                            <button type="button" onClick={handleclick} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Close modal</span>
                            </button>

                        </div>
                        {modalContent}
                    </div>
                        
                </div>            
        </>
    );
}


export default withError(Product, axios)