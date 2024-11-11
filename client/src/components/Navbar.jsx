import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "./../redux/auth/loginSlice";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const userName = localStorage.getItem("userName");
  console.log(userName, "user name");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/login"); // Redirect to login page
  };

  return (
    <Navbar
      bg="light"
      data-bs-theme="light"
      sticky="top"
      style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px" }}
    >
      <Container>
        <Navbar.Brand as={Link} to={"/"} className="fw-bold fs-5">
          DASHBORAD
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            as={Link}
            to={"/"}
            className="fw-bold fs-5"
            style={{ marginLeft: 50 }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={"/dashboard/employees"}
            className="fw-bold fs-5"
            style={{ marginLeft: 50 }}
          >
            Employee List
          </Nav.Link>
        </Nav>
        <p className="fw-bold fs-3">{userName}</p>
        <Button
          variant="dark"
          onClick={handleLogout}
          style={{ marginLeft: 15 }}
        >
          logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
