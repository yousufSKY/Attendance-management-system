import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import moment from 'moment/moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];
function AttendanceGrid({ attandanceList, selectedMonth }) {

    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: 'studentId', filter: true },
        { field: 'name', filter: true },

    ])

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const numberOfDays = daysInMonth(moment(selectedMonth).format('yyyy'), moment(selectedMonth).format('MM'))
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1)


    useEffect(() => {
        if (attandanceList) {
            const userList = getUniqueRecord();
            setRowData(userList);

            daysArray.forEach((date) => {
                setColDefs(prevData => [...prevData, {
                    field: date.toString(), width: 50, editable: true
                }])

                userList.forEach(obj => {
                    obj[date] = isPresent(obj.studentId, date)
                })
            })
        }
    }, [attandanceList])
    /**
     * Used to check if user present or not
     * @param {*} studentId 
     * @param {*} day 
     * @returns 
     */
    const isPresent = (studentId, day) => {
        const result = attandanceList.find(item => item.day == day && item.studentId == studentId)
        return result ? true : false
    }

    /**
     * Used to get distint user list 
     * @returns 
     */

    const getUniqueRecord = (attandanceList) => {
        const uniqueRecord = [];
        const existingUser = new Set();

        attandanceList?.forEach(record => {
            if (!existingUser.has(record.studentId)) {
                existingUser.add(record.studentId);
                uniqueRecord.push(record);
            }
        });

        return uniqueRecord;
    }
    /**
     * Used to mark attendance 
     * @param {*} day 
     * @param {*} studentId 
     * @param {*} presentStatus 
     */
    const onMarkAttendance = (day, studentId, presentStatus) => {
        const date = moment(selectedMonth).format('MM/yyyy')
        if (presentStatus) {
            const data = {
                day: day,
                studentId: studentId,
                present: presentStatus,
                date: date
            }
            GlobalApi.MarkAttendance(data).then(resp => {
                console.log(resp);
                toast('Student Id: ' + studentId + ' marked as present')
            })
        }
        else {
            GlobalApi.MarkAbsent(studentId, day, date)
                .then(resp => {
                    toast("student Id: " + studentId + " Marked as absent")
                })
        }
    }

    return (
        <div>
            <div
                // define a height because the Data Grid will fill the size of the parent container
                style={{ height: 500 }}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    )
}



export default AttendanceGrid