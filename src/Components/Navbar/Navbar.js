import React, { } from 'react'
import {NavLink} from 'react-router-dom'
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import Category from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import './Navbar.css'
import logo from '../../assets/0.png';


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
                            <NavLink to='/Dashboard' className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'>
                                <DashboardIcon className='mt-4' /><li  >
                                    Dashboard</li> </NavLink>
                            <NavLink to='/User' className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'>
                                <PersonIcon className='mt-4' /><li >
                                    Users </li>
                            </NavLink>
                            <NavLink to='/Products' className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'>
                                <ProductionQuantityLimitsIcon className='mt-4' /> <li >
                                    Products</li></NavLink>
                            <NavLink to='/Category' className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'>
                                <Category className='mt-4' /> <li >
                                    Categories</li></NavLink>
                            <NavLink to='/Offers' className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'>
                                <LocalOfferIcon className='mt-4' /> <li >
                                    Offers</li></NavLink>
 
                            <NavLink to='/Coupons' className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'>
                                <PriceChangeIcon className='mt-4' /> <li >
                                    Coupons</li></NavLink>

                        </div>
                        <a href='/'>
                            <button type="button" onClick={()=> localStorage.removeItem("token")} class="text-[#2E2E2E] bg-[#F27AAC] mt-7  font-medium rounded-lg text-sm px-5 py-2.5 ml-[50px] " >Logout</button>
                        </a>
                    </ul>
                </div>
            </div>

        </>

    
    )
}

export default Navbar