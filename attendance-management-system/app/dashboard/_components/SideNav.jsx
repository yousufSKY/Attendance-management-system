"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function SideNav() {
    const { user } = useKindeBrowserClient();
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutIcon,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Students",
            icon: GraduationCap,
            path: "/dashboard/students",
        },
        {
            id: 3,
            name: "Attendance",
            icon: Hand,
            path: "/dashboard/attendance",
        },
        {
            id: 4,
            name: "Settings",
            icon: Settings,
            path: "/dashboard/settings",
        },
    ];
    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, [path])
    return (
        <div className="border shadow-md h-screen p-5">
            {/* Logo */}
            <img src="/logo.svg" width={180} height={50} alt="logo" />
            <hr className="my-5" />

            {/* Menu Items */}
            {menuList.map((menu) => (
                <Link href={menu.path} key={menu.id}>
                    <h2
                        className={`flex items-center gap-3 text-md p-4
                         text-slate-500
                          hover:bg-primary
                           hover:text-white 
                           cursor-pointer 
                        rounded-lg my-2
                        ${path==menu.path&&'bg-primary text-white'}
                        `}
                    >
                        <menu.icon />
                        {menu.name}
                    </h2>
                </Link>
            ))}

            {/* User Info */}
            <div className="flex gap-2 items-center fixed bottom-5 left-5 p-2">
                <img
                    src={user?.picture || "/default-avatar.png"}
                    width={35}
                    height={35}
                    alt="user"
                    className="rounded-full"
                />
                <div>
                    <h2 className="text-sm font-bold">
                        {user?.given_name || "Guest"} {user?.family_name || ""}
                    </h2>
                    <h2 className="text-xs text-slate-400">
                        {user?.email || "No email available"}
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default SideNav;
