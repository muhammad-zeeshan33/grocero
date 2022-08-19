import React, { } from 'react'

import PriceChangeIcon from '@mui/icons-material/PriceChange';
import Category from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import logo from '../assets/0.png';
function Navbar() {

    const loggedin = localStorage.getItem('auth')

    // const auth = getAuth(app);

    return (
        
        <>
   
            <div className='flex flex-col items-center md:items-start bg-colornav'>
                <div className='  w-[300px]   h-screen'>
                    <div className='flex justify-center mt-10'>
                    <img src={logo} alt='logo'/>
                    </div>


                    <ul className=' my-2 text-xl font-Poppins text-[#2E2E2E] font-medium '>
                        <div className='flex flex-col ml-10' >
                            <a href='/Dashboard' className='flex space-x-4 space-y-7 '>
                                <DashboardIcon className='mt-8' /><li  >
                                    Dashboard</li> </a>
                            <a href='/User' className='flex space-x-4 space-y-7'>
                                <PersonIcon className='mt-8' /><li >
                                    Users </li>
                            </a>
                            <a href='/Products' className='flex space-x-4 space-y-7'>
                                <ProductionQuantityLimitsIcon className='mt-8' /> <li >
                                    Products</li></a>
                            <a href='/Category' className='flex space-x-4 space-y-7'>
                                <Category className='mt-8' /> <li >
                                    Categories</li></a>
                            <a href='/Offers' className='flex space-x-4 space-y-7'>
                                < LocalOfferIcon className='mt-8' /> <li >
                                    Offers</li></a>
 

                            <a href='/Coupons' className='flex space-x-4 space-y-7'>
                                <PriceChangeIcon className='mt-8' /> <li >
                                    Coupons</li></a>

                        </div>
                        <a href='/'>
                            <button type="button" class="text-[#2E2E2E] bg-[#F27AAC] mt-7  font-medium rounded-lg text-sm px-5 py-2.5 ml-[50px] " >Logout</button>
                        </a>
                    </ul>
                </div>


            </div>

        </>

    
    )
}

export default Navbar