import React from "react";
import axios from "../axios";
import { Loader } from "./Loader/Loader";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("This field is required"),
  contact: Yup.string()
    .max(13, "Invalid Phone number")
    .required("This field is required"),

  password: Yup.string()
    .min(8, "Password must be more than 8 characters")
    .max(16, "Password is too long to remember")
    .required("This field is required"),

  password2: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("This field is required"),

  email: Yup.string()
    .email("Email is invalid")
    .required("This field is required"),
});

const AddUserModal = ({ close, success, error, loadData }) => {
  const [loading, setLoading] = React.useState(false);

  const submitHandler = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const userRes = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgRG2_bXcBjKH9I5u1-SE0BEUTntnPC2Y",
        { email: values.email, password: values.password }
      );

      try {
        const data = {
          name: values.name,
          email: values.email,
          contact: values.contact,
          role: "shopowner",
          shop: {
            shopTitle: "Grocero Default Shop",
            shopDescription: "Grocero Default Shop Description",
            shopImgUrl: "",
          },
          userId: userRes.data.localId,
        };
        const res = await axios.post("/shop-owners.json", data);
        setLoading(false);
        console.log(res);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
      success("User Created Successfully");
      setLoading(false);
      close(false);
      loadData();
    } catch (error) {
      error(error.message);
      setLoading(false);
      close(false);
    }
  };

  let modalContent = (
    <Formik
      initialValues={{
        name: "",
        contact: "",
        email: "",
        password: "",
        password2: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => submitHandler(values)}
    >
      {({ errors, touched }) => (
        <Form className='space-y-6'>
          <Field
            name='name'
            placeholder='Name'
            className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
          />
          {errors.name && touched.name ? (
            <div class='text-red-700' style={{ marginTop: "-1px" }}>
              {" "}
              {errors.name}
            </div>
          ) : null}
          <Field
            name='contact'
            placeholder='Contact'
            className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
          />
          {errors.contact && touched.contact ? (
            <div class='text-red-700' style={{ marginTop: "-1px" }}>
              {errors.contact}
            </div>
          ) : null}
          <Field
            name='email'
            type='email'
            placeholder='Email'
            className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
          />
          {errors.email && touched.email ? (
            <div class='text-red-700' style={{ marginTop: "-1px" }}>
              {errors.email}
            </div>
          ) : null}

          <Field
            name='password'
            type='password'
            placeholder='Password'
            className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
          />
          {errors.password && touched.password ? (
            <div class='text-red-700' style={{ marginTop: "-1px" }}>
              {errors.password}
            </div>
          ) : null}

          <Field
            name='password2'
            type='password'
            placeholder='Confirm Password'
            className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
          />
          {errors.password2 && touched.password2 ? (
            <div class='text-red-700' style={{ marginTop: "-1px" }}>
              {errors.password2}
            </div>
          ) : null}

          <button
            class='text-white bg-[#363740] border  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
            type='submit'
          >
            Submit
          </button>

          <button
            type='button'
            onClick={() => close(false)}
            class='text-[#333] bg-white  border border-[#333] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
          >
            Discard
          </button>
        </Form>
      )}
    </Formik>
    // <form className='space-y-6' action='#'>
    //   <div>
    //     <label>Name</label>
    //     <input
    //       type='text'
    //       className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
    //       placeholder='Name'
    //       required=''
    //       onChange={(e) => nameChangeHandler(e)}
    //     />
    //   </div>
    //   <div>
    //     <label>Contact</label>
    //     <input
    //       type='text'
    //       className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
    //       placeholder='Contact'
    //       required=''
    //       onChange={(e) => nameChangeHandler(e)}
    //     />
    //   </div>
    //   <div>
    //     <label>Email</label>
    //     <input
    //       type='email'
    //       className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
    //       placeholder='Email'
    //       required=''
    //       onChange={(e) => nameChangeHandler(e)}
    //     />
    //   </div>
    //   <div>
    //     <label>Password</label>
    //     <input
    //       type='password'
    //       className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
    //       placeholder='Password'
    //       required=''
    //       onChange={(e) => nameChangeHandler(e)}
    //     />
    //   </div>
    //   <div>
    //     <label>Confirm Password</label>
    //     <input
    //       type='password'
    //       className='bg-white outline-none border border-[#333] focus:ring-4 focus:ring-[#f3f3f3] placeholder:text-[#333] text-sm rounded-lg block w-full p-2.5'
    //       placeholder='Confirm Password'
    //       required=''
    //       onChange={(e) => nameChangeHandler(e)}
    //     />
    //   </div>
    //   <div></div>
    //   <div className='flex justify-around'>
    //     <button
    //       type='button'
    //       onClick={submitHandler}
    //       disabled={!name.isValid}
    //       class='text-white bg-[#363740] border  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
    //     >
    //       Save
    //     </button>
    //     <button
    //       type='button'
    //       onClick={() => close(false)}
    //       class='text-[#333] bg-white  border border-[#333] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
    //     >
    //       Discard
    //     </button>
    //   </div>
    // </form>
  );

  if (loading) {
    modalContent = (
      <div className='text-center'>
        <Loader />
        <p className='lead'>Please wait...</p>
      </div>
    );
  }

  return (
    <>
      <div
        id='authentication-modal'
        tabindex='-1'
        className='fixed top-0 right-0 left-0  z-50  items-center justify-center flex h-screen bg-[#333] bg-opacity-50'
        aria-modal='true'
        role='dialog'
      >
        <div className='relative p-4 w-full max-w-md h-full md:h-auto'>
          <div className='relative bg-[#fff] rounded-lg shadow-lg '>
            <button
              onClick={() => close(false)}
              type='button'
              className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover: placeholder: rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
              data-modal-toggle='authentication-modal'
            >
              <svg
                aria-hidden='true'
                className='w-5 h-5'
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
              <span className='sr-only'>Close modal</span>
            </button>

            <div className='py-6 px-6 lg:px-8 text-colortxt'>
              <h3 className='mb-4 text-xl font-medium  '>Add Shop Owner</h3>
              {modalContent}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserModal;
