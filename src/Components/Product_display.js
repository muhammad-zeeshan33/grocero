import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Moment from "react-moment";
import { storage } from "../firebase/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { Loader } from "./Loader/Loader";

import axios from "../axios";
export default function Product_display(props) {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [model, setmodel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [formData, setFromData] = useState({
    category: props.category,
    name: props.name,
    price: props.price,
    description: props.desc,
  });

  // got form data
  // got inputchange reference

  const handleclick = (a) => {
    setmodel(!model);
  };

  const deleteModalToggler = () => {
    setDeleteModel(!deleteModel);
  };

  // INPUT CHANGE HANDLER
  const inputChangeHandler = (e) => {
    const updatedFormData = { ...formData };
    if (e.target.name === "price") {
      updatedFormData[e.target.name] = parseInt(e.target.value);
    } else {
      updatedFormData[e.target.name] = e.target.value;
    }
    setFromData(updatedFormData);
  };

  // uploading image to firebase
  const imgChangeHandler = (e) => {
    if (!e.target.files[0]) return;
    setUploading(true);
    const storageRef = ref(storage, `productImages/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        props.error(error.message);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setUploading(false);
          setUploaded(true);
        });
      }
    );
  };

  const updateProductHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...formData,
      imgURL: imgUrl || props.img,
    };

    // deleting old image of the product before updating new image
    if (imgUrl) {
      let fileRef = ref(storage, props.img);
      deleteObject(fileRef)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
    //
    axios
      .patch(`/products/${props.id}.json`, data)
      .then((res) => {
        props.success("Product information updated");
        setmodel(!model);
        setLoading(false);
        props.loadData();
      })
      .catch((e) => {
        props.error(e.message);
        setmodel(!model);
        setLoading(false);
      });
    // alert('updated')
  };

  const deleteProductHandler = (id) => {
    setLoading(true);
    let fileRef = ref(storage, props.img);
    deleteObject(fileRef)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    axios
      .delete(`/products/${id}.json`)
      .then(() => {
        props.success("Product deleted!");
        props.loadData();
        setDeleteModel(false);
        setLoading(false);
      })
      .catch((e) => {
        props.error(e.message);
        setDeleteModel(false);
        setLoading(false);
      });
  };

  let modalContent = (
    <form onSubmit={(e) => updateProductHandler(e)}>
      <div className='flex  items-center'>
        <label>Category:</label>
        <select
          style={{ width: "185px", marginLeft: "40px" }}
          className='bg-white ml-5  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095]  text-sm rounded-lg block w-3/6 p-2.5 '
          placeholder='Category'
          required
          name='category'
          onChange={(e) => inputChangeHandler(e)}
        >
          <option value={props.category}> {props.category} </option>
          {props.options}
        </select>
      </div>
      <div className='flex space-x-5'>
        <div className='flex flex-col space-y-8 mt-2 text-colortxt '>
          <label>Name :</label>
          <label>Price :</label>
          <label>Description :</label>
        </div>
        <div className='flex flex-col space-y-2 mt-2 text- text-sm'>
          <input
            className='bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5'
            required
            name='name'
            value={formData.name}
            onChange={(e) => inputChangeHandler(e)}
          />
          <input
            type='number'
            className='bg-white  outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full p-2.5'
            required
            name='price'
            value={formData.price}
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
      </div>

      <textarea
        className='bg-white mt-3 outline-none border border-[#FACFE0] focus:ring-4 focus:ring-[#FACFE0]  placeholder:text-[#D27095] text-sm rounded-lg block w-full h-[200px] p-2.5'
        required
        name='description'
        value={formData.description}
        onChange={(e) => inputChangeHandler(e)}
      />
      <div className='mt-5 mb-2 flex'>
        <label for='myfile' className=''>
          Select an img
        </label>
        <input
          type='file'
          onChange={(e) => imgChangeHandler(e)}
          id='myfile'
          name='myfile'
          className='ml-2'
        />
      </div>
      {uploading && (
        <small class='text-blue-400 mb-3'>Uploading {progresspercent}% </small>
      )}
      {uploaded && (
        <small class='text-blue-400 mb-3'>
          <CheckCircle /> Uploaded{" "}
        </small>
      )}
      <hr />
      <div className='flex justify-around mt-2'>
        <button
          type='submit'
          disabled={uploading}
          class='text-[#2E2E2E] bg-[#F27AAC]  border  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
        >
          {uploading ? "Waiting for upload..." : "Save"}
        </button>
        <button
          type='button'
          onClick={handleclick}
          class='text-[#333] bg-white  border border-[#333] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
        >
          Discard
        </button>
      </div>
    </form>
  );

  if (loading) {
    modalContent = (
      <div className='text-center'>
        <Loader />
        <p className='lead'>Proccessing...</p>
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-wrap items-center justify-center  mt-6  font-Poppins '>
        {/* Card 1 */}
        <div className=' w-72 lg:mb-0 mb-8 bg-[#FFF5F9]  '>
          <div className='flex justify-center m-5'>
            <img src={props.img} className=' h-44' alt='nimg' />
          </div>
          <div className='bg-[#FFF5F9] hover:bg-[#ffe9f2]   '>
            <div className='p-4'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold text-colortxt'>
                  {props.name}
                </h2>
                <p className='text-xs text-gray-600 pl-5'>
                  <Moment fromNow>{props.createdAt}</Moment>
                </p>
              </div>
              <p className='text-xs text-gray-600 mt-2'>{props.desc}</p>
              <div className='flex items-center justify-between py-4'>
                <h2 className='text-[#F27AAC] text-xs font-medium'>
                  Category: {props.category}
                </h2>
                <h3 className='text-[#F27AAC] text-xl font-medium'>
                  ${props.price}
                </h3>
              </div>
              <div className='flex items-center justify-between '>
                <button
                  type='button'
                  class='text-[#2E2E2E] bg-[#F27AAC]  font-medium rounded-lg text-sm px-3 py-2  space-x-1 '
                  onClick={handleclick}
                >
                  <EditIcon />
                  <label>Edit</label>
                </button>
                <button
                  type='button'
                  onClick={deleteModalToggler}
                  class=' bg-white  border border-red-600 font-medium rounded-lg text-sm px-3 py-2  space-x-1 text-red-500 '
                >
                  <label>Delete</label>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Card 1 Ends */}

      {/* Edit Product Modal */}
      <div
        className={
          !model
            ? "hidden"
            : "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center font-Poppins"
        }
      >
        <div className='bg-white p-2 rounded w-4/12'>
          <div class='flex justify-between items-start p-4 rounded-t border-b '>
            <h3 class='text-2xl font-semibold text-gray-900 '>Edit Product</h3>
            <button
              type='button'
              onClick={handleclick}
              class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center '
              data-modal-toggle='defaultModal'
            >
              <svg
                aria-hidden='true'
                class='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
              <span class='sr-only'>Close modal</span>
            </button>
          </div>
          {modalContent}
        </div>
      </div>

      {/* Delete Modal */}

      <div
        className={
          !deleteModel
            ? "hidden"
            : "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center font-Poppins"
        }
      >
        <div className='bg-white p-2 rounded w-4/12'>
          <div class='flex flex-col items-center pb-10 text-colortxt text-center'>
            <h5 class='mb-1 text-xl font-medium mt-3'>
              Are you sure you want to delete {props.name}?
            </h5>
            <div className='d-flex'>
              <button
                onClick={() => deleteProductHandler(props.id)}
                disabled={loading}
                className='text-red-600 bg-white mt-7  font-medium rounded-lg border border-red-600 text-sm px-4 py-2 ml-2 '
              >
                {loading ? "Deleting..." : "Yes Delete"}
              </button>
              <button
                onClick={deleteModalToggler}
                disabled={loading}
                class='text-[#333] bg-white  border border-[#333] font-medium rounded-lg text-sm px-5 ml-3 py-2.5  mb-2'
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
