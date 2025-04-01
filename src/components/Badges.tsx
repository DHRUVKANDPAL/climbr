import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  BookCheck,
  Flame,
  Clock,
  Trophy,
  ChevronDown,
} from "lucide-react";

interface BadgeItem {
  id: number;
  name: string;
  icon: string;
}

interface BadgesCardProps {
  badges: BadgeItem[];
}

const BadgesCard: React.FC<BadgesCardProps> = ({ badges }) => {
  return (
    <Card>
      <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-indigo-500" />
            Your Badges
          </div>
          <Badge
            variant="outline"
            className="rounded-full bg-indigo-100 px-2 text-xs text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400"
          >
            {badges.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {badges.slice(0, 6).map((badge) => {
            const IconComponent = {
              Award: Award,
              BookCheck: BookCheck,
              Flame: Flame,
              Clock: Clock,
              Trophy: Trophy,
            }[badge.icon];

            return (
              <div
                key={badge.id}
                className="flex flex-col items-center rounded-lg border border-zinc-200 p-3 text-center transition-all hover:border-indigo-300 hover:bg-indigo-50/30 dark:border-zinc-700 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/20"
              >
                <div className="mb-2 rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/40">
                  {IconComponent && (
                    <IconComponent className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  )}
                </div>
                <div className="text-xs font-medium">{badge.name}</div>
              </div>
            );
          })}
        </div>
        {badges.length > 6 && (
          <button className="mt-3 flex w-full items-center justify-center rounded-md bg-zinc-100 py-1.5 text-xs font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
            Show {badges.length - 6} more
            <ChevronDown className="ml-1 h-3 w-3" />
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgesCard;
