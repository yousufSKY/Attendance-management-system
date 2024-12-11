"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';


function AddNewStudent() {
    const [open, setOpen] = useState(false);
    const [branch, setBranch] = useState();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        GetAllBranchList();
    }, [])

    const GetAllBranchList = () => {
        GlobalApi.GetAllBranch().then(resp => {
            setBranch(resp.data);
        })
    }

    const onSubmit = (data) => {
        setLoading(true)
        GlobalApi.CreateNewStudent(data).then(resp => {
            console.log("--", resp);
            if (resp.data) {
                reset();
                
                setOpen(false);
                toast('New Student Added !')
            }
            setLoading(false)
        })
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="py-2">
                                    <label>Full Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Ex. John Doe"
                                        {...register('name', { required: "Full name is required" })}
                                        onInput={(e) => {
                                            // Allow letters and spaces only for the name field
                                            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                        }}
                                    />
                                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                </div>

                                <div className='py-2'>
                                    <label>USN Number</label>
                                    <Input
                                        type="text"
                                        placeholder="Ex. 3VYXXCSXXX"
                                        maxLength={10} // Limit input length to 10 characters
                                        {...register('usn', {
                                            required: "USN is required",
                                            pattern: {
                                                value: /^[A-Z0-9]{10}$/,
                                                message: "USN must be 10 uppercase alphanumeric characters"
                                            }
                                        })}
                                        onInput={(e) => {
                                            // Automatically convert input to uppercase
                                            e.target.value = e.target.value.toUpperCase();
                                        }}
                                    />
                                    {errors.usn && <p className="text-red-500">{errors.usn.message}</p>}
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label>Select Branch</label>
                                    <select className='p-3 border rounded-lg' {...register('branch', { required: "Branch is required" })}>
                                        {branch?.map((item, index) => (
                                            <option key={index} value={item.branch}>
                                                {item.branch}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div className='flex flex-col py-2'>
                                    <label>Select Semester</label>
                                    <select className='p-3 border rounded-lg'
                                        {...register('semester', { required: true })}
                                    >
                                        <option value={'1st'}>1st</option>
                                        <option value={'2nd'}>2nd</option>
                                        <option value={'3rd'}>3rd</option>
                                        <option value={'4th'}>4th</option>
                                        <option value={'5th'}>5th</option>
                                        <option value={'6th'}>6th</option>
                                        <option value={'7th'}>7th</option>
                                        <option value={'8th'}>8th</option>
                                    </select>
                                </div>

                                <div className='py-2'>
                                    <label>Contact Number</label>
                                    <div className="flex items-center">
                                        <span className="text-md p-2">+91</span>
                                        <Input
                                            type="text"
                                            placeholder="Enter 10-digit number"
                                            maxLength={10} // Limit to 10 digits after +91
                                            {...register('contact', {
                                                required: "Contact number is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "Contact number must be 10 digits"
                                                }
                                            })}
                                            onInput={(e) => {
                                                // Ensure only numeric characters are entered, and limit to 10 digits
                                                let inputValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                if (inputValue.length <= 10) {
                                                    e.target.value = inputValue; // Update the input field value
                                                }
                                            }}
                                        />
                                    </div>
                                    {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
                                </div>



                                <div className='flex gap-3 items-center justify-end mt-5'>
                                    <Button type="button"
                                        onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
                                    <Button
                                        type="submit"
                                        disable={loading}
                                    >
                                       {loading?  <LoaderIcon className='animate-spin'/>:
                                        'Save'}</Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewStudent;
