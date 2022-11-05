import { Fragment } from "react";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";
import axios_firebase from "../axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FFF5F9",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

function UserDisplay(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id, uid, name, email, img, role, contact, loadData } = props;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/delete-user/" + uid);
      axios_firebase
        .delete(`/shop-owners/${id}.json`)
        .then((response) => {
          loadData();
          props.success("User Deleted Successfully!");
        })
        .catch((e) => this.error(e.message));
      setLoading(false);
      setDeleteModalOpen(false);
      loadData();
    } catch (error) {
      props.error(error.message);
      setLoading(false);
      setDeleteModalOpen(false);
    }
  };
  return (
    <Fragment>
      <tbody>
        <tr class='bg-white border-b  dark:border-gray-700'>
          <th
            scope='row'
            class='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
          >
            <img
              src={img}
              alt=''
              className=' w-[44px] h-[44px]  rounded-full '
            />
          </th>
          <td class='py-4 px-6'>{name}</td>
          <td class='py-4 px-6'>{email}</td>
          <td class='py-4 px-6'>{contact}</td>

          <td class='py-4 px-6 '>
            <button
              type='button'
              className={` rounded-[100px] text-white bg-{{color}}  px-4 py-1  bg-[#66c934]`}
            >
              {role}
            </button>
          </td>
          {/* <td class='py-4 px-6'>{role}</td> */}
          <td class=' flex'>
            <button
              onClick={handleOpen}
              type='button'
              class='text-[#fff] bg-[#333] mt-7  font-medium rounded-lg text-sm px-4 py-2 ml-[20px] '
            >
              View
            </button>

            <button
              type='button'
              onClick={() => setDeleteModalOpen(true)}
              class='text-red-600 bg-white mt-7  font-medium rounded-lg border border-red-600 text-sm px-4 py-2 ml-2 '
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
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
            <div class='flex flex-col items-center pb-10 text-colortxt '>
              <img
                class='mb-3 w-24 h-24 rounded-full shadow-lg'
                src={img}
                alt='Bonnie'
              />
              <h5 class='mb-1 text-xl font-medium mt-3'>{name}</h5>

              <div className='flex py-4 px-6 rounded-t border-b bg-white'>
                <b>Email : </b> <p className='px-3'>{email}</p>
              </div>

              <div className='flex  py-4 px-6 mt-2 rounded-t border-b bg-white'>
                <b>Name : </b> <p className='px-3'>{name}</p>
              </div>
              <div className='flex  py-4 px-6 mt-2 rounded-t border-b bg-white'>
                <b>Phone no : </b> <p className='px-3'>{contact}</p>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>

      <div
        className={
          !deleteModalOpen
            ? "hidden"
            : "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center font-Poppins"
        }
      >
        <div className='bg-white p-2 rounded w-4/12'>
          <div className='flex flex-col items-center pb-10 text-colortxt text-center'>
            <h5 className='mb-1 text-xl font-medium mt-3'>
              Are you sure you want to delete this user?
            </h5>
            <div className='d-flex'>
              <button
                onClick={handleDelete}
                disabled={loading}
                className='text-red-600 bg-white mt-7  font-medium rounded-lg border border-red-600 text-sm px-4 py-2 ml-2 '
              >
                {loading ? "Deleting..." : "Yes Delete"}
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                disabled={loading}
                className='text-[#333] bg-white  border border-[#333] font-medium rounded-lg text-sm px-5 ml-3 py-2.5  mb-2'
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserDisplay;
