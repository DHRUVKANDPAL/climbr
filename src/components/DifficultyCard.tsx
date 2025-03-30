"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface DifficultyStats {
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
}

interface Subject {
  name: string;
  solved: number;
  total: number;
  color: string;
}

interface DifficultyCardProps {
  difficultyStats: DifficultyStats;
  subjects: Subject[];
  animationComplete: boolean;
}

const DifficultyCard: React.FC<DifficultyCardProps> = ({
  difficultyStats,
  subjects,
  animationComplete,
}) => {
  // Use state to handle client-side animations to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);

  // Using useEffect to ensure this only runs on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate total questions and progress
  const totalSolved =
    difficultyStats.easy.solved +
    difficultyStats.medium.solved +
    difficultyStats.hard.solved;

  const totalQuestions =
    difficultyStats.easy.total +
    difficultyStats.medium.total +
    difficultyStats.hard.total;

  const overallPercentage = Math.round((totalSolved / totalQuestions) * 100);

  // Render pie chart for subject distribution
  const renderPieChart = () => {
    if (!isClient) {
      // Return a placeholder for server rendering
      return (
        <div className="relative mx-auto h-32 w-32 rounded-full border-4 border-zinc-100 dark:border-zinc-800">
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
            {overallPercentage}%
          </div>
        </div>
      );
    }

    const total = subjects.reduce((acc, subject) => acc + subject.solved, 0);
    let currentAngle = 0;

    return (
      <div className="relative mx-auto h-32 w-32">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          {subjects.map((subject, index) => {
            // Calculate percentage of this subject
            const percentage = (subject.solved / total) * 100;
            // Convert percentage to angle (in radians)
            const angle = (percentage / 100) * (2 * Math.PI);
            // Calculate the path
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle = endAngle;

            // Calculate the SVG path
            const x1 = 50 + 40 * Math.cos(startAngle);
            const y1 = 50 + 40 * Math.sin(startAngle);
            const x2 = 50 + 40 * Math.cos(endAngle);
            const y2 = 50 + 40 * Math.sin(endAngle);

            // Determine if the arc should be drawn as large (> 180 degrees) or small
            const largeArcFlag = angle > Math.PI ? 1 : 0;

            // Define the SVG path
            const path = `
              M 50 50
              L ${x1} ${y1}
              A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `;

            // Determine color based on subject
            let fillColor;
            if (subject.color === "bg-blue-500") fillColor = "#3b82f6";
            else if (subject.color === "bg-green-500") fillColor = "#22c55e";
            else if (subject.color === "bg-purple-500") fillColor = "#a855f7";
            else fillColor = "#d4d4d8";

            return (
              <path
                key={index}
                d={path}
                fill={fillColor}
                opacity={animationComplete ? 1 : 0}
                transform="scale(0.8)"
                style={{
                  transformOrigin: "center",
                  transition: `opacity 0.5s ease-in ${index * 0.1 + 0.2}s`,
                }}
              >
                <title>{subject.name}</title>
              </path>
            );
          })}
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="white"
            stroke="#f4f4f5"
            strokeWidth="1"
            className="dark:fill-zinc-900 dark:stroke-zinc-800"
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#71717a"
            className="dark:fill-zinc-300"
          >
            {overallPercentage}%
          </text>
        </svg>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
        <CardTitle className="flex items-center text-lg">
          <CheckCircle2 className="mr-2 h-5 w-5 text-indigo-500" />
          Difficulty & Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div>
          <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Solved by Difficulty
          </h3>
          <div className="space-y-4">
            {/* Easy */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Easy</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {difficultyStats.easy.solved}/{difficultyStats.easy.total}
                </span>
              </div>
              <Progress
                value={
                  (difficultyStats.easy.solved / difficultyStats.easy.total) *
                  100
                }
                className="h-2 bg-zinc-200 dark:bg-zinc-700"
              />
            </div>

            {/* Medium */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Medium</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {difficultyStats.medium.solved}/{difficultyStats.medium.total}
                </span>
              </div>
              <Progress
                value={
                  (difficultyStats.medium.solved /
                    difficultyStats.medium.total) *
                  100
                }
                className="h-2 bg-zinc-200 dark:bg-zinc-700 [&>div]:bg-yellow-500"
              />
            </div>

            {/* Hard */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Hard</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {difficultyStats.hard.solved}/{difficultyStats.hard.total}
                </span>
              </div>
              <Progress
                value={
                  (difficultyStats.hard.solved / difficultyStats.hard.total) *
                  100
                }
                className="h-2 bg-zinc-200 dark:bg-zinc-700 [&>div]:bg-red-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Subject Distribution
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1 flex flex-col space-y-2">
              {subjects.map((subject, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`mr-2 h-3 w-3 rounded-full ${subject.color}`}
                  ></div>
                  <span className="text-xs">{subject.name}</span>
                </div>
              ))}
            </div>
            <div className="col-span-2">{renderPieChart()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DifficultyCard;
