import axios from 'axios';

const getFarmerDetails = (contact) =>
{   
    return axios
        .get(`${process.env.REACT_APP_API_URL}/api/farmer/viewFarmer/${contact}`)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getFarmerDetails;