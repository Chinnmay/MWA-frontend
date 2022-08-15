import axios from 'axios';

const editFarmerDetails = (values) =>
{   
    delete values.issues; 
    delete values._id;
    delete values.createdAt; 
    delete values.updatedAt; 
    delete values.__v;

    return axios
        .post(`${process.env.REACT_APP_API_URL}/api/farmer/editFarmer`, values)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default editFarmerDetails;