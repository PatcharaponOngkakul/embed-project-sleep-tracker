interface SessionRecords {
  session_id: string;
  timestamp: string;
  day: string;
  averageHumidity: number;
  averageLightExposure: number;
  averageSoundLevel: number;
  averageTemperature: number;
  sleepQualityScore: number;
  totalSleepDuration: number;
}

interface HourlyRecords {
  timestamp: string;
  session_id: string;
  sleep_score: number;
}