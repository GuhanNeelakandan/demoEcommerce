import React, { useContext } from "react";
import "./checkout.css";
import userContext from "../Context/context";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CheckOut({ fetchCartData }) {
    const navigate = useNavigate()
  const cartList = useContext(userContext);
  const totalAmount = cartList.reduce(
    (prev, curr) => prev + Number(curr.offerprice),
    0
  );

  const placeOrder = () => {
    console.log(cartList)
    cartList.map(async(item) => {
      await axios
        .delete(`https://6602682b9d7276a755532969.mockapi.io/cart/${item.id}`)
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
    });
    fetchCartData()
    toast.success("Your Order Placed Successfully");
    navigate('/')
  };
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-8 left-cart">
          <div className="container w-50 m-auto">
            <div className="row">
              <div className="col-12">
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Name"
                  />
                </div>
              </div>
              <div className="col-12">
                <div class="mb-3">
                  <label class="form-label">Card Number</label>
                  <input
                    type="number"
                    class="form-control"
                    maxLength={16}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">Expiry Date</label>
                  <input type="date" class="form-control" placeholder="MM/YY" />
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">CCV</label>
                  <input
                    type="number"
                    class="form-control"
                    maxLength={3}
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="pay-btn" onClick={() => placeOrder()}>
                Pay ${totalAmount}
              </button>
            </div>
          </div>
        </div>
        <div className="col-4 right-cart">
          <ul class="list-group">
            <li class="list-group-item">
              <h5 className="text-muted">Price Details</h5>
            </li>
            <li class="list-group-item">
              <div className="d-flex justify-content-between">
                <h6>Items</h6>
                <h6>{cartList.length}</h6>
              </div>
            </li>
            <li class="list-group-item">
              <div className="d-flex justify-content-between">
                <h6>Price</h6>
                <h6>${totalAmount}</h6>
              </div>
            </li>
            <li class="list-group-item">
              <div className="d-flex justify-content-between">
                <h6>Discount</h6>
                <h6 className="text-success">- $40</h6>
              </div>
            </li>
            <li class="list-group-item">
              <div className="d-flex justify-content-between">
                <h6>Delivery Charges</h6>
                <h6>
                  <span className="text-decoration-line-through text-success">
                    $40
                  </span>
                  |Free
                </h6>
              </div>
            </li>
            <li class="list-group-item">
              <div className="d-flex justify-content-between">
                <h6>Total Amount</h6>
                <h6 className="text-success">${totalAmount}</h6>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
