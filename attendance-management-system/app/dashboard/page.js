"use client"
import { useTheme } from 'next-themes'
import React, { useEffect } from 'react'

function Dashboard() {
    const { setTheme } = useTheme()

    useEffect(()=>{
        setTheme('system');
    },[])
  return (
    <div>Page</div>
  )
}

export default Dashboard