"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface PercentileItem {
  month: string;
  value: number;
}

interface PercentileData {
  jee: PercentileItem[];
  neet: PercentileItem[];
  upsc: PercentileItem[];
  [key: string]: PercentileItem[];
}

interface PercentileCardProps {
  percentiles: PercentileData;
  animationComplete: boolean;
}

const PercentileCard: React.FC<PercentileCardProps> = ({
  percentiles,
  animationComplete,
}) => {
  const [examView, setExamView] = useState<string>("jee");

  // Render animated line chart for percentile growth
  const renderLineChart = () => {
    const data = percentiles[examView];
    const maxValue = Math.max(...data.map((item) => item.value));
    const minValue = Math.min(...data.map((item) => item.value));
    const range = maxValue - minValue;

    // Calculate points for the line
    const points = data
      .map((item, index) => {
        const x = 30 + index * (240 / (data.length - 1));
        const y = 100 - ((item.value - minValue) / range) * 80;
        return `${x},${y}`;
      })
      .join(" ");

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

          {/* Line chart */}
          {animationComplete && (
            <>
              <polyline
                points={points}
                fill="none"
                stroke="#4f46e5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="500"
                strokeDashoffset="0"
                style={{
                  transition: "stroke-dashoffset 2s ease-in-out",
                }}
              />

              {/* Dots on points */}
              {data.map((item, index) => {
                const x = 30 + index * (240 / (data.length - 1));
                const y = 100 - ((item.value - minValue) / range) * 80;
                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#4f46e5"
                      opacity={animationComplete ? 1 : 0}
                      style={{
                        transition: `opacity 0.3s ease-in ${index * 0.1 + 1}s`,
                      }}
                    >
                      <title>
                        {item.month}: {item.value}%
                      </title>
                    </circle>
                    <text
                      x={x}
                      y="135"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#a1a1aa"
                    >
                      {item.month}
                    </text>
                    {/* Value text above dot */}
                    <text
                      x={x}
                      y={y - 10}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#a1a1aa"
                      opacity={animationComplete ? 1 : 0}
                      style={{
                        transition: `opacity 0.3s ease-in ${
                          index * 0.1 + 1.2
                        }s`,
                      }}
                    >
                      {item.value}%
                    </text>
                  </g>
                );
              })}
            </>
          )}
        </svg>
      </div>
    );
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <FileText className="mr-2 h-5 w-5 text-indigo-500" />
            Percentile Progress
          </CardTitle>
          <div className="flex rounded-md bg-zinc-200 p-0.5 dark:bg-zinc-700">
            <button
              onClick={() => setExamView("jee")}
              className={`rounded px-2 py-1 text-xs ${
                examView === "jee"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-zinc-800"
                  : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-600"
              }`}
            >
              JEE
            </button>
            <button
              onClick={() => setExamView("neet")}
              className={`rounded px-2 py-1 text-xs ${
                examView === "neet"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-zinc-800"
                  : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-600"
              }`}
            >
              NEET
            </button>
            <button
              onClick={() => setExamView("upsc")}
              className={`rounded px-2 py-1 text-xs ${
                examView === "upsc"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-zinc-800"
                  : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-600"
              }`}
            >
              UPSC
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">{renderLineChart()}</CardContent>
    </Card>
  );
};

export default PercentileCard;
