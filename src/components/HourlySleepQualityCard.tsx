"use client"

import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface HourlySleepQualityCardProps {
  timestamp: string;
  hourlyRecordData: HourlyRecords[];
}

export default function HourlySleepQualityCard({ timestamp, hourlyRecordData }: HourlySleepQualityCardProps) {

    function formatHour(timestamp: string | number | Date): string {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }
    function formatDate(timestamp: string | number | Date): string {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }

    return (
        <div className="w-full h-[450px] bg-white rounded-2xl shadow-lgp-6 border-b border-[#E5E7EB] flex flex-col p-7">
            <div className="w-full flex flex-row justify-between mb-2 px-3 items-center">
                <p className="font-inter font-bold text-[23px] text-[#1E2A4A]">Hourly Sleep Score</p>
                <p className="font-inter font-regular text-[18px] text-[#4B5563]">{formatDate(timestamp)}</p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={hourlyRecordData.map(record => ({
                    date: formatHour(record.timestamp),
                    quality: record.sleep_score,
                    }))}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    barSize={40}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                    dataKey="date"
                    tickFormatter={(date: string) => {
                        const parts = date.split(",");
                        return parts[0];
                    }}
                    />
                    <YAxis tickFormatter={(value: number) => `${value}%`} />
                    <Tooltip
                    formatter={(value: number) => `${value}%`}
                    labelStyle={{ color: "#374151" }}
                    />
                    <Legend />
                    <Bar
                    dataKey="quality"
                    fill="#C084FC"
                    radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
};