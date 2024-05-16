import React, { useContext } from "react";
import loginPng from "../images/login.png";
import "./cart.css";
import userContext from "../Context/context";
import { addDays, format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart({fetchCartData}) {
  const navigate = useNavigate()
  const cartList = useContext(userContext)
  console.log(cartList)

  const totalAmount = cartList.reduce((prev,curr)=>prev+Number(curr.offerprice),0)
  const RemoveCart = (id)=>{
    axios.delete(`https://6602682b9d7276a755532969.mockapi.io/cart/${id}`).then((res)=>{
      toast.success("Cart Item Removed")
      fetchCartData()
    })
  }
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-8 left-cart">
          <ul class="list-group">
            {
              cartList && cartList.map((item)=>{
                return <li class="list-group-item list-group-item-light my-2">
                <div className="cart-list">
                  <div className="px-1">
                    <img src={item.image} className="cart-img" />
                  </div>
                  <div className="px-1">
                    <h3>{item.productName}</h3>
                    <p>
                     {item.description}
                    </p>
                    <div>Price:$ {item.offerprice}</div>
                    <div>
                      <button className="btn btn-outline-danger" onClick={()=>RemoveCart(item.id)}>Remove</button>
                    </div>
                  </div>
                  <div className="px-1">
                    Delivery by {format(new Date(addDays(new Date(),5)),'dd/MMM/yyyy')} | <span>$40 Free</span>
                  </div>
                </div>
              </li>
              })
            }
            
          </ul>
        </div>
        <div className="col-4 right-cart">
          <ul class="list-group">
            <li class="list-group-item"><h5 className="text-muted">Price Details</h5></li>
            <li class="list-group-item"><div className="d-flex justify-content-between"><h6>Items</h6><h6>{cartList.length}</h6></div></li>
            <li class="list-group-item"><div className="d-flex justify-content-between"><h6>Price</h6><h6>${totalAmount}</h6></div></li>
            <li class="list-group-item"><div className="d-flex justify-content-between"><h6>Discount</h6><h6 className="text-success">- $40</h6></div></li>
            <li class="list-group-item"><div className="d-flex justify-content-between"><h6>Delivery Charges</h6><h6 ><span className="text-decoration-line-through text-success">$40</span>|Free</h6></div></li>
            <li class="list-group-item"><div className="d-flex justify-content-between"><h6>Total Amount</h6><h6 className="text-success">${totalAmount}</h6></div></li>
          </ul>
          <div className="text-center">
            <button className="pay-btn" onClick={()=>navigate('/check/out')}>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
