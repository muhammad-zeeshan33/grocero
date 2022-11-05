import React, { Fragment, useState, useEffect } from "react";
import { Loader } from "./Loader/Loader";
import UserDisplay from "./User_Display";
import arrow1 from "../assets/arrw1.png";
import arrow2 from "../assets/arrw2.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddUserModal from "./AddUserModal";
import axios from "../axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
  const [users, setUsers] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    loadData();
  }, []);

  const [dis, setdis] = useState(true);
  const [Ids, setids] = useState();
  const [open, setOpen] = useState(false);

  const handleclick = (Id) => {
    setdis(!dis);
    setids(Id);
  };

  const onSuccess = (msg) => toast.success(msg);
  const onError = (msg) => toast.error(msg);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/shop-owners.json");
      // console.log(res.data);
      if (res.data) {
        const transformed = Object.keys(res.data).map((key) => {
          return {
            key,
            ...res.data[key],
          };
        });
        setUsers(transformed);
      } else {
        setUsers(null);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  let mappedUsers = null;
  if (loading) {
    mappedUsers = (
      <>
        <td></td>
        <td></td>
        <td></td>
        <Loader />
        <td></td>
      </>
    );
  }
  if (users) {
    if (users.length > 0) {
      mappedUsers = users.map((val, id) => {
        return (
          <UserDisplay
            uid={val.userId}
            key={val.key}
            id={val.key}
            loadData={loadData}
            name={val.name}
            success={onSuccess}
            error={onError}
            email={val.email}
            role={val.role}
            contact={val.contact}
            img={require("../assets/avatar.png")}
            click={handleclick}
          />
        );
      });
    } else {
      mappedUsers = (
        <>
          <td></td>
          <td></td>
          <td></td>
          <td style={{ padding: "20px" }}>No users available</td>
        </>
      );
    }
  }
  return (
    <Fragment>
      <ToastContainer />

      <div className='font-Poppins'>
        <label className='flex p-8 text-3xl font-semibold'>Users</label>
        <hr />
        <div className='flex justify-end'>
          <button
            onClick={() => setOpen(true)}
            type='button'
            class='text-[#fff] bg-[#333]  font-medium rounded-lg text-sm px-3 py-2  space-x-1 m-5 mr-10 '
          >
            <AddCircleOutlineIcon />
            <label>Add new</label>
          </button>

          {open && (
            <AddUserModal
              success={onSuccess}
              error={onError}
              close={setOpen}
              loadData={loadData}
            />
          )}
        </div>
        {!dis ? (
          <UserDisplay parent={Ids} />
        ) : (
          <div className={!dis ? "hidden" : "m-5 bg-white"}>
            <div class='overflow-x-auto relative shadow-md sm:rounded-lg'>
              <table class='w-full text-sm text-left text-gray'>
                <thead class='text-xs text-gray-700 uppercase pb-6 text-[#fff] bg-[#333]'>
                  <tr>
                    <th scope='col' class='py-3 px-6'></th>
                    <th scope='col' class='py-3 px-6'>
                      Name
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Email
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Contact
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Role
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* T body  */}
                {mappedUsers}
              </table>
              <hr></hr>

              <div className='flex my-4'>
                <div className='flex justify-end w-[90%] text-[#9FA2B4] space-x-40'>
                  <label>Rows per page 8</label>
                  <label>1-8 of 1240</label>
                </div>
                <img src={arrow1} alt='' className='  ' />
                <img src={arrow2} alt='' className='  ' />
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Users;
