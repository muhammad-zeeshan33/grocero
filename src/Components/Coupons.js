import React, { useState } from 'react';
import './Coupon.css'
import CoupnsCard from './CoupnsCard';
import CoupnsModal from './CoupnsModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CoupnsData = [
    {

        id: 1,
        title: 'Mcdonals',
        discount: 20,
        date:
        {
            day: 18,
            month: 'July',
            year: 2022,
        },
        promoName: '10TOGO',
        img: 1,



    },
    {

        id: 2,
        title: 'Mcdonals',
        discount: 20,
        date:
        {
            day: 18,
            month: 'July',
            year: 2022,
        },
        promoName: '10TOGO',
        img: 1,



    },
    {

        id: 3,
        title: 'Mcdonals',
        discount: 20,
        date:
        {
            day: 18,
            month: 'July',
            year: 2022,
        },
        promoName: '10TOGO',
        img: 1,



    },
    {

        id: 4,
        title: 'Mcdonals',
        discount: 20,
        date:
        {
            day: 18,
            month: 'July',
            year: 2022,
        },
        promoName: '10TOGO',
        img: 1,



    },
    {

        id: 5,
        title: 'Mcdonals',
        discount: 20,
        date:
        {
            day: 18,
            month: 'July',
            year: 2022,
        },
        promoName: '10TOGO',
        img: 1,



    },
    {

        id: 6,
        title: 'Mcdonals',
        discount: 20,
        date:
        {
            day: 18,
            month: 'July',
            year: 2022,
        },
        promoName: '10TOGO',
        img: 1,



    },
]


const Coupons = () => {

    const [open, setopen] = useState(false)


    return (
        <>

            <div className="font-Poppins ">
                <label className="flex p-8 text-3xl font-semibold">
                Coupons
                </label>
                <hr />
                <div className="flex justify-end">
                    <button onClick={() => { setopen(true) }} type="button" class="text-[#2E2E2E] bg-[#F27AAC]  font-medium rounded-lg text-sm px-3 py-2  space-x-1 m-5 mr-10 " ><AddCircleOutlineIcon /><label>Add new</label></button>

                    {open && <CoupnsModal
                        close={setopen}
                    />}
                </div>
                </div>
                <div className=' grid grid-rows-2  grid-cols-2 justify-items-center  p-10'>
                    {

                        CoupnsData.map((val, ind) => {
                            const a = val.img

                            return <CoupnsCard
                                key={ind}
                                id={val.id}
                                title={val.title}
                                date={val.date}
                                img={require('../img/' + a + '.png')}
                                pm={val.promoName}
                                disc={val.discount}
                            />
                        })

                    }


                </div>
            </>
            );
}

            export default Coupons;
