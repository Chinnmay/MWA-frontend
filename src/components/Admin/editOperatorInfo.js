import axios from 'axios';

const editOperatorInfo = (values) =>
{   
    return axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/editUser/`, values)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default editOperatorInfo;