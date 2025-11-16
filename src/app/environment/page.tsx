import Sidebar from "@/components/Sidebar"
import Topbar from "@/components/Topbar"
import EnvironmentCard from "@/components/EnvironmentCard"
import SleepInsightsCard from "@/components/SleepInsightsCard"
import { dailyRecordData } from "../../../mock";

export default function Environment() {

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
            <div className="w-full h-[400px] flex flex-row gap-7">
              <div className="w-[40%]">
                <EnvironmentCard environment={environment}/>
              </div>
              <div className="w-[60%]">
                <SleepInsightsCard/>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
};
