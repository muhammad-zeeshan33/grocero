import React, { useState, useEffect, Component } from "react";
import Auxilary from "../hoc/Auxilary";
import CategoryInfo from "./CategoryInfo";
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

class Category extends Component {
  state = {
    Ids: "",
    dis: false,
    open: false,
    categories: null,
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
      .delete(`/categories/${id}.json`)
      .then((res) => {
        this.loadData();
        this.onSuccess("Category Deleted Successfully!");
      })
      .catch((e) => this.onError(e.message));
  };

  loadData = () => {
    axios
      .get(`/categories.json`)
      .then((res) => {
        if (res.data !== null) {
          let keys = Object.keys(res.data);
          const updatedCategories = keys.map((key) => {
            return {
              key,
              ...res.data[key],
            };
          });
          this.setState({
            categories: updatedCategories,
          });
        } else {
          this.setState({
            categories: [],
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
    if (this.state.categories) {
      if (this.state.categories.length > 0) {
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
                      Category Name
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* T body  */}
                {this.state.categories.map((val, index) => {
                  return (
                    <CategoryInfo
                      seriaNo={index + 1}
                      key={val.key}
                      id={val.key}
                      name={val.name}
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
            <h1 class='text-3xl mt-3'>
              No Categories found, Start Adding Categories
            </h1>
          </div>
        );
      }
    }

    return (
      <Auxilary>
        <ToastContainer />
        <div className='font-Poppins'>
          <label className='flex p-8 text-3xl font-semibold'>Categories</label>
          <hr />
          <div className='flex justify-end'>
            <button
              onClick={() => this.setState({ open: true })}
              type='button'
              class='text-[#fff] bg-[#333]  font-medium rounded-lg text-sm px-3 py-2  space-x-1 m-5 mr-10 '
            >
              <AddCircleOutlineIcon />
              <label>Add new</label>
            </button>

            {this.state.open && (
              <AddCategoryModal
                success={this.onSuccess}
                error={this.onError}
                close={this.modalHandler}
              />
            )}
          </div>
          {table}
        </div>
      </Auxilary>
    );
  }
}

export default Category;
