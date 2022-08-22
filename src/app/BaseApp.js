import React, {useContext, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Dashboard from '../Components/Dashboard';
import Product from '../Components/Product';
import Offers from '../Components/Offers'
import Coupons from '../Components/Coupons'
import Users from '../Components/User';
import Category from '../Components/Category';
import Login from '../Components/Auth/Login';
import Auxilary from '../hoc/Auxilary';
import authContext from '../contexts/authContext';
import Forgetpassword from '../Components/Forgetpassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const BaseApp = (props) => {

  const auth = useContext(authContext)

//   const  onSuccess = (msg) => toast.success(msg);  

//   if(auth.success){
//     onSuccess("Login Successfull")
//     }

  let pageContent = (
    <Router>
      
      <Routes>
        <Route exact path='/forget-password' element={<Forgetpassword />} />
        <Route exact path='/' element={<Login />}/>
      </Routes>
    </Router>
  )
  if(auth.authenticated){
    pageContent = (
        <div className='flex'>
        <Router>
            <Navbar />        
            <div className='w-full'>                      
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route exact path='/Dashboard' element={<Dashboard />} />
                    <Route exact path='/Products' element={<Product />} />
                    <Route exact path='/Category' element={<Category />} />
                    <Route exact path='/Offers' element={<Offers />} />
                    <Route exact path='/Coupons' element={<Coupons />} />
                    <Route exact path='/User' element={<Users />} />
                </Routes>
            </div>
        </Router>

      </div>
    )
  }
  return (
    <Auxilary>
        <ToastContainer />
        {pageContent}
    </Auxilary>
  )
}

export default BaseApp