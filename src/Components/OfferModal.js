import React from 'react';

const OfferModal = ({close}) => {
    return (
        <>


            <div id="authentication-modal" tabindex="-1" className="fixed top-0 right-0 left-0  z-50  items-center justify-center flex h-screen bg-gray-500 bg-opacity-50" aria-modal="true" role="dialog">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">

                    <div className="relative bg-[#FFF5F9] rounded-lg shadow-lg ">
                        <button onClick={() => close(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover: placeholder: rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>


                        <div className="py-6 px-6 lg:px-8 text-colortxt">
                            <h3 className="mb-4 text-xl font-medium  ">A Offer</h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <input type="text" className="bg-white outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0] placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" placeholder="Tilte" required="" />
                                </div>
                                <div>
                                    <input type="text" className="bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" placeholder="Price " required="" />
                                </div>
                                <div>
                                    <input type="file" className="bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" placeholder="Address " required="" />
                                </div>
                                <div>
                                    <textarea className='outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]' ></textarea>
                                </div>
                                <div className='flex justify-evenly items-center'>
                                    <label>Type of Discount:</label>
                                    <select className='bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095]  text-sm rounded-lg block w-3/6 p-2.5 ' placeholder='Type'>
                                        <option> Flat</option>
                                        <option> Upto </option>
                                    </select>
                                </div>
                                <div >

                                </div>


                                <div className='flex justify-around'>
                                    <button type="button" class="text-white bg-[#363740] border  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Save</button>
                                    <button type="button" class="text-red-700 bg-white  border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Discard</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default OfferModal;
