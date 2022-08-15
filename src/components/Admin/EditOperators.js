import React, { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { Row, Col, Card } from 'react-bootstrap';
import { TextField } from '../reusable/TextField';
import { useLocation, useParams, useHistory } from "react-router-dom";
import validationSchema from "./editOpValidationSchema";
import ModalAlert from "../reusable/ModalAlert";
import { styles } from './styles';
import editOperatorInfo from "./editOperatorInfo";
import getAllUsers from "../IssueDetails/getAllUsers";
import colors from "../../config/colors";
import getUserDetails from "./getUserDetails";

const EditOperators = () => {
    const [showEditOperatorAlert, setShowEditOperatorAlert] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [selectOperator, setSelectOperator] = useState(false);
    const [operatorInfo, setOperatorInfo] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const getUsers = async() => {
        const getUsersResponse = await getAllUsers();
        if(getUsersResponse.status == 200){
            if(getUsersResponse.data){
                setAllUsers(getUsersResponse.data);
                console.log(getUsersResponse.data);
            }
            else{
                console.log(getUsersResponse);
            }
        }    
        else{
            console.log(getUsersResponse);
        }
    }

    useEffect(() => {
        getUsers();
    },[]);

    const fetchUserDetails = async(mobile) => {
        if(mobile){
            const fetchDetailsResponse = await getUserDetails(mobile);
            if(fetchDetailsResponse.status == 200){
                if(fetchDetailsResponse.data){
                    fetchDetailsResponse.data[0].password = '';
                    setOperatorInfo(fetchDetailsResponse.data[0]);
                    setSelectOperator(true);
                    console.log(fetchDetailsResponse.data);
                }
        }    
        else{
            console.log(fetchDetailsResponse);
        }
        }
        else{
            console.log('Empty Value');
        }
        
    }

    const handleEditOperator = async(values) => {
        const editOperatorResponse = await editOperatorInfo(values);
        if(editOperatorResponse.status == 200){
            console.log("Successful"); 
            window.location.reload();
        }
        else{
            setShowEditOperatorAlert(true);
            console.log(editOperatorResponse);
        }
        console.log(values);
        setIsEdit(false);
    }

    return(
        <>
        <Formik
            enableReinitialize={true}
            initialValues={operatorInfo}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleEditOperator(values);
            }}
        >
            {(formikProps) => {
                const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue, isValid } = formikProps;
                return (
                <Card>
                    <Card.Header style={styles.displayCardHeader}>
                    <Row>
                        <Col sm={6} style={{alignSelf: 'center'}}>
                            Edit Operator Details
                        </Col>
                        <Col className="text-right mr-3">
                            {!isEdit?
                                <button className="btn btn-light" type="button" onClick={()=>setIsEdit(true)} >Edit</button>
                            :   <div>
                                    <button className="btn btn-success mr-3" type="submit" onClick={()=>{handleSubmit()}}>Save</button>
                                    <button className="btn btn-danger" type="button" onClick={()=> {setIsEdit(false);window.location.reload()}}>Cancel</button>
                                </div>                             
                            }
                        </Col>
                    </Row>
                    </Card.Header>
                    <Card.Body>
                    <Row className="justify-content-md-center">
                        <Col md={11}>
                            <label style={{ display: 'block'}}>Select Operator to Edit Info</label>
                            <Field as="select" label="Select Operator" onChange={(e)=> fetchUserDetails(e.target.value)}
                                style={{width:'100%', height: '40%', marginBottom: '2rem'}}
                            >
                                <option value={''} style={{color: colors.grey}}>Select Operator</option>
                                {allUsers.map(val => (
                                    <option value={val.mobileNumber}>{val.mobileNumber} - {val.fullName}</option>
                                ))}            
                            </Field>
                        </Col>
                    </Row>
                    {selectOperator && <Form>
                        <Row>
                            <Col md={6}>
                                <TextField label="Mobile Number" name="mobileNumber" type="text" disabled={true}/>
                            </Col>
                            <Col md={6}>
                                <TextField label="Whatsapp Number" name="whatsappNumber" type="text" disabled={!isEdit}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField label="Full Name" name="fullName" type="text" disabled={!isEdit}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <TextField label="Email" name="emailID" type="email" disabled={!isEdit}/>
                            </Col>
                            <Col md={4}>
                                <label style={{ display: 'block'}}>Operator Status</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Operator Status" name="status" disabled={!isEdit}>
                                    <option value="active">Active</option>        
                                    <option value="inactive">Inactive</option>       
                                </Field>
                            </Col>
                        </Row>                                                     
                        <Row>
                            <Col md={6}>
                                <TextField label="Set New Password" name="password" type="password" disabled={!isEdit}/>
                            </Col>
                            <Col md={6}>
                                <TextField label="Confirm Password" name="confirmpassword" type="password" disabled={!isEdit}/>
                            </Col>
                        </Row>
                        
                    </Form>} 
                    </Card.Body>  
                </Card>     
            )}}           
        </Formik>

        {showEditOperatorAlert &&
            <ModalAlert
                size="lg"
                variant="danger"
                message="Some Error Occurred, Please check email"
                resetCallback={setShowEditOperatorAlert}
            />}
        </>
    )
}

export default EditOperators;
