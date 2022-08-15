import axios from 'axios';

const addNewOperator = (values) =>
{   
    return axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/adduser/`, values)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default addNewOperator;