import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Container, Button, Row, Col, Card, Badge, ListGroup, Alert } from "react-bootstrap";
import { TextField } from "./reusable/TextField";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ModalAlert from "../components/reusable/ModalAlert";
import stateDistrictData from "../assets/static/IndiaStateDistrict";
import Select from "react-select";
import getCrops from "./IssueDetails/getAllCrops";

export const AddFarmer = () => {
  const history = useHistory();
  const styles = {
    contianerStyle: { marginTop: "5rem" },
    submitButton: {
      margin: "auto",
      display: "block",
      backgroundColor: "#2d543e"
    },
    formContainer: {
      width: "100%",
      border: "2px solid",
      borderColor: "#2d543e",
      padding: "2%"
    },
    displaySearchContainerCard: {
      marginLeft: "5%",
      marginRight: "5%"
    },
    displaySearchContainerCardHeader: {
      backgroundColor: "#2d543e",
      color: "white",
      textAlign: "center"
    },
    errorStyle: { 
      color: "red" ,
      fontSize: ".9rem",
      marginTop: 0,
  },
  };
  const validate = Yup.object({
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number is not valid")
      .required("Required"),
    whatsappNumber: Yup.string().matches(/^\d{10}$/, "Phone number is not valid"),
    fullName: Yup.string()
      .matches(/^[a-zA-Z ]*$/, "Name must only contain alphabets")
      .required("Required"),
    townVillage: Yup.string()
      .matches(/^[a-zA-Z ]*$/, "Town/Village must only contain alphabets")
      .required("Required"),
    landAcreage: Yup.string().matches(/^[a-zA-Z0-9,. ]*$/, "Please enter valid input"),
  });
  const [showAddFarmerAlert, setShowAddFarmerAlert] = useState(false);
  const [showAddFarmerSuccess, setShowAddFarmerSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedState, setSelectedState] = useState({ label: "", value: "" });
  const [selectedDistrict, setSelectedDistrict] = useState({ label: "", value: "" });
  const [allCrops, setAllCrops] = useState([]);

  const loadCrops = async () => {
    const allCropsResponse = await getCrops();
    if(allCropsResponse.status == 200){
        const reqcrops = [];
        allCropsResponse.data.map((item) => {
            reqcrops.push(item.crop);
        })
        setAllCrops(reqcrops);
    }
    else{
        console.log(allCropsResponse);
    }
  }

  useEffect(()=> {
    loadCrops();
  },[]);

  return (
    <Formik
      initialValues={{
        fullName: "",
        mobileNumber: "",
        whatsappNumber: "",
        townVillage: "",
        district: "",
        state: "",
        landAcreage: "",
        previousCropsCultivated: "",
        currentCropsCultivated: "",
        lastSoilTestOn: "",
        usingProductsSince: ""
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        if(selectedState.value && selectedDistrict.value){
        values.state = selectedState.value;
        values.district = selectedDistrict.value;
        console.log(values);
        axios.post(`${process.env.REACT_APP_API_URL}/api/farmer/addFarmer`, { values }).then(
          (res) => {
            if (res.data.message === "Farmer added successfully") {
              setShowAddFarmerSuccess(true);
              history.push({
                pathname: `/viewFarmer/${res.data.farmer.mobileNumber}`,
                state: { farmerID: res.data.farmer._id }
              });
              console.log(res);
            } else if (res.data.Message === "Mobile number already exists") {
              setErrorMessage(
                "Farmer with mobile number already exists in the system. Please try alternate mobile number"
              );
              setShowAddFarmerAlert(true);
              console.log(res);
            }
          },
          (err) => {
            setErrorMessage("Unexpected error occoured!");
            setShowAddFarmerAlert(true);
            console.log(err.Message);
          }
        );
        }
      }}
    >
      {(formik) => (
        <div style={styles.contianerStyle}>
          <Card style={styles.displaySearchContainerCard}>
            <Card.Header style={styles.displaySearchContainerCardHeader}>Add Farmer Details</Card.Header>
            <Card.Body style={styles.searchCardBody}>
              <Form>
                <TextField label="Full Name" name="fullName" type="text" />
                <Row>
                  <Col md={6}>
                    <TextField label="Mobile Number" name="mobileNumber" type="text" />
                  </Col>
                  <Col md={6}>
                    <TextField label="WhatsApp number" name="whatsappNumber" type="text" />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    {/* <TextField label="State" name="state" type="text"/> */}
                    <label style={{ display: 'block'}}>State</label>
                    <Select
                      name="state"
                      placeholder="Select State"
                      value={selectedState}
                      onBlur={formik.handleblur}
                      onChange={(selectedOption) => {
                          setSelectedState(selectedOption);
                      }}
                      onBlur={formik.handleblur}
                      options={stateDistrictData.states.map((obj) => {
                      return { value: obj.state, label: obj.state };
                      })}
                    />
                    {!selectedState.value ? 
                    <div>
                        <text style={styles.errorStyle}>{"Required"}</text>
                    </div> : null}      
                  </Col>
                  {selectedState.value && <Col md={4}>
                    {/* <TextField label="District" name="district" type="text"/>         */}
                    <label style={{ display: 'block'}}>District</label>
                    <Select
                      name="district"
                      placeholder="Select District"
                      value={selectedDistrict}
                      onBlur={formik.handleblur}
                      onChange={(selectedOption) => {
                          setSelectedDistrict(selectedOption);
                      }}
                      onBlur={formik.handleblur}
                      options={
                        selectedState &&
                        selectedState.value &&
                        stateDistrictData.states
                          .filter((obj) => obj.state === selectedState.value)[0]
                          .districts.map((district) => {
                            return { value: district, label: district };
                          })
                      }
                  />
                    {!selectedDistrict.value ? 
                    <div>
                      <text style={styles.errorStyle}>{"Required"}</text>
                    </div> : null}
                  </Col>}
                  <Col md={4}>
                      <TextField label="Town/Village" name="townVillage" type="text" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label style={{ display: 'block'}}>Currently Cultivated Crops</label>
                    <Select
                      name="currentCropsCultivated"
                      placeholder="Select Currently Cultivated Crops"
                      onBlur={formik.handleBlur}
                      onChange={(selectedOption) => {
                        formik.values.currentCropsCultivated = selectedOption.toString();
                      }}
                      onBlur={formik.handleBlur}
                      options={allCrops}
                      getOptionLabel ={(optlabel)=>optlabel}
                      getOptionValue ={(optval)=>optval}
                      isMulti={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label style={{ display: 'block'}}>Previously Cultivated Crops</label>
                    <Select
                      name="previousCropsCultivated"
                      placeholder="Select Previously Cultivated Crops"
                      onBlur={formik.handleBlur}
                      onChange={(selectedOption) => {
                        formik.values.previousCropsCultivated = selectedOption.toString();
                      }}
                      onBlur={formik.handleBlur}
                      options={allCrops}
                      getOptionLabel ={(optlabel)=>optlabel}
                      getOptionValue ={(optval)=>optval}
                      isMulti={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label style={{ display: "block" }}>Paid Member</label>
                    <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Paid member" name="paid">
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </Field>
                  </Col>
                  <Col md={6}>
                    <TextField label="Land Acreage" name="landAcreage" type="text" />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label style={{ display: "block" }}>Existing Customer</label>
                    <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Existing Customer" name="existingCustomer">
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </Field>
                  </Col>
                  {formik.values.existingCustomer=="Yes"?<Col md={6}>
                    <TextField label="Using Manshya Products Since (Year)" name="usingProductsSince" type="text" />
                  </Col>:null}
                </Row>
                <Row>
                  <Col md={6}>
                    <label style={{ display: "block" }}>Soil testing status</label>
                    <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="soilTestingStatus" name="soilTestingStatus">
                      <option value="Not Done">Not Done</option>
                      <option value="Done">Done</option>
                    </Field>
                  </Col>
                  {formik.values.soilTestingStatus === "Done" && (
                    <Col md={6}>
                      <TextField label="Last Soil Tested On" name="lastSoilTestOn" type="text" />
                    </Col>
                  )}
                </Row>
                <button className="btn btn-dark mt-3" style={styles.submitButton} type="submit">
                  Save
                </button>

                {showAddFarmerAlert && (
                  <ModalAlert size="lg" variant="danger" message={errorMessage} resetCallback={setShowAddFarmerAlert} />
                )}
                {showAddFarmerSuccess && (
                  <ModalAlert
                    size="lg"
                    variant="success"
                    message="Farmer added successfully!"
                    resetCallback={setShowAddFarmerSuccess}
                  />
                )}
              </Form>
            </Card.Body>
          </Card>
        </div>
      )}
    </Formik>
  );
};

export default AddFarmer;
