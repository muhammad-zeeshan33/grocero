import React, { useState } from 'react';
import OfferCard from './OfferCard';
import Offerdata from './OfferData';
import OfferModal from './OfferModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const Offers = () => {

    const [open, setopen] = useState(false)
    return (

        <>
            <div className="font-Poppins ">
                <label className="flex p-8 text-3xl font-semibold">
                    Offers
                </label>
                <hr />
                <div className="flex justify-end">
                    <button onClick={() => { setopen(true) }} type="button" class="text-[#2E2E2E] bg-[#F27AAC]  font-medium rounded-lg text-sm px-3 py-2  space-x-1 m-5 mr-10 " ><AddCircleOutlineIcon /><label>Add new</label></button>

                    {open && <OfferModal
                        close={setopen}
                    />}
                </div>
            </div>
            <div className='grid grid-cols-2 m-5'>
            {
                Offerdata.map((val, ind) => {
                    const a = val.img
                    return <OfferCard
                        key={ind}
                        id={val.id}
                        title={val.title}
                        price={val.price}
                        type={val.type}
                        img={require('../img/' + a + '-min.jpg')}
                    />
                })
            }
</div>
   

        </>
    );
}

export default Offers;
