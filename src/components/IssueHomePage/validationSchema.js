import { object, string } from 'yup'

const validationSchema = object().shape({
    issueCode: string().nullable()
        .matches(/^[-a-zA-Z0-9 ]*$/, "Please enter valid Issue Id"),
});

export default validationSchema;