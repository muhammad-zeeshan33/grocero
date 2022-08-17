import React, { useState,useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import pp from '../assets/pp.png';

const CoupnsCard = (props) => {

    const [ishovering, setishovering] = useState(false)
    const handleMouseEnter = () => {
        setishovering(true)
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



    return (
        <>

            <div class=" m-2 bg-[#FFF5F9] rounded-lg  shadow-sm  hover:bg-[#FACFE0] p-5 card " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className=' relative '>
                    <div className={ishovering ? 'absolute -top-5 -right-5 ' : 'hidden'}>
                        <button ><CloseIcon className='m-2' /></button>
                    </div>
                </div>
                <div class="main">
                    <div class="co-img rounded-full border border-[#f5aac8] bg-[#f5aac8] ">
                        <img
                            src={pp}
                            alt="Product"
                        />
                    </div>
                    <div class="vertical"></div>
                    <div class="font-Poppins">
                        <h2>{props.title}</h2>
                        <h1>{props.disc}% <span>Coupon</span></h1>
                        <p>Valid till {props.date.day} {props.date.month} {props.date.year}</p>
                    </div>
                </div>
                <div class=" flex justify-end mt-2">
                    <input ref={inputRef} type="text" className="bg-white mr-2 outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  text-sm rounded-lg w-full block p-2.5" value='GO FREE ' />
                    <button onClick={copyToClipboard} class="copybtn text-white bg-[#D27095] focus:ring-4 focus:outline-none focus:ring-[#FACFE0] font-medium rounded-lg text-sm px-5 py-2.5 text-center">{copySuccess}</button>
                </div>
            </div>

        </>
    );
}

export default CoupnsCard;
