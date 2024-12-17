"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi';

function BranchSelect({selectedBranch}) {

    const [branch, setBranch] = useState();


    useEffect(() => {
        GetAllBranchList();
    }, [])

    const GetAllBranchList = () => {
        GlobalApi.GetAllBranch().then(resp => {
            setBranch(resp.data);
        })
    }
    return (
        <div>
            <select className='p-2 border rounded-lg' 
            onChange={(e)=>selectedBranch(e.target.value)}
            >
                {branch?.map((item, index) => (
                    <option key={index} value={item.branch}>
                        {item.branch}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default BranchSelect