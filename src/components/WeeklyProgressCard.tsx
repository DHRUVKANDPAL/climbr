import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LineChart, Trophy } from "lucide-react";

interface DayProgress {
  day: string;
  solved: number;
}

interface WeeklyProgressCardProps {
  weeklyProgress: DayProgress[];
  animationComplete: boolean;
}

const WeeklyProgressCard: React.FC<WeeklyProgressCardProps> = ({
  weeklyProgress,
  animationComplete,
}) => {
  const renderWeeklyBarChart = () => {
    const maxValue = Math.max(...weeklyProgress.map((day) => day.solved));

    return (
      <div className="h-48 w-full">
        <svg className="h-full w-full" viewBox="0 0 300 150">
          {/* Y-axis */}
          <line
            x1="30"
            y1="20"
            x2="30"
            y2="120"
            stroke="#71717a"
            strokeWidth="1"
          />

          {/* X-axis */}
          <line
            x1="30"
            y1="120"
            x2="270"
            y2="120"
            stroke="#71717a"
            strokeWidth="1"
          />

          {/* Bars */}
          {weeklyProgress.map((day, index) => {
            const barWidth = 25;
            const gap = 10;
            const x = 40 + index * (barWidth + gap);
            const barHeight = (day.solved / maxValue) * 80;
            const y = 120 - barHeight;

            return (
              <g key={index}>
                <rect
                  x={x}
                  y={animationComplete ? y : 120}
                  width={barWidth}
                  height={animationComplete ? barHeight : 0}
                  fill="#10b981"
                  rx="2"
                  style={{
                    transition: `height 1s ease-out ${index * 0.1}s, y 1s ease-out ${index * 0.1}s`,
                  }}
                >
                  <title>
                    {day.day}: {day.solved} problems solved
                  </title>
                </rect>
                <text
                  x={x + barWidth / 2}
                  y={130}
                  fill="#a1a1aa"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {day.day}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  fill="#ffffff"
                  fontSize="10"
                  textAnchor="middle"
                  opacity={animationComplete ? 1 : 0}
                  style={{
                    transition: `opacity 0.3s ease-in ${index * 0.1 + 0.5}s`,
                  }}
                >
                  {day.solved}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
        <CardTitle className="flex items-center text-lg">
          <LineChart className="mr-2 h-5 w-5 text-indigo-500" />
          Weekly Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">{renderWeeklyBarChart()}</CardContent>
      <CardFooter className="border-t border-zinc-200 pt-2 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        <div className="flex w-full items-center justify-between">
          <span>
            Total: {weeklyProgress.reduce((acc, day) => acc + day.solved, 0)}{" "}
            problems this week
          </span>
          <span className="flex items-center font-medium text-indigo-600">
            <Trophy className="mr-1 h-4 w-4" /> Best day:{" "}
            {Math.max(...weeklyProgress.map((day) => day.solved))}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeeklyProgressCard;
