import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductManager from "./Layout/Admin-site/pages/ProductManager";
import Home from "./Layout/Customer-site/pages/home";
import Login from "./Layout/Auth/Login";
import Register from "./Layout/Auth/Register";
import CustomerCart from "./Layout/Customer-site/pages/cart";
import CustomerExtend from "./Layout/Customer-site/pages/extend";
import ProductsDetail from "./Layout/Customer-site/pages/products/ProductDetail";
import FemaleProducts from "./Layout/Customer-site/pages/products/FemaleProducts";
import AdminExtend from "./Layout/Admin-site/pages/extend";
import OrderManager from "./Layout/Admin-site/pages/OrderManager";
import UsersManager from "./Layout/Admin-site/pages/Users/UsersManager";
import PageNotFound from "./Layout/NotFound/PageNotFound";
import DashBoard from "./Layout/Admin-site/pages/DashBoard";
import CategoryManager from "./Layout/Admin-site/pages/Category";
import Providers from "./Layout/Admin-site/pages/Providers";
import BrandsManager from "./Layout/Admin-site/pages/Brands";
import VoucherManager from "./Layout/Admin-site/pages/Voucher";
import BlogManager from "./Layout/Admin-site/pages/Blogs";
import PaymentManager from "./Layout/Admin-site/pages/Payments";
import OriginManager from "./Layout/Admin-site/pages/Origins";
import MaleProducts from "./Layout/Customer-site/pages/products/MaleProducts";
import Checkout from "./Layout/Customer-site/pages/Checkout";
import Profile from "./Layout/Customer-site/pages/profile";

function App() {
  return (
    <Routes>
      {/* auth */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="profile" element={<Profile />}></Route>

      {/* customer */}
      <Route path="/" element={<CustomerExtend />}>
        <Route index element={<Home />}></Route>
        <Route path="cart" element={<CustomerCart />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
        <Route path="male" element={<MaleProducts />}></Route>
        <Route path="female" element={<FemaleProducts />}></Route>
        <Route path="detail/:id" element={<ProductsDetail />}></Route>
      </Route>
      {/* admin */}
      <Route path="/admin" element={<AdminExtend />}>
        <Route index element={<DashBoard />}></Route>
        <Route path="product" element={<ProductManager />}></Route>
        <Route path="order" element={<OrderManager />}></Route>
        <Route path="user" element={<UsersManager />}></Route>
        <Route path="category" element={<CategoryManager />}></Route>
        <Route path="provider" element={<Providers />}></Route>
        <Route path="brand" element={<BrandsManager />}></Route>
        <Route path="voucher" element={<VoucherManager />}></Route>
        <Route path="origin" element={<OriginManager />}></Route>
        <Route path="blog" element={<BlogManager />}></Route>
        <Route path="payment" element={<PaymentManager />}></Route>
      </Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
}

export default App;
