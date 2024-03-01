// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomerLogin from "./pages/CustomerLogin";
import VendorLogin from "./pages/VendorLogin";
import SignUp from "./pages/SignUp";
import Orders from "./pages/Orders";
import Order1 from "./pages/Order1";
import Order2 from "./pages/Order2";
import Order3 from "./pages/Order3";
import Dashboard from "./pages/Dashboard";

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8086';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Order" element={<Orders />} />
        <Route path="/CustomerLogin" element={<CustomerLogin />} />
        <Route path="/VendorLogin" element={<VendorLogin />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Order1" element={<Order1 />} />
        <Route path="/Order2" element={<Order2 />} />
        <Route path="/Order3" element={<Order3 />} />
        <Route path="/DashBoard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;