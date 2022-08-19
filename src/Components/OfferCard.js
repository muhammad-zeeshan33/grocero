import React, { useEffect, useState } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Auxilary from '../hoc/Auxilary';
import { storage } from '../firebase/firebase';
import { ref, deleteObject } from "firebase/storage";

import axios from '../axios'



const OfferCard = (props) => {

    const [ishovering, setishovering] = useState(false)
    const [deleteModal, setDeleteModel] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleMouseEnter = () => {
        setishovering(true)
    }

    const deleteModalToggler = () => {
        setDeleteModel(!deleteModal)
    }
    

    const handleMouseLeave = () => {
        setishovering(false)
    }

    const deleteOfferHandler = (id) => {
        setLoading(true)
        // removing picture of offer from firebase storage before deleting offer 
        let fileRef = ref(storage, props.img);
        deleteObject(fileRef)
        .then(() => {})
        .catch((err) => {
            console.log(err);            
        });

        // removing offer object from firebase
        axios.delete(`/offers/${id}.json`)        
        .then(()=>{
            props.success("Offer removed")
            setLoading(false)
        })
        .catch(e=>{
            console.log(e)
            setLoading(false)
        })

    }

    return (
        <Auxilary>                      
            <div className='flex flex-col items-center justify-center m-3 p-2 bg-[#FFF5F9] rounded-lg border shadow-md  hover:bg-[#ffe9f2] ' >
                <div className=' ' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                    <div className=' relative '>
                    

                        <div className={ishovering ? 'absolute top-0 right-0 ' : 'hidden'}>
                            <button onClick={deleteModalToggler} ><CancelRoundedIcon className='' /></button>
                        </div>
                    </div>
                    <div class="flex flex-col items-center md:flex-row md:max-w-xl font-Poppins text-[#D27095]">
                        <div class="flex flex-col justify-between pl-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold  ">{props.title}</h5>
                            <p class="font-normal "><h5 class="inline-flex mb-2 text-4xl font-bold ">{props.price}%</h5> {props.type} </p>
                            <h5 class="text-2xl font-bold tracking-tight ">Discount</h5>
                        </div>
                        <img src={props.img} class="object-cover m-2  " alt="" />
                    </div>
                </div>
            
            </div>

            <div className={!deleteModal ? 'hidden':"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center font-Poppins"}>
                    <div className="bg-white p-2 rounded w-4/12">                        
                        <div class="flex flex-col items-center pb-10 text-colortxt text-center">                                                    
                            <h5 class="mb-1 text-xl font-medium mt-3">Are you sure you want to delete {props.title}?</h5>   
                            <div className='d-flex'>
                                <button onClick={() => deleteOfferHandler(props.id)} disabled={loading} className="text-red-600 bg-white mt-7  font-medium rounded-lg border border-red-600 text-sm px-4 py-2 ml-2 ">{loading ? "Deleting..." : "Yes Delete"}</button>
                                <button onClick={deleteModalToggler} disabled={loading} class="text-red-700 bg-white  border border-red-700 font-medium rounded-lg text-sm px-5 ml-3 py-2.5  mb-2">Discard</button> 
                            </div>         
                        </div>                            
                    </div>
                </div>    
        </Auxilary>

    );
}


export default OfferCard;
