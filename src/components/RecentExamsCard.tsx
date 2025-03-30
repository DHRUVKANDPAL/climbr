import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, ArrowRight } from "lucide-react";

interface Exam {
  id: number;
  title: string;
  subject: string;
  time: string;
  score: string;
  percentile: number;
}

interface RecentExamsCardProps {
  exams: Exam[];
}

const RecentExamsCard: React.FC<RecentExamsCardProps> = ({ exams }) => {
  return (
    <Card className="row-span-2">
      <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
        <CardTitle className="flex items-center text-lg">
          <FileText className="mr-2 h-5 w-5 text-indigo-500" />
          Recent Exams
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="rounded-lg border border-zinc-200 p-3 transition-all hover:border-indigo-200 hover:bg-indigo-50/30 dark:border-zinc-700 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/20"
            >
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-sm font-medium">{exam.title}</h3>
                <Badge
                  variant="outline"
                  className="bg-indigo-100 font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400"
                >
                  {exam.percentile}%
                </Badge>
              </div>
              <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>{exam.subject}</span>
                <span>{exam.time}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <Progress
                  value={
                    (parseInt(exam.score.split("/")[0]) /
                      parseInt(exam.score.split("/")[1])) *
                    100
                  }
                  className="h-1.5 w-4/5 bg-zinc-200 dark:bg-zinc-700"
                />
                <span className="text-xs font-medium">{exam.score}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 flex w-full items-center justify-center rounded-md bg-zinc-100 py-2 text-sm font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
          View All Exams
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
};

export default RecentExamsCard;
