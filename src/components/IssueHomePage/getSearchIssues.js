import axios from 'axios';

const getSearchIssues = (values) =>
{   
    return axios
        .post(`${process.env.REACT_APP_API_URL}/api/issue/searchIssue`, values)
        .then((res) =>
        {   
            return res;
        })
        .catch((err) =>
        {
            return err;
        });
}
export default getSearchIssues;