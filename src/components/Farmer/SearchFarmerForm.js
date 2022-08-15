import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Dropdown } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import stateDistrictData from "../../assets/static/IndiaStateDistrict";
import Select from "react-select";
import { TextField } from "../reusable/TextField";

function SearchFarmerForm(props) {
  const SearchSchema = Yup.object().shape({
    mobileNumber: Yup.string().matches(/^\d{10}$/, "Phone number is not valid"),
    townVillage: Yup.string().matches(/^[a-zA-Z0-9 ]*$/, "Please enter valid input"),
    whatsappNumber: Yup.string().matches(/^\d{10}$/, "Phone number is not valid"),
    fullName: Yup.string().matches(/^[a-zA-Z0-9 ]*$/, "Please enter valid input")
  });
  const styles = {
    container: {
      marginTop: "5rem"
    },
    addButton: {
      marginLeft: "10%",
      marginRight: "10%",
      backgroundColor: "#2d543e"
    },
    formContainer: {
      width: "100%",
      border: "2px solid",
      marginLeft: "8%",
      marginRight: "8%",
      borderColor: "#2d543e",
      padding: "2%"
    },
    searchButton: {
      paddingLeft: "5%",
      paddingRight: "5%",
      backgroundColor: "#2d543e"
    }
  };
  return (
    <Formik
      validationSchema={SearchSchema}
      initialValues={{
        mobileNumber: "",
        townVillage: "",
        whatsappNumber: "",
        district: "",
        fullName: "",
        state: ""
      }}
      onSubmit={props.submitSearch}
    >
      {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
        <Form style={styles.formContainer} onSubmit={handleSubmit}>
          <Row>
            <Col xs={{ span: 6 }} md={{ span: 5 }} className="mb-3">
              <TextField label="Mobile Number" placeholder="Mobile Number" name="mobileNumber" type="text" />
            </Col>
            <Col xs={{ span: 6 }} md={{ span: 5, offset: 2 }} className="mb-3">
              <TextField label="Town/Village" placeholder="Town/Village" name="townVillage" type="text" />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 6 }} md={{ span: 5 }} className="mb-3">
              <TextField label="Whatsapp Number" placeholder="Whatsapp Number" name="whatsappNumber" type="text" />
            </Col>

            <Col xs={{ span: 6 }} md={{ span: 5, offset: 2 }} className="mb-3">
              <Select
                name="state"
                placeholder="Select State"
                value={values.state}
                onBlur={handleBlur}
                onChange={(selectedOption) => {
                  let event = { target: { name: "state", value: selectedOption } };
                  handleChange(event);
                }}
                onBlur={handleBlur}
                options={stateDistrictData.states.map((obj) => {
                  return { value: obj.state, label: obj.state };
                })}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 6 }} md={{ span: 5 }} className="mb-3">
              <TextField label="Full Name" placeholder="Full Name" name="fullName" type="text" />
            </Col>

            <Col xs={{ span: 6 }} md={{ span: 5, offset: 2 }} className="mb-3">
              <Select
                name="district"
                placeholder="Select District"
                value={values.district}
                onBlur={handleBlur}
                onChange={(selectedOption) => {
                  let event = { target: { name: "district", value: selectedOption } };
                  handleChange(event);
                }}
                onBlur={handleBlur}
                isDisabled={values.state?false:true}
                options={
                  values.state &&
                  values.state.value &&
                  stateDistrictData.states
                    .filter((obj) => obj.state === values.state.value)[0]
                    .districts.map((district) => {
                      return { value: district, label: district };
                    })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Button variant="primary" type="submit" style={styles.searchButton}>
                Search Farmer
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default SearchFarmerForm;
