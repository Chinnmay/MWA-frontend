import React, { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { Row, Col, Card } from 'react-bootstrap';
import { TextField } from '../reusable/TextField';
import { useLocation, useParams, useHistory } from "react-router-dom";
import validationSchema from "./validationSchema";
import ModalAlert from "../reusable/ModalAlert";
import { styles } from './styles';
import getAllUsers from "../IssueDetails/getAllUsers";
import getLabels from "../IssueDetails/getlabels";
import getProducts from "../IssueDetails/getProducts";
import getCrops from "../IssueDetails/getAllCrops";
import colors from "../../config/colors";
import postAddIssue from "./postAddIssue";
import Select from "react-select";

const initialValues = {
    issueCode: null,
    farmerID: null,
    reporter: null,
    assignee: null,
    title: null,
    cropID: null,
    categoryID: null,
    problemID: null,
    productsRecommended: [],
    labels: [],
    description: null,
    status: "New",
    paid: false,
    issueType: 'Crop Related'
}

const AddIssue = (props) => {
    const history = useHistory();
    const location = useLocation();
    const { mobileNumber } = useParams();
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allLabels, setAllLabels] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [allCrops, setAllCrops] = useState([]);

    const [showAddIssueAlert, setShowAddIssueAlert] = useState(false);

    const loadAllUsers = async () => {
        const allUsersResponse = await getAllUsers();
        if(allUsersResponse.status == 200){
            setAllUsers(allUsersResponse.data);
        }
        else{
            console.log(allUsersResponse);
        }
    }

    const loadLabels = async () => {
        const allLabelsResponse = await getLabels();
        if(allLabelsResponse.status == 200){
            setAllLabels(allLabelsResponse.data);
        }
        else{
            console.log(allLabelsResponse);
        }
    }

    const loadProducts = async () => {
        const allProductsResponse = await getProducts();
        if(allProductsResponse.status == 200){
            setAllProducts(allProductsResponse.data);
        }
        else{
            console.log(allProductsResponse);
        }
    }

    const loadCrops = async () => {
        const allCropsResponse = await getCrops();
        if(allCropsResponse.status == 200){
            setAllCrops(allCropsResponse.data);
        }
        else{
            console.log(allCropsResponse);
        }
    }

    const loadReporter = async () => {
        const storedReporterId = await JSON.parse(localStorage.getItem("user"))._id;
        initialValues.reporter = storedReporterId;
        initialValues.assignee = storedReporterId;
        initialValues.farmerID = location.state.farmerID;
    }

    useEffect(()=> {
        setLoadingInfo(true);
        loadAllUsers();
        loadLabels();
        loadProducts();
        loadCrops();
        loadReporter();
        setLoadingInfo(false);
    },[]);

    const handleAddIssue = async (values) => {
        if(values.farmerID && values.assignee && values.reporter && values.status && values.issueType){
            // values.labels=[];
            // values.productsRecommended=[];
            // if(values.selectedlabels){
            //     values.labels.push(values.selectedlabels);
            // }
            // if(values.selectedproductsRecommended){
            //     values.productsRecommended.push(values.selectedproductsRecommended);
            // }
            if(values.issueType=="Other" || values.issueType=="Soil Related"){
                values.cropID = null;
                values.categoryID = null;
                values.problemID = null;
            }
            else{
                if(values.cropID == null){
                    values.categoryID = null;
                    values.problemID = null;
                }
                else if(values.categoryID == null){
                    values.problemID = null;
                }
            }
            console.log(values);
            const addIssueResponse = await postAddIssue(values);
            if(addIssueResponse.status == 200){
                console.log("HII"); 
                history.push(`/viewIssue/${addIssueResponse.data.issue.issueCode}`);
            }
            else{
                setShowAddIssueAlert(true);
                console.log(addIssueResponse);
            } 
        }
        else{
            setShowAddIssueAlert(true);
            console.log('Error');
        }  
    };

    return(
        <>
        {loadingInfo ? null :
        <div>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
                handleAddIssue(values);
            }}
        >
            {(formikProps) => {
                const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue, isValid } = formikProps;
                return (
                <Card>
                    <Card.Header style={styles.displayCardHeader}>
                    <Row>
                        <Col className='text-center'>
                            Add Issue Details
                        </Col>
                    </Row>
                    </Card.Header>
                    <Card.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <label style={{ display: 'block'}}>Assign To</label>
                                <Field as="select" label="Assign To" name="assignee" 
                                    style={{width:'100%', height: '40%', marginBottom: '2rem', borderColor: errors.assignee ? 'red' : ''}}
                                >
                                    <option value={null} style={{color: colors.grey}}>Select Assignee</option>
                                    {allUsers.map(val => (
                                        <option value={val._id}>{val.fullName}</option>
                                    ))}            
                                </Field>
                            </Col>
                            <Col md={6}>
                                <label style={{ display: 'block'}}>Issue Type</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Issue Type" name="issueType">
                                    <option value="Crop Related">Crop Related</option>
                                    <option value="Soil Related">Soil Related</option>
                                    <option value="Fertilizer Management">Fertilizer Management</option>
                                    <option value="Other">Other</option>
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField label="Issue Title" name="title" type="text"/>
                            </Col>
                        </Row>                                                        
                        <Row className="mt-3">
                            <Col md={9}>
                                <label style={{ display: 'block'}}>Issue Labels</label>
                                {/* <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Issue Labels" name="selectedlabels">
                                    <option value={null} style={{color: colors.grey}}>Select Label</option>
                                    {allLabels.map(val => (
                                        <option value={val._id}>{val.label}</option>
                                    ))}        
                                </Field> */}
                                <Select
                                    name="labels"
                                    placeholder="Select Issue Labels"
                                    onBlur={handleBlur}
                                    onChange={(selectedOption) => {
                                        console.log(selectedOption);
                                        values.labels = selectedOption;
                                    }}
                                    onBlur={handleBlur}
                                    options={allLabels}
                                    getOptionLabel ={(optlabel)=>optlabel.label}
                                    getOptionValue ={(optval)=>optval._id}
                                    isMulti={true}
                                />
                            </Col>
                            <Col md={3}>
                                <label style={{ display: 'block'}}>Paid Issue</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Paid Issue" name="paid">
                                    <option value={false}>No</option>        
                                    <option value={true}>Yes</option>
                                </Field>
                            </Col>
                        </Row>
                        {values && (values.issueType=="Crop Related" || values.issueType=="Fertilizer Management") ?
                        <Row className="mt-3">
                            <Col md={4}>
                                <label style={{ display: 'block'}}>Crop</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Crop" name="cropID" onClick={()=> {values.categoryID=null;values.problemID=null}}>
                                    <option value={null} style={{color: colors.grey}}>Select Crop</option>
                                    {allCrops.map(val => (
                                        <option value={val._id}>{val.crop}</option>
                                    ))}        
                                </Field>
                            </Col>
                            {values.cropID && <Col md={4}>
                                <label style={{ display: 'block'}}>Category</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Category" name="categoryID" onClick={()=> {values.problemID=null}}>
                                    <option value="" style={{color: colors.grey}}>Select Category</option>
                                    {values.cropID && allCrops.filter((crop) => crop._id == values.cropID)[0] && 
                                    values.cropID && allCrops.filter((crop) => crop._id == values.cropID)[0].categories.map(val => (
                                        <option value={val._id}>{val.category}</option>
                                    ))}        
                                </Field>
                            </Col>}
                            {values.categoryID && values.cropID && <Col md={4}>
                                <label style={{ display: 'block'}}>Problem Identified</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Problem Identified" name="problemID">
                                    <option value={null} style={{color: colors.grey}}>Select Problem</option>
                                    {values.categoryID && values.cropID && allCrops.filter((crop) => crop._id == values.cropID)[0] && 
                                        allCrops.filter((crop) => crop._id == values.cropID)[0].categories.filter((cat) => cat._id == values.categoryID)[0] && 
                                        allCrops.filter((crop) => crop._id == values.cropID)[0].categories.filter((cat) => cat._id == values.categoryID)[0].problems.map(val => (
                                        <option value={val._id}>{val.problemText}</option>
                                    ))}       
                                </Field>
                            </Col>}
                        </Row>
                        : null}
                        <Row className="mt-3">
                            <Col>
                                {/* <label style={{ display: 'block'}}>Products Recommended</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Products Recommended" name="selectedproductsRecommended">
                                    <option value={null} style={{color: colors.grey}}>Select Product</option>
                                    {allProducts.map(val => (
                                        <option value={val._id}>{val.product}</option>
                                    ))}       
                                </Field> */}
                                <label style={{ display: 'block'}}>Products Recommended</label>
                                <Select
                                    // defaultValue={values.productsRecommended}
                                    name="productsRecommended"
                                    // value={values.productsRecommended}
                                    placeholder="Select Products Recommended"
                                    onBlur={handleBlur}
                                    onChange={(selectedOption) => {
                                        console.log(selectedOption);
                                        values.productsRecommended = selectedOption;
                                    }}
                                    onBlur={handleBlur}
                                    options={allProducts}
                                    getOptionLabel ={(optlabel)=>optlabel.product}
                                    getOptionValue ={(optval)=>optval._id}
                                    isMulti={true}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <label style={{ display: 'block'}}>Issue Description</label>
                                <Field style={{width:'100%', height: '20rem'}} label="Issue Description" name="description" as="textarea"/>
                                {errors.description && touched.description && 
                                <div>
                                    <text style={styles.errorStyle}>{errors.description}</text>
                                </div>}
                            </Col>
                        </Row>
                        <Row className="mt-1">
                            <Col className="text-center">
                            <button  className="btn btn-success" type="button" onClick={()=>handleSubmit()}>Save</button>
                            </Col>
                        </Row>
                        
                    </Form>  
                    </Card.Body>  
                </Card>     
            )}}           
        </Formik>

        {showAddIssueAlert &&
            <ModalAlert
                size="lg"
                variant="danger"
                message="Some Error Occurred"
                resetCallback={setShowAddIssueAlert}
            />}
        </div>
        }
    </>
    )
}

export default AddIssue;
