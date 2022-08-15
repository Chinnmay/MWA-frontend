import axios from 'axios';

const getUserDetails = (mobile) =>
{   
    return axios
        .get(`${process.env.REACT_APP_API_URL}/api/user/details/${mobile}`)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getUserDetails;