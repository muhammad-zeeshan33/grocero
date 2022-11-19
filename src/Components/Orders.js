import React from "react";
import Orderdisplay from "./Order_display";

const Orders = () => {
  const Orders = [
    {
      id: 1,
      orderno: "2564",
      name: "Jason Crejza",
      email: "123@gmail.com",
      status: "Processing",
    },
    {
      id: 2,
      orderno: "2564",
      name: "Emily Watson",
      email: "123@gmail.com",
      status: "Intransit",
    },
    {
      id: 3,
      orderno: "1554",
      name: "Sarah Taylor",
      email: "123@gmail.com",
      status: "Delivered",
    },
    {
      id: 4,
      orderno: "2584",
      name: "Jeff Kim ",
      email: "123@gmail.com",
      status: "Processing",
    },
  ];
  return (
    <>
      <div className='font-Poppins '>
        <label className='flex p-8 text-3xl font-semibold'>Orders</label>
        <hr />
      </div>

      <div className='flex flex-col'>
        <div class='overflow-x-auto relative font-Poppins m-10 rounded-[8px] shadow-x'>
          <table class='w-full text-sm text-left text-gray-500 '>
            <thead class='text-lg   uppercase text-[#fff] bg-[#333]'>
              <tr>
                <th scope='col' class='py-3 px-6'>
                  Name
                </th>
                <th scope='col' class='py-3 px-6'>
                  Order No
                </th>
                <th scope='col' class='py-3 px-6'>
                  email
                </th>
                <th scope='col' class='py-3 px-6'>
                  Status
                </th>
                <th scope='col' class='py-3 px-6'>
                  Details
                </th>
              </tr>
            </thead>

            {Orders.map((val, id) => {
              return (
                <Orderdisplay
                  id={val.id}
                  name={val.name}
                  email={val.email}
                  orderno={val.orderno}
                  status={val.status}
                />
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
