import React, { useState, useEffect, Component } from "react";
import Auxilary from "../hoc/Auxilary";
import Shop from "./Shop";
import arrow1 from "../assets/arrw1.png";
import arrow2 from "../assets/arrw2.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCategoryModal from "./AddCategoryModal";
import { Loader } from "./Loader/Loader";
import axios from "../axios";
import noProducts from "./assets/no-products.gif";

import authContext from "../contexts/authContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Shops extends Component {
  state = {
    Ids: "",
    dis: false,
    open: false,
    shops: null,
    loading: false,
    token: localStorage.getItem("token"),
  };

  static contextType = authContext;

  onSuccess = (msg) => toast.success(msg);
  onError = (msg) => toast.error(msg);

  handleclick = (id) => {
    this.setState({
      Ids: id,
      dis: !this.state.dis,
    });
    console.log(this.state);
  };

  modalHandler = (param) => {
    this.setState({
      open: param,
    });
  };

  onDeleteCategory = (id) => {
    axios
      .delete(`/shop-owners/${id}.json`)
      .then((res) => {
        this.loadData();
        this.onSuccess("Category Deleted Successfully!");
      })
      .catch((e) => this.onError(e.message));
  };

  loadData = () => {
    axios
      .get(`/shop-owners.json`)
      .then((res) => {
        if (res.data !== null) {
          let keys = Object.keys(res.data);
          const updatedShops = keys.map((key) => {
            return {
              key,
              ...res.data[key],
            };
          });
          this.setState({
            shops: updatedShops,
          });
        } else {
          this.setState({
            shops: [],
          });
        }
      })
      .catch((e) => {
        this.onError(e.message);
      });
  };
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.categories === this.state.categories) {
      this.loadData();
    }
  }

  render() {
    let table = (
      <div className='text-center'>
        <Loader />
      </div>
    );
    if (this.state.shops) {
      if (this.state.shops.length > 0) {
        table = (
          <div className={this.state.dis ? "hidden" : "m-5 bg-white"}>
            <div class='overflow-x-hidden overflow-y-hidden relative shadow-md sm:rounded-lg'>
              <table class='w-full text-sm text-left text-gray '>
                <thead class='text-xs text-gray-700 uppercase pb-6 text-[#fff] bg-[#333]'>
                  <tr>
                    <th scope='col' class='py-3 px-6'>
                      Serial #
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Shop Title
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Shop Description
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Owner Name
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* T body  */}
                {this.state.shops.map((val, index) => {
                  return (
                    <Shop
                      seriaNo={index + 1}
                      key={val.key}
                      id={val.key}
                      name={val.shop.shopTitle}
                      owner={val.name}
                      description={val.shop.shopDescription}
                      loading={this.state.loading}
                      onDelete={this.onDeleteCategory}
                      click={this.handleclick}
                    />
                  );
                })}
              </table>
              <hr></hr>

              <div className='flex my-4'>
                <div className='flex justify-end w-[90%] text-[#9FA2B4] space-x-40'>
                  <label></label>
                  <label></label>
                </div>
                <img src={arrow1} alt='' className='  ' />
                <img src={arrow2} alt='' className='  ' />
              </div>
            </div>
          </div>
        );
      } else {
        table = (
          <div class='d-flex justify-center text-center'>
            <img
              src={noProducts}
              style={{
                width: "400px",
                height: "300px",
                borderRadius: "50%",
                marginLeft: "33%",
              }}
              alt='Product '
            ></img>
            <h1 class='text-3xl mt-3'>No Shops found</h1>
          </div>
        );
      }
    }

    return (
      <Auxilary>
        <ToastContainer />
        <div className='font-Poppins'>
          <label className='flex p-8 text-3xl font-semibold'>Shops</label>
          <hr />
          {table}
        </div>
      </Auxilary>
    );
  }
}

export default Shops;
