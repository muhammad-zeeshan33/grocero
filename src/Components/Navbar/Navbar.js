import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import Category from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import Store from "@mui/icons-material/Store";
import { Group, AllInbox, PeopleOutline } from "@mui/icons-material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import "./Navbar.css";
import logo from "../../assets/0.png";
import authContext from "../../contexts/authContext";

function Navbar() {
  const loggedin = localStorage.getItem("auth");

  const auth = useContext(authContext);

  return (
    <>
      <div className='flex flex-col items-center md:items-start text-[#fff] bg-[#333]'>
        <div className='  w-[300px] text-[#fff] bg-[#333]  h-screen '>
          <div
            className='flex flex-col justify-center items-center'
            style={{
              borderBottom: "1px solid #66c934",
              paddingBottom: "10px",
              marginBottom: "50px",
              boxShadow: "0.5px 0.5px 15px #66c934",
            }}
          >
            <img
              src={require("../../assets/logo.png")}
              style={{ width: 50, height: 50 }}
              alt='logo'
            />
            <span style={{ fontSize: "15px", color: "#66c934" }}>
              {auth.role == "shopOwner"
                ? "GROCERO SHOP ADMIN"
                : "GROCERO ADMIN"}
            </span>
          </div>

          <ul className=' my-2 text-xl font-Poppins text-[#fff] font-medium '>
            <div className='flex flex-col ml-2'>
              {auth.role == "admin" ? (
                <>
                  <NavLink
                    to='/Dashboard'
                    className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'
                  >
                    <DashboardIcon className='mt-4' />
                    <li>Dashboard</li>{" "}
                  </NavLink>
                  <NavLink
                    to='/User'
                    className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'
                  >
                    <Group className='mt-4' />
                    <li>Sellers </li>
                  </NavLink>
                  <NavLink
                    to='/Category'
                    className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'
                  >
                    <Category className='mt-4' /> <li>Categories</li>
                  </NavLink>
                  <NavLink
                    to='/Offers'
                    className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'
                  >
                    <LocalOfferIcon className='mt-4' /> <li>Offers</li>
                  </NavLink>
                  <NavLink
                    to='/Orders'
                    className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'
                  >
                    <AllInbox className='mt-4' /> <li>Orders</li>
                  </NavLink>
                  <NavLink
                    to='/Customers'
                    className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'
                  >
                    <PeopleOutline className='mt-4' /> <li>Customers</li>
                  </NavLink>
                  <NavLink
                    to='/Shops'
                    className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'
                  >
                    <Store className='mt-4' /> <li>Shops</li>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to='/Shop'
                    className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'
                  >
                    <Store className='mt-4' /> <li>Shop Details</li>
                  </NavLink>
                  <NavLink
                    to='/Products'
                    className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'
                  >
                    <ProductionQuantityLimitsIcon className='mt-4' />{" "}
                    <li>Products</li>
                  </NavLink>

                  <NavLink
                    to='/Coupons'
                    className='flex  mr-4 pb-3 rounded-md px-3 space-x-4 space-y-4'
                  >
                    <PriceChangeIcon className='mt-4' /> <li>Coupons</li>
                  </NavLink>
                </>
              )}
            </div>
            <a href='/'>
              <button
                type='button'
                onClick={() => localStorage.removeItem("token")}
                class='text-[#2E2E2E] bg-[#ddd] mt-7  font-medium rounded-lg text-sm px-5 py-2.5 ml-[10px] '
              >
                Logout
              </button>
            </a>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
