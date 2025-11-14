"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInBox() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="w-[384px] h-[540px] bg-white rounded-2xl flex flex-col items-center shadow-lg z-10">
        <div className="w-[64px] h-[64px] flex justify-center bg-gradient-to-r from-[#667EEA] to-[#A855F7] rounded-4xl mt-10">
          <img src="/img/moon.png" alt="Moon Icon" className="w-[18px] h-[21px] self-center my-auto"/>
        </div>
        <p className="font-inter font-bold text-[24px] mt-5">SleepWise</p>
        <p className="font-inter font-regular text-[16px] text-[#4B5563] mt-2">Monitor your sleep, improve your life</p>
        <div className="mt-5">
            <label className="font-inter font-medium text-[14px]">Username</label>
            <input
              type="text"
              className="w-full p-3 bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="mt-3">
            <label className="font-inter font-medium text-[14px]">Password</label>
            <input
              type="text"
              className="w-full p-3 bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="password"
            />
          </div>
          <div className="w-[280px] h-[48px] flex justify-center bg-gradient-to-bl from-[#764BA2] via-[#667EEA] to-[#667EEA] rounded-lg mt-6 cursor-pointer" onClick={() => router.push('/dashboard')}>
            <p className="text-white mt-3">Sign In</p>
          </div>
          <div>
            <p className="font-inter font-regular text-[14px] text-[#667EEA] mt-5 cursor-pointer">Forgot password?</p>
          </div>
    </div>
  )
};
