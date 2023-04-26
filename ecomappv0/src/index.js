// Almost out of storage … If you run out, you can't create or edit files, send or receive emails on Gmail, or back up to Google Photos.
// npm i --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome
// npm i -D react-router-dom
//npm install --save-dev @fortawesome/fontawesome-free


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ClassComponent from './ClassComponent';
import reportWebVitals from './reportWebVitals';
import AddUpdateDelete from './AddUpdateDelete';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Cart from "./Cart";
import ProductDescription from "./ProductDescription";
import NoPage from "./NoPage";
import Login from "./Login";
import Logout from "./Logout";
import Footer from "./Footer";

import Signup from "./Signup";
import '@fortawesome/fontawesome-free/css/all.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element={<Logout />} />
          <Route path="add_product" element={<AddProduct />} />
          <Route path="product_list" element={<ProductList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product_description" element={<ProductDescription />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();