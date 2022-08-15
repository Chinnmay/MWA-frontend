import React, { useEffect, useState } from "react";
import {Formik, Form, Field} from 'formik';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { TextField } from '../reusable/TextField';
import getFarmerDetails from './getFarmerDetails';
import editFarmerDetails from "./editFarmerDetails";
import { Link } from "react-router-dom";
import validationSchema from "./validationSchema";
import ModalAlert from "../reusable/ModalAlert";
import { styles } from './styles';
import moment from 'moment';
import stateDistrictData from "../../assets/static/IndiaStateDistrict";
import Select from "react-select";
import getCrops from "../IssueDetails/getAllCrops";

const FarmerDetails = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [contact, setContact] = useState(props.mobileNumber);
    const [farmerDetails, setFarmerDetails] = useState(null);
    const [showGetDetails, setShowGetDetailsAlert] = useState(false);
    const [showEditAlert, setShowEditAlert] = useState(false);
    const [selectedState, setSelectedState] = useState({ label: "", value: "" });
    const [selectedDistrict, setSelectedDistrict] = useState({ label: "", value: "" });
    const [allCrops, setAllCrops] = useState([]);

    const loadFarmerDetails = async() => {
        const farmerDetailsResponse = await getFarmerDetails(contact);
        if(farmerDetailsResponse.status == 200) {
            setFarmerDetails(farmerDetailsResponse.data);
            setSelectedState({
                label: farmerDetailsResponse.data.state,
                value: farmerDetailsResponse.data.state,
            });
            setSelectedDistrict({
                label: farmerDetailsResponse.data.district,
                value: farmerDetailsResponse.data.district,
            })
        }
        else {
            setShowGetDetailsAlert(true);
        }
    }

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
        loadFarmerDetails();
    },[]);

    const handleEditFarmer = async(values) => {
        const editFarmerResponse = await editFarmerDetails(values);
        if(editFarmerResponse.status==200){
            window.location.reload();
        }
        else {
            setShowEditAlert(true);
        }
    }

    return(
        <div>
        {farmerDetails?
        <Formik
            initialValues={farmerDetails}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                if(selectedState.value && selectedDistrict.value){
                    values.state = selectedState.value;
                    values.district = selectedDistrict.value;
                    handleEditFarmer(values);
                }
            }}
        >
            {(formikProps) => {
                const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue, isValid } = formikProps;
                return (
                <Card>
                    <Card.Header style={styles.displayCardHeader}>
                    <Row>
                        <Col sm={6} style={{alignSelf: 'center'}}>
                            <h5>Farmer Details</h5>
                        </Col>
                        <Col className="text-right mr-3">
                            {!isEdit?
                                <button className="btn btn-light" type="button" onClick={()=>setIsEdit(true)} >Edit</button>
                            :   <div>
                                    <button className="btn btn-success mr-3" type="submit" onClick={()=>handleSubmit()} >Save</button>
                                    <button className="btn btn-danger" type="button" onClick={()=>window.location.reload()} >Cancel</button>
                                </div>                             
                            }
                        </Col>
                    </Row>
                    </Card.Header>
                    <Card.Body>
                    <Form>
                        <TextField label="Full Name" name="fullName" type="text" disabled={!isEdit}/>
                        <Row>
                            <Col md={6}>
                                <TextField label="Mobile Number" name="mobileNumber" type="text" disabled={true}/>
                            </Col>
                            <Col md={6}>
                                <TextField label="WhatsApp Number" name="whatsappNumber" type="text" disabled={!isEdit}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                {/* <TextField label="State" name="state" type="text" disabled={!isEdit}/> */}
                                <label style={{ display: 'block'}}>State</label>
                                <Select
                                    name="state"
                                    placeholder="Select State"
                                    value={selectedState}
                                    onBlur={handleBlur}
                                    onChange={(selectedOption) => {
                                        setSelectedState(selectedOption);
                                    }}
                                    onBlur={handleBlur}
                                    isDisabled={!isEdit}
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
                                {/* <TextField label="District" name="district" type="text" disabled={!isEdit}/>         */}
                                <label style={{ display: 'block'}}>District</label>
                                <Select
                                    name="district"
                                    placeholder="Select District"
                                    value={selectedDistrict}
                                    onBlur={handleBlur}
                                    onChange={(selectedOption) => {
                                        setSelectedDistrict(selectedOption);
                                    }}
                                    onBlur={handleBlur}
                                    isDisabled={!isEdit}
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
                                <TextField label="Town/Village" name="townVillage" type="text" disabled={!isEdit}/>
                            </Col>
                        </Row>                                                        
                        <Row>
                            <Col>
                                <label style={{ display: 'block'}}>Currently Cultivated Crops</label>
                                <Select
                                    defaultValue = {values.currentCropsCultivated.split(',')}
                                    name="currentCropsCultivated"
                                    placeholder="Select Currently Cultivated Crops"
                                    onBlur={handleBlur}
                                    onChange={(selectedOption) => {
                                        // console.log(selectedOption.toString());
                                        values.currentCropsCultivated = selectedOption.toString();
                                    }}
                                    onBlur={handleBlur}
                                    options={allCrops}
                                    getOptionLabel ={(optlabel)=>optlabel}
                                    getOptionValue ={(optval)=>optval}
                                    isMulti={true}
                                    isDisabled={!isEdit}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label style={{ display: 'block'}}>Previously Cultivated Crops</label>
                                <Select
                                    defaultValue = {values.previousCropsCultivated.split(',')}
                                    name="previousCropsCultivated"
                                    placeholder="Select Previously Cultivated Crops"
                                    onBlur={handleBlur}
                                    onChange={(selectedOption) => {
                                        // console.log(selectedOption.toString());
                                        values.previousCropsCultivated = selectedOption.toString();
                                    }}
                                    onBlur={handleBlur}
                                    options={allCrops}
                                    getOptionLabel ={(optlabel)=>optlabel}
                                    getOptionValue ={(optval)=>optval}
                                    isMulti={true}
                                    isDisabled={!isEdit}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                <label style={{ display: 'block'}}>Paid Member</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Paid member" name="paid" disabled={!isEdit}>
                                    <option value="No">No</option>        
                                    <option value="Yes">Yes</option>
                                </Field>
                            </Col>
                            <Col md={6}>
                                <TextField label="Land Acreage" name="landAcreage" type="text" disabled={!isEdit}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <label style={{ display: 'block'}}>Existing Customer</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Existing Customer" name="existingCustomer" disabled={!isEdit}>
                                    <option value="No">No</option>        
                                    <option value="Yes">Yes</option>
                                </Field>
                            </Col>
                            {values.existingCustomer=="Yes"?<Col md={6}>
                                <TextField label="Using Manshya Products Since (Year)" name="usingProductsSince" type="text" disabled={!isEdit}/>
                            </Col>:null}
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                <label style={{ display: 'block'}}>Soil Testing Status</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Soil Testing Status" name="soilTestingStatus" disabled={!isEdit}>
                                    <option value="Not Done">Not Done</option>        
                                    <option value="Done">Done</option>
                                </Field>
                            </Col>
                            {values.soilTestingStatus=="Done"?<Col md={6}>
                                <TextField label="Last Soil Tested On (Year)" name="lastSoilTestOn" type="text" disabled={!isEdit}/>  
                            </Col>:null}
                        </Row>
                        <Row>
                            <Col md={6}>
                                <TextField label="Farmer Registration Date" name="createdAt" type="text" value={moment(values.createdAt).format("DD-MMM-YYYY")} disabled={true}/>
                            </Col>
                            <Col md={6}>
                                <TextField label="Last Updated" name="updatedAt" type="text" value={moment(values.updatedAt).format("DD-MMM-YYYY")} disabled={true}/>        
                            </Col>
                        </Row>
                    </Form>  
                    </Card.Body>  
                </Card>     
            )}}           
        </Formik>
        :null}
        {showGetDetails && <ModalAlert
            size="lg"
            variant="danger"
            message="Error Occurred while fetching farmer details!"
            resetCallback={setShowGetDetailsAlert}
        />}
        {showEditAlert && <ModalAlert
            size="lg"
            variant="danger"
            message="Error Occurred! Edit action failed."
            resetCallback={setShowEditAlert}
        />}
        </div>
    )
}

export default FarmerDetails;
