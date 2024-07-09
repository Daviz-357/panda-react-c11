// Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Logout from "../../components/Logout/Logout";
import Discount from "../../components/Discount/Discount";


const Home = ({ handleLogout }) => {
  return (
    <div>
      <Discount />
    </div>
  );
};

export default Home;
