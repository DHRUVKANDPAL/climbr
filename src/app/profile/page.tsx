"use client";
import React, { useState, useEffect } from "react";
import {
  UserCircle,
  BookOpen,
  FileText,
  Trophy,
  Bookmark,
  LogOut,
  Calendar,
  ChevronDown,
  Clock,
  BookCheck,
  ArrowRight,
  Award,
  Flame,
  BarChart3,
  PieChart,
  LineChart,
  Star,
  EyeIcon,
  MessageSquare,
  CheckCircle2,
  Brain,
  Medal,
  Target,
  Layers,
  Timer,
  GraduationCap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DarkModeToggle from "@/components/DarkModeToggle";
import Logo from "@/components/Logo";

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("week");
  const [examView, setExamView] = useState("jee");
  const [currentStreak, setCurrentStreak] = useState("8");
  const [animationComplete, setAnimationComplete] = useState(false);

  // Trigger animations after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Sample user data
  const userData = {
    name: "Arjun Kumar",
    email: "arjun.kumar@example.com",
    rank: "8,33,380",
    contestRating: "1,563",
    globalRanking: "192,930/580,249",
    attended: "3",
    topPercentile: "28.85%",
    streak: 8,
    totalSolved: 142,
    totalQuestions: 350,
    attempting: 20,
    totalActive: 36,
    badges: [
      { id: 1, name: "50 Days Badge 2024", icon: "Award" },
      { id: 2, name: "Problem Solver", icon: "BookCheck" },
      { id: 3, name: "Streak Master", icon: "Flame" },
      { id: 4, name: "Early Bird", icon: "Clock" },
      { id: 5, name: "Top 10%", icon: "Trophy" },
    ],
    difficultyStats: {
      easy: { solved: 79, total: 869 },
      medium: { solved: 60, total: 1818 },
      hard: { solved: 3, total: 314 },
    },
    subjects: [
      { name: "Physics", solved: 58, total: 120, color: "bg-blue-500" },
      { name: "Chemistry", solved: 45, total: 110, color: "bg-green-500" },
      { name: "Mathematics", solved: 39, total: 120, color: "bg-purple-500" },
    ],
    languages: [
      { name: "Theory", questions: 135 },
      { name: "Numerical", questions: 5 },
      { name: "Match the Column", questions: 2 },
    ],
    skills: [
      { name: "Calculus", level: "Advanced", count: 10 },
      { name: "Organic Chemistry", level: "Advanced", count: 3 },
      { name: "Mechanics", level: "Advanced", count: 2 },
      { name: "Algebra", level: "Intermediate", count: 29 },
      { name: "Thermodynamics", level: "Intermediate", count: 25 },
    ],
    attendance: {
      week: 85,
      month: 78,
      year: 82,
    },
    percentiles: {
      jee: [
        { month: "Jan", value: 76 },
        { month: "Feb", value: 79 },
        { month: "Mar", value: 81 },
        { month: "Apr", value: 85 },
        { month: "May", value: 83 },
        { month: "Jun", value: 89 },
      ],
      neet: [
        { month: "Jan", value: 72 },
        { month: "Feb", value: 75 },
        { month: "Mar", value: 82 },
        { month: "Apr", value: 84 },
        { month: "May", value: 88 },
        { month: "Jun", value: 92 },
      ],
      upsc: [
        { month: "Jan", value: 68 },
        { month: "Feb", value: 73 },
        { month: "Mar", value: 77 },
        { month: "Apr", value: 80 },
        { month: "May", value: 83 },
        { month: "Jun", value: 85 },
      ],
    },
    recentExams: [
      {
        id: 1,
        title: "JEE Advanced Mock Test 12",
        subject: "All Subjects",
        time: "2 hours ago",
        score: "192/300",
        percentile: 87.5,
      },
      {
        id: 2,
        title: "Physics Sectional Test: Mechanics",
        subject: "Physics",
        time: "5 hours ago",
        score: "85/100",
        percentile: 92.3,
      },
      {
        id: 3,
        title: "Chemistry Full Test",
        subject: "Chemistry",
        time: "1 day ago",
        score: "87/120",
        percentile: 88.6,
      },
      {
        id: 4,
        title: "Mathematics: Calculus Deep Dive",
        subject: "Mathematics",
        time: "2 days ago",
        score: "68/90",
        percentile: 85.2,
      },
    ],
    activityGrid: generateActivityData(),
    weeklyProgress: [
      { day: "Mon", solved: 12 },
      { day: "Tue", solved: 8 },
      { day: "Wed", solved: 15 },
      { day: "Thu", solved: 10 },
      { day: "Fri", solved: 7 },
      { day: "Sat", solved: 20 },
      { day: "Sun", solved: 5 },
    ],
    recentSubmissions: [
      {
        id: 1,
        title: "Maximum Difference Between Even and Odd Frequency I",
        type: "Advanced",
        date: "2 months ago",
      },
      {
        id: 2,
        title: "Maximum Ascending Subarray Sum",
        type: "Advanced",
        date: "2 months ago",
      },
      {
        id: 3,
        title: "Count Mentions Per User",
        type: "Intermediate",
        date: "2 months ago",
      },
      {
        id: 4,
        title: "Count Partitions with Even Sum Difference",
        type: "Advanced",
        date: "2 months ago",
      },
    ],
    statsAnalysis: {
      strongTopics: ["Mechanics", "Organic Chemistry", "Calculus"],
      weakTopics: ["Thermodynamics", "Inorganic Chemistry", "Vectors"],
      avgTime: {
        easy: 2.4,
        medium: 5.8,
        hard: 12.3,
      },
      improvement: {
        lastMonth: 12,
        lastWeek: 5,
      },
    },
  };

  // Generate more realistic activity data
  function generateActivityData() {
    const days = 7; // 7 days in a week
    const months = 12; // 12 months

    const data = [];
    const monthNames = [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ];

    for (let m = 0; m < months; m++) {
      for (let d = 0; d < days; d++) {
        // Only include some days to match the pattern
        if (d % 2 === 0 || d === 0 || d === days - 1) {
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

          // Create clusters of activity
          if (m > 0 && data.length > 0) {
            const lastIndex = data.length - 1;
            if (data[lastIndex].level > 0 && Math.random() < 0.7) {
              level = Math.max(1, data[lastIndex].level - 1);
            }
          }

          // Add more activity for certain months (like exam periods)
          if (m === 2 || m === 8 || m === 11) {
            level = Math.min(4, level + Math.floor(Math.random() * 2));
          }

          data.push({
            month: monthNames[m],
            level,
          });
        }
      }
    }
    return data;
  }

  // Render the activity grid with appropriate colors
  const renderActivityGrid = () => {
    const colorClasses = [
      "bg-zinc-800 dark:bg-zinc-700", // No activity
      "bg-indigo-900 dark:bg-indigo-900", // Low
      "bg-indigo-700 dark:bg-indigo-700", // Medium
      "bg-indigo-500 dark:bg-indigo-600", // High
      "bg-indigo-300 dark:bg-indigo-400", // Very high
    ];

    const months = [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ];

    return (
      <div className="py-2">
        <div className="h-full w-full">
          <div className="mb-1 flex text-xs text-zinc-500 dark:text-zinc-400">
            {months.map((month, idx) => (
              <div key={idx} className="flex-1 text-center">
                {month}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-51 gap-1">
            {userData.activityGrid.map((item, i) => (
              <div
                key={i}
                className={`h-4 w-4 rounded-sm ${colorClasses[item.level]} transition-all hover:scale-110 hover:opacity-80`}
                title={`${item.level === 0 ? "No" : item.level} question${item.level === 1 ? "" : "s"} solved on ${item.month}`}
              />
            ))}
          </div>

          <div className="mt-2 flex items-center justify-end text-xs text-zinc-500 dark:text-zinc-400">
            <span className="mr-1">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`ml-1 h-3 w-3 rounded-sm ${colorClasses[level]}`}
              />
            ))}
            <span className="ml-1">More</span>
          </div>
        </div>
      </div>
    );
  };

  // Render donut chart for attendance tracking with animation
  const renderDonutChart = () => {
    const percentage = userData.attendance[timeRange];
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

  // Render animated pie chart for subject distribution
  const renderPieChart = () => {
    const total = userData.subjects.reduce(
      (acc, subject) => acc + subject.solved,
      0,
    );
    let currentAngle = 0;

    return (
      <div className="relative mx-auto h-32 w-32">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          {userData.subjects.map((subject, index) => {
            // Calculate the angle for this slice
            const angle = (subject.solved / total) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;
            const endAngle = currentAngle;

            // Convert angles to radians for calculations
            const startAngleRad = (startAngle - 90) * (Math.PI / 180);
            const endAngleRad = (endAngle - 90) * (Math.PI / 180);

            // Calculate the SVG arc path
            const x1 = 50 + 40 * Math.cos(startAngleRad);
            const y1 = 50 + 40 * Math.sin(startAngleRad);
            const x2 = 50 + 40 * Math.cos(endAngleRad);
            const y2 = 50 + 40 * Math.sin(endAngleRad);

            // Determine if the arc is greater than 180 degrees (large-arc-flag)
            const largeArcFlag = angle > 180 ? 1 : 0;

            // Create the SVG path for the slice
            const pathData = `
              M 50 50
              L ${x1} ${y1}
              A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `;

            // Extract color name from bg-class
            const colorName = subject.color.replace("bg-", "");

            return (
              <path
                key={index}
                d={pathData}
                fill={colorName}
                opacity={animationComplete ? 1 : 0}
                transform={animationComplete ? "scale(1)" : "scale(0.8)"}
                style={{
                  transition: `opacity 0.5s ease-in-out ${index * 0.2}s, transform 0.5s ease-in-out ${index * 0.2}s`,
                }}
              >
                <title>
                  {subject.name}: {subject.solved} problems
                </title>
              </path>
            );
          })}
        </svg>
      </div>
    );
  };

  // Render animated bar chart for weekly progress
  const renderWeeklyBarChart = () => {
    const maxValue = Math.max(
      ...userData.weeklyProgress.map((day) => day.solved),
    );

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
          {userData.weeklyProgress.map((day, index) => {
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

  // Render animated line chart for percentile growth
  const renderLineChart = () => {
    const data = userData.percentiles[examView];
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
        <svg className="h-full w-full" viewBox="0 0 300 120">
          {/* Background grid lines */}
          {[0, 25, 50, 75, 100].map((percent, i) => {
            const y = 20 + ((100 - percent) / 100) * 80;
            return (
              <g key={i}>
                <line
                  x1="30"
                  y1={y}
                  x2="270"
                  y2={y}
                  stroke="#71717a"
                  strokeWidth="0.5"
                  strokeDasharray="3,3"
                  opacity="0.3"
                />
                <text
                  x="20"
                  y={y + 4}
                  fill="#a1a1aa"
                  fontSize="10"
                  textAnchor="end"
                >
                  {minValue + (percent / 100) * range}%
                </text>
              </g>
            );
          })}

          {/* Y-axis */}
          <line
            x1="30"
            y1="20"
            x2="30"
            y2="100"
            stroke="#71717a"
            strokeWidth="1"
          />

          {/* X-axis */}
          <line
            x1="30"
            y1="100"
            x2="270"
            y2="100"
            stroke="#71717a"
            strokeWidth="1"
          />

          {/* X-axis labels (months) */}
          {data.map((item, index) => (
            <text
              key={index}
              x={30 + index * (240 / (data.length - 1))}
              y="115"
              fill="#a1a1aa"
              fontSize="10"
              textAnchor="middle"
            >
              {item.month}
            </text>
          ))}

          {/* Data line with animation */}
          <polyline
            points={points}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="300"
            strokeDashoffset={animationComplete ? "0" : "300"}
            style={{
              transition: "stroke-dashoffset 1.5s ease-in-out",
            }}
          />

          {/* Area under the line with gradient */}
          <defs>
            <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`${points} L ${270},100 L 30,100 Z`}
            fill="url(#areaGradient)"
            opacity={animationComplete ? "0.3" : "0"}
            style={{
              transition: "opacity 1s ease-in-out 0.5s",
            }}
          />

          {/* Data points with animation */}
          {data.map((item, index) => {
            const x = 30 + index * (240 / (data.length - 1));
            const y = 100 - ((item.value - minValue) / range) * 80;
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#10b981"
                  opacity={animationComplete ? "1" : "0"}
                  transform={animationComplete ? "scale(1)" : "scale(0)"}
                  style={{
                    transition: `opacity 0.3s ease-in ${0.7 + index * 0.1}s, transform 0.3s ease-in ${0.7 + index * 0.1}s`,
                  }}
                />
                <text
                  x={x}
                  y={y - 10}
                  fill="#ffffff"
                  fontSize="10"
                  textAnchor="middle"
                  opacity={animationComplete ? "1" : "0"}
                  style={{
                    transition: `opacity 0.3s ease-in ${1 + index * 0.1}s`,
                  }}
                >
                  {item.value}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  // Render progress circle
  const ProgressCircle = ({ value, total, color }) => {
    const percentage = (value / total) * 100;
    const circumference = 2 * Math.PI * 35;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative h-24 w-24">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#27272a"
            strokeWidth="7"
            className="opacity-20"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={animationComplete ? offset : circumference}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{
              transition: "stroke-dashoffset 1.5s ease-out",
            }}
          />
          <text
            x="50"
            y="45"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-zinc-900 text-lg font-bold dark:fill-white"
          >
            {animationComplete ? value : 0}
          </text>
          <text
            x="50"
            y="60"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-zinc-600 text-xs dark:fill-zinc-400"
          >
            /{total}
          </text>
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="h-auto w-full bg-white p-4 shadow-md md:fixed md:h-screen md:w-64 dark:bg-zinc-900">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-bold">
             <Logo/>
            </h1>
            <DarkModeToggle/>
          </div>

          <div className="mb-6 flex flex-col items-center">
            <div className="mb-4 flex items-center justify-center">
              <Avatar className="h-20 w-20 border-2 border-indigo-500 shadow-lg">
                <AvatarImage
                  src="https://api.placeholder.com/400/320"
                  alt={userData.name}
                />
                <AvatarFallback className="bg-indigo-600 text-xl text-white">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-center text-lg font-semibold">
              {userData.name}
            </h2>
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              {userData.email}
            </p>
            <div className="mt-2 flex justify-center space-x-2">
              <Badge
                variant="secondary"
                className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400"
              >
                JEE Aspirant
              </Badge>
              <Badge
                variant="outline"
                className="border-indigo-500 text-indigo-600 dark:text-indigo-400"
              >
                Premium
              </Badge>
            </div>
            <div className="mt-3 w-full">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-600 dark:text-zinc-400">Rank:</span>
                <span className="font-semibold">{userData.rank}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <p className="mb-2 text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
              Menu
            </p>
            <NavItem
              icon={<UserCircle className="mr-2 h-5 w-5" />}
              text="Profile"
              active
            />
            <NavItem
              icon={<BookOpen className="mr-2 h-5 w-5" />}
              text="Practice"
            />
            <NavItem
              icon={<FileText className="mr-2 h-5 w-5" />}
              text="Mock Tests"
            />
            <NavItem
              icon={<Trophy className="mr-2 h-5 w-5" />}
              text="Leaderboard"
            />
            <NavItem
              icon={<Brain className="mr-2 h-5 w-5" />}
              text="AI Assistant"
            />
            <NavItem
              icon={<Bookmark className="mr-2 h-5 w-5" />}
              text="Bookmarks"
            />
            <NavItem
              icon={<LogOut className="mr-2 h-5 w-5" />}
              text="Sign Out"
              className="mt-6 text-red-500 hover:bg-red-100/30 hover:text-red-600 dark:hover:bg-red-950/30"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:ml-64">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList className="h-10 bg-zinc-100 dark:bg-zinc-800">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="submissions"
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                >
                  Submissions
                </TabsTrigger>
                <TabsTrigger
                  value="statistics"
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                >
                  Statistics
                </TabsTrigger>
                <TabsTrigger
                  value="badges"
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                >
                  Badges
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-2">
                <Select
                  defaultValue="week"
                  value={timeRange}
                  onValueChange={setTimeRange}
                >
                  <SelectTrigger className="h-10 w-36 bg-white dark:bg-zinc-800">
                    <SelectValue placeholder="Select Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Last 24 Hours</SelectItem>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Summary Statistics */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
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
                        <p className="text-xl font-bold">
                          {userData.totalSolved}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          / {userData.totalQuestions} Total
                        </p>
                      </div>
                      <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                        <h3 className="mb-1 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          <Target className="mr-1 h-4 w-4" /> Attempting
                        </h3>
                        <p className="text-xl font-bold">
                          {userData.attempting}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Questions
                        </p>
                      </div>
                      <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                        <h3 className="mb-1 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          <Flame className="mr-1 h-4 w-4" /> Streak
                        </h3>
                        <p className="text-xl font-bold">{userData.streak}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Days
                        </p>
                      </div>
                      <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                        <h3 className="mb-1 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          <Calendar className="mr-1 h-4 w-4" /> Active
                        </h3>
                        <p className="text-xl font-bold">
                          {userData.totalActive}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Days
                        </p>
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
                        <Progress
                          value={60}
                          className="h-2 bg-zinc-200 dark:bg-zinc-700"
                        />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="font-medium">Global Ranking</span>
                          <span className="font-semibold">
                            {userData.globalRanking}
                          </span>
                        </div>
                        <Progress
                          value={35}
                          className="h-2 bg-zinc-200 dark:bg-zinc-700"
                        />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="font-medium">Top Percentile</span>
                          <span className="font-semibold">
                            {userData.topPercentile}
                          </span>
                        </div>
                        <Progress
                          value={65}
                          className="h-2 bg-zinc-200 dark:bg-zinc-700"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Problem Solving Stats */}
                <Card>
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
                    <CardTitle className="flex items-center text-lg">
                      <PieChart className="mr-2 h-5 w-5 text-indigo-500" />
                      Problem Difficulty
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                        <div className="mb-1 text-sm font-medium text-indigo-500">
                          Easy
                        </div>
                        <div className="text-xl font-bold">
                          {userData.difficultyStats.easy.solved}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          /{userData.difficultyStats.easy.total}
                        </div>
                        <Progress
                          value={
                            (userData.difficultyStats.easy.solved /
                              userData.difficultyStats.easy.total) *
                            100
                          }
                          className="mt-2 h-1.5 bg-zinc-200 dark:bg-zinc-700"
                        />
                      </div>
                      <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                        <div className="mb-1 text-sm font-medium text-yellow-500">
                          Medium
                        </div>
                        <div className="text-xl font-bold">
                          {userData.difficultyStats.medium.solved}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          /{userData.difficultyStats.medium.total}
                        </div>
                        <Progress
                          value={
                            (userData.difficultyStats.medium.solved /
                              userData.difficultyStats.medium.total) *
                            100
                          }
                          className="mt-2 h-1.5 bg-zinc-200 dark:bg-zinc-700"
                        />
                      </div>
                      <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                        <div className="mb-1 text-sm font-medium text-red-500">
                          Hard
                        </div>
                        <div className="text-xl font-bold">
                          {userData.difficultyStats.hard.solved}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          /{userData.difficultyStats.hard.total}
                        </div>
                        <Progress
                          value={
                            (userData.difficultyStats.hard.solved /
                              userData.difficultyStats.hard.total) *
                            100
                          }
                          className="mt-2 h-1.5 bg-zinc-200 dark:bg-zinc-700"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="mb-3 text-sm font-medium">
                        Subject Distribution
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="col-span-1 md:col-span-1">
                          {renderPieChart()}
                        </div>
                        <div className="col-span-1 space-y-3 md:col-span-2">
                          {userData.subjects.map((subject, index) => (
                            <div key={index}>
                              <div className="mb-1 flex items-center justify-between text-sm">
                                <span className="font-medium">
                                  {subject.name}
                                </span>
                                <span>
                                  {subject.solved}/{subject.total}
                                </span>
                              </div>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                                <div
                                  className={`h-full ${subject.color}`}
                                  style={{
                                    width: `${
                                      (subject.solved / subject.total) * 100
                                    }%`,
                                    transition: "width 1s ease-in-out",
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Exams */}
                <Card className="row-span-2">
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-indigo-500" />
                      Recent Exams
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      {userData.recentExams.map((exam) => (
                        <div
                          key={exam.id}
                          className="rounded-lg border border-zinc-200 p-3 transition-all hover:border-indigo-200 hover:bg-indigo-50/30 dark:border-zinc-700 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/20"
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <h3 className="text-sm font-medium">
                              {exam.title}
                            </h3>
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
                            <span className="text-xs font-medium">
                              {exam.score}
                            </span>
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

                {/* Weekly Progress Chart */}
                <Card>
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
                    <CardTitle className="flex items-center text-lg">
                      <LineChart className="mr-2 h-5 w-5 text-indigo-500" />
                      Weekly Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {renderWeeklyBarChart()}
                  </CardContent>
                  <CardFooter className="border-t border-zinc-200 pt-2 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                    <div className="flex w-full items-center justify-between">
                      <span>
                        Total:{" "}
                        {userData.weeklyProgress.reduce(
                          (acc, day) => acc + day.solved,
                          0,
                        )}{" "}
                        problems this week
                      </span>
                      <span className="flex items-center font-medium text-indigo-600">
                        <Trophy className="mr-1 h-4 w-4" /> Best day:{" "}
                        {Math.max(
                          ...userData.weeklyProgress.map((day) => day.solved),
                        )}
                      </span>
                    </div>
                  </CardFooter>
                </Card>

                {/* Attendance & Streaks */}
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
                          {userData.attendance[timeRange]}% in the last{" "}
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
                          <div className="text-3xl font-bold text-indigo-500">
                            {currentStreak}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            days
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium">
                          Best: {userData.streak} days
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Grid */}
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
                    <CardTitle className="flex items-center text-lg">
                      <Calendar className="mr-2 h-5 w-5 text-indigo-500" />
                      Activity Calendar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {renderActivityGrid()}
                  </CardContent>
                  <CardFooter className="border-t border-zinc-200 pt-2 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                    <div className="flex w-full items-center justify-between">
                      <span>
                        {
                          userData.activityGrid.filter((item) => item.level > 0)
                            .length
                        }{" "}
                        days with activity in the past year
                      </span>
                      <span className="flex items-center font-medium text-indigo-600">
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        {userData.activityGrid.reduce(
                          (max, item) => Math.max(max, item.level),
                          0,
                        )}
                        max problems in a day
                      </span>
                    </div>
                  </CardFooter>
                </Card>

                {/* Badges Section */}
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
                        {userData.badges.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {userData.badges.slice(0, 6).map((badge, index) => {
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
                            <div className="text-xs font-medium">
                              {badge.name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {userData.badges.length > 6 && (
                      <button className="mt-3 flex w-full items-center justify-center rounded-md bg-zinc-100 py-1.5 text-xs font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                        Show {userData.badges.length - 6} more
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="submissions" className="mt-0">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                <Card className="lg:col-span-3">
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-indigo-500" />
                      Recent Submissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-zinc-200 text-left text-sm font-medium text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                            <th className="pb-2">Problem</th>
                            <th className="pb-2">Level</th>
                            <th className="pb-2">Status</th>
                            <th className="pb-2">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData.recentSubmissions.map((submission) => (
                            <tr
                              key={submission.id}
                              className="border-b border-zinc-100 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                            >
                              <td className="py-3 text-sm font-medium">
                                {submission.title}
                              </td>
                              <td className="py-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    submission.type === "Advanced"
                                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                      : submission.type === "Intermediate"
                                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                  }
                                >
                                  {submission.type}
                                </Badge>
                              </td>
                              <td className="py-3">
                                <span className="flex items-center font-medium text-indigo-500">
                                  <CheckCircle2 className="mr-1 h-4 w-4" />
                                  Accepted
                                </span>
                              </td>
                              <td className="py-3 text-sm text-zinc-500 dark:text-zinc-400">
                                {submission.date}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button className="mt-4 flex w-full items-center justify-center rounded-md bg-zinc-100 py-2 text-sm font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                      View All Submissions
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
                    <CardTitle className="flex items-center text-lg">
                      <Layers className="mr-2 h-5 w-5 text-indigo-500" />
                      Stats by Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      {userData.languages.map((lang, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {lang.name}
                            </span>
                            <span className="text-sm font-medium">
                              {lang.questions}
                            </span>
                          </div>
                          <Progress
                            value={
                              (lang.questions / userData.totalSolved) * 100
                            }
                            className="h-2 bg-zinc-200 dark:bg-zinc-700"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h3 className="mb-3 text-sm font-medium">
                        Skills Analysis
                      </h3>
                      <div className="space-y-2">
                        {userData.skills.slice(0, 3).map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border border-zinc-200 p-2 dark:border-zinc-700"
                          >
                            <div className="flex items-center">
                              <Badge
                                className={
                                  skill.level === "Advanced"
                                    ? "mr-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400"
                                    : "mr-2 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
                                }
                              >
                                {skill.level}
                              </Badge>
                              <span className="text-sm font-medium">
                                {skill.name}
                              </span>
                            </div>
                            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                              {skill.count}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-3 flex w-full items-center justify-center rounded-md bg-zinc-100 py-1.5 text-xs font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                        View all skills
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="statistics" className="mt-0">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center text-lg">
                        <LineChart className="mr-2 h-5 w-5 text-indigo-500" />
                        Percentile Trend
                      </CardTitle>
                      <Select
                        defaultValue="jee"
                        value={examView}
                        onValueChange={setExamView}
                      >
                        <SelectTrigger className="h-8 w-[120px]">
                          <SelectValue placeholder="Select Exam" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jee">JEE</SelectItem>
                          <SelectItem value="neet">NEET</SelectItem>
                          <SelectItem value="upsc">UPSC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {renderLineChart()}
                  </CardContent>
                  <CardFooter className="border-t border-zinc-200 pt-2 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                    <div className="flex w-full items-center justify-between">
                      <span>
                        Starting: {userData.percentiles[examView][0].value}%
                      </span>
                      <span className="font-medium text-indigo-600">
                        +
                        {userData.percentiles[examView][
                          userData.percentiles[examView].length - 1
                        ].value - userData.percentiles[examView][0].value}
                        % improvement
                      </span>
                      <span>
                        Current:{" "}
                        {
                          userData.percentiles[examView][
                            userData.percentiles[examView].length - 1
                          ].value
                        }
                        %
                      </span>
                    </div>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
                    <CardTitle className="flex items-center text-lg">
                      <Target className="mr-2 h-5 w-5 text-indigo-500" />
                      Performance Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-2 text-sm font-medium">
                          Strong Topics
                        </h3>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                          {userData.statsAnalysis.strongTopics.map(
                            (topic, index) => (
                              <div
                                key={index}
                                className="flex items-center rounded-lg border border-indigo-200 bg-indigo-50 p-2 dark:border-indigo-900 dark:bg-indigo-900/20"
                              >
                                <Medal className="mr-2 h-4 w-4 text-indigo-500" />
                                <span className="text-sm font-medium">
                                  {topic}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium">
                          Needs Improvement
                        </h3>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                          {userData.statsAnalysis.weakTopics.map(
                            (topic, index) => (
                              <div
                                key={index}
                                className="flex items-center rounded-lg border border-yellow-200 bg-yellow-50 p-2 dark:border-yellow-900 dark:bg-yellow-900/20"
                              >
                                <Timer className="mr-2 h-4 w-4 text-yellow-500" />
                                <span className="text-sm font-medium">
                                  {topic}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium">
                          Average Solve Time
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                            <div className="mb-1 text-sm font-medium text-indigo-500">
                              Easy
                            </div>
                            <div className="flex items-baseline">
                              <span className="text-xl font-bold">
                                {userData.statsAnalysis.avgTime.easy}
                              </span>
                              <span className="ml-1 text-xs text-zinc-500">
                                min
                              </span>
                            </div>
                          </div>
                          <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                            <div className="mb-1 text-sm font-medium text-yellow-500">
                              Medium
                            </div>
                            <div className="flex items-baseline">
                              <span className="text-xl font-bold">
                                {userData.statsAnalysis.avgTime.medium}
                              </span>
                              <span className="ml-1 text-xs text-zinc-500">
                                min
                              </span>
                            </div>
                          </div>
                          <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                            <div className="mb-1 text-sm font-medium text-red-500">
                              Hard
                            </div>
                            <div className="flex items-baseline">
                              <span className="text-xl font-bold">
                                {userData.statsAnalysis.avgTime.hard}
                              </span>
                              <span className="ml-1 text-xs text-zinc-500">
                                min
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium">
                          Recent Improvement
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-zinc-500" />
                              <span className="text-sm">Last Month</span>
                            </div>
                            <span className="text-sm font-medium text-indigo-500">
                              +{userData.statsAnalysis.improvement.lastMonth}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-zinc-500" />
                              <span className="text-sm">Last Week</span>
                            </div>
                            <span className="text-sm font-medium text-indigo-500">
                              +{userData.statsAnalysis.improvement.lastWeek}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="badges" className="mt-0">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-3">
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
                    <CardTitle className="flex items-center text-lg">
                      <Award className="mr-2 h-5 w-5 text-indigo-500" />
                      Your Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                      {userData.badges.map((badge) => {
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
                            className="flex flex-col items-center justify-between rounded-lg border border-zinc-200 p-6 text-center transition-all hover:border-indigo-200 hover:bg-indigo-50/30 dark:border-zinc-700 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/20"
                          >
                            <div className="mb-4 rounded-full bg-indigo-100 p-4 dark:bg-indigo-900/40">
                              {IconComponent && (
                                <IconComponent className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {badge.name}
                              </h3>
                              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                Awarded for consistent practice and dedication
                              </p>
                            </div>
                            <div className="mt-4">
                              <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                                Earned Feb 2025
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
                    <CardTitle className="flex items-center text-lg">
                      <Trophy className="mr-2 h-5 w-5 text-indigo-500" />
                      Available Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center space-x-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                        <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
                          <GraduationCap className="h-6 w-6 text-zinc-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Master Problem Solver</h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Solve 200 problems
                          </p>
                          <Progress
                            value={(userData.totalSolved / 200) * 100}
                            className="mt-2 h-1.5 bg-zinc-200 dark:bg-zinc-700"
                          />
                          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                            Progress: {userData.totalSolved}/200
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                        <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
                          <Flame className="h-6 w-6 text-zinc-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">100 Day Streak</h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Practice for 100 consecutive days
                          </p>
                          <Progress
                            value={(userData.streak / 100) * 100}
                            className="mt-2 h-1.5 bg-zinc-200 dark:bg-zinc-700"
                          />
                          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                            Progress: {userData.streak}/100
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                        <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
                          <Star className="h-6 w-6 text-zinc-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Contest Champion</h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Rank in top 10% in a contest
                          </p>
                          <div className="mt-3 rounded-md bg-zinc-100 px-2 py-1 text-center text-sm dark:bg-zinc-800">
                            Participate in contests to earn
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                        <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
                          <Medal className="h-6 w-6 text-zinc-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Hard Problem Ace</h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Solve 20 hard problems
                          </p>
                          <Progress
                            value={
                              (userData.difficultyStats.hard.solved / 20) * 100
                            }
                            className="mt-2 h-1.5 bg-zinc-200 dark:bg-zinc-700"
                          />
                          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                            Progress: {userData.difficultyStats.hard.solved}/20
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800/60">
                    <CardTitle className="flex items-center text-lg">
                      <Target className="mr-2 h-5 w-5 text-indigo-500" />
                      Upcoming Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-medium">Complete Daily Goal</h3>
                          <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                            Today
                          </Badge>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Solve at least 3 problems today
                        </p>
                        <Progress
                          value={66}
                          className="mt-3 h-1.5 bg-zinc-200 dark:bg-zinc-700"
                        />
                        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                          2/3 completed
                        </p>
                      </div>

                      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-medium">Weekly Challenge</h3>
                          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400">
                            5 days left
                          </Badge>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Complete 5 medium difficulty problems
                        </p>
                        <Progress
                          value={40}
                          className="mt-3 h-1.5 bg-zinc-200 dark:bg-zinc-700"
                        />
                        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                          2/5 completed
                        </p>
                      </div>

                      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-medium">Monthly Target</h3>
                          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                            18 days left
                          </Badge>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Increase contest rating by 50 points
                        </p>
                        <Progress
                          value={30}
                          className="mt-3 h-1.5 bg-zinc-200 dark:bg-zinc-700"
                        />
                        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                          +15/+50 points
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ icon, text, active, className }) => {
  return (
    <button
      className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
      } ${className || ""}`}
    >
      {icon}
      {text}
    </button>
  );
};

export default ProfileDashboard;
