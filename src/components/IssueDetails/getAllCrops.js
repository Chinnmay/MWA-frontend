import axios from 'axios';

const getCrops = () =>
{   
    return axios
        .get(`${process.env.REACT_APP_API_URL}/api/crop/allCrops`)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getCrops;