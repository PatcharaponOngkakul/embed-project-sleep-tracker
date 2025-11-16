"use client";

import HourlySleepQualityCard from "@/components/HourlySleepQualityCard";
import Sidebar from "@/components/Sidebar"
import SleepQualityTrendCard from "@/components/SleepQualityTrendCard"
import Topbar from "@/components/Topbar"
import { ChevronDown, ChevronUp, TriangleAlert, Trophy } from "lucide-react";
import { useState } from "react";
import { dailyRecordData, hourlyRecordData } from "../../../mock";

export default function SleepHistory() {

  const dailyRecordDataReversed = [...dailyRecordData].reverse();

  const getQualityBackgroundColor = (quality: number) => {
    if (quality >= 80) return "#4ADE80" 
    else if (quality >= 60) return "#FACC15"; 
    else return "#F87171"; 
  };

  const getQualityTextColor = (quality: number) => {
    if (quality >= 80) return "#16A34A" 
    else if (quality >= 60) return "#CA8A04"; 
    else return "#DC2626"; 
  };

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };
  
  const getAverageSleepTime = () => {
    const totalMinutes = dailyRecordData.reduce((sum, record) => sum + record.totalSleepDuration, 0);
    const averageMinutes = totalMinutes / dailyRecordData.length;
    return formatTime(Math.round(averageMinutes));
  }

  const getAverageQuality = () => {
    const totalQuality = dailyRecordData.reduce((sum, record) => sum + record.sleepQualityScore, 0);
    return Math.round(totalQuality / dailyRecordData.length);
  }
  
  const getAverageLightExposure = () => {
    const totalLight = dailyRecordData.reduce((sum, record) => sum + record.averageLightExposure, 0);
    return Math.round(totalLight / dailyRecordData.length);
  }
  const getAverageTemperature = () => {
    const totalTemp = dailyRecordData.reduce((sum, record) => sum + record.averageTemperature, 0);
    return Math.round(totalTemp / dailyRecordData.length);
  }
  const getAverageHumidity = () => {
    const totalHumid = dailyRecordData.reduce((sum, record) => sum + record.averageHumidity, 0);
    return Math.round(totalHumid / dailyRecordData.length);
  }
  const getAverageNoiseLevel = () => {
    const totalNoise = dailyRecordData.reduce((sum, record) => sum + record.averageSoundLevel, 0);
    return Math.round(totalNoise / dailyRecordData.length);
  }

  const getBestNight = () => {
    const bestRecord = dailyRecordData.reduce((best, record) => record.sleepQualityScore > best.sleepQualityScore ? record : best, dailyRecordData[0]);
    return `${formatDate(bestRecord.timestamp)} (${bestRecord.sleepQualityScore}%)`;
  }

  const getWorstNight = () => {
    const worstRecord = dailyRecordData.reduce((worst, record) => record.sleepQualityScore < worst.sleepQualityScore ? record : worst, dailyRecordData[0]);
    return `${formatDate(worstRecord.timestamp)} (${worstRecord.sleepQualityScore}%)`;
  }
  function formatDate(timestamp: string | number | Date): string {
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
      });
  }
  const [visibleSessions, setVisibleSessions] = useState<{ [key: string]: boolean }>({});
  const toggleSession = (session_id: string) => {
  setVisibleSessions(prev => ({
    ...prev,
    [session_id]: !prev[session_id],
  }));
};


  return (
    <div className="w-[1425px] h-[1521px] flex flex-row">
      <Sidebar/>
      <div className="flex flex-col w-[80%] h-[1521px] ml-[20%]">
        <Topbar/>
        <div className="w-full h-auto bg-[#F3F4F6] mt-[80px] p-7 flex flex-row gap-10">
          <div className="flex flex-col w-[75%] h-full">
            <SleepQualityTrendCard dailyRecordData={dailyRecordData}/>
             <div className="flex flex-col w-full mt-7">
              <p className="font-inter font-semibold text-[20px] text-[#1E293B]">Daily Sleep Records</p>
              {dailyRecordDataReversed.map((data: SessionRecords) => (
                <div key={data.session_id}>
                  <div className="w-full h-[100px] bg-white rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] flex flex-row p-7 hover:scale-[1.05] transition-all duration-300 mt-5 items-center">
                    <div className="w-[18px] h-[18px] rounded-full" style={{ backgroundColor: getQualityBackgroundColor(data.sleepQualityScore) }}></div>
                    <div className="flex flex-col w-[20%] ml-6">
                      <p className="font-inter font-semibold text-[18px] text-[#1E293B]">{formatDate(data.timestamp)}</p>
                      <p className="font-inter font-regular text-[16px] text-[#4B5563]">{data.day}</p>
                    </div>
                    <div className="flex flex-col w-[15%] ml-6">
                      <p className="font-inter font-regular text-[16px] text-[#4B5563]">Total Sleep</p>
                      <p className="font-inter font-semibold text-[18px] text-[#1E293B]">{formatTime(data.totalSleepDuration)}</p>
                    </div>
                    <div className="flex flex-col w-[10%] ml-6">
                      <p className="font-inter font-regular text-[16px] text-[#4B5563]">Quality</p>
                      <p className={`font-inter font-semibold text-[18px] text-[${getQualityTextColor(data.sleepQualityScore)}]`}>{data.sleepQualityScore}%</p>
                    </div>
                    <div className="flex flex-col w-[10%] ml-6">
                      <p className="font-inter font-regular text-[16px] text-[#4B5563]">Light</p>
                      <p className={`font-inter font-semibold text-[16px]`}>{data.averageLightExposure} lux</p>
                    </div>
                    <div className="flex flex-col w-[10%] ml-6">
                      <p className="font-inter font-regular text-[16px] text-[#4B5563]">Temp</p>
                      <p className={`font-inter font-semibold text-[16px]`}>{data.averageTemperature} °C</p>
                    </div>
                    <div className="flex flex-col w-[10%] ml-6">
                      <p className="font-inter font-regular text-[16px] text-[#4B5563]">Humid</p>
                      <p className={`font-inter font-semibold text-[16px]`}>{data.averageHumidity} %</p>
                    </div>
                    <div className="flex flex-col w-[10%] ml-6">
                      <p className="font-inter font-regular text-[16px] text-[#4B5563]">Noise</p>
                      <p className={`font-inter font-semibold text-[16px]`}>{data.averageSoundLevel} dB</p>
                    </div>
                    <div className="w-[5%] flex justify-end">
                      { visibleSessions[data.session_id] ? <ChevronUp onClick={() => toggleSession(data.session_id)} className="font-inter font-medium text-[16px] cursor-pointer"></ChevronUp>
                        : <ChevronDown onClick={() => toggleSession(data.session_id)} className="font-inter font-medium text-[16px] cursor-pointer"></ChevronDown>
                      }
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${visibleSessions[data.session_id] ? "max-h-[500px] mt-2" : "max-h-0"}`}>
                    {visibleSessions[data.session_id] && <HourlySleepQualityCard timestamp={data.timestamp} hourlyRecordData={hourlyRecordData.filter(
                      record => record.timestamp.startsWith(data.timestamp.slice(0, 10))
                    )}/>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-[25%] h-full gap-7">
            <div className="w-full h-[400px] bg-white rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] flex flex-col p-7 hover:scale-[1.05] transition-all duration-300">
              <p className="font-inter font-semibold text-[20px] text-[#1E293B]">Weekly Summary</p>
              <div className="flex flex-row mt-4">
                <p className="font-inter font-regular text-[16px] text-[#4B5563]">Average Sleep Time</p>
                <p className="font-inter font-semibold text-[16px] text-[#1E293B] ml-auto">{getAverageSleepTime()}</p>
              </div>
              <div className="flex flex-row mt-4">
                <p className="font-inter font-regular text-[16px] text-[#4B5563]">Average Quality</p>
                <p className="font-inter font-semibold text-[16px] text-[#6366F1] ml-auto">{getAverageQuality()}%</p>
              </div>
              <div className="flex flex-row mt-4">
                <p className="font-inter font-regular text-[16px] text-[#4B5563]">Average Light Exposure</p>
                <p className="font-inter font-semibold text-[16px] text-[#CA8A04] ml-auto">{getAverageLightExposure()} lux</p>
              </div>
              <div className="flex flex-row mt-4">
                <p className="font-inter font-regular text-[16px] text-[#4B5563]">Average Temperature</p>
                <p className="font-inter font-semibold text-[16px] text-[#EF4444] ml-auto">{getAverageTemperature()} °C</p>
              </div>
              <div className="flex flex-row mt-4">
                <p className="font-inter font-regular text-[16px] text-[#4B5563]">Average Humidity</p>
                <p className="font-inter font-semibold text-[16px] text-[#2563EB] ml-auto">{getAverageHumidity()}%</p>
              </div>
              <div className="flex flex-row mt-4">
                <p className="font-inter font-regular text-[16px] text-[#4B5563]">Average Noise level</p>
                <p className="font-inter font-semibold text-[16px] text-[#4B5563] ml-auto">{getAverageNoiseLevel()} dB</p>
              </div>
            </div>
            <div className="w-full h-[400px] bg-white rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] flex flex-col p-7 hover:scale-[1.05] transition-all duration-300">
              <p className="font-inter font-semibold text-[20px] text-[#1E293B]">Weekly Statistic</p>
              <div className="w-full h-[80px] bg-[#F0FDF4] rounded-2xl mt-4 flex flex-row items-center p-5">
                <div className="w-[35px] h-[35px] bg-[#22C55E] rounded-full flex justify-center items-center">
                  <Trophy size={20} color="white"/>
                </div>
                <div className="flex flex-col w-[150px] ml-6">
                  <p className="font-inter font-medium text-[16px] text-[#166534]">Best Night</p>
                  <p className="font-inter font-regular text-[14px] text-[#16A34A]">{getBestNight()}</p>
                </div>
              </div>
              <div className="w-full h-[80px] bg-[#FEF2F2] rounded-2xl mt-4 flex flex-row items-center p-5">
                <div className="w-[35px] h-[35px] bg-[#EF4444] rounded-full flex justify-center items-center">
                  <TriangleAlert size={20} color="white"/>
                </div>
                <div className="flex flex-col w-[150px] ml-6">
                  <p className="font-inter font-medium text-[16px] text-[#991B1B]">Needs Improvement</p>
                  <p className="font-inter font-regular text-[14px] text-[#DC2626]">{getWorstNight()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
