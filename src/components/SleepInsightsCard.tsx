"use client"

import { Check, Lightbulb, Moon } from "lucide-react";
import { useState } from "react";

export default function SleepInsightsCard() {
    return (
        <div className="w-full h-full bg-white rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] flex flex-col p-7 gap-5 hover:scale-[1.02] transition-all duration-300">
            <p className="font-inter font-bold text-[23px] text-[#1E2A4A]">Sleep Insights</p>
            <div className="w-full h-[25%] bg-[#F0FDF4] rounded-xl p-5 flex flex-row gap-4">
                <div className="w-[35px] h-[35px] bg-[#DCFCE7] rounded-full flex justify-center items-center">
                    <Check size={20} color="#16A34A"/>
                </div>
                <div className="flex flex-col">
                    <p className="font-inter font-medium text-[18px] text-[#166534]">Great Sleep Quality!</p>
                    <p className="font-inter font-regular text-[16px] text-[#15803D]">You achieved 85% sleep efficiency last night. Keep up the good work!</p>
                </div>
            </div>
            <div className="w-full h-[25%] bg-[#EFF6FF] rounded-xl p-5 flex flex-row gap-4">
                <div className="w-[35px] h-[35px] bg-[#DBEAFE] rounded-full flex justify-center items-center">
                    <Lightbulb size={20} color="#2563EB"/>
                </div>
                <div className="flex flex-col">
                    <p className="font-inter font-medium text-[18px] text-[#1E40AF]">Optimize Bedtime</p>
                    <p className="font-inter font-regular text-[16px] text-[#1D4ED8]">Try going to bed 15 minutes earlier to increase deep sleep duration.</p>
                </div>
            </div>
            <div className="w-full h-[25%] bg-[#FAF5FF] rounded-xl p-5 flex flex-row gap-4">
                <div className="w-[35px] h-[35px] bg-[#F3E8FF] rounded-full flex justify-center items-center">
                    <Moon size={20} color="#A855F7"/>
                </div>
                <div className="flex flex-col">
                    <p className="font-inter font-medium text-[18px] text-[#6B21A8]">Room Temperature</p>
                    <p className="font-inter font-regular text-[16px] text-[#7E22CE]">Your room temperature was perfect for sleep. Maintain 65- 70°F.</p>
                </div>
            </div>
        </div>
    )
};