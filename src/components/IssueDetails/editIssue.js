import axios from 'axios';

const editIssueDetails = (values) =>
{   
    delete values.comments;
    delete values.images;
    delete values.farmerID;
    delete values.createdAt;
    delete values.updatedAt;

    console.log("In axios");

    console.log(values);

    return axios
        .post(`${process.env.REACT_APP_API_URL}/api/issue/editIssue`, values)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default editIssueDetails;