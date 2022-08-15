import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Form, Button, Modal, Alert } from "react-bootstrap";
import image from "../assets/images/LoginAvtaar.JPG";
import logo from "../assets/images/logo 1.svg";
import axios from "axios";
import ModalAlert from "../components/reusable/ModalAlert";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../config/Context";
const crypto = require("crypto");

function Login() {
  const history = useHistory();
  var context = useAppContext();
  const styles = {
    contianerStyle: { marginTop: "5rem" },
    logoImage: { maxWidth: "150px" },
    title: { textAlign: "center", fontWeight: "500", color: "#2d543e" },
    formContainer: {
      border: "2px solid",
      borderColor: "#2d543e",
      maxWidth: "500px"
    },
    avtaarImage: { marginLeft: "45%" },
    formInput: { border: "2px solid", borderColor: "#2d543e", borderRadius: "0px", textAlign: "center" },
    loginButton: { color: "white", backgroundColor: "#2d543e", fontWeight: "500" },
    footer: { color: "white", backgroundColor: "#2d543e", alignItems:"center", textAlign:"center"},
    forgotPassword: {
      fontWeight: "500",
      color: "black",
      backgroundColor: "transparent",
      border: "none",
      margin: "0px",
      padding: "0 0 2% 0"
    }
  };
  function loginHandler(event) {
    if (mobileNumber.length !== 10) {
      setValidationError({ errorMesage: "Please enter mobile number containing 10 digits" });
      setShowLoginAlert(true);
      return;
    }
    setValidationError({});
    var encodedPass = crypto
      .pbkdf2Sync(password, process.env.REACT_APP_PASSWORD_SECRET, 1000, 64, "sha512")
      .toString("hex");

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/login`, { mobileNumber: mobileNumber, password: encodedPass })
      .then(
        (res) => {
          console.log(res.data);
          if (res.data.message === "Login success") {
            //TODO: set context user
            context.setUser(res.data.user);
            if (res.data.user) {
              localStorage.setItem("user", JSON.stringify(res.data.user));
            }
            if (res.data.accessToken) {
              localStorage.setItem("accessToken", res.data.accessToken);
            }
            history.push("/");
          } else {
            setShowLoginAlert(true);
          }
        },
        (err) => {
          if (err.response.data.Message === "User Inactive") setIsInactive(true);
          setShowLoginAlert(true);
        }
      );
    event.preventDefault();
  }

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showForgotPasswordAlert, setShowForgotPasswordAlert] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [isInactive, setIsInactive] = useState(false);

  useEffect(() => {}, []);
  useEffect(() => {}, [isInactive]);

  const resetCallback = (boolVal) => {
    setShowLoginAlert(false);
    setIsInactive(false);
  };
  return (
    <Container style={styles.contianerStyle}>
      <Row className="justify-content-center">
        <Col xs={{ span: 6 }} md={{ span: 4 }} className="text-center">
          <Image src={logo} style={styles.logoImage} />
        </Col>
      </Row>
      {/* <Row className="justify-content-center mt-2">
        <Col md={{ span: 5 }}>
          <h5 style={styles.title}>Manshya Academy Of Crop </h5>
        </Col>
      </Row> */}
      <Row>
        <Col>
          <Container className={"mt-2 pb-2 px-2"} style={styles.formContainer}>
            <Row className="justify-content-center mt-3">
              <Col xs={12}>
                <Image src={image} height="40px" width="40px" style={styles.avtaarImage} />
              </Col>
            </Row>
            <Row className="justify-content-center mt-2">
              <Col xs={{ span: 10 }}>
                <Form.Control
                  value={mobileNumber}
                  style={styles.formInput}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Mobile Number"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col xs={{ span: 10, offset: 1 }}>
                <Form.Control
                  value={password}
                  style={styles.formInput}
                  type="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") loginHandler(e);
                  }}
                />
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col xs={{ span: 5, offset: 1 }} md={{ span: 5, offset: 2 }}>
                <Button className="px-4" type="submit" style={styles.loginButton} onClick={(e) => loginHandler(e)}>
                  Login
                </Button>
              </Col>
            </Row>
            <Row className="justify-content-center mt-2">
              <Col xs={{ span: 7, offset: 2 }} md={{ offset: 4 }}>
                <Button style={styles.forgotPassword} onClick={(e) => setShowForgotPasswordAlert(true)}>
                  Forgot Password?
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      {showLoginAlert &&
        (!validationError.errorMesage ? (
          isInactive ? (
            <ModalAlert
              size="lg"
              variant="danger"
              message="Your account is INACTIVE. Please contact admin to activate your account and try again"
              resetCallback={resetCallback}
            />
          ) : (
            <ModalAlert
              size="lg"
              variant="danger"
              message="The credentials you entered are incorrect. Please check and try again."
              resetCallback={resetCallback}
            />
          )
        ) : (
          <ModalAlert size="lg" variant="danger" message={validationError.errorMesage} resetCallback={resetCallback} />
        ))}

      {showForgotPasswordAlert && (
        <ModalAlert
          size="lg"
          variant="info"
          message="Please contact admin to reset your password and try again"
          resetCallback={setShowForgotPasswordAlert}
        />
      )}
      <Row className="fixed-bottom" style={styles.footer}>
        <Col className="pt-2">
        <p>Copyright © All rights reserved with Manshya Marketing Pvt. Ltd. </p>
        </Col>
        </Row>
    </Container>
  );
}

export default Login;
