"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

function AddNewStudent({ refreshData = () => {} }) {
    const [open, setOpen] = useState(false);
    const [branch, setBranch] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Fetch branch list on component mount
    useEffect(() => {
        GetAllBranchList();
    }, []);

    const GetAllBranchList = () => {
        GlobalApi.GetAllBranch()
            .then((resp) => {
                setBranch(resp.data || []); // Ensure branch is an array
            })
            .catch(() => toast.error("Failed to fetch branch list!"));
    };

    const onSubmit = (data) => {
        setLoading(true);
        GlobalApi.CreateNewStudent(data)
            .then((resp) => {
                if (resp.data) {
                    reset(); // Clear the form
                    refreshData(); // Refresh parent data
                    setOpen(false); // Close dialog
                    toast.success("New student added successfully!");
                } else {
                    toast.error("Failed to add new student!");
                }
            })
            .catch(() => {
                toast.error("Error while adding the student!");
            })
            .finally(() => setLoading(false)); // Stop spinner
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
            <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                    </DialogHeader>
                    {/* Removed DialogDescription to fix hydration error */}
                    <div className="py-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Full Name */}
                            <div className="py-2">
                                <label>Full Name</label>
                                <Input
                                    type="text"
                                    placeholder="Ex. John Doe"
                                    {...register("name", {
                                        required: "Full Name is required",
                                    })}
                                    onInput={(e) =>
                                        (e.target.value = e.target.value.replace(
                                            /[^a-zA-Z\s]/g,
                                            ""
                                        ))
                                    }
                                />
                                {errors.name && (
                                    <p className="text-red-500">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* USN Number */}
                            <div className="py-2">
                                <label>USN Number</label>
                                <Input
                                    type="text"
                                    placeholder="Ex. 3VYXXCSXXX"
                                    maxLength={10}
                                    {...register("usn", {
                                        required: "USN is required",
                                        pattern: {
                                            value: /^[A-Z0-9]{10}$/,
                                            message:
                                                "USN must be 10 uppercase alphanumeric characters",
                                        },
                                    })}
                                    onInput={(e) =>
                                        (e.target.value = e.target.value.toUpperCase())
                                    }
                                />
                                {errors.usn && (
                                    <p className="text-red-500">
                                        {errors.usn.message}
                                    </p>
                                )}
                            </div>

                            {/* Branch */}
                            <div className="flex flex-col py-2">
                                <label>Select Branch</label>
                                <select
                                    className="p-3 border rounded-lg"
                                    {...register("branch", {
                                        required: "Branch is required",
                                    })}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select a branch
                                    </option>
                                    {branch.map((item, index) => (
                                        <option key={index} value={item.branch}>
                                            {item.branch}
                                        </option>
                                    ))}
                                </select>
                                {errors.branch && (
                                    <p className="text-red-500">
                                        {errors.branch.message}
                                    </p>
                                )}
                            </div>

                            {/* Contact Number */}
                            <div className="py-2">
                                <label>Contact Number</label>
                                <div className="flex items-center">
                                    <span className="text-md p-2">+91</span>
                                    <Input
                                        type="text"
                                        placeholder="Enter 10-digit number"
                                        {...register("contact", {
                                            required: "Contact number is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message:
                                                    "Contact number must be 10 digits",
                                            },
                                        })}
                                        onInput={(e) =>
                                            (e.target.value = e.target.value
                                                .replace(/[^0-9]/g, "")
                                                .slice(0, 10))
                                        }
                                    />
                                </div>
                                {errors.contact && (
                                    <p className="text-red-500">
                                        {errors.contact.message}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 items-center justify-end mt-5">
                                <Button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <LoaderIcon className="animate-spin" />
                                    ) : (
                                        "Save"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewStudent;
