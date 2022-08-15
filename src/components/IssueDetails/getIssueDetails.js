import axios from 'axios';

const getIssueDetails = (issueCode) =>
{   
    return axios
        .get(`${process.env.REACT_APP_API_URL}/api/issue/issueDetails/${issueCode}`)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getIssueDetails;