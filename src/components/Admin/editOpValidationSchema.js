import { object, string } from 'yup'

const editOpValidationSchema = object().shape({
    mobileNumber: string().nullable()
        .matches(/^\d{10}$/, "Please enter correct mobile number")
        .required('Required'),
    whatsappNumber: string().nullable()
        .matches(/^\d{10}$/, "Please enter correct mobile number"),
    fullName: string().nullable()
        .required('Required')
        .matches(/^[a-zA-Z ]*$/, "Please enter text only"),
    emailID: string().nullable()
        .email("Please enter valid email")
        .required('Required'),
    password: string().nullable()
        .required('Required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/, 
        "At least one uppercase letter, one lowercase letter and one number. \nMinimum 6 and maximum 15 characters. \nNo special characters allowed."),
    confirmpassword: string().nullable()
        .required('Required')
        .test('passwords-match', 'Passwords must match', function(value){
            return this.parent.password === value
        }),
});

export default editOpValidationSchema;