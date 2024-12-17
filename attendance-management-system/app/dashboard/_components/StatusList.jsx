import React, { useEffect, useState } from 'react'
import moment from 'moment/moment';


function StatusList(attendanceList) {
    const [totalStudent,setTotalStudent]= useState(0);
    const [presentPerc, setPresentPerc]=useState(0);
    // useEffect(()=>{
    //     if(attendanceList){
    //         const totalSt=getUniqueRecord(attendanceList);
    //         setTotalStudent(totalSt);

    //         const today=moment().format('D');
    //         const presentPerc=(attendanceList.length/(totalSt.length*Number(today))*100);
    //         console.log(presentPerc);
    //     }
    // },[attendanceList])

    return (
    <div>StatusList</div>
  )
}

export default StatusList