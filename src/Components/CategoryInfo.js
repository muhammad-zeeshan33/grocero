import { Fragment } from 'react';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Loader } from './Loader/Loader';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FFF5F9',
    borderRadius:'8px',
    boxShadow: 24,
    p: 4,
};

function CategoryInfo(props) {
    const [open, setOpen] = React.useState(false);
    const [openDelModal, setOpenDelModal] = React.useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelModalOpen = () => setOpenDelModal(true)
    const handleDelModalClose = () => setOpenDelModal(false)
    const { name } = props;
    const [loading, setLoading] = React.useState(false)

    const deleteCategoryHanlder = (id) => {
        setLoading(true);
        props.onDelete(id);
    }
    
    return (
        <Fragment>
            <tbody>
                <tr class="bg-white border-b  dark:border-gray-700">                  
                    <td class="py-4 px-6">{props.seriaNo}</td>
                    <td class="py-4 px-6">
                        {name}
                    </td>                  
                    <td class=" flex">
                        <button onClick={handleOpen} type="button" class="text-[#2E2E2E] bg-[#F27AAC] mt-7  font-medium rounded-lg text-sm px-4 py-2 ml-[20px] ">View</button>
                        <button type="button" onClick={handleDelModalOpen} class="text-red-600 bg-white mt-7  font-medium rounded-lg border border-red-600 text-sm px-4 py-2 ml-2 ">Delete</button>
                    </td>
                </tr>
            </tbody>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open} className='font-Poppins '>
                    <Box sx={style} className='bg-[#FFF5F9]'>                       
                        <div class="flex flex-col items-center pb-10 text-colortxt ">                            
                            <h5 class="mb-1 text-xl font-medium mt-3">Category Name</h5>
                            <p className='lead'>{name}</p>            
                        </div>
                    </Box>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openDelModal}
                onClose={handleDelModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openDelModal} className='font-Poppins '>
                    <Box sx={style} className='bg-[#FFF5F9]'>
                       
                        <div class="flex flex-col items-center pb-10 text-colortxt text-center">                                                    
                            <h5 class="mb-1 text-xl font-medium mt-3">Are you sure you want to delete {name}?</h5>   
                            <div className='d-flex'>
                                <button onClick={() => deleteCategoryHanlder(props.id)} disabled={loading} className="text-red-600 bg-white mt-7  font-medium rounded-lg border border-red-600 text-sm px-4 py-2 ml-2 ">{loading ? "Deleting..." : "Yes Delete"}</button>
                                <button onClick={handleDelModalClose} disabled={loading} class="text-red-700 bg-white  border border-red-700 font-medium rounded-lg text-sm px-5 ml-3 py-2.5  mb-2">Discard</button>
                            </div>         
                        </div>
                    </Box>
                </Fade>
            </Modal>

        </Fragment>
    )
}

export default CategoryInfo

