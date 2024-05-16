import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import '../node_modules/owl.carousel/dist/assets/owl.carousel.css';
import '../node_modules/owl.carousel/dist/assets/owl.theme.default.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topbar from "./Components/Topbar";
import Slides from "./Components/Slides";
import SampleProducts from "./Components/SampleProducts";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./Context/context";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckOut from "./Components/CheckOut";

function App() {
  const [cartData,setCartData]=useState([])

  const fetchCartData = ()=>{
    axios.get('https://6602682b9d7276a755532969.mockapi.io/cart').then((res)=>{
      setCartData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    fetchCartData()
  },[])
  return (
    <BrowserRouter>
    <UserProvider value={cartData}>
    <Topbar cartData={cartData}/>
    <Slides/>
  
      <Routes>
        <Route path="/" element={  <SampleProducts/>} />
        <Route path="/product" element={<Products cartData={cartData} setCartData={setCartData}/>} />
        <Route path="/cart" element={<Cart fetchCartData={fetchCartData}/>} />
        <Route path="/check/out" element={<CheckOut fetchCartData={fetchCartData}/>} />
      </Routes>
      <Toaster/>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
