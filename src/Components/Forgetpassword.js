import React from 'react';
import {Link} from 'react-router-dom'
import { sendPasswordResetEmail , getAuth} from 'firebase/auth';

const Forgetpassword = () => {        
    const auth = getAuth()

    const [email, setEmail] = React.useState("")
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(null)

    const triggerResetEmail = async (e) => {
        e.preventDefault()
        try {
            const res = await sendPasswordResetEmail(auth, email);
            if(!res){
                setSuccess(true)
                setError(false)
            }
            
        } catch (error) {
            setSuccess(false)
            setError("User not found")
            console.log(error.message)
        }
        
    
        
      }
    
    return (
        <div>
            <div className='flex justify-center mt-[150px]'>

                <div className="w-3/4 p-4 max-w-sm bg-white mr-0 rounded-lg border border-gray-200 shadow-lg shadow-gray-700 sm:p-6 lg:p-8 font-Poppins">
                    <form className="space-y-6 " action="#" onSubmit={(e)=>triggerResetEmail(e)}>
                        <h5 className="text-xl font-medium text-gray-900">Forget Password</h5>
                        <div className='mb-5'>

                        {success && <p className='mt-3 mb-3  text-white py-3 rounded-md text-sm text-center bg-[#53c970]'>Password reset link has been sent to your email</p>}
                        <input 
                            type="email" 
                            className="bg-white mb-5 outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0] placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" 
                            placeholder="Email" 
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required     
                            />       

                            <p class="text-red-500">{error ? error : null}</p>
                            
                            <Link to="/" className=" text-md   text-blue-700 hover:underline">Back to Login</Link>
                        </div>                      
                        <button type="submit"  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Forgetpassword;
