import React, { useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download';
import order from '../assets/order.png';

function Orderdisplay(props) {

    let color = ''
    if (props.status === 'Processing') {
        color = 'bg-[#f79b9b]'
    }
    if (props.status === 'Intransit') {
        color = 'bg-[#f2e18e]'
    }
    if (props.status === 'Delivered') {
        color = 'bg-[#a6c689]'
    }
    const [model, setmodel] = useState(false)


    const handleclick = (a) => {
        setmodel(!model)
        console.log('clicked')
        console.log(a)



    }


    return (
        <>

            <tbody>
                <tr class="bg-white border-b  text-colortxt">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                        {props.name}
                    </th>
                    <td class="py-4 px-6">
                        {props.orderno}
                    </td>
                    <td class="py-4 px-6">
                        {props.email}
                    </td>
                    <td class="py-4 px-6 ">
                        <button type="button"
                            className={` rounded-[100px] bg-{{color}}  px-4 py-1  ${color}`}
                        >{props.status}</button>
                    </td>
                    <td>
                        <button onClick={() => handleclick(props.email)} href='disabled' class="ml-[20px]  bg-white  border border-[#F27AAC] rounded-lg px-3 py-1 mr-2 mb-2 ">
                            View
                        </button>
                    </td>



                </tr>

            </tbody>

            <div className={model ? '' : 'hidden'}>
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center font-Poppins">
                    
                    <div className="bg-[#FFF5F9] p-2 rounded w-4/12">
                        

                        <div class="flex justify-between items-start p-4 rounded-t border-b ">
                            <h3 class="text-2xl font-semibold text-gray-900 ">
                                Order Details
                            </h3>
                            <button type="button" onClick={handleclick} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Close modal</span>
                            </button>

                        </div>
                        <div className='flex justify-center mt-2'>
                            <img src={order} alt='orderlogo'/>
                        </div>
                        <div className='flex justify-evenly'>
                            <div className='flex space-x-2  mt-2 text-colortxt  bg-white text-lg  rounded-lg  py-4 px-6 rounded-t border-b '>
                                <label className='font-bold'>Name: </label>
                                <label className='font-medium'>{props.name}</label>
                            </div>
                            <div className='flex space-x-2  mt-2 text-colortxt  bg-white text-lg  rounded-lg  py-4 px-6 rounded-t border-b '>
                                <label className='font-bold'>Order No: </label>
                                <label className='font-medium'>{props.orderno}</label>
                            </div>

                        </div>
                        <div className='flex flex-col bg-white py-4 px-6 rounded border mx-4 my-2  text-colortxt '>
                            <label className='font-bold text-lg'>Description:</label>
                        <p className='mt-2 font-normal'>Hi All: For some of our products, we have lengthy negotiations with the customers (from few weeks to a month), for pricing and or any assoicated terms and conditions before the Customer raises a purchase order for us. As most of them are configurable products.</p>
                        </div>
                        <hr />
                        <div className='m-3 flex space-x-5 text-black'>
                            <div>
                                <button type="button" class="text-[#2E2E2E] bg-[#F27AAC]  font-medium rounded-xl text-sm px-5 py-2.5 space-x-2  " ><DownloadIcon /><label>Videos</label></button></div>
                            <div>

                                <button type="button" class="text-[#2E2E2E] bg-[#F27AAC]  font-medium rounded-xl text-sm px-5 py-2.5  space-x-2 " ><DownloadIcon /><label>Images</label></button></div>
                        </div>
                    </div>
                </div>

            </div>

        </>


    )
}

export default Orderdisplay