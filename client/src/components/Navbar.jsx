import React from "react";
import { Layout } from "antd";
import logo from "../images/logo-flexxus-header.png";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header
      style={{
        backgroundColor: "#D9D9D9",
        height: "91px",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        padding: "0 20px",
      }}
    >
      <img src={logo} alt="Logo" style={{ height: "60px", paddingRight: "20px" }} />
    </Header>
  );
};

export default Navbar;
