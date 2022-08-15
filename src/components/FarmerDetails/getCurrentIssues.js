import axios from 'axios';

const getCurrentIssues = (farmerID) =>
{   
    return axios
        .get(`${process.env.REACT_APP_API_URL}/api/issue/farmerCurrentIssues/${farmerID}`)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getCurrentIssues;