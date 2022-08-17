import React from 'react'

import Orderdisplay from './Order_display';



function Dashboard() {


    const Orders = [
        {
            id: 1,
            orderno: '2564',
            name: 'Jason Crejza',
            email: '123@gmail.com',
            status: 'Processing'



        },
        {
            id: 2,
            orderno: '2564',
            name: 'Emily Watson',
            email: '123@gmail.com',
            status: 'Intransit'



        },
        {
            id: 3,
            orderno: '1554',
            name: 'Sarah Taylor',
            email: '123@gmail.com',
            status: 'Delivered'


        },
        {
            id: 4,
            orderno: '2584',
            name: 'Jeff Kim ',
            email: '123@gmail.com',
            status: 'Processing'


        },
    ]



    return (
        <>

            <div className='flex flex-col'>
                <div className="  flex gap-10 justify-evenly p-[40px] font-Poppins ">
                    <div className="bg-white rounded p-5 flex items-start shadow w-full ">
                        <div className="text-gray-700 ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dashboard ml-2" width={32} height={32} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx={12} cy={13} r={2} />
                                <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                                <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                            </svg>
                        </div>
                        <div className="pl-3 pr-10 mt-1">
                            <h3 className="font-medium leading-4 text-gray-800  text-2xl">Total Orders</h3>
                            <div className="flex items-end mt-4">
                                <h2 className="text-indigo-700 dark:text-indigo-600 text-3xl leading-normal font-medium">2,330</h2>

                            </div>
                            <div className="flex items-center mt-5">
                                <div className="text-green-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-up" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="3 17 9 11 13 15 21 7" />
                                        <polyline points="14 7 21 7 21 14" />
                                    </svg>
                                </div>
                                <p className="text-green-400 text-lg tracking-wide font-bold leading-normal pl-1">7.2% Increase</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white  rounded p-5 flex items-start shadow w-full">
                        <div className="text-gray-700 ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dashboard" width={32} height={32} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx={12} cy={13} r={2} />
                                <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                                <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                            </svg>
                        </div>
                        <div className="pl-3 pr-10 mt-1">
                            <h3 className="font-medium leading-4 text-gray-800 text-2xl">Delivered</h3>
                            <div className="flex items-end mt-4">
                                <h2 className="text-indigo-700 dark:text-indigo-600 text-3xl leading-normal font-medium">1,330</h2>
                                <p className="ml-2 mb-1 text-base text-gray-600 ">from 2,330</p>
                            </div>
                            <div className="flex items-center mt-5">
                                <div className="text-red-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-down" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="3 7 9 13 13 9 21 17" />
                                        <polyline points="21 10 21 17 14 17" />
                                    </svg>
                                </div>
                                <p className="text-red-400 text-lg  tracking-wide font-bold leading-normal pl-1">3.5% Decrease</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white  rounded p-5 flex items-start shadow w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dashboard text-gray-700 " width={32} height={32} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx={12} cy={13} r={2} />
                            <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                            <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                        </svg>
                        <div className="pl-3 pr-10 mt-1">
                            <h3 className="font-medium leading-4 text-gray-800 text-2xl">Processing</h3>
                            <div className="flex items-end mt-4">
                                <h2 className="text-indigo-700 dark:text-indigo-600 text-3xl leading-normal font-medium">500</h2>
                                <p className="ml-2 mb-1 text-base text-gray-600 ">from 1000</p>
                            </div>
                            <div className="flex items-center mt-5">
                                <div className="text-green-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-up" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="3 17 9 11 13 15 21 7" />
                                        <polyline points="14 7 21 7 21 14" />
                                    </svg>
                                </div>
                                <p className="text-green-400 text-lg tracking-wide font-bold leading-normal pl-1">7.2% Increase</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto relative font-Poppins m-10 rounded-[8px] shadow-x">
                    <table class="w-full text-sm text-left text-gray-500 ">
                        <thead class="text-lg text-colortxt uppercase bg-colornav ">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Order No
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    email
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Status
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Details
                                </th>
                            </tr>
                        </thead>


                        {
                            Orders.map((val, id) => {

                                return <Orderdisplay
                                    id={val.id}
                                    name={val.name}
                                    email={val.email}
                                    orderno={val.orderno}

                                    status={val.status}





                                />
                            })
                        }
                    </table>

                </div>
            </div>

        </>
    )
}

export default Dashboard

