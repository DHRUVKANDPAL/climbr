"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Settings,
  FileText,
  BarChart3,
  Target,
  BookOpen,
  GitPullRequest,
  Bolt,
  ChevronRight,
  ArrowRight,
  Calendar,
  Clock,
  BookCheck,
  TrendingUp,
  Award,
} from "lucide-react";

// Import custom components
import SummaryCard from "@/components/SummaryCard";
import DifficultyCard from "@/components/DifficultyCard";
import AttendanceCard from "@/components/AttendenceCard";
import WeeklyProgressCard from "@/components/WeeklyProgressCard";
import RecentExamsCard from "@/components/RecentExamsCard";
import BadgesCard from "@/components/Badges";
import ActivityCalendar from "@/components/ActivityCalendarCard";
import PercentileCard from "@/components/PercentileCard";
import AnalysisCard from "@/components/AnalysisCard";
import Leaderboard from "@/components/LeaderBoard";
import DarkModeToggle from "@/components/DarkModeToggle";
import Link from "next/link";
import ExamFormDialog from "@/components/ExamFormDialog";
import YouTubeRecommendations from "@/components/YoutubeRecommendations";

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("week");
  const [examFilter, setExamFilter] = useState("all");
  const [currentStreak, setCurrentStreak] = useState("8");
  const [animationComplete, setAnimationComplete] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

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
        status: "Accepted",
        difficulty: "Hard",
        topic: "Algorithms",
      },
      {
        id: 2,
        title: "Maximum Ascending Subarray Sum",
        type: "Advanced",
        date: "2 months ago",
        status: "Accepted",
        difficulty: "Medium",
        topic: "Dynamic Programming",
      },
      {
        id: 3,
        title: "Count Mentions Per User",
        type: "Intermediate",
        date: "2 months ago",
        status: "Wrong Answer",
        difficulty: "Medium",
        topic: "Data Structures",
      },
      {
        id: 4,
        title: "Count Partitions with Even Sum Difference",
        type: "Advanced",
        date: "2 months ago",
        status: "Accepted",
        difficulty: "Hard",
        topic: "Algorithms",
      },
    ],
    statsAnalysis: {
      strongTopics: ["Mechanics", "Organic Chemistry", "Calculus"],
      weakTopics: ["Thermodynamics", "Inorganic Chemistry", "Vectors"],
      improvementAreas: [
        "Coordinate Geometry",
        "Modern Physics",
        "Analytical Chemistry",
      ],
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
    examSchedule: [
      {
        id: 1,
        title: "JEE Advanced Mock Test 13",
        date: "Tomorrow, 10:00 AM",
        duration: "3 hours",
      },
      {
        id: 2,
        title: "Physics Sectional Test",
        date: "Apr 2, 2:00 PM",
        duration: "1 hour",
      },
      {
        id: 3,
        title: "Full Mock Test",
        date: "Apr 5, 9:00 AM",
        duration: "3 hours",
      },
    ],
  };

  // Generate more realistic activity data
  function generateActivityData() {
    const daysInWeek = 7;
    const weeksToShow = 53;

    const data = [];
    const today = new Date();
    const endDate = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysInWeek * weeksToShow + 1);

    const currentDate = new Date(startDate);
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
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    while (currentDate <= endDate) {
      let level;
      const rand = Math.random();
      if (rand < 0.6) level = 0;
      else if (rand < 0.75) level = 1;
      else if (rand < 0.85) level = 2;
      else if (rand < 0.95) level = 3;
      else level = 4;

      if (data.length > 0) {
        const lastIndex = data.length - 1;
        if (data[lastIndex].level > 0 && Math.random() < 0.7) {
          level = Math.max(1, data[lastIndex].level - 1);
        }
      }

      const month = currentDate.getMonth();
      if (month === 2 || month === 8 || month === 11) {
        level = Math.min(4, level + Math.floor(Math.random() * 2));
      }

      const dayOfWeek = currentDate.getDay();
      if ((dayOfWeek === 0 || dayOfWeek === 6) && Math.random() > 0.5) {
        level = Math.min(4, level + 1);
      }

      data.push({
        date: new Date(currentDate),
        month: monthNames[month],
        monthIndex: month,
        day: currentDate.getDate(),
        dayOfWeek: dayOfWeek,
        dayName: dayNames[dayOfWeek],
        level,
        formattedDate: `${monthNames[month]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
  }

  // Toggle card expansion
  const toggleCardExpansion = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  // Prepare data for the current exam filter
  const filteredExams =
    examFilter === "all"
      ? userData.recentExams
      : userData.recentExams.filter(
          (exam) =>
            exam.subject.toLowerCase() === examFilter.toLowerCase() ||
            (examFilter === "other" &&
              !["Physics", "Chemistry", "Mathematics"].includes(exam.subject)),
        );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Profile Header with Quick Stats */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 dark:from-indigo-900/20 dark:to-purple-900/20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                {userData.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <Badge className="bg-indigo-600">JEE Aspirant</Badge>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {userData.email}
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <BarChart3 className="h-4 w-4 text-indigo-500" />
                  Rank:{" "}
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {userData.rank}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Award className="h-4 w-4 text-amber-500" />
                  Rating:{" "}
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    {userData.contestRating}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <BookCheck className="h-4 w-4 text-emerald-500" />
                  Solved:{" "}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {userData.totalSolved}/{userData.totalQuestions}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 text-rose-500" />
                  Percentile:{" "}
                  <span className="font-semibold text-rose-600 dark:text-rose-400">
                    {userData.topPercentile}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <DarkModeToggle />
            <Button variant="outline" size="sm" className="gap-1">
              <User className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="default"
              size="sm"
              className="gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <Bolt className="h-4 w-4" />
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <button className="flex w-full items-center justify-between p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Upcoming Exam</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {userData.examSchedule[0].title}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            </button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <button className="flex w-full items-center justify-between p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Daily Streak</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {userData.streak} days
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            </button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <button className="flex w-full items-center justify-between p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                  <Target className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Current Goal</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Top 20% Percentile
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            </button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <button className="flex w-full items-center justify-between p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Recommended</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Focus on {userData.statsAnalysis.weakTopics[0]}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs - Enhanced with improved UI */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <TabsList className="mb-4 sm:mb-0">
            <TabsTrigger value="overview" className="gap-1.5">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="submissions" className="gap-1.5">
              <GitPullRequest className="h-4 w-4" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-1.5">
              <BarChart3 className="h-4 w-4" />
              LeaderBoard
            </TabsTrigger>
            <TabsTrigger value="exams" className="gap-1.5">
              <FileText className="h-4 w-4" />
              Exams
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1.5">
              <Target className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-1.5">
              <BookOpen className="h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Time Range Selector */}
          {activeTab === "overview" && (
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Exam Filter */}
          {activeTab === "exams" && (
            <Select value={examFilter} onValueChange={setExamFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter Exams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Overview Tab Content - Improved Layout */}
        <TabsContent value="overview" className="space-y-4">
          {/* First Row - Key Metrics */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Summary Card */}
            <SummaryCard
              userData={userData}
              animationComplete={animationComplete}
              timeRange={timeRange}
              onExpand={() => toggleCardExpansion("summary")}
              isExpanded={expandedCard === "summary"}
            />

            {/* Weekly Progress Card */}
            <WeeklyProgressCard
              weeklyProgress={userData.weeklyProgress}
              animationComplete={animationComplete}
              timeRange={timeRange}
              onExpand={() => toggleCardExpansion("weekly")}
              isExpanded={expandedCard === "weekly"}
            />

            {/* Attendance Card */}
            <AttendanceCard
              attendance={userData.attendance}
              streak={userData.streak}
              timeRange={timeRange}
              animationComplete={animationComplete}
              onExpand={() => toggleCardExpansion("attendance")}
              isExpanded={expandedCard === "attendance"}
            />
          </div>

          {/* Second Row - Performance & Activity */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {/* Difficulty Card - Spans 5 columns */}
            <div className="md:col-span-5">
              <DifficultyCard
                difficultyStats={userData.difficultyStats}
                subjects={userData.subjects}
                animationComplete={animationComplete}
                timeRange={timeRange}
                onExpand={() => toggleCardExpansion("difficulty")}
                isExpanded={expandedCard === "difficulty"}
              />
            </div>

            {/* Activity Calendar - Spans 7 columns */}
            <div className="md:col-span-7">
              <ActivityCalendar
                userData={userData}
                timeRange={timeRange}
                onExpand={() => toggleCardExpansion("activity")}
                isExpanded={expandedCard === "activity"}
              />
            </div>
          </div>

          {/* Third Row - Analysis & Progress */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Recent Exams Card */}
            <RecentExamsCard
              exams={userData.recentExams}
              onExpand={() => toggleCardExpansion("exams")}
              isExpanded={expandedCard === "exams"}
            />

            {/* Percentile Progress Card */}
            <PercentileCard
              percentiles={userData.percentiles}
              animationComplete={animationComplete}
              timeRange={timeRange}
              onExpand={() => toggleCardExpansion("percentile")}
              isExpanded={expandedCard === "percentile"}
            />

            {/* Analysis Card */}
            <AnalysisCard
              statsAnalysis={userData.statsAnalysis}
              onExpand={() => toggleCardExpansion("analysis")}
              isExpanded={expandedCard === "analysis"}
            />
          </div>

          {/* Fourth Row - Badges & Upcoming */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Badges Card */}
            <BadgesCard
              badges={userData.badges}
              onExpand={() => toggleCardExpansion("badges")}
              isExpanded={expandedCard === "badges"}
            />

            {/* Upcoming Exams Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-semibold">
                  Upcoming Exams
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 py-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userData.examSchedule.map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-start justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                    >
                      <div>
                        <p className="font-medium">{exam.title}</p>
                        <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{exam.date}</span>
                          <Separator orientation="vertical" className="h-3.5" />
                          <Clock className="h-3.5 w-3.5" />
                          <span>{exam.duration}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Prepare
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Submissions Tab Content */}
        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Submissions</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="wrong">Wrong Answer</SelectItem>
                      <SelectItem value="tle">Time Limit Exceeded</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulties</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex flex-col justify-between rounded-lg border border-zinc-200 p-4 shadow-sm sm:flex-row sm:items-center dark:border-zinc-800"
                  >
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{submission.title}</h3>
                        <Badge
                          className={`${
                            submission.status === "Accepted"
                              ? "bg-emerald-600"
                              : "bg-rose-600"
                          }`}
                        >
                          {submission.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-zinc-300 dark:border-zinc-700"
                        >
                          {submission.difficulty}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-sm text-zinc-500">
                        <span>Topic: {submission.topic}</span>
                        <Separator orientation="vertical" className="h-3.5" />
                        <span>Submitted: {submission.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        View Solution
                      </Button>
                      <Button size="sm" className="text-xs">
                        Solve Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Button className="gap-2">
                  View All Submissions
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leaderboard">
          <Leaderboard />
        </TabsContent>

        {/* Exams Tab Content */}
        <TabsContent value="exams">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Your Exam Performance</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Download Reports
                  </Button>
                  <ExamFormDialog />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex flex-col justify-between rounded-lg border border-zinc-200 p-4 shadow-sm sm:flex-row sm:items-center dark:border-zinc-800"
                  >
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{exam.title}</h3>
                        <Badge
                          variant="outline"
                          className="border-zinc-300 dark:border-zinc-700"
                        >
                          {exam.subject}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-sm text-zinc-500">
                        <span>Taken: {exam.time}</span>
                        <span>Score: {exam.score}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">Percentile</div>
                        <div
                          className={`text-lg font-semibold ${
                            exam.percentile > 90
                              ? "text-emerald-600 dark:text-emerald-500"
                              : exam.percentile > 75
                                ? "text-blue-600 dark:text-blue-500"
                                : "text-amber-600 dark:text-amber-500"
                          }`}
                        >
                          {exam.percentile}%
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Analysis
                        </Button>
                        <Button size="sm" className="text-xs">
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Button className="gap-2">
                  View All Exam Results
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional exam-related content */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Exam Performance by Subject */}
            <Card>
              <CardHeader>
                <CardTitle className="text-md font-semibold">
                  Performance by Subject
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.subjects.map((subject) => (
                    <div key={subject.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subject.name}</span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          {Math.round((subject.solved / subject.total) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div
                          className={`h-full rounded-full ${subject.color}`}
                          style={{
                            width: `${(subject.solved / subject.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Exam Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="text-md font-semibold">
                  Upcoming Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userData.examSchedule.slice(0, 3).map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-start justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                    >
                      <div>
                        <p className="font-medium">{exam.title}</p>
                        <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{exam.date}</span>
                          <Separator orientation="vertical" className="h-3.5" />
                          <Clock className="h-3.5 w-3.5" />
                          <span>{exam.duration}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Prepare
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" className="w-full">
                    Schedule New Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed performance analysis */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-md font-semibold">
                Detailed Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="topics">
                <TabsList className="mb-4">
                  <TabsTrigger value="topics">Topic Breakdown</TabsTrigger>
                  <TabsTrigger value="time">Time Analysis</TabsTrigger>
                  <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
                </TabsList>
                <TabsContent value="topics">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Strong Topics
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                      {userData.statsAnalysis.strongTopics.map((topic) => (
                        <div
                          key={topic}
                          className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{topic}</span>
                            <Badge className="bg-emerald-600">Strong</Badge>
                          </div>
                          <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            85% accuracy rate
                          </div>
                        </div>
                      ))}
                    </div>

                    <h3 className="mt-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Areas for Improvement
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                      {userData.statsAnalysis.weakTopics.map((topic) => (
                        <div
                          key={topic}
                          className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{topic}</span>
                            <Badge className="bg-amber-600">Needs Work</Badge>
                          </div>
                          <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            42% accuracy rate
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="time">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Average Time per Question Difficulty
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                        <div className="mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          Easy
                        </div>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
                          {userData.statsAnalysis.avgTime.easy} min
                        </div>
                        <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                          {userData.statsAnalysis.avgTime.easy < 3
                            ? "Good pace"
                            : "Try to improve speed"}
                        </div>
                      </div>
                      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                        <div className="mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          Medium
                        </div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                          {userData.statsAnalysis.avgTime.medium} min
                        </div>
                        <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                          {userData.statsAnalysis.avgTime.medium < 6
                            ? "Good pace"
                            : "Try to improve speed"}
                        </div>
                      </div>
                      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                        <div className="mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          Hard
                        </div>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-500">
                          {userData.statsAnalysis.avgTime.hard} min
                        </div>
                        <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                          {userData.statsAnalysis.avgTime.hard < 10
                            ? "Excellent pace"
                            : "Within expected range"}
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Time Management Recommendations
                    </h3>
                    <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                      <ul className="ml-6 list-disc space-y-2 text-sm">
                        <li>
                          Allocate no more than 1-2 minutes for easy questions
                        </li>
                        <li>
                          For medium questions, aim to complete within 4-5
                          minutes
                        </li>
                        <li>
                          Hard questions should be attempted after completing
                          easier ones
                        </li>
                        <li>
                          Practice timed mock tests regularly to improve speed
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="mistakes">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Common Error Patterns
                    </h3>
                    <div className="space-y-3">
                      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Calculation Errors</div>
                          <Badge
                            variant="outline"
                            className="border-rose-300 text-rose-600 dark:border-rose-800 dark:text-rose-400"
                          >
                            42% of mistakes
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                          Most frequent in Complex Numbers and Integration
                          problems. Double-check your calculations.
                        </p>
                      </div>
                      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">
                            Conceptual Misunderstanding
                          </div>
                          <Badge
                            variant="outline"
                            className="border-amber-300 text-amber-600 dark:border-amber-800 dark:text-amber-400"
                          >
                            35% of mistakes
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                          Most common in Thermodynamics and Electromagnetic
                          Induction. Review core principles.
                        </p>
                      </div>
                      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Formula Application</div>
                          <Badge
                            variant="outline"
                            className="border-blue-300 text-blue-600 dark:border-blue-800 dark:text-blue-400"
                          >
                            23% of mistakes
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                          Particularly in Problems involving Kinematics and
                          Chemical Equilibrium. Create formula flashcards.
                        </p>
                      </div>
                    </div>

                    <h3 className="mt-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Improvement Strategy
                    </h3>
                    <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                      <ul className="ml-6 list-disc space-y-2 text-sm">
                        <li>
                          Focus on understanding concepts rather than memorizing
                          solutions
                        </li>
                        <li>
                          Practice step-by-step problem-solving techniques
                        </li>
                        <li>Review mistakes from past exams regularly</li>
                        <li>
                          Create a personalized formula sheet for quick
                          reference
                        </li>
                        <li>
                          Work on time management to reduce careless errors
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Performance Trends Card */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Overall Score Trend
                    </h3>
                    <div className="h-48 w-full rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                      {/* Placeholder for chart */}
                      <div className="flex h-full items-center justify-center">
                        <div className="h-40 w-full rounded-md bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-4 dark:from-indigo-900/40 dark:to-purple-900/40">
                          <div className="h-full w-full rounded border border-dashed border-zinc-300 dark:border-zinc-700">
                            <div className="flex h-full flex-col items-center justify-center">
                              <BarChart3 className="mb-2 h-8 w-8 text-zinc-400" />
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Score trend visualization
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Last Month
                      </div>
                      <div className="mt-1 text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                        +{userData.statsAnalysis.improvement.lastMonth}%
                      </div>
                    </div>
                    <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Last Week
                      </div>
                      <div className="mt-1 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                        +{userData.statsAnalysis.improvement.lastWeek}%
                      </div>
                    </div>
                    <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Consistency
                      </div>
                      <div className="mt-1 text-xl font-semibold text-amber-600 dark:text-amber-400">
                        82%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Comparison Card */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Performance by Subject
                  </h3>
                  <div className="h-48 w-full rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                    {/* Placeholder for radar chart */}
                    <div className="flex h-full items-center justify-center">
                      <div className="h-40 w-full rounded-md bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-4 dark:from-indigo-900/40 dark:to-purple-900/40">
                        <div className="h-full w-full rounded border border-dashed border-zinc-300 dark:border-zinc-700">
                          <div className="flex h-full flex-col items-center justify-center">
                            <BarChart3 className="mb-2 h-8 w-8 text-zinc-400" />
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                              Subject comparison chart
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="text-sm font-medium">Strongest Subject</div>
                    <Badge className="bg-emerald-600">Physics</Badge>
                  </div>

                  <div className="mt-2 flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="text-sm font-medium">Needs Improvement</div>
                    <Badge className="bg-amber-600">Chemistry</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Type Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Question Type Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Theory Questions
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {userData.languages[0].questions} questions
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{
                          width: `${(userData.languages[0].questions / (userData.languages[0].questions + userData.languages[1].questions + userData.languages[2].questions)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Numerical Questions
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {userData.languages[1].questions} questions
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-purple-500"
                        style={{
                          width: `${(userData.languages[1].questions / (userData.languages[0].questions + userData.languages[1].questions + userData.languages[2].questions)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Match the Column
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {userData.languages[2].questions} questions
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${(userData.languages[2].questions / (userData.languages[0].questions + userData.languages[1].questions + userData.languages[2].questions)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <h3 className="text-sm font-medium">
                      Performance Analysis
                    </h3>
                    <ul className="mt-2 ml-6 list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                      <li>You excel at theory-based questions</li>
                      <li>Numerical problems show moderate performance</li>
                      <li>
                        Focus on improving match-the-column type questions
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <Badge
                          className={`${
                            skill.level === "Advanced"
                              ? "bg-emerald-600"
                              : skill.level === "Intermediate"
                                ? "bg-blue-600"
                                : "bg-amber-600"
                          }`}
                        >
                          {skill.level}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                        <span>Problems solved: {skill.count}</span>
                        <span>Last practiced: 2 days ago</span>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full">
                    View Detailed Skills Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personalized Recommendations */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                  <h3 className="font-medium">Study Plan Adjustment</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Based on your recent performance, we recommend focusing more
                    on the following areas:
                  </p>
                  <ul className="mt-2 ml-6 list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <li>Thermodynamics (Chemistry)</li>
                    <li>Vectors & 3D Geometry (Mathematics)</li>
                    <li>Inorganic Chemistry concepts</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                  <h3 className="font-medium">Test Strategy</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    To improve your overall performance in tests:
                  </p>
                  <ul className="mt-2 ml-6 list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <li>Attempt easy and moderate questions first</li>
                    <li>Allocate specific time slots for each section</li>
                    <li>Review your answers if time permits</li>
                    <li>
                      For numerical problems, verify units in your calculations
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                  <h3 className="font-medium">Practice Recommendation</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Based on your performance pattern, increase practice in:
                  </p>
                  <ul className="mt-2 ml-6 list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <li>Numerical problem-solving (especially in Physics)</li>
                    <li>NCERT-based conceptual questions</li>
                    <li>Previous years' JEE questions</li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <Button className="gap-2">
                    Generate Detailed Study Plan
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab Content */}
        <TabsContent value="resources">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Study Materials */}
            <Card>
              <CardHeader>
                <CardTitle>Study Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Physics Notes</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Mechanics & Electromagnetism
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="w-full">
                        View Notes
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-green-100 p-2 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Chemistry Notes</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Organic & Physical Chemistry
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="w-full">
                        View Notes
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Mathematics Notes</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Calculus & Coordinate Geometry
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="w-full">
                        View Notes
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full gap-2">
                    Browse All Materials
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Video Lectures */}
            <YouTubeRecommendations />

            {/* Question Bank */}
            <Card>
              <CardHeader>
                <CardTitle>Question Bank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <h3 className="font-medium">JEE Main Previous Years</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      2000+ questions from past JEE Main exams
                    </p>
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="w-full">
                        Practice
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <h3 className="font-medium">JEE Advanced Collection</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      1500+ questions from past JEE Advanced exams
                    </p>
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="w-full">
                        Practice
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <h3 className="font-medium">Topic-wise Questions</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Practice questions organized by topics and difficulty
                    </p>
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="w-full">
                        Practice
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full gap-2">
                    Browse All Question Banks
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Resources */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="rounded-md bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 font-medium">JEE Main Formula Book</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Complete collection of formulas for quick revision
                    </p>
                    <Button size="sm" className="mt-3 w-full">
                      Download
                    </Button>
                  </div>

                  <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="rounded-md bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                      <Target className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 font-medium">Mock Test Series</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Full-length JEE mock tests with detailed analysis
                    </p>
                    <Button size="sm" className="mt-3 w-full">
                      Enroll Now
                    </Button>
                  </div>

                  <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="rounded-md bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 font-medium">Performance Analytics</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Detailed insights and personalized recommendations
                    </p>
                    <Button size="sm" className="mt-3 w-full">
                      View Report
                    </Button>
                  </div>

                  <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="rounded-md bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 font-medium">Concept Maps</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Visual representation of key concepts and connections
                    </p>
                    <Button size="sm" className="mt-3 w-full">
                      Explore
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Study Schedule */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Study Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                  <Tabs defaultValue="today">
                    <TabsList className="mb-4">
                      <TabsTrigger value="today">Today</TabsTrigger>
                      <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                      <TabsTrigger value="week">This Week</TabsTrigger>
                    </TabsList>
                    <TabsContent value="today">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                09:00
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                10:30
                              </div>
                            </div>
                            <div className="h-10 w-1 rounded-full bg-indigo-500"></div>
                            <div>
                              <h4 className="font-medium">
                                Physical Chemistry
                              </h4>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Thermodynamics & Equilibrium
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Start
                          </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                11:00
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                12:30
                              </div>
                            </div>
                            <div className="h-10 w-1 rounded-full bg-purple-500"></div>
                            <div>
                              <h4 className="font-medium">Calculus Practice</h4>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Integration & Applications
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Start
                          </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                14:00
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                16:00
                              </div>
                            </div>
                            <div className="h-10 w-1 rounded-full bg-emerald-500"></div>
                            <div>
                              <h4 className="font-medium">
                                Physics Problem Solving
                              </h4>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Mechanics & Electrodynamics
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Start
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="tomorrow">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                09:00
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                11:00
                              </div>
                            </div>
                            <div className="h-10 w-1 rounded-full bg-purple-500"></div>
                            <div>
                              <h4 className="font-medium">
                                Mathematics Revision
                              </h4>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Vectors & 3D Geometry
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" disabled>
                            Upcoming
                          </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                12:00
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                13:30
                              </div>
                            </div>
                            <div className="h-10 w-1 rounded-full bg-emerald-500"></div>
                            <div>
                              <h4 className="font-medium">Organic Chemistry</h4>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Named Reactions & Mechanisms
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" disabled>
                            Upcoming
                          </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                15:00
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                17:00
                              </div>
                            </div>
                            <div className="h-10 w-1 rounded-full bg-indigo-500"></div>
                            <div>
                              <h4 className="font-medium">
                                Mock Test Practice
                              </h4>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Full JEE Main Pattern Test
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" disabled>
                            Upcoming
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="week">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="font-medium text-zinc-800 dark:text-zinc-200">
                                Wed
                              </div>
                            </div>
                            <div className="h-10 w-1 rounded-full bg-blue-500"></div>
                            <div>
                              <h4 className="font-medium">
                                Revision Day - Physics
                              </h4>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Complete syllabus overview
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" disabled>
                            Upcoming
                          </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="font-medium text-zinc-800 dark:text-zinc-200">
                                Thu
                              </div>
                            </div>
                            <div className="h-10 w-1 rounded-full bg-emerald-500"></div>
                            <div>
                              <h4 className="font-medium">
                                Revision Day - Chemistry
                              </h4>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Complete syllabus overview
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" disabled>
                            Upcoming
                          </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="font-medium text-zinc-800 dark:text-zinc-200">
                                Fri
                              </div>
                            </div>
                            <div className="h-10 w-1 rounded-full bg-purple-500"></div>
                            <div>
                              <h4 className="font-medium">
                                Revision Day - Mathematics
                              </h4>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Complete syllabus overview
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" disabled>
                            Upcoming
                          </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="font-medium text-zinc-800 dark:text-zinc-200">
                                Sat
                              </div>
                            </div>
                            <div className="h-10 w-1 rounded-full bg-amber-500"></div>
                            <div>
                              <h4 className="font-medium">Full Mock Test</h4>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                JEE Advanced Pattern
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" disabled>
                            Upcoming
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="mt-4 flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    View Full Calendar
                  </Button>
                  <Button className="gap-2">
                    <Settings className="h-4 w-4" />
                    Customize Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileDashboard;
