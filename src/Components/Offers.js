import React, { Component, useState } from "react";
import OfferCard from "./OfferCard";
import OfferModal from "./OfferModal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noProducts from "./assets/no-products.gif";
import { Loader } from "./Loader/Loader";
import axios from "../axios";

import { withError } from "../hoc/withError";

class Offers extends Component {
  // UTILITY EVENT CATCHERS
  onSuccess = (msg) => toast.success(msg);
  onError = (msg) => toast.error(msg);

  state = {
    open: false,
    offers: null,
    loading: false,
  };

  toggleModalHandler = () => {
    const doesOpen = this.state.open;
    this.setState({
      open: !doesOpen,
    });
  };

  loadData = () => {
    axios
      .get("/offers.json")
      .then((res) => {
        if (res.data !== null) {
          let keys = Object.keys(res.data);
          const updatedOffers = keys.map((key) => {
            return {
              key,
              ...res.data[key],
            };
          });
          this.setState({
            offers: updatedOffers,
          });
        } else {
          this.setState({
            offers: [],
          });
        }
        this.setState({
          loading: false,
        });
      })
      .catch((e) => {
        this.setState({
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.loadData();
  }

  componentDidUpdate(_, prevState) {
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      this.loadData();
    }
  }

  render() {
    // pre render checks
    let pageContent = this.state.loading ? <Loader /> : null;
    if (this.state.offers) {
      if (this.state.offers.length > 0) {
        pageContent = (
          <div className='grid grid-cols-2 m-5'>
            {this.state.offers.map((val) => {
              return (
                <OfferCard
                  success={this.onSuccess}
                  refresh={this.loadData}
                  key={val.key}
                  id={val.key}
                  title={val.title}
                  price={val.price}
                  type={val.type}
                  img={val.imgURL}
                />
              );
            })}
          </div>
        );
      } else {
        pageContent = (
          <div className='d-flex justify-center text-center'>
            <img
              src={noProducts}
              style={{
                width: "400px",
                height: "300px",
                borderRadius: "50%",
                marginLeft: "33%",
              }}
            ></img>
            <h1 className='text-3xl mt-3'>
              No offers found, Start adding offers
            </h1>
          </div>
        );
      }
    }

    return (
      <>
        <ToastContainer />
        <div className='font-Poppins '>
          <label className='flex p-8 text-3xl font-semibold'>Offers</label>
          <hr />
          <div className='flex justify-end'>
            <button
              onClick={this.toggleModalHandler}
              type='button'
              className='text-[#fff] bg-[#333]  font-medium rounded-lg text-sm px-3 py-2  space-x-1 m-5 mr-10 '
            >
              <AddCircleOutlineIcon />
              <label>Add new</label>
            </button>
            {this.state.open && (
              <OfferModal
                success={this.onSuccess}
                error={this.onError}
                close={this.toggleModalHandler}
              />
            )}
          </div>
        </div>
        {pageContent}
      </>
    );
  }
}

export default withError(Offers, axios);
