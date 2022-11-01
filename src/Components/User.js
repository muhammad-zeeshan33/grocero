import React, { Fragment, useState, useEffect } from "react";
import { deleteUserById } from "../firebase/firebase-admin-file";
import UserDisplay from "./User_Display";
import arrow1 from "../assets/arrw1.png";
import arrow2 from "../assets/arrw2.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddUserModal from "./AddUserModal";
import axios from "../axios.js";

// import { deleteUserById } from "../firebase/firebase-admin";

function Users() {
  const UsersInfo = [
    {
      id: 1,
      name: "Jason Crejza",
      username: "Danny_123",
      Gender: "Male",
      email: "123@gmail.com",
      img: "1",
    },
    {
      id: 2,
      name: "Emily Watson",
      username: "Danny_123",
      Gender: "Male",
      email: "123@gmail.com",
      img: "5",
    },
    {
      id: 3,
      name: "Sarah Taylor",
      username: "Danny_123",
      Gender: "Male",
      email: "123@gmail.com",
      img: "6",
    },
    {
      id: 4,
      name: "Jeff Kim ",
      username: "Danny_123",
      Gender: "Male",
      email: "123@gmail.com",
      img: "2",
    },
  ];

  (async () => {
    // const res = await getAuth();
    // console.log(res);
  })();

  const [users, setUsers] = React.useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/shop-owners.json");
        // console.log(res.data);

        const transformed = Object.keys(res.data).map((key) => {
          return {
            ...res.data[key],
          };
        });
        console.log(transformed);
        setUsers(transformed);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const [dis, setdis] = useState(true);
  const [Ids, setids] = useState();
  const [open, setOpen] = useState(false);

  const handleclick = (Id) => {
    setdis(!dis);
    setids(Id);
  };

  let mappedUsers = null;
  if (users) {
    mappedUsers = users.map((val, id) => {
      //   const b = val.img;
      return (
        <UserDisplay
          id={val.userId}
          name={val.name}
          email={val.email}
          role={val.role}
          contact={val.contact}
          img={require("../assets/avatar.png")}
          click={handleclick}
        />
      );
    });
  }

  return (
    <Fragment>
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
              // success={this.onSuccess}
              // error={this.onError}
              close={setOpen}
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
