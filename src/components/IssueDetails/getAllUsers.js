import axios from 'axios';

const getAllUsers = () =>
{   
    return axios
        .get(`${process.env.REACT_APP_API_URL}/api/user/getUsers`)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getAllUsers;