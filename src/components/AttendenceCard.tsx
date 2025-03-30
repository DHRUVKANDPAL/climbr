import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface AttendanceCardProps {
  attendance: {
    week: number;
    month: number;
    year: number;
  };
  streak: number;
  timeRange: string;
  animationComplete: boolean;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  attendance,
  streak,
  timeRange,
  animationComplete,
}) => {
  // Render donut chart for attendance tracking with animation
  const renderDonutChart = () => {
    const percentage = attendance[timeRange as keyof typeof attendance];
    const circumference = 2 * Math.PI * 40; // Circle with radius 40
    const dashOffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative mx-auto h-32 w-32">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#27272a"
            strokeWidth="10"
          />
          {/* Foreground circle - the percentage */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#10b981"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={animationComplete ? dashOffset : circumference}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{
              transition: "stroke-dashoffset 1.5s ease-in-out",
            }}
          />
          {/* Text in the middle */}
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-zinc-900 dark:fill-white"
            fontSize="18"
            fontWeight="bold"
          >
            {animationComplete ? `${percentage}%` : "0%"}
          </text>
        </svg>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
        <CardTitle className="flex items-center text-lg">
          <Flame className="mr-2 h-5 w-5 text-indigo-500" />
          Attendance & Streaks
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 pt-4">
        <div className="flex flex-col items-center justify-center">
          <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Attendance Rate
          </h3>
          {renderDonutChart()}
          <div className="mt-2 text-center">
            <p className="text-sm font-medium">
              {attendance[timeRange as keyof typeof attendance]}% in the last{" "}
              {timeRange}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Current Streak
          </h3>
          <div className="relative mb-2 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-500/10"></div>
            <div className="absolute inset-2 rounded-full border-4 border-indigo-500/30"></div>
            <div className="z-10 text-center">
              <div className="text-3xl font-bold text-indigo-500">{streak}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                days
              </div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm font-medium">Best: {streak} days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
