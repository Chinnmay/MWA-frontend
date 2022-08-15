import { Navbar, Nav, Container, NavbarBrand } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import logo from "../assets/images/manshyaLogoTransparent.png";
import colors from "../config/colors";
import { useAppContext } from "../config/Context";

const Navigation = () => {
  const isAdmin = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user")).role
        ? JSON.parse(localStorage.getItem("user")).role == "admin"
          ? true
          : false
        : false
      : false
    : false;

  var context = useAppContext();
  return (
    <>
      <Navbar collapseOnSelect fixed="top" expand="sm" variant="dark" style={{ backgroundColor: colors.green }}>
        <Navbar.Brand className="p-0">
          <Link to={`/`}>
            <img src={logo} style={{ width: "7rem", height: "2.25rem", marginBottom: "0.5rem", alignSelf: "center" }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/" style={{ marginLeft: "1.5rem" }}>
              Home
            </Nav.Link>
            <Nav.Link href="/farmer" style={{ marginLeft: "1.5rem" }}>
              Farmer
            </Nav.Link>
            <Nav.Link href="/crop" style={{ marginLeft: "1.5rem" }}>
              Crop
            </Nav.Link>
            <Nav.Link href="/productAndLabel" style={{ marginLeft: "1.5rem" }}>
              Products/Labels
            </Nav.Link>
            {isAdmin ? (
              <Nav.Link href="/signUp" style={{ marginLeft: "1.5rem" }}>
                SignUp
              </Nav.Link>
            ) : null}
          </Nav>
          <Nav className="ml-auto">
            <Navbar.Text style={{ marginRight: "1.5rem" }}>
              Hello, {JSON.parse(localStorage.getItem("user")).fullName}
            </Navbar.Text>
            <Nav.Link
              href="/login"
              style={{ marginRight: "1.5rem" }}
              onClick={() => {
                localStorage.setItem("accessToken", "");
                localStorage.setItem("user", "");
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default withRouter(Navigation);
