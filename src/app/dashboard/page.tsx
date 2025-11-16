"use client"

import Sidebar from "@/components/Sidebar"
import Topbar from "@/components/Topbar"
import { Brain, Clock, Heart, Moon, ToggleLeft, ToggleRight } from "lucide-react"
import EnvironmentCard from "@/components/EnvironmentCard"
import SleepInsightsCard from "@/components/SleepInsightsCard"
import { useState } from "react";
import { motion } from "framer-motion";
import HourlySleepQualityCard from "@/components/HourlySleepQualityCard"
import { dailyRecordData, hourlyRecordData } from "../../../mock";

export default function Dashboard() {

  const [isOn, setIsOn] = useState(false);
  const formatTime = (duration: number) => {
        const h = Math.floor(duration / 60);
        const m = duration % 60;
        return `${h}h ${m}m`;
    };
  const lastNight = dailyRecordData[dailyRecordData.length -1];
  const environment = {
    humidity: dailyRecordData[dailyRecordData.length -1].averageHumidity,
    lightExposure: dailyRecordData[dailyRecordData.length -1].averageLightExposure,
    soundLevel: dailyRecordData[dailyRecordData.length -1].averageSoundLevel,
    temperature: dailyRecordData[dailyRecordData.length -1].averageTemperature,
  }

  return (
    <div className="w-[1425px] h-[1521px] flex flex-row">
        <Sidebar/>
        <div className="flex flex-col w-[80%] h-[1521px] ml-[20%]">
          <Topbar/>
          <div className="w-full h-[1441px] bg-[#F3F4F6] mt-[80px] p-7">
            <div className="w-full h-[200px] bg-white rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] p-6 flex flex-col">
              <p className="font-inter font-bold text-[23px] text-[#1E2A4A]">Start Device</p>
              <div className={`w-full h-[100px] rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] p-6 flex flex-row mt-4 ${isOn ? "bg-[#F3E8FF]" : "bg-[#F3F4F6]"}`}>
                <div className="w-[80%] flex flex-col justify-center">
                  <p className="font-inter font-bold text-[18px] text-[#1E2A4A]">Wake Device</p>
                  <p className="font-inter font-regular text-[16px] text-[#4B5563]">Activates the device and begins the startup process.</p>
                </div>
                <div className="w-[20%] flex items-center justify-end mr-4">
                  <div onClick={() => setIsOn(!isOn)} className={`w-16 h-8 flex items-center rounded-full cursor-pointer p-1 transition-colors duration-300 ${
                  isOn ? "bg-violet-500" : "bg-gray-300"}`}>
                    <motion.div
                    className="w-6 h-6 bg-white rounded-full shadow-md"
                    animate={{
                      x: isOn ? 32 : 0, 
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[200px] flex flex-row gap-5 justify-center items-center mt-5">
              <div className="w-[33%] h-full bg-white rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] p-6 flex flex-col hover:scale-[1.05] transition-all duration-300">
                <div className="w-full h-[55px] flex flex-row justify-between items-center mb-6">
                  <div className="w-[55px] h-[55px] bg-[#EFF6FF] rounded-xl flex justify-center items-center">
                    <Clock size={20} className="text-[#2563EB]"/>
                  </div>
                  <p className="font-inter font-medium text-[16px] text-[#16A34A]">+15 min</p>
                </div>
                <p className="font-inter font-medium text-[16px] text-[#4B5563] mb-2">Total Sleep</p>
                <p className="font-inter font-bold text-[34px]">{formatTime(lastNight.totalSleepDuration)}</p>
              </div>
              <div className="w-[33%] h-full bg-white rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] p-6 flex flex-col hover:scale-[1.05] transition-all duration-300">
                <div className="w-full h-[55px] flex flex-row justify-between items-center mb-6">
                  <div className="w-[55px] h-[55px] bg-[#FAF5FF] rounded-xl flex justify-center items-center">
                    <Moon size={20} className="text-[#9333EA]"/>
                  </div>
                  <p className="font-inter font-medium text-[16px] text-[#16A34A]">Good</p>
                </div>
                <p className="font-inter font-medium text-[16px] text-[#4B5563] mb-2">Average Sleep Quality</p>
                <p className="font-inter font-bold text-[34px]">{lastNight.sleepQualityScore}%</p>
              </div>
              <div className="w-[33%] h-full bg-white rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] p-6 flex flex-col hover:scale-[1.05] transition-all duration-300">
                <div className="w-full h-[55px] flex flex-row justify-between items-center mb-6">
                  <div className="w-[55px] h-[55px] bg-[#EEF2FF] rounded-xl flex justify-center items-center">
                    <Brain size={20} className="text-[#4F46E5]"/>
                  </div>
                  <p className="font-inter font-medium text-[16px] text-[#2563EB]">4 cycles</p>
                </div>
                <p className="font-inter font-medium text-[16px] text-[#4B5563] mb-2">Deep Sleep</p>
                <p className="font-inter font-bold text-[34px]">{formatTime(120)}</p>
              </div>
              {/* <div className="w-[300px] h-full bg-white rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] p-6 flex flex-col">
                <div className="w-full h-[55px] flex flex-row justify-between items-center mb-6">
                  <div className="w-[55px] h-[55px] bg-[#F0FDF4] rounded-xl flex justify-center items-center">
                    <Heart size={20} className="text-[#16A34A]"/>
                  </div>
                  <p className="font-inter font-medium text-[16px] text-[#16A34A]">Normal</p>
                </div>
                <p className="font-inter font-medium text-[16px] text-[#4B5563] mb-2">Avg Heart Rate</p>
                <p className="font-inter font-bold text-[34px]">62 bpm</p>
              </div> */}
            </div>
            <div className="w-full h-[450px] flex flex-row mt-5 gap-5">
              <div className="w-[70%]">
                <HourlySleepQualityCard timestamp={lastNight.timestamp} hourlyRecordData={hourlyRecordData}/>
              </div>
              <div className="w-[30%]">
                <EnvironmentCard environment={environment}/>
              </div>
            </div>
            <div className="w-full h-[400px] flex flex-row mt-5">
              <SleepInsightsCard/>
            </div>
          </div>
        </div>
    </div>
  )
};
