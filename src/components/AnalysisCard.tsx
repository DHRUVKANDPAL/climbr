import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

interface StatsAnalysis {
  strongTopics: string[];
  weakTopics: string[];
  avgTime: {
    easy: number;
    medium: number;
    hard: number;
  };
  improvement?: {
    lastMonth: number;
    lastWeek: number;
  };
}

interface AnalysisCardProps {
  statsAnalysis: StatsAnalysis;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ statsAnalysis }) => {
  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
        <CardTitle className="flex items-center text-lg">
          <Target className="mr-2 h-5 w-5 text-indigo-500" />
          Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Strong Topics
            </h3>
            <div className="space-y-2">
              {statsAnalysis.strongTopics.map((topic, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Weak Topics
            </h3>
            <div className="space-y-2">
              {statsAnalysis.weakTopics.map((topic, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="mr-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Average Time Per Question
            </h3>
            <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm">Easy</span>
                <span className="font-medium">
                  {statsAnalysis.avgTime.easy} min
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm">Medium</span>
                <span className="font-medium">
                  {statsAnalysis.avgTime.medium} min
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Hard</span>
                <span className="font-medium">
                  {statsAnalysis.avgTime.hard} min
                </span>
              </div>
            </div>
          </div>

          {/* Add improvement metrics if available */}
          {statsAnalysis.improvement && (
            <div className="mt-4 border-t border-zinc-200 pt-4 md:col-span-3 dark:border-zinc-800">
              <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Recent Improvement
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Last Week
                  </span>
                  <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    +{statsAnalysis.improvement.lastWeek}%
                  </p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Last Month
                  </span>
                  <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                    +{statsAnalysis.improvement.lastMonth}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisCard;
