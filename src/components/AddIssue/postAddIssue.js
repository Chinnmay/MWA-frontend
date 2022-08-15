import axios from 'axios';

const postAddIssue = (values) =>
{   
    delete values.selectedlabels;
    delete values.selectedproductsRecommended;
    console.log(values);
    return axios
        .post(`${process.env.REACT_APP_API_URL}/api/issue/addIssue/`, values)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default postAddIssue;