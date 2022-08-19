import React, { Component, useState } from 'react';
import './Coupon.css'
import CoupnsCard from './CoupnsCard';
import CoupnsModal from './CoupnsModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader/Loader';
import noProducts from './assets/no-products.gif';
import axios from '../axios'
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


class Coupons extends Component {
     
    state = {
        open: false,
        coupens: null
    }

     // UTILITY EVENT CATCHERS 
    onSuccess = (msg) => toast.success(msg);
    onError = (msg) => toast.error(msg);


    modalToggler = () => {
        this.setState({
            open: !this.state.open
        })
    }
    
    loadData = () => {
        axios.get('/coupens.json')
        .then(res => {
            if(res.data !== null){  
                let keys = Object.keys(res.data)
                const updatedCoupens = keys.map(key => {
                    return {
                        key, ...res.data[key],
                    }
                })
                this.setState({
                    coupens: updatedCoupens
                })
            }
            else{
                this.setState({
                    coupens: []
                })
            }  
            this.setState({
                loading: false
            })                        
        })
        .catch(e=>{
            this.setState({
                loading: false
            })
        })
    }


    componentDidMount(){
        this.setState({
            loading: true
        })
        this.loadData()
    }

    componentDidUpdate(_, prevState){
        if(JSON.stringify(this.state) !== JSON.stringify(prevState)){
            this.loadData()
        }
    }


    render(){

        let pageContent = this.state.loading ? <Loader /> : null 
        if(this.state.coupens){
            if(this.state.coupens.length > 0){
                pageContent = (                    
                    <div className=' grid grid-rows-2  grid-cols-2 justify-items-center  p-10'>                                          
                        { this.state.coupens.map((val, ind) => {
                                const a = val.img
    
                                return <CoupnsCard
                                    success={this.onSuccess}
                                    error={this.onError}
                                    refresh = {this.loadData}
                                    key={val.key}
                                    id={val.key}
                                    title={val.title}
                                    date={val.validTill}
                                    img={val.imgURL}
                                    promo={val.promoCode}
                                    disc={val.discountPtg}
                                />
                            })}
                    </div>                    
                )
            }else{
                pageContent = (
                    <div class="d-flex justify-center text-center">
                        <img src={noProducts} style={{width: "400px", height: "300px", borderRadius: "50%", marginLeft: "33%"}}></img>
                        <h1 class="text-3xl mt-3">No coupens found, Start adding coupens</h1>
                    </div>
                )
            }
        }
        return (
            <>    
                <ToastContainer />
                <div className="font-Poppins ">
                    <label className="flex p-8 text-3xl font-semibold">
                    Coupons
                    </label>
                    <hr />
                    <div className="flex justify-end">
                        <button onClick={this.modalToggler} type="button" class="text-[#2E2E2E] bg-[#F27AAC]  font-medium rounded-lg text-sm px-3 py-2  space-x-1 m-5 mr-10 " ><AddCircleOutlineIcon /><label>Add new</label></button>
    
                        {this.state.open && <CoupnsModal
                            close={this.modalToggler}
                        />}
                    </div>
                    </div>
                    
                    {pageContent}

                </>
                );
    }

   
}

export default Coupons;
