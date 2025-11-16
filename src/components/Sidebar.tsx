"use client"

import { useState } from "react";
import { ChartLine, Bed, BellRing, Thermometer } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {

    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="w-[20%] h-full bg-white flex flex-col shadow-lg z-10 p-5 fixed">
            <div className="flex flex-row items-center">
                <div className="w-[40px] h-[40px] bg-gradient-to-br from-[#A855F7] to-[#C084FC] rounded-xl mr-3 flex justify-center">
                    <img src="/img/moon.png" alt="Moon Icon" className="w-[12px] h-[14px] self-center my-auto"/>
                </div>
                <p className="font-inter font-bold text-[20px]">SleepWise</p>
            </div>
            <div className="mt-8 flex flex-col gap-2">
                <div className={`h-[48px] flex flex-row items-center p-5 rounded-lg gap-3 cursor-pointer ${
                    pathname === "/dashboard" ? "bg-[#F3E8FF]" : "bg-white"
                }`} onClick={() => router.push('/dashboard')}>
                    <ChartLine size={20} color={`${pathname === "/dashboard" ? "#A855F7" : "#4B5563"}`}/>
                    <p className={`font-inter font-medium text-[16px] ${pathname === "/dashboard" ? "text-[#A855F7]" : "text-[#4B5563]"}`}>Dashboard</p>
                </div>
                <div className={`h-[48px] flex flex-row items-center p-5 rounded-lg gap-3 cursor-pointer ${
                    pathname === "/sleep-history" ? "bg-[#F3E8FF]" : "bg-white"
                }`} onClick={() => router.push('/sleep-history')}>
                    <Bed size={20} color={`${pathname === "/sleep-history" ? "#A855F7" : "#4B5563"}`}/>
                    <p className={`font-inter font-medium text-[16px] ${pathname === "/sleep-history" ? "text-[#A855F7]" : "text-[#4B5563]"}`}>Sleep History</p>
                </div>
                <div className={`h-[48px] flex flex-row items-center p-5 rounded-lg gap-3 cursor-pointer ${
                    pathname === "/environment" ? "bg-[#F3E8FF]" : "bg-white"
                }`} onClick={() => router.push('/environment')}>
                    <Thermometer size={20} color={`${pathname === "/environment" ? "#A855F7" : "#4B5563"}`}/>
                    <p className={`font-inter font-medium text-[16px] ${pathname === "/environment" ? "text-[#A855F7]" : "text-[#4B5563]"}`}>Environment</p>
                </div>
            </div>
        </div>
    )
};