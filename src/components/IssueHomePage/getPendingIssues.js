import axios from 'axios';

const getPendingIssues = (userID) =>
{   
    return axios
        .get(`${process.env.REACT_APP_API_URL}/api/issue/pendingIssues/${userID}`)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getPendingIssues;