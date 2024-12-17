"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import MonthSelection from '../_components/MonthSelection'
import BranchSelect from '../_components/BranchSelect'
import GlobalApi from '../_services/GlobalApi'
import moment from 'moment'
import StatusList from './_components/StatusList'


function Dashboard() {
  const { setTheme } = useTheme()
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedBranch, setSelectedBranch] = useState();
  const [attendanceList, setAttendanceList] = useState();
  useEffect(() => {
    //setTheme('system');
    getStudentAttendance();
  }, [selectedMonth])

  useEffect(()=>{
    getStudentAttendance();
  },[selectedBranch])

  const getStudentAttendance = () => {
    GlobalApi.GetAttendanceList(selectedBranch, moment(selectedBranch).format('MM/yyyy'))
      .then(resp=>{
        setAttendanceList(resp.data)
      })
    }
    return (
      <div className='p-10'>
        <div className='flex items-center justify-between'>
          <h2 className='font-bold text-2xl'>Dashboard</h2>

          <div className='flex items-center gap-4'>
            <MonthSelection selectedMonth={setSelectedMonth} />
            <BranchSelect selectedBranch={(v)=>setSelectedBranch(v)} />
          </div>
        </div >
        <StatusList attendanceList={attendanceList}/>
      </div>

    )
  }

  export default Dashboard