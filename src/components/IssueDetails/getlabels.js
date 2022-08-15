import axios from 'axios';

const getLabels = () =>
{   
    return axios
        .get(`${process.env.REACT_APP_API_URL}/api/label/getLabels`)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getLabels;