"use client"

import { useState } from "react";
import { Bell, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {

    const router = useRouter();

    return (
        <div className="w-[80%] h-[89px] bg-white border-b border-[#E5E7EB] flex flex-row items-center px-8 fixed z-10">
            <div className="w-[80%] flex flex-col">
                <p className="font-inter font-bold text-[24px]">Good Morning</p>
                <p className="font-inter font-regular text-[16px] text-[#4B5563]">Here's your sleep summary for last night</p>
            </div>
            <div className="w-[20%] flex flex-row gap-7 items-center">
                <div className="w-full h-[36px] bg-[#F0FDF4] rounded-xl text-center flex flex-row justify-center items-center gap-2">
                    <div className="w-[8px] h-[8px] bg-[#22C55E] rounded-full"></div>
                    <p className="font-inter font-medium text-[14px] text-[#15803D]">All Devices Connected</p>
                </div>
                {/* <Bell size={20} className="cursor-pointer"/>
                <div className="w-[40px] h-[40px] rounded-full bg-[#F3F4F6] flex justify-center items-center" onClick={() => router.push('/sign-in')}>
                    <User size={20} className="m-2 text-[#6B7280] cursor-pointer"/>
                </div> */}
            </div>
        </div>
    )
};