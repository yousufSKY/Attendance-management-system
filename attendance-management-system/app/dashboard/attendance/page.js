"use client"
import BranchSelect from '@/app/_components/BranchSelect'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React, { useState } from 'react'
import AttendanceGrid from './_components/AttendanceGrid'


function Attendance() {

    /**
     * used to fetch attendance list for the given month and branch
     */
    const onSearchHandler=()=>{
        const month = moment(selectedMonth).format('MM/YYYY');
        GlobalApi.GetAttendanceList(selectedBranch,month).then(resp=>{
            setAttendanceList(resp.data);
        })
    }
    const [attendanceList,setAttendanceList]= useState();
    const [selectedMonth,setSelectedMonth]=useState();
    const [selectedBranch, setSelectedBranch] = useState();
    
    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold'>Attendance</h2>
            {/** search option */}
            <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
                <div className='flex gap-2 items-center'>
                    <label>Select Month:</label>
                    <MonthSelection selectedMonth={(value)=> setSelectedMonth(value)} />
                </div>

                <div className='flex gap-2 items-center'>
                    <label>Select Branch:</label>
                    <BranchSelect selectedBranch={(v)=>setSelectedBranch(v)}/>
                </div>
                <Button
                onClick={()=>onSearchHandler()}>Search</Button>
            </div>

            {/**Student Attendance Grid */}
            <AttendanceGrid attandanceList={attendanceList}
            selectedMonth={selectedMonth}/>
        </div>

    )
}

export default Attendance