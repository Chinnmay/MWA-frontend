import axios from 'axios';

const getRecommendedIssues = (values) =>
{   
    return axios
        .post(`${process.env.REACT_APP_API_URL}/api/issue/recommendedIssues`, values)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getRecommendedIssues;