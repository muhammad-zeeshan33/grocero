import React , {useState, useEffect, Component} from 'react'
import Auxilary from '../hoc/Auxilary';
import CategoryInfo from './CategoryInfo';
import arrow1 from '../assets/arrw1.png';
import arrow2 from '../assets/arrw2.png';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import AddCategoryModal from './AddCategoryModal';
import { Loader } from './Loader/Loader';
import axios from '../axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Category extends Component {

    state = {
        Ids: "",
        dis: false,
        open: false,
        categories: null,
        loading: false

    }

    onSuccess = (msg) => toast.success(msg);
    onError = (msg) => toast.error(msg);

    handleclick = (id) => {
        this.setState({            
            Ids: id,
            dis: !this.state.dis
        })        
        console.log(this.state)
    }

    modalHandler = (param) => {
        this.setState({
            open: param
        })        
    }

    onDeleteCategory = (id) => {       
        axios.delete(`/categories/${id}.json`)
        .then(res=>
            {                
                this.loadData()
                this.onSuccess("Category Deleted Successfully!")
            })
        .catch(e=>this.onError(e.message))
        
    }

    loadData = () => {
        axios.get('/categories.json')
        .then(res=>{
            if(res.data !== null){  
                let keys = Object.keys(res.data)
                const updatedCategories = keys.map(key => {
                    return {
                        key, ...res.data[key],
                    }
                })
                this.setState({
                    categories: updatedCategories
                })
            }
            else{
                this.setState({
                    categories: []
                })
            }

                
          
        })
        .catch(e=>{            
            this.onError(e.message)
        })
    }
    componentDidMount(){        
       this.loadData()
       
    }

    componentDidUpdate(_, prevState){        
        if(prevState.categories === this.state.categories ){            
            this.loadData()
        }
    }

    render(){        
        let table = <div className='text-center'><Loader /></div>
        if(this.state.categories){                                              
            table = (            
                <table class="w-full text-sm text-left text-gray ">
                                            
                <thead class="text-xs text-gray-700 uppercase pb-6 bg-colornav">
                    <tr>                                            
                        <th scope="col" class="py-3 px-6">
                            Serial #
                        </th>                                            
                        <th scope="col" class="py-3 px-6">
                            Category Name
                        </th>                                            
                        <th scope="col" class="py-3 px-6">
                            Actions
                        </th>
                    </tr>
                </thead>

                {/* T body  */}
                {this.state.categories.length > 0 ? 
                      this.state.categories.map((val, index) => {                                                   
                            return <CategoryInfo
                                seriaNo ={index+1}
                                key={val.key}
                                id={val.key}
                                name={val.name}    
                                loading={this.state.loading}
                                onDelete = {this.onDeleteCategory}                                                                                         
                                click={this.handleclick}
                            />
                        })   
                        :
                        <tbody>
                            <p class="text-center my-5">Start adding some categories</p>
                        </tbody>
                          
                }
            </table>
            )
        }
    
        return (
             <Auxilary>                  
                <ToastContainer />     
                    <div className='font-Poppins'>
                        <label className="flex p-8 text-3xl font-semibold">
                            Categories
                        </label>
                        <hr />
                        <div className="flex justify-end">
                            <button onClick={() => this.setState({open: true})} type="button" class="text-[#2E2E2E] bg-[#F27AAC]  font-medium rounded-lg text-sm px-3 py-2  space-x-1 m-5 mr-10 " ><AddCircleOutlineIcon /><label>Add new</label></button>
        
                            {this.state.open && <AddCategoryModal
                                success={this.onSuccess}
                                error={this.onError}
                                close={this.modalHandler}
                            />}
        
                        </div>
                        {this.state.dis?
                            <CategoryInfo parent={this.state.Ids} /> :
                                <div className= {this.state.dis ? 'hidden' : 'm-5 bg-white'}>
                                    
                                    <div class="overflow-x-hidden overflow-y-hidden relative shadow-md sm:rounded-lg">
                                        {table}
                                        <hr></hr>
        
                                        <div className='flex my-4'>
                                            <div className='flex justify-end w-[90%] text-[#9FA2B4] space-x-40'>
                                                <label>Rows per page 8</label>
                                                <label >1-8 of 1240</label>
        
                                            </div>
                                            <img src={arrow1} alt='' className='  ' />
                                            <img src={arrow2} alt='' className='  ' />
                                        </div>
        
                                    </div>
        
                                </div>  
                        }
            
                    </div> 
            </Auxilary>
        )
    }
}

export default Category;
