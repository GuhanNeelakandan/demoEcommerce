import axios from "axios";
import React, { useEffect, useState } from "react";
import loginPng from '../images/login.png'
import './products.css'
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function Products({cartData,setCartData}) {
  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState(true)
  const user = JSON.parse(localStorage.getItem('userData'))

  const fetchAllProducts = () => {
    axios
      .post("http://localhost:8000/all/product")
      .then((res) => {
        console.log(res)
        setLoading(false)
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleAddtoCart =(data)=>{
      console.log(data)
      axios.post('https://6602682b9d7276a755532969.mockapi.io/cart',data).then((res)=>{
        toast.success("Added to cart")
        setCartData([...cartData,data])
      }).catch((err)=>{
        console.log(err)
      })
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">

      <h1>Products</h1>
      {
        user?.role==='admin'&& <div><button>Add</button></div>
      }
      
      </div>
      <div className="container">
        <div className="row">
          {
           loading?<div>Loading.....</div>: products.map((list)=>{
            return <div className="col-4">
            <div class="card product-card" style={{width: "22rem"}}>
              <img src={list.image} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{list.productName}</h5>
                <p class="card-text">
                  {list.description}
                </p>
                <div><span class={Number(list.rating)>=3?"badge text-bg-success":"badge text-bg-danger"}>{list.rating} <i class="fa fa-star-o" aria-hidden="true"></i></span></div>
                <p >Price:<h5>${list.offerPrice} <span className="text-decoration-line-through text-muted fs-6">${list.price}</span></h5></p>
                {
                  user?.role==='admin' &&   <div className="my-2">
                  <button className="btn btn-sm btn-outline-primary mx-2">Edit</button><button className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
                }
              
              <div>
              <button className="add-btn" onClick={()=>handleAddtoCart(list)}><i class="fa fa-cart-plus" aria-hidden="true"></i> Add to Cart</button>
              <button className="buy-btn"><i class="fa fa-bolt" aria-hidden="true"></i> Buy Now</button>
              </div>
              </div>
            </div>
          </div>
           })
          }
          
        </div>
      </div>
      <Modal>
        <ModalHeader>Add Products</ModalHeader>
        <ModalBody>

        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
}

export default Products;
