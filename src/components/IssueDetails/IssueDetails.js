import React, { useEffect, useState } from "react";
import {Formik, Form, Field} from 'formik';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { TextField } from '../reusable/TextField';
import { Link } from "react-router-dom";
import validationSchema from './validationSchema';
import ModalAlert from "../reusable/ModalAlert";
import { styles } from './styles';
import moment from 'moment';
import getAllUsers from "./getAllUsers";
import getLabels from "./getlabels";
import getProducts from "./getProducts";
import getCrops from "./getAllCrops";
import colors from "../../config/colors";
import editIssueDetails from "./editIssue";
import Select from "react-select";
import LoadingSpinner from "../reusable/LoadingSpinner";

const IssueDetails = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [issueDetails, setIssueDetails] = useState(props?.issueDetails);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allLabels, setAllLabels] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [allCrops, setAllCrops] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [showEditIssueAlert, setShowEditIssueAlert] = useState(false);

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

    const loadIds = () => {
        if(issueDetails){
            console.log(issueDetails);
            // if(issueDetails.reporter){
            //     issueDetails.reporterName = issueDetails.reporter.fullName;
            //     console.log(issueDetails.reporter.fullName);
                // issueDetails.reporter = issueDetails.reporter._id;
                // console.log(issueDetails.reporter._id);
            // }
            if(issueDetails.reporter){
                issueDetails.reporter = issueDetails.reporter._id;
            }
            if(issueDetails.assignee){
                issueDetails.assignee = issueDetails.assignee._id;
            }
            if(issueDetails.cropID){
                issueDetails.cropID = issueDetails.cropID._id;
                if(issueDetails.categoryID){
                    issueDetails.categoryID = issueDetails.categoryID._id;
                    if(issueDetails.problemID){
                        issueDetails.problemID = issueDetails.problemID._id;
                    }
                }
            }
            // if(issueDetails.productsRecommended){
            //     issueDetails.selectedproductsRecommended = issueDetails.productsRecommended[0];
            // }
            // if(issueDetails.labels){
            //     issueDetails.selectedlabels = issueDetails.labels[0];
            // }
        }
    }

    useEffect(()=> {
        setFetching(true);
        loadAllUsers();
        loadLabels();
        loadProducts();
        loadCrops();
        loadIds();
        setFetching(false);
    },[]);

    // useEffect(()=> {
    //     setFetching(true);
    //     loadIds();
    //     setFetching(false);
    // },[issueDetails]);


    const handleEditIssue = async (values) => {
        console.log("In handle edit issue");
        if(values.issueCode && values.issueType && values.status && values.reporter && values.assignee ){
            
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
            const editIssueResponse = await editIssueDetails(values);
            if(editIssueResponse.status == 200){
                console.log(editIssueResponse);
                setIsEdit(false);
                await props.reloadData();
                window.location.reload();
            }
            else{
                console.log(editIssueResponse);
                setShowEditIssueAlert(true);
            } 
        }
        else{
            console.log("Error");
            setShowEditIssueAlert(true);
        }
        
    };

    const handleCancel = () => {
        setIsEdit(false);
        window.location.reload()
    }

    return(
        <>
        {!issueDetails && fetching ? (
            <LoadingSpinner />
          ) : (
        <Formik
            enableReinitialize={true}
            initialValues={issueDetails}
            validationSchema={validationSchema}
            onSubmit={(values) => {

                console.log(values);
                console.log("HIiii");
                handleEditIssue(values);
            }}
        >
            {(formikProps) => {
                const { handleSubmit, resetForm, handleChange, handleBlur, values, touched, errors, setFieldValue, isValid } = formikProps;
                return (
                <Card>
                    <Card.Header style={styles.displayCardHeader}>
                    <Row>
                        <Col sm={6} style={{alignSelf: 'center'}}>
                            <h3>Issue Details</h3>
                        </Col>
                        <Col className="text-right mr-3">
                            {!isEdit?
                                <button className="btn btn-light" type="button" onClick={()=>setIsEdit(true)} >Edit</button>
                            :   <div>
                                    <button className="btn btn-success mr-3" type="submit" onClick={()=> {console.log(values);console.log("beforehandle");handleSubmit()}}>Save</button>
                                    <button className="btn btn-danger" type="button" onClick={()=> handleCancel()}>Cancel</button>
                                </div>                             
                            }
                        </Col>
                    </Row>
                    </Card.Header>
                    <Card.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <TextField label="Issue Id" name="issueCode" type="text" disabled={true}/> 
                            </Col>
                            <Col md={4}>
                                <label style={{ display: 'block'}}>Issue Status</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Issue Status" name="status" disabled={!isEdit}>
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="SolutionProvided">SolutionProvided</option>
                                    <option value="In Follow Up">In Follow Up</option>
                                    <option value="Done">Done</option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="Rejected">Rejected</option>
                                </Field>
                            </Col>
                            <Col md={4}>
                                <label style={{ display: 'block'}}>Issue Type</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Issue Type" name="issueType" disabled={!isEdit}>
                                    <option value="Crop Related">Crop Related</option>
                                    <option value="Soil Related">Soil Related</option>
                                    <option value="Fertilizer Management">Fertilizer Management</option>
                                    <option value="Other">Other</option>
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <label style={{ display: 'block'}}>Reporter</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Reporter" name="reporter" disabled={true}>
                                    {allUsers.map(val => (
                                        <option value={val._id}>{val.fullName}</option>
                                    ))}        
                                </Field>
                            </Col>
                            <Col md={6}>
                                <label style={{ display: 'block'}}>Assignee</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Assign To" name="assignee" disabled={!isEdit}>
                                    {allUsers.map(val => (
                                        <option value={val._id}>{val.fullName}</option>
                                    ))}        
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField label="Issue Title" name="title" type="text" disabled={!isEdit}/>
                            </Col>
                        </Row>                                                        
                        <Row className="mt-2">
                            <Col md={9}>
                                <label style={{ display: 'block'}}>Issue Labels</label>
                                {/* <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Issue Labels" name="selectedlabels" disabled={!isEdit}>
                                    <option value={null} style={{color: colors.grey}}>Select Label</option>
                                    {allLabels.map(val => (
                                        <option value={val._id}>{val.label}</option>
                                    ))}
                                </Field> */}
                                <Select
                                    defaultValue = {values.labels}
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
                                    isDisabled={!isEdit}
                                />
                            </Col>
                            <Col md={3}>
                                <label style={{ display: 'block'}}>Paid Issue</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Paid Issue" name="paid" disabled={!isEdit}>
                                    <option value={false}>No</option>        
                                    <option value={true}>Yes</option>
                                </Field>
                            </Col>
                        </Row>
                        {values && (values.issueType=="Crop Related" || values.issueType=="Fertilizer Management") ?
                        <Row className="mt-2">
                            <Col md={4}>
                                <label style={{ display: 'block'}}>Crop</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Crop" name="cropID" disabled={!isEdit} onClick={()=> {values.categoryID=null;values.problemID=null}}>
                                    <option value={null} style={{color: colors.grey}}>Select Crop</option>
                                    {allCrops.map(val => (
                                        <option value={val._id}>{val.crop}</option>
                                    ))}        
                                </Field>
                            </Col>
                            {values.cropID && <Col md={4}>
                                <label style={{ display: 'block'}}>Category</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Category" name="categoryID" disabled={!isEdit} onClick={()=> {values.problemID=null}}>
                                    <option value={null} style={{color: colors.grey}}>Select Category</option>
                                    {values.cropID && allCrops.filter((crop) => crop._id == values.cropID)[0] && 
                                     allCrops.filter((crop) => crop._id == values.cropID)[0].categories.map(val => (
                                        <option value={val._id}>{val.category}</option>
                                    ))}        
                                </Field>
                            </Col>}
                            {values.categoryID && values.cropID && <Col md={4}>
                                <label style={{ display: 'block'}}>Problem Identified</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Problem Identified" name="problemID" disabled={!isEdit}>
                                    <option value={null} style={{color: colors.grey}}>Select Problem</option>
                                    {values.categoryID && values.cropID && allCrops.filter((crop) => crop._id == values.cropID)[0] && allCrops.filter((crop) => crop._id == values.cropID)[0].categories.filter((cat) => cat._id == values.categoryID)[0] && 
                                        allCrops.filter((crop) => crop._id == values.cropID)[0].categories.filter((cat) => cat._id == values.categoryID)[0].problems.map(val => (
                                        <option value={val._id}>{val.problemText}</option>
                                    ))}       
                                </Field>
                            </Col>}
                        </Row>
                        : null}
                        <Row className="mt-2">
                            <Col>
                                <label style={{ display: 'block'}}>Products Recommended</label>
                                {/* <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Products Recommended" name="selectedproductsRecommended" disabled={!isEdit}>
                                    <option value={null} style={{color: colors.grey}}>Select Product</option>
                                    {allProducts.map(val => (
                                        <option value={val._id}>{val.product}</option>
                                    ))}       
                                </Field> */}
                                <Select
                                    defaultValue={values.productsRecommended}
                                    name="productsRecommended"
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
                                    isDisabled={!isEdit}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <TextField label="Referred to Marketing Staff" name="marketstaff" type="text" disabled={!isEdit}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label style={{ display: 'block'}}>Solution Provided</label>
                                <Field style={{width:'100%', height: '7rem'}} label="Solution Provided" name="solutionprovided" as="textarea" disabled={!isEdit} />
                                {errors.solutionprovided && touched.solutionprovided && 
                                <div>
                                    <text style={styles.errorStyle}>{errors.solutionprovided}</text>
                                </div>}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <label style={{ display: 'block'}}>Issue Description</label>
                                <Field style={{width:'100%', height: '20rem', marginBottom: '1rem'}} label="Issue Description" name="description" as="textarea" disabled={!isEdit} />
                                {errors.description && touched.description && 
                                <div>
                                    <text style={styles.errorStyle}>{errors.description}</text>
                                </div>}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <TextField label="Issue Registration Date" name="createdAt" type="text" value={moment(values.createdAt).format("DD-MMM-YYYY")} disabled={true}/>
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
        )}
        {showEditIssueAlert &&
            <ModalAlert
                size="lg"
                variant="danger"
                message="Some Error Occurred."
                resetCallback={setShowEditIssueAlert}
            />
        }

        </>
    )
}

export default IssueDetails;
