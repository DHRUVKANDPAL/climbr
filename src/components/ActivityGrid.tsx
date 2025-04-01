"use client";
import React, { useState, useEffect, useRef } from "react";
import { Calendar, CheckCircle2, ChevronDown } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Function to get range of years (current year and 2 previous years)
function getAvailableYears() {
  const currentYear = new Date().getFullYear();
  return [currentYear - 2, currentYear - 1, currentYear];
}

function ActivityCalendar({ userData }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearData, setYearData] = useState([]);
  const gridContainerRef = useRef(null);

  // Filter activity data by selected year
  useEffect(() => {
    if (userData?.activityGrid) {
      const filteredData = userData.activityGrid.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === selectedYear;
      });
      setYearData(filteredData);
    }
  }, [selectedYear, userData]);

  // Generate filtered activity data for the selected year
  function generateYearActivityData(year) {
    // This would replace the original function, filtering for a specific year
    const daysInWeek = 7;
    const weeksInYear = 53; // Maximum possible weeks in a year view

    const data = [];
    const startDate = new Date(year, 0, 1); // January 1st of selected year
    const endDate = new Date(year, 11, 31); // December 31st of selected year

    // Create a date iterator
    const currentDate = new Date(startDate);

    // Month names for display
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Day names for display
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Generate data for each day in the selected year
    while (currentDate <= endDate) {
      // Generate activity level with higher probability of low values
      let level;
      const rand = Math.random();
      if (rand < 0.6)
        level = 0; // 60% chance of no activity
      else if (rand < 0.75)
        level = 1; // 15% chance of low activity
      else if (rand < 0.85)
        level = 2; // 10% chance of medium activity
      else if (rand < 0.95)
        level = 3; // 10% chance of high activity
      else level = 4; // 5% chance of very high activity

      // Add more activity for certain months (like exam periods)
      const month = currentDate.getMonth();
      if (month === 2 || month === 8 || month === 11) {
        level = Math.min(4, level + Math.floor(Math.random() * 2));
      }

      data.push({
        date: new Date(currentDate),
        month: monthNames[month],
        monthIndex: month,
        day: currentDate.getDate(),
        dayOfWeek: currentDate.getDay(),
        dayName: dayNames[currentDate.getDay()],
        level,
        formattedDate: `${monthNames[month]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`,
      });

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
  }

  // Render the activity grid with appropriate colors and days
  function renderActivityGrid() {
    const colorClasses = [
      "bg-zinc-800 dark:bg-zinc-700", // No activity
      "bg-indigo-900 dark:bg-indigo-900", // Low
      "bg-indigo-700 dark:bg-indigo-700", // Medium
      "bg-indigo-500 dark:bg-indigo-600", // High
      "bg-indigo-300 dark:bg-indigo-400", // Very high
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Use either filtered data or generate new data if none exists
    const activityData =
      yearData.length > 0 ? yearData : generateYearActivityData(selectedYear);

    // Group data by weeks for display
    const weeks = [];
    let currentWeek = [];

    // Start with the first day of the year
    const firstDayOfYear = new Date(selectedYear, 0, 1);
    const firstDayOfWeek = firstDayOfYear.getDay();

    // Fill in the days before the first day of the year
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null); // Empty cell placeholder
    }

    // Organize days into weeks
    activityData.forEach((day) => {
      if (day.dayOfWeek === 0 && currentWeek.length > 0) {
        // Complete the previous week
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    // Add the last week if it's not complete
    if (currentWeek.length > 0) {
      // Fill in any missing days at the end
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    // Group weeks by month to add spacing between months
    const monthsData = [];
    let currentMonthWeeks = [];
    let currentMonth = null;

    weeks.forEach((week) => {
      // Find the dominant month in this week (use the one with most days)
      const monthCounts = {};
      week.forEach((day) => {
        if (day) {
          monthCounts[day.month] = (monthCounts[day.month] || 0) + 1;
        }
      });

      let dominantMonth = null;
      let maxCount = 0;
      for (const month in monthCounts) {
        if (monthCounts[month] > maxCount) {
          maxCount = monthCounts[month];
          dominantMonth = month;
        }
      }

      // For empty weeks at the start/end, use adjacent month
      if (dominantMonth === null && currentMonth) {
        dominantMonth = currentMonth;
      }

      // If this is the first week or a new month
      if (currentMonth === null) {
        currentMonth = dominantMonth;
        currentMonthWeeks.push(week);
      } else if (dominantMonth !== currentMonth) {
        // New month, push the current month data
        monthsData.push({
          month: currentMonth,
          weeks: currentMonthWeeks,
        });

        // Start new month
        currentMonth = dominantMonth;
        currentMonthWeeks = [week];
      } else {
        // Same month, add to current
        currentMonthWeeks.push(week);
      }
    });

    // Add the last month
    if (currentMonthWeeks.length > 0) {
      monthsData.push({
        month: currentMonth,
        weeks: currentMonthWeeks,
      });
    }

    // Calculate stats
    const daysWithActivity = activityData.filter(
      (item) => item.level > 0,
    ).length;
    const maxProblems = activityData.reduce(
      (max, item) => Math.max(max, item.level),
      0,
    );

    return (
      <div className="relative">
        <div ref={gridContainerRef} className="overflow-x-auto pb-2">
          <div className="min-w-fit">
            {/* Day labels (vertical) */}
            <div className="mb-1 flex">
              <div className="mr-2 w-8">{/* Empty space for alignment */}</div>
              <div className="flex-grow">
                <div className="flex text-xs text-zinc-500 dark:text-zinc-400">
                  {monthsData.map((monthData, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="px-2 text-center">{monthData.month}</div>
                      {/* Space to align month name with its weeks */}
                      <div
                        style={{
                          width: `${monthData.weeks.length * 20}px`, // 20px = 16px (cell) + 4px (gap)
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Day of week labels */}
              <div className="mr-2 w-8">
                <div className="grid grid-rows-7 gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {dayNames.map((day, idx) => (
                    <div key={idx} className="flex h-4 items-center">
                      {idx % 2 === 0 ? day.charAt(0) : ""}
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity grid with gaps between months */}
              <div className="flex-grow">
                <div className="flex">
                  {monthsData.map((monthData, monthIdx) => (
                    <div key={monthIdx} className="mr-4 flex">
                      {" "}
                      {/* Add margin for gap between months */}
                      {monthData.weeks.map((week, weekIdx) => (
                        <div
                          key={weekIdx}
                          className="mr-1 grid grid-rows-7 gap-1"
                        >
                          {" "}
                          {/* Small gap between weeks */}
                          {week.map((day, dayIdx) => (
                            <div
                              key={dayIdx}
                              className={`h-4 w-4 rounded-sm ${day ? colorClasses[day.level] : "bg-transparent"} transition-all hover:scale-110 hover:opacity-80`}
                              title={
                                day
                                  ? `${day.level === 0 ? "No" : day.level} question${day.level === 1 ? "" : "s"} solved on ${day.formattedDate}`
                                  : ""
                              }
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <div>
            <span className="mr-1">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`ml-1 inline-block h-3 w-3 rounded-sm ${colorClasses[level]}`}
              />
            ))}
            <span className="ml-1">More</span>
          </div>

          <div className="flex items-center">
            <span>{daysWithActivity} days with activity</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Calendar className="mr-2 h-5 w-5 text-indigo-500" />
            Activity Calendar
          </CardTitle>

          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger className="h-8 w-24 text-sm">
              <SelectValue placeholder={selectedYear} />
            </SelectTrigger>
            <SelectContent>
              {getAvailableYears().map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="pt-4">{renderActivityGrid()}</CardContent>

      <CardFooter className="border-t border-zinc-200 pt-2 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        <div className="flex w-full items-center justify-between">
          <span>
            {yearData.filter((item) => item.level > 0).length || 0} days with
            activity in {selectedYear}
          </span>
          <span className="flex items-center font-medium text-indigo-600">
            <CheckCircle2 className="mr-1 h-4 w-4" />
            {yearData.reduce((max, item) => Math.max(max, item.level), 0) ||
              0}{" "}
            max problems in a day
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ActivityCalendar;
