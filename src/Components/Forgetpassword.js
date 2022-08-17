import React from 'react';
import { TextField } from '@mui/material';

const Forgetpassword = () => {
    return (
        <div>
            <div className='flex justify-center mt-[150px]'>

                <div className="w-3/4 p-4 max-w-sm bg-white mr-0 rounded-lg border border-gray-200 shadow-lg shadow-gray-700 sm:p-6 lg:p-8 font-Poppins">
                    <form className="space-y-6 " action="#">
                        <h5 className="text-xl font-medium text-gray-900">Forget Password</h5>
                        <div className='mb-5'>
                            <TextField color='info' className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' id="outlined-basic" label="Email" variant="outlined" placeholder='Your Email' />
                            <p className='mt-3 mb-3 text-start text-gray-500 text-sm'>Please enter a valid email</p>
                            <a href="/" className=" text-md  text-blue-700 hover:underline">Back to Login</a>
                        </div>
                      
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Forgetpassword;
