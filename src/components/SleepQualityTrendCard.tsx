"use client"

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SleepQualityTrendCardProps {
  dailyRecordData: SessionRecords[];
}

export default function SleepQualityTrendCard({ dailyRecordData }: SleepQualityTrendCardProps) {

    const [option, setOption] = useState<"quality" | "duration">("quality");
    const formatTime = (duration: number) => {
        const h = Math.floor(duration / 60);
        const m = duration % 60;
        return `${h}h ${m}m`;
    };
    function formatDate(timestamp: string | number | Date): string {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
    const isQuality = option === "quality";

    return (
        <div className="w-full h-[450px] bg-white rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] flex flex-col p-7 hover:scale-[1.03] transition-all duration-300">
            <div className="w-full flex flex-row justify-end mb-2 px-3 items-center">
                <p className="font-inter font-bold text-[23px] text-[#1E2A4A]">Sleep Quality Trend</p>
                <div className="w-[18%] h-[40px] bg-[#F3F4F6] rounded-lg ml-auto flex flex-row justify-center items-center cursor-pointer gap-2">
                    <div className={`flex flex-col items-center rounded-lg px-2 py-1 ${isQuality ? 'text-white bg-[#C084FC]' : 'text-[#6B7280]'}`} onClick={() => setOption('quality')}>
                        <p className="font-inter font-regular text-[14px]">Quality</p>
                    </div>
                    <div className={`flex flex-col items-center rounded-lg px-2 py-1 ${!isQuality ? 'text-white bg-[#C084FC]' : 'text-[#6B7280]'}`} onClick={() => setOption('duration')}>
                        <p className="font-inter font-regular text-[14px]">Hours</p>
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={isQuality ? dailyRecordData.map(record => ({ date: formatDate(record.timestamp), quality: record.sleepQualityScore })) : dailyRecordData.map(record => ({ date: formatDate(record.timestamp), duration: record.totalSleepDuration }))}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date"
                    tickFormatter={(date: string) => {
                    const parts = date.split(",");
                    return parts[0];
                }}/>
                <YAxis
                    tickFormatter={(value: number) =>
                    isQuality ? `${value}%` : formatTime(value)
                    }
                />
                <Tooltip
                    formatter={(value: number) =>
                    isQuality ? `${value}%` : formatTime(value)
                    }
                    labelStyle={{ color: "#374151" }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey={isQuality ? "quality" : "duration"}
                    stroke={isQuality ? "#6366F1" : "#CA8A04"}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
};