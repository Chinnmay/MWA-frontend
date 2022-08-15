import { object, string } from 'yup'

const validationSchema = object().shape({
    reporter: string().nullable()
        .required(),
    assignee: string().nullable()
        .required('Required'),
    title: string().nullable()
        .matches(/^[-a-zA-Z0-9,.:;'"()!@%? ]*$/, "Please enter valid title"),
    issueType: string().nullable()
        .required('Required'),
    description: string().nullable()
        .matches(/^[-a-zA-Z0-9,.:;'"()!@%?\n ]*$/, "Please enter valid description, special characters not allowed, text is preferred."),
});

export default validationSchema;