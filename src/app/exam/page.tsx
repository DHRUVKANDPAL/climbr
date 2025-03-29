"use client";
// ExamInterface.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Eye,
  EyeOff,
  Flag,
  CheckCircle2,
  HelpCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Save,
  RotateCcw,
  LightbulbIcon,
  BarChart,
  List,
  X,
  ListChecks,
  ClipboardCheck,
  Circle,
  Eraser,
  Send,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import DarkModeToggle from "@/components/DarkModeToggle";

// Types
type QuestionStatus =
  | "not-visited"
  | "not-answered"
  | "answered"
  | "marked-review"
  | "marked-review-answered"
  | "guessed";

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer?: number;
  section: string;
  status: QuestionStatus;
  selectedOption?: number;
  timeSpent: number; // Time spent on this question in seconds
};

type QuestionPaperSection = {
  name: string;
  questions: Question[];
};

// Sample data
const generateSampleData = (): QuestionPaperSection[] => {
  const sections = ["Physics", "Chemistry", "Mathematics"];
  const questionPaper: QuestionPaperSection[] = [];

  sections.forEach((sectionName, sectionIndex) => {
    const questions: Question[] = [];
    for (let i = 1; i <= 30; i++) {
      questions.push({
        id: sectionIndex * 30 + i,
        text: `${sectionName} Question ${i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula magna quis tortor rhoncus, non dictum lectus consectetur?`,
        options: [
          "Option A: Lorem ipsum dolor sit amet",
          "Option B: Consectetur adipiscing elit",
          "Option C: Nullam vehicula magna quis",
          "Option D: Non dictum lectus consectetur",
        ],
        section: sectionName,
        status: i === 1 ? "not-answered" : "not-visited",
        timeSpent: 0,
      });
    }

    questionPaper.push({
      name: sectionName,
      questions,
    });
  });

  return questionPaper;
};

const ExamInterface = () => {
  const [questionPaper, setQuestionPaper] =
    useState<QuestionPaperSection[]>(generateSampleData());
  const [currentSection, setCurrentSection] = useState<string>("Physics");
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(10800); // 3 hours in seconds
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | null>(null);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState<boolean>(false);

  // Get the current question
  const currentQuestion = questionPaper
    .flatMap((section) => section.questions)
    .find((q) => q.id === currentQuestionId);

  // Calculate question stats
  const allQuestions = questionPaper.flatMap((section) => section.questions);
  const stats = {
    total: allQuestions.length,
    answered: allQuestions.filter((q) => q.status === "answered").length,
    notAnswered: allQuestions.filter((q) => q.status === "not-answered").length,
    notVisited: allQuestions.filter((q) => q.status === "not-visited").length,
    markedReview: allQuestions.filter((q) => q.status === "marked-review")
      .length,
    markedReviewAnswered: allQuestions.filter(
      (q) => q.status === "marked-review-answered",
    ).length,
    guessed: allQuestions.filter((q) => q.status === "guessed").length,
    totalTimeSpent: allQuestions.reduce((acc, q) => acc + q.timeSpent, 0),
  };

  // Main timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Question-specific timer effect
  useEffect(() => {
    // Clear previous timer
    if (activeTimer) {
      clearInterval(activeTimer);
    }

    // Start new timer for current question
    const timer = setInterval(() => {
      setQuestionPaper((prevPaper) => {
        return prevPaper.map((section) => {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === currentQuestionId) {
                return {
                  ...question,
                  timeSpent: question.timeSpent + 1,
                };
              }
              return question;
            }),
          };
        });
      });
    }, 1000);

    setActiveTimer(timer);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [currentQuestionId]);

  // Format time
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle option selection
  const selectOption = (optionIndex: number) => {
    if (!currentQuestion) return;

    setQuestionPaper((prevPaper) => {
      return prevPaper.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === currentQuestionId) {
              return {
                ...question,
                selectedOption: optionIndex,
                status: question.status.includes("marked-review")
                  ? "marked-review-answered"
                  : "answered",
              };
            }
            return question;
          }),
        };
      });
    });
  };

  // Handle changing question
  const changeQuestion = (questionId: number) => {
    // Update current question's status if it's not visited
    setQuestionPaper((prevPaper) => {
      return prevPaper.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (
              question.id === questionId &&
              question.status === "not-visited"
            ) {
              return {
                ...question,
                status: "not-answered",
              };
            }
            return question;
          }),
        };
      });
    });

    setCurrentQuestionId(questionId);

    // Update current section if needed
    const newQuestion = allQuestions.find((q) => q.id === questionId);
    if (newQuestion && newQuestion.section !== currentSection) {
      setCurrentSection(newQuestion.section);
    }
  };

  // Navigate to next/previous question
  const goToNextQuestion = () => {
    const nextQuestionId = currentQuestionId + 1;
    if (nextQuestionId <= stats.total) {
      changeQuestion(nextQuestionId);
    }
  };

  const goToPrevQuestion = () => {
    const prevQuestionId = currentQuestionId - 1;
    if (prevQuestionId >= 1) {
      changeQuestion(prevQuestionId);
    }
  };

  // Mark for review
  const toggleMarkForReview = () => {
    if (!currentQuestion) return;

    setQuestionPaper((prevPaper) => {
      return prevPaper.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === currentQuestionId) {
              const hasAnswer = question.selectedOption !== undefined;
              let newStatus: QuestionStatus;

              if (question.status.includes("marked-review")) {
                newStatus = hasAnswer ? "answered" : "not-answered";
              } else {
                newStatus = hasAnswer
                  ? "marked-review-answered"
                  : "marked-review";
              }

              return {
                ...question,
                status: newStatus,
              };
            }
            return question;
          }),
        };
      });
    });

    // Automatically move to next question after marking
    goToNextQuestion();
  };

  // Guess and next
  // Guess and next
  const guessAndNext = () => {
    if (!currentQuestion) return;

    setQuestionPaper((prevPaper) => {
      return prevPaper.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === currentQuestionId) {
              return {
                ...question,
                // Keep the current selection, just change the status to "guessed"
                status: "guessed",
              };
            }
            return question;
          }),
        };
      });
    });

    // Go to next question
    goToNextQuestion();
  };

  // Clear response
  const clearResponse = () => {
    if (!currentQuestion) return;

    setQuestionPaper((prevPaper) => {
      return prevPaper.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === currentQuestionId) {
              return {
                ...question,
                selectedOption: undefined,
                status: question.status.includes("marked-review")
                  ? "marked-review"
                  : "not-answered",
              };
            }
            return question;
          }),
        };
      });
    });
  };

  // Get status color
  const getStatusColor = (status: QuestionStatus): string => {
    switch (status) {
      case "answered":
        return "bg-green-500 text-white dark:bg-green-600";
      case "not-answered":
        return "bg-red-500 text-white dark:bg-red-600";
      case "marked-review":
        return "bg-purple-500 text-white dark:bg-purple-600";
      case "marked-review-answered":
        return "bg-blue-500 text-white dark:bg-blue-600";
      case "guessed":
        return "bg-amber-500 text-white dark:bg-amber-600";
      case "not-visited":
        return "bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200";
      default:
        return "bg-zinc-300 dark:bg-zinc-700";
    }
  };

  // Get average time per question
  const getAverageTimePerQuestion = () => {
    const answeredQuestions = allQuestions.filter(
      (q) =>
        q.status === "answered" ||
        q.status === "guessed" ||
        q.status === "marked-review-answered",
    );
    if (answeredQuestions.length === 0) return 0;
    return Math.round(
      answeredQuestions.reduce((acc, q) => acc + q.timeSpent, 0) /
        answeredQuestions.length,
    );
  };

  return (
    <div className="flex h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Mock Test: JEE Main 2025</h1>
          <Badge className="bg-blue-600 dark:bg-blue-700">Online Exam</Badge>
        </div>
        <div className="flex items-center gap-3">
          <DarkModeToggle />

          <div className="flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 shadow-sm dark:bg-zinc-800">
            <Clock className="h-5 w-5 text-red-500 dark:text-red-400" />
            <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowStats(!showStats)}
            className="transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            {showStats ? (
              <List className="mr-2 h-4 w-4" />
            ) : (
              <BarChart className="mr-2 h-4 w-4" />
            )}
            {showStats ? "Question View" : "Statistics"}
          </Button>

          <Button
            variant="destructive"
            onClick={() => setShowSubmitDialog(true)}
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Submit Test
          </Button>

          <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Submit Test</DialogTitle>
                <DialogDescription>
                  Are you sure you want to submit your test? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 dark:bg-green-600">
                        {stats.answered}
                      </Badge>
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500 dark:bg-red-600">
                        {stats.notAnswered + stats.notVisited}
                      </Badge>
                      <span>Unanswered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500 dark:bg-purple-600">
                        {stats.markedReview + stats.markedReviewAnswered}
                      </Badge>
                      <span>Marked for Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500 dark:bg-amber-600">
                        {stats.guessed}
                      </Badge>
                      <span>Guessed</span>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex justify-end gap-2 sm:justify-end">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Submit Test</Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Question Display or Stats */}
        {showStats ? (
          <div className="flex w-2/3 flex-col overflow-auto border-r border-zinc-200 p-6 dark:border-zinc-800">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Performance Statistics</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowStats(false)}
                className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-lg font-semibold">Time Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Total Time Spent
                      </p>
                      <p className="text-2xl font-bold">
                        {formatTime(stats.totalTimeSpent)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Average Time Per Question
                      </p>
                      <p className="text-2xl font-bold">
                        {formatTime(getAverageTimePerQuestion())}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Time Remaining
                      </p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {formatTime(timeLeft)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Question Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500 dark:bg-green-600"></div>
                        <span>Answered</span>
                      </div>
                      <span className="font-semibold">{stats.answered}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500 dark:bg-red-600"></div>
                        <span>Not Answered</span>
                      </div>
                      <span className="font-semibold">{stats.notAnswered}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-zinc-400 dark:bg-zinc-500"></div>
                        <span>Not Visited</span>
                      </div>
                      <span className="font-semibold">{stats.notVisited}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500 dark:bg-amber-600"></div>
                        <span>Guessed</span>
                      </div>
                      <span className="font-semibold">{stats.guessed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500 dark:bg-purple-600"></div>
                        <span>Marked for Review</span>
                      </div>
                      <span className="font-semibold">
                        {stats.markedReview + stats.markedReviewAnswered}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-2 border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Time Spent by Section
                  </h3>
                  <div className="space-y-4">
                    {questionPaper.map((section) => {
                      const sectionTimeSpent = section.questions.reduce(
                        (acc, q) => acc + q.timeSpent,
                        0,
                      );
                      const sectionPercentage =
                        Math.round(
                          (sectionTimeSpent / stats.totalTimeSpent) * 100,
                        ) || 0;

                      return (
                        <div key={section.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{section.name}</span>
                            <span>
                              {formatTime(sectionTimeSpent)} (
                              {sectionPercentage}%)
                            </span>
                          </div>
                          <Progress
                            value={sectionPercentage}
                            className="h-2 bg-zinc-200 dark:bg-zinc-700"
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex w-2/3 flex-col overflow-auto border-r border-zinc-200 p-6 dark:border-zinc-800">
            {currentQuestion && (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">
                      Question {currentQuestionId}{" "}
                      <span className="text-zinc-500 dark:text-zinc-400">
                        ({currentQuestion.section})
                      </span>
                    </h2>
                    <Badge className={getStatusColor(currentQuestion.status)}>
                      {currentQuestion.status
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      Time spent:
                    </span>
                    <Badge
                      variant="outline"
                      className="border-zinc-300 bg-transparent text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                    >
                      <Clock className="mr-1 h-3 w-3 text-amber-500 dark:text-amber-400" />
                      {formatTime(currentQuestion.timeSpent)}
                    </Badge>
                  </div>
                </div>

                <Card className="mb-4 flex-1 border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <CardContent className="pt-6">
                    <ScrollArea className="h-[calc(100vh-320px)] pr-4">
                      <p className="mb-6 text-lg leading-relaxed">
                        {currentQuestion.text}
                      </p>
                      <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className={`flex cursor-pointer items-start rounded-md border p-4 transition-colors ${
                              currentQuestion.selectedOption === index
                                ? "border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20"
                                : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/50"
                            }`}
                            onClick={() => selectOption(index)}
                          >
                            <div
                              className={`mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${
                                currentQuestion.selectedOption === index
                                  ? "border-blue-500 bg-blue-500 text-white dark:border-blue-600 dark:bg-blue-600"
                                  : "border-zinc-400 dark:border-zinc-600"
                              }`}
                            >
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="pt-0.5">{option}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={goToPrevQuestion}
                      disabled={currentQuestionId <= 1}
                      className="rounded-full border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>

                    <Button
                      variant="outline"
                      onClick={goToNextQuestion}
                      disabled={currentQuestionId >= stats.total}
                      className="rounded-full border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={clearResponse}
                      disabled={currentQuestion.selectedOption === undefined}
                      className="rounded-full border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Clear
                    </Button>

                    <Button
                      variant="outline"
                      onClick={toggleMarkForReview}
                      className={`rounded-full border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 ${
                        currentQuestion.status.includes("marked-review")
                          ? "text-purple-600 dark:text-purple-400"
                          : ""
                      }`}
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      {currentQuestion.status.includes("marked-review")
                        ? "Unmark"
                        : "Mark for Review"}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={guessAndNext}
                      disabled={currentQuestion.selectedOption === undefined}
                      className="rounded-full border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-700/50 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30"
                    >
                      <LightbulbIcon className="mr-2 h-4 w-4" />
                      Mark as Guessed
                    </Button>

                    <Button
                      variant="default"
                      onClick={goToNextQuestion}
                      disabled={currentQuestionId >= stats.total}
                      className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-700 dark:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save & Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Right Side - Question Palette and Status */}
        <div className="flex w-1/3 flex-col overflow-hidden border-l border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          {/* Compact Status Section */}
          <div className="border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-zinc-100 p-3 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/70">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-base font-bold">
                <ClipboardCheck className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                Test Summary
              </h2>

              {/* Progress Badge */}
              <div className="flex items-center gap-2 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                {Math.round(
                  ((stats.answered +
                    stats.guessed +
                    stats.markedReviewAnswered) /
                    stats.total) *
                    100,
                )}
                % Complete
              </div>
            </div>

            {/* Compact stat cards in a single row */}
            <div className="mt-3 flex gap-2">
              <div className="flex flex-1 flex-col rounded-lg bg-white px-2 py-1.5 shadow-sm dark:bg-zinc-800">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Answered
                  </span>
                </div>
                <span className="font-semibold">{stats.answered}</span>
              </div>
              <div className="flex flex-1 flex-col rounded-lg bg-white px-2 py-1.5 shadow-sm dark:bg-zinc-800">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Not Answered
                  </span>
                </div>
                <span className="font-semibold">{stats.notAnswered}</span>
              </div>
              <div className="flex flex-1 flex-col rounded-lg bg-white px-2 py-1.5 shadow-sm dark:bg-zinc-800">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Not Visited
                  </span>
                </div>
                <span className="font-semibold">{stats.notVisited}</span>
              </div>
            </div>

            {/* Mini status pills */}
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1 text-xs">
              <div className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 whitespace-nowrap shadow-sm dark:bg-zinc-800">
                <Flag className="h-3 w-3 text-purple-500" />
                <span>{stats.markedReview} Marked</span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 whitespace-nowrap shadow-sm dark:bg-zinc-800">
                <HelpCircle className="h-3 w-3 text-blue-500" />
                <span>{stats.markedReviewAnswered} Marked & Answered</span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 whitespace-nowrap shadow-sm dark:bg-zinc-800">
                <LightbulbIcon className="h-3 w-3 text-amber-500" />
                <span>{stats.guessed} Guessed</span>
              </div>
            </div>

            {/* Slim progress bar */}
            <div className="mt-2">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-in-out"
                  style={{
                    width: `${((stats.answered + stats.guessed + stats.markedReviewAnswered) / stats.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Palette - Modern Redesign */}
          <div className="flex-1 overflow-auto">
            <Tabs
              defaultValue={currentSection}
              value={currentSection}
              onValueChange={setCurrentSection}
              className="h-full"
            >
              <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-2 flex flex-col items-start gap-2">
                  <h2 className="flex items-center gap-1.5 text-sm font-semibold">
                    <ListChecks className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    Question Palette
                  </h2>
                  <div className="mb-3 grid grid-cols-3 gap-x-2 gap-y-1 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-sm bg-green-500"></div>
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-sm bg-red-500"></div>
                      <span>Not Answered</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-sm bg-zinc-500"></div>
                      <span>Not Visited</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-sm bg-purple-500"></div>
                      <span>Marked</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-sm bg-yellow-500"></div>
                      <span>Guessed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-sm bg-blue-500"></div>
                      <span>Marked and answered</span>
                    </div>
                  </div>
                </div>

                <TabsList className="w-full rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-800">
                  {questionPaper.map((section) => (
                    <TabsTrigger
                      key={section.name}
                      value={section.name}
                      className="rounded-md py-1.5 text-xs transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-zinc-950"
                    >
                      {section.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {questionPaper.map((section) => (
                <TabsContent
                  key={section.name}
                  value={section.name}
                  className="m-0 h-full overflow-auto"
                >
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="p-3">
                      {/* Compact legend for question statuses */}

                      {/* Modern question grid with hover effects */}
                      <div className="grid grid-cols-5 gap-2">
                        {section.questions.map((question) => (
                          <TooltipProvider key={question.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className={`flex h-10 w-10 items-center justify-center rounded-lg font-medium shadow-sm transition-all hover:scale-105 hover:shadow ${getStatusColor(
                                    question.status,
                                  )} ${
                                    currentQuestionId === question.id
                                      ? "ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-zinc-900"
                                      : ""
                                  }`}
                                  onClick={() => changeQuestion(question.id)}
                                >
                                  {question.id - section.questions[0]!.id + 1}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                className="flex gap-2 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
                              >
                                <div className="text-sm">
                                  <div className="font-bold text-zinc-900 dark:text-zinc-100">
                                    Question {question.id}
                                  </div>
                                  <div className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                    <Circle className="h-1.5 w-1.5 fill-current" />
                                    {question.status
                                      .replace(/-/g, " ")
                                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                                  </div>
                                  {question.timeSpent > 0 && (
                                    <div className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                      <Clock className="h-1.5 w-1.5" />
                                      {formatTime(question.timeSpent)}
                                    </div>
                                  )}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Question Navigation - Modernized */}
          <div className="border-t border-zinc-200 bg-gradient-to-r from-zinc-50 to-zinc-100 p-3 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/70">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={goToPrevQuestion}
                disabled={currentQuestionId <= 1}
                size="sm"
                className="border-zinc-300 bg-white px-3 transition-all hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Prev
              </Button>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    {currentQuestionId}
                  </span>
                  <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">
                    of {stats.total}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={goToNextQuestion}
                disabled={currentQuestionId >= stats.total}
                size="sm"
                className="border-zinc-300 bg-white px-3 transition-all hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                Next
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;
