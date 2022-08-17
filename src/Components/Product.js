/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Product_display from "./Product_display";

export default function Product() {

    const products = [
        {
            id: 0,
            name: 'Cloths',
            desc: 'The Apple iPhone XS is available in 3 colors with 64GB memory. Shoot amazing videos',
            price: '$1050',
            img: '1'

        },
        {
            id: 1,
            name: 'Dounts',
            desc: 'Samsung is the best phone avalible in market. Shoot amazing videos',
            price: '$850',
            img: '2'

        },
        {
            id: 2,
            name: 'Tea Cups',
            desc: 'Redmi comes with 8gb ram  with 2 slots for sim. Shoot amazing videos',
            price: '$450',
            img: '3'

        }
    ]

    const [model, setmodel] = useState(false)


    const handleclick = (a) => {
        setmodel(!model)
        console.log('clicked')
        console.log(a)



    }
    return (
        <>
            <div className="font-Poppins ">
                <label className="flex p-8 text-3xl font-semibold">
                    Products
                </label>
                <hr />
                <div className="flex justify-end">
                    <button onClick={handleclick} type="button" class="text-[#2E2E2E] bg-[#F27AAC]  font-medium rounded-lg text-sm px-3 py-2  space-x-1 m-5 mr-10 " ><AddCircleOutlineIcon /><label>Add new</label></button>
                </div>
                <div className="grid   grid-cols-3  ">
                    {


                        products.map((val, id) => {

                            const a = val.img
                            return <Product_display
                                id={val.id}
                                name={val.name}
                                desc={val.desc}
                                price={val.price}
                                img={require('./profile/p' + a + '.png')}

                            />
                        })
                    }</div>


            </div>
   
                <div className={!model ? 'hidden':"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center font-Poppins"}>
                    <div className="bg-[#FFF5F9] p-2 rounded w-4/12">

                        <div class="flex justify-between items-start p-4 rounded-t border-b ">
                            <h3 class="text-2xl font-semibold text-gray-900 ">
                                Add Product
                            </h3>
                            <button type="button" onClick={handleclick} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Close modal</span>
                            </button>

                        </div>
                        <div className='flex space-x-5'>
                            <div className='flex flex-col space-y-8 mt-2 text-colortxt '>
                                <label>Name :</label>
                                <label>Price :</label>
                                <label>Description :</label>


                            </div>
                            <div className='flex flex-col space-y-2 mt-2 text- text-sm'>
                                <input className="bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" />
                                <input className="bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" />

                            </div>

                        </div>
                        <textarea className="bg-white mt-3 outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full h-[200px] p-2.5" />
                        <div className="mt-5 mb-5 flex">
                            <label for="myfile" className="">Select an img :</label>
                            <input type="file" id="myfile" name="myfile" className="ml-2" />

                        </div>
                        <hr />
                        <div className='flex justify-around mt-2'>
                            <button type="button" class="text-[#2E2E2E] bg-[#F27AAC]  border  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Save</button>
                            <button type="button" class="text-red-700 bg-white  border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Discard</button>
                        </div>

                    </div>
                </div>
            





        </>
    );
}
