const { default: axios } = require("axios");

const GetAllBranch = () => axios.get('/api/branch');
const CreateNewStudent = (data) => axios.post('/api/student', data);

export default {
    GetAllBranch,
    CreateNewStudent
};
