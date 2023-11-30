import React, { memo } from "react";
import "./home.css";
import Accounting from "../accounting";

const Home = () => {

  return (
    <div className="home-container">
      <Accounting />
      <div className='footer-text'>The screen shown here is for demo purposes. In production, these entries will be  integrated into the client accounting systems.</div>
    </div>
  );
};

export default memo(Home);
