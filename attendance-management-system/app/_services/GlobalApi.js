const { default: axios } = require("axios");

const GetAllBranch = () => axios.get('/api/branch');
const CreateNewStudent = (data) => axios.post('/api/student', data);

const GetAllStudents=()=>axios.get('/api/student');

const DeleteStudentRecord=(id)=>axios.delete ('/api/student?id='+id)

const GetAttendanceList=(branch,month)=> axios.get('/api/attendance?branch='+branch+"&month="+month)

const MarkAttendance = (data)=> axios.post('/api/attendance',data);

const MarkAbsent = (studentId,day,date)=> axios.delete('/api/attendance?studentId='+studentId+'&day='+day+'&date='+date)
export default {
    GetAllBranch,
    CreateNewStudent,
    GetAllStudents,
    DeleteStudentRecord,
    GetAttendanceList,
    MarkAttendance,
    MarkAbsent
};
