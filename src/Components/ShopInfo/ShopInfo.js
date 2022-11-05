import React, { useEffect, useState } from "react";
import Auxilary from "../../hoc/Auxilary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircle from "@mui/icons-material/CheckCircle";

import shopImg from "../assets/shop.png";
import shop1 from "../assets/shop1.jpg";
import axios from "../../axios";
import { getAuth } from "firebase/auth";
import { Loader } from "../Loader/Loader";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { storage } from "../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const ShopSchema = Yup.object().shape({
  shopTitle: Yup.string().required("This field is required"),
  shopDescription: Yup.string().required("This field is required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FFF",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const TextArea = (props) => (
  <textarea
    className='my-custom-input'
    type='text'
    cols='15'
    {...props}
  ></textarea>
);

const ShopInfo = () => {
  const [shop, setShop] = useState(null);
  const [imgModalOpen, setImgModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const onSuccess = (msg) => toast.success(msg);
  const onError = (msg) => toast.error(msg);

  const auth = getAuth();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/shop-owners.json");
        const resToArray = Object.keys(res.data).map((key) => ({
          key,
          ...res.data[key],
        }));
        const filteredShop = resToArray.filter((res) => {
          return res.userId == auth.currentUser.uid;
        });
        setShop(filteredShop[0]);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const imgChangeHandler = (e) => {
    if (!e.target.files[0]) return;
    setUploading(true);
    const storageRef = ref(storage, `shopImages/${e.target.files[0].name}`);
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
        console.log(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploading(false);
          setUploaded(true);
          const updatedShop = {
            shopTitle: shop.shop.shopTitle,
            shopDescription: shop.shop.shopDescription,
            shopImgUrl: downloadURL,
          };
          axios
            .patch(`/shop-owners/${shop.key}.json`, {
              shop: updatedShop,
            })
            .then((res) => {
              console.log(res);
              setShop({
                ...shop,
                shop: res.data.shop,
              });
              setImgModalOpen(false);
              setProgresspercent(0);
              onSuccess("Shop Image Updated Successfully");
            })
            .catch((e) => {
              console.log(e);
            });
        });
      }
    );
  };

  const updateHandler = async (values) => {
    setLoading(true);
    try {
      const res = await axios.patch(`/shop-owners/${shop.key}.json`, {
        shop: {
          shopTitle: values.shopTitle,
          shopDescription: values.shopDescription,
          shopImgUrl: shop.shop.shopImgUrl,
        },
      });

      setShop({
        ...shop,
        shop: res.data.shop,
      });
      setLoading(false);
      setEditModalOpen(false);
      onSuccess("Information Updated");
    } catch (error) {
      console.log(error);
      onError(error.message);
      setLoading(false);
      setEditModalOpen(false);
    }
  };

  let shopDetails = <Loader></Loader>;
  if (shop) {
    shopDetails = (
      <>
        <div class='flex flex-row items-center pb-10'>
          <img
            class='mb-3 w-90 h-80 rounded-full '
            src={shop.shop.shopImgUrl != "" ? shop.shop.shopImgUrl : shop1}
            alt='Bonnie image'
          />
          <div>
            <h5 class='mb-1 text-xl font-medium text-gray-900 text-3xl light:text-dark'>
              {shop.shop.shopTitle}
            </h5>
            <span class='text-sm text-gray-500 dark:text-gray-400'>
              {shop.shop.shopDescription}
            </span>
            <div class='flex mt-4 space-x-3 md:mt-6'>
              <a
                href='#'
                class='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white border border-black-700 text-black rounded-lg  focus:ring-2 focus:outline-none '
                onClick={() => setImgModalOpen(true)}
              >
                Update Shop Image
              </a>
              <a
                href='#'
                onClick={() => setEditModalOpen(true)}
                class='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700'
              >
                Edit Details
              </a>
            </div>
          </div>
        </div>
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={imgModalOpen}
          onClose={() => setImgModalOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={imgModalOpen} className='font-Poppins '>
            <Box sx={style} className='bg-[#fff]'>
              <div class='flex flex-col items-center pb-10 text-colortxt '>
                <h5 class='mb-1 text-xl font-medium mt-3'>Choose Shop Image</h5>
                <form>
                  <div className='mt-5 mb-2 flex flex-col justify-center align-center'>
                    <input
                      type='file'
                      onChange={(e) => imgChangeHandler(e)}
                      id='myfile'
                      name='myfile'
                      className='ml-2'
                      required
                    />
                  </div>
                  {uploading && (
                    <small class='text-blue-400 mb-3'>
                      Uploading {progresspercent}%{" "}
                    </small>
                  )}
                  {uploaded && (
                    <small class='text-blue-400 mb-3'>
                      <CheckCircle /> Uploaded{" "}
                    </small>
                  )}
                </form>
              </div>
            </Box>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={editModalOpen} className='font-Poppins '>
            <Box sx={style} className='bg-[#fff]'>
              <div class='flex flex-col items-center pb-10 text-colortxt '>
                <h5 class='mb-1 text-xl font-medium mt-3'>Choose Shop Image</h5>
                <Formik
                  initialValues={{
                    shopTitle: shop.shop.shopTitle,
                    shopDescription: shop.shop.shopDescription,
                  }}
                  validationSchema={ShopSchema}
                  onSubmit={(values) => updateHandler(values)}
                >
                  {({ errors, touched }) => (
                    <Form className='space-y-6'>
                      <Field
                        name='shopTitle'
                        placeholder='Shop Title'
                        className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
                      />
                      {errors.shopTitle && touched.shopTitle ? (
                        <div class='text-red-700' style={{ marginTop: "-1px" }}>
                          {" "}
                          {errors.shopTitle}
                        </div>
                      ) : null}

                      <Field
                        name='shopDescription'
                        as={TextArea}
                        placeholder='Shop Description'
                        className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
                      />
                      {errors.shopDescription && touched.shopDescription ? (
                        <div class='text-red-700' style={{ marginTop: "-1px" }}>
                          {errors.shopDescription}
                        </div>
                      ) : null}

                      <button
                        class='text-white bg-[#363740] border  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                        type='submit'
                      >
                        {loading ? "Updating..." : "Update"}
                      </button>

                      <button
                        type='button'
                        onClick={() => setEditModalOpen(false)}
                        class='text-[#333] bg-white  border border-[#333] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                      >
                        Discard
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </Box>
          </Fade>
        </Modal>
      </>
    );
  }
  return (
    <Auxilary>
      <ToastContainer />
      <div className='font-Poppins'>
        <label className='flex p-8 text-3xl font-semibold'>Shop Details</label>
        <hr />
      </div>
      <div class='bg-white mt-2 ml-2 mr-2 rounded-lg border border-[#ddd] shadow-md light:bg-gray-800 dark:border-[#ddd]'>
        {shopDetails}
      </div>
    </Auxilary>
  );
};

export default ShopInfo;
