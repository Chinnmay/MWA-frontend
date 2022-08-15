import React, { useEffect, useState } from "react";
import {Formik, Form, Field} from 'formik';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { TextField } from '../reusable/TextField';
import validationSchema from './validationSchema';
import ModalAlert from "../reusable/ModalAlert";
import { styles } from './styles';
import getAllUsers from "../IssueDetails/getAllUsers";
import getCrops from "../IssueDetails/getAllCrops";
import colors from "../../config/colors";

const initialValues = {
    issueCode: null,
    reporter: null,
    assignee: null,
    cropID: null,
    categoryID: null,
    problemID: null,
}

const SearchIssueForm = (props) => {
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allCrops, setAllCrops] = useState([]);

    const [showSearchAlert, setShowSearchAlert] = useState(false);

    const loadAllUsers = async () => {
        const allUsersResponse = await getAllUsers();
        if(allUsersResponse.status == 200){
            setAllUsers(allUsersResponse.data);
        }
        else{
            console.log(allUsersResponse);
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

    useEffect(()=> {
        setLoadingInfo(true);
        loadAllUsers();
        loadCrops();
        setLoadingInfo(false);
    },[]);

    return(
        <>
        {allUsers && allCrops && !loadingInfo &&
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                if(values.assignee == ''){
                    values.assignee = null
                }
                if(values.reporter == ''){
                    values.reporter = null
                }
                if(values.cropID == ''){
                    values.cropID = null;
                    values.categoryID = null;
                    values.problemID = null;
                }
                if(values.categoryID == ''){
                    values.categoryID = null;
                    values.problemID = null;
                }
                if(values.problemID == ''){
                    values.problemID = null;
                }
                props.submitSearch(values);
            }}
        >
            {(formikProps) => {
                const { handleSubmit, resetForm, handleChange, handleBlur, values, touched, errors, setFieldValue, isValid } = formikProps;
                return (
                <Card>
                    <Card.Header style={styles.displayCardHeader}>
                    <Row>
                        <Col className="text-center"><h4>Search Issue</h4></Col>
                    </Row>
                    </Card.Header>
                    <Card.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <TextField label="Issue Id" name="issueCode" type="text"/> 
                            </Col>
                            <Col md={6}>
                                <label style={{ display: 'block'}}>Crop</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Crop" name="cropID" onClick={()=> {values.categoryID=null;values.problemID=null}}>
                                    <option value={''} style={{color: colors.grey}}>Select Crop</option>
                                    {allCrops.map(val => (
                                        <option value={val._id}>{val.crop}</option>
                                    ))}        
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <label style={{ display: 'block'}}>Assignee</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Assign To" name="assignee">
                                    <option value={''} style={{color: colors.grey}}>Select Assignee</option>
                                    {allUsers.map(val => (
                                        <option value={val._id}>{val.fullName}</option>
                                    ))}        
                                </Field>
                            </Col>
                            {values.cropID && <Col md={6}>
                                <label style={{ display: 'block'}}>Category</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Category" name="categoryID" onClick={()=> {values.problemID=null}}>
                                    <option value={''} style={{color: colors.grey}}>Select Category</option>
                                    {values.cropID && allCrops.filter((crop) => crop._id == values.cropID)[0] && 
                                     allCrops.filter((crop) => crop._id == values.cropID)[0].categories.map(val => (
                                        <option value={val._id}>{val.category}</option>
                                    ))}        
                                </Field>
                            </Col>}
                        </Row>
                        <Row>
                            <Col md={6}>
                                <label style={{ display: 'block'}}>Reporter</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}}  as="select" label="Reporter" name="reporter">
                                    <option value={''} style={{color: colors.grey}}>Select Reporter</option>
                                    {allUsers.map(val => (
                                        <option value={val._id}>{val.fullName}</option>
                                    ))}        
                                </Field>
                            </Col>
                            {values.categoryID && values.cropID && <Col md={6}>
                                <label style={{ display: 'block'}}>Problem Identified</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Problem Identified" name="problemID">
                                    <option value={''} style={{color: colors.grey}}>Select Problem</option>
                                    {values.categoryID && values.cropID && allCrops.filter((crop) => crop._id == values.cropID)[0] && allCrops.filter((crop) => crop._id == values.cropID)[0].categories.filter((cat) => cat._id == values.categoryID)[0] && 
                                        allCrops.filter((crop) => crop._id == values.cropID)[0].categories.filter((cat) => cat._id == values.categoryID)[0].problems.map(val => (
                                        <option value={val._id}>{val.problemText}</option>
                                    ))}
                                </Field>
                            </Col>}
                        </Row>
                        <Row>
                            <Col className="text-center">
                            <button  className="btn btn-success" type="button" onClick={()=>handleSubmit()}>Search</button>
                            </Col>
                        </Row>                                                     
                    </Form>  
                    </Card.Body>  
                </Card>     
            )}}           
        </Formik>
        }
        </>
    )
}

export default SearchIssueForm;
