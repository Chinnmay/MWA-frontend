import axios from 'axios';

const getProducts = () =>
{   
    return axios
        .get(`${process.env.REACT_APP_API_URL}/api/product/getProducts`)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getProducts;