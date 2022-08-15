import axios from 'axios';

const getPastIssues = (farmerID) =>
{   
    return axios
        .get(`${process.env.REACT_APP_API_URL}/api/issue/farmerPastIssues/${farmerID}`)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getPastIssues;