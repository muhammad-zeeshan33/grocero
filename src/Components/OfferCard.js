import React, { useState } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import don from '../assets/don.png';



const OfferCard = (props) => {

    const [ishovering, setishovering] = useState(false)
    const handleMouseEnter = () => {
        setishovering(true)
    }

    const handleMouseLeave = () => {
        setishovering(false)
    }

    return (

        <div className='flex flex-col items-center justify-center m-3 p-2 bg-[#FFF5F9] rounded-lg border shadow-md  hover:bg-[#ffe9f2] ' >
            <div className=' ' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                <div className=' relative '>
                 

                    <div className={ishovering ? 'absolute top-0 right-0 ' : 'hidden'}>
                        <button onClick={props.delete} ><CancelRoundedIcon className='' /></button>
                    </div>
                </div>
                <div class="flex flex-col items-center md:flex-row md:max-w-xl font-Poppins text-[#D27095]">
                    <div class="flex flex-col justify-between pl-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold  ">{props.title}</h5>
                        <p class="font-normal "><h5 class="inline-flex mb-2 text-4xl font-bold ">{props.price}%</h5> {props.type} </p>
                        <h5 class="text-2xl font-bold tracking-tight ">Discount</h5>
                    </div>
                    <img src={don} class="object-cover m-2  " alt="" />
                </div>
            </div>
           
        </div>

    );
}


export default OfferCard;
