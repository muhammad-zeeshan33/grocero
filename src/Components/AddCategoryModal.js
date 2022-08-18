import React from 'react';
import axios from '../axios';
import { Loader } from './Loader/Loader';

const AddCategoryModal = ({close, success, error}) => {

    const [name, setName] = React.useState({
        name: "",
        isValid: false
    });    
    const [loading, setLoading] = React.useState(false)

    

    const submitHandler = async() => {
        try{
            setLoading(true)
            const data = {
                name: name.name
            }
            const response = await axios.post('/categories.json', data)        
            if(response.status == 200 || response.data.length){
                setLoading(false)
                success("Category Created Successfully")
                close(false)
            } 
        }
        catch(e){
            error(e.message)
            setLoading(false)
            close(false)
        }        
    }

    const nameChangeHandler = (e) => {
        const validate = e.target.value.length > 0;
        
        console.log(validate);
        setName({
            name: e.target.value, 
            isValid: validate
        })
    }

    let modalContent = (
        <form className="space-y-6" action="#">
            <div>
                <input                                 
                    type="text" 
                    className="bg-white outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0] placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5" 
                    placeholder="Category Name" 
                    required=""
                    onChange={(e)=> nameChangeHandler(e)}
                    />
            </div>                                                                                        
            <div >

            </div>
            <div className='flex justify-around'>
                <button type="button" onClick={submitHandler} disabled={!name.isValid} class="text-white bg-[#363740] border  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Save</button>
                <button type="button" onClick={() => close(false)} class="text-red-700 bg-white  border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Discard</button>
            </div>
        </form>
    )

    if(loading){        
        modalContent = <div className="text-center">
                        <Loader />
                        <p className="lead">Please wait...</p>
                    </div>
    }

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
                            <h3 className="mb-4 text-xl font-medium  ">Add Category</h3>
                            {modalContent}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCategoryModal;
