import React, { useState,useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Moment from 'react-moment';
import { storage } from '../firebase/firebase';
import { ref, deleteObject } from "firebase/storage";

import axios from '../axios'
const CoupnsCard = (props) => {

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
    const initialText = 'COPY';
    const [copySuccess, setCopySuccess] = useState(initialText);
    const inputRef = useRef(null);

    function copyToClipboard(e) {
        inputRef.current.select();
        document.execCommand('COPY');
        e.target.focus();
        setCopySuccess('Copied!');
        setTimeout(() => {
            setCopySuccess(initialText);
        }, 5000);
    };

    const deleteCoupenHandler = (id) => {
        setLoading(true)
        // removing picture of offer from firebase storage before deleting offer 
        let fileRef = ref(storage, props.img);
        deleteObject(fileRef)
        .then(() => {})
        .catch((err) => {
            console.log(err);            
        });

        // removing offer object from firebase
        axios.delete(`/coupens/${id}.json`)        
        .then(()=>{
            props.success("Coupen removed")
            setLoading(false)
            props.refresh()
        })
        .catch(e=>{
            console.log(e)
            setLoading(false)
        })

    }


    return (
        <>

            <div class=" m-2 bg-[#FFF5F9] rounded-lg  shadow-sm  hover:bg-[#FACFE0] p-5 card " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className=' relative '>
                    <div className={ishovering ? 'absolute -top-5 -right-5 ' : 'hidden'}>
                        <button onClick={()=>deleteCoupenHandler(props.id)} ><CloseIcon className='m-2' /></button>
                    </div>
                </div>
                <div class="main">
                    <div class="co-img rounded-full border border-[#f5aac8] bg-[#f5aac8] ">
                        <img
                            src={props.img}
                            alt=""                            
                        />
                    </div>
                    <div class="vertical"></div>
                    <div class="font-Poppins">
                        <h2>{props.title}</h2>
                        <h1>{props.disc}% <span>Coupon</span></h1>
                        <p> Valid till {" "} 
                             <Moment format="D MMM YYYY" withTitle>
                                {props.date}
                            </Moment>
                        </p>
                    </div>
                </div>
                <div class=" flex justify-end mt-2">
                    <input ref={inputRef} type="text" className="bg-white mr-2 outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  text-sm rounded-lg w-full block p-2.5" value={props.promo} />
                    <button onClick={copyToClipboard} class="copybtn text-white bg-[#D27095] focus:ring-4 focus:outline-none focus:ring-[#FACFE0] font-medium rounded-lg text-sm px-5 py-2.5 text-center">{copySuccess}</button>
                </div>
            </div>




            {/* <div className={!deleteModal ? 'hidden':"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center font-Poppins"}>
                    <div className="bg-white p-2 rounded w-4/12">                        
                        <div class="flex flex-col items-center pb-10 text-colortxt text-center">                                                    
                            <h5 class="mb-1 text-xl font-medium mt-3">Are you sure you want to delete {props.title}?</h5>   
                            <div className='d-flex'>
                                <button onClick={() => deleteCoupenHandler(props.id)} disabled={loading} className="text-red-600 bg-white mt-7  font-medium rounded-lg border border-red-600 text-sm px-4 py-2 ml-2 ">{loading ? "Deleting..." : "Yes Delete"}</button>
                                <button onClick={deleteModalToggler} disabled={loading} class="text-red-700 bg-white  border border-red-700 font-medium rounded-lg text-sm px-5 ml-3 py-2.5  mb-2">Discard</button> 
                            </div>         
                        </div>                            
                    </div>
                </div>   */}
        </>
    );
}

export default CoupnsCard;
