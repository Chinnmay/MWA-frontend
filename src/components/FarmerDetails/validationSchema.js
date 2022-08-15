import { object, string } from "yup";

const validationSchema = object().shape({
    mobileNumber: string()
        .matches(/^\d{10}$/, "Please enter correct mobile number")
        .required('Required'),
    whatsappNumber: string()
        .matches(/^\d{10}$/, "Please enter correct mobile number"),
    fullName: string()
        .required('Required')
        .matches(/^[a-zA-Z ]*$/, "Please enter text only"),
    townVillage: string()
        .required('Required')
        .matches(/^[a-zA-Z ]*$/, "Please enter text only"),
    landAcreage: string()
        .matches(/^[a-zA-Z0-9., ]*$/, "Please enter valid input"),
});

export default validationSchema;
