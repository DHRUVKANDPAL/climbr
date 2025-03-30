import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, CheckCircle2, Target, Flame, Calendar } from "lucide-react";

interface SummaryCardProps {
  userData: {
    totalSolved: number;
    totalQuestions: number;
    attempting: number;
    streak: number;
    totalActive: number;
    contestRating: string;
    globalRanking: string;
    topPercentile: string;
  };
  animationComplete: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  userData,
  animationComplete,
}) => {
  return (
    <Card className="overflow-hidden pt-0">
      <CardHeader className="rounded-t-xl bg-zinc-100 pt-4 pb-2 dark:bg-zinc-800/60">
        <CardTitle className="flex items-center text-lg">
          <BarChart3 className="mr-2 h-5 w-5 text-indigo-500" />
          Profile Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
            <h3 className="mb-1 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <CheckCircle2 className="mr-1 h-4 w-4" /> Solved
            </h3>
            <p className="text-xl font-bold">{userData.totalSolved}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              / {userData.totalQuestions} Total
            </p>
          </div>
          <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
            <h3 className="mb-1 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <Target className="mr-1 h-4 w-4" /> Attempting
            </h3>
            <p className="text-xl font-bold">{userData.attempting}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Questions
            </p>
          </div>
          <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
            <h3 className="mb-1 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <Flame className="mr-1 h-4 w-4" /> Streak
            </h3>
            <p className="text-xl font-bold">{userData.streak}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Days</p>
          </div>
          <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
            <h3 className="mb-1 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <Calendar className="mr-1 h-4 w-4" /> Active
            </h3>
            <p className="text-xl font-bold">{userData.totalActive}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Days</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium">Contest Rating</span>
              <span className="font-semibold text-indigo-500">
                {userData.contestRating}
              </span>
            </div>
            <Progress value={60} className="h-2 bg-zinc-200 dark:bg-zinc-700" />
          </div>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium">Global Ranking</span>
              <span className="font-semibold">{userData.globalRanking}</span>
            </div>
            <Progress value={35} className="h-2 bg-zinc-200 dark:bg-zinc-700" />
          </div>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium">Top Percentile</span>
              <span className="font-semibold">{userData.topPercentile}</span>
            </div>
            <Progress value={65} className="h-2 bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
