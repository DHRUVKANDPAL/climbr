"use client";
// ExamInterface.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import MarkdownQuestionDisplay from "@/components/MarkdownQuestionDisplay";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { api } from "@/trpc/react";
import ExamLoader from "@/components/ExamLoader";

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

type ExamSubmission = {
  examId: string;
  studentName: string;
  studentEmail: string;
  submittedAt: string;
  startTime: string;
  timeSpent: number;
  answers: Array<{
    questionId: string;
    numericId: number;
    section: string;
    selectedOption?: number;
    status: QuestionStatus;
    timeSpent: number;
  }>;
  sectionStats: Array<{
    name: string;
    timeSpent: number;
    questionsAnswered: number;
    questionsTotal: number;
  }>;
  summary: {
    totalQuestions: number;
    answered: number;
    notAnswered: number;
    notVisited: number;
    markedReview: number;
    markedReviewAnswered: number;
    guessed: number;
  };
};

type QuestionPaperSection = {
  name: string;
  questions: Question[];
};

const STORAGE_KEYS = {
  EXAM_STATE: "examState",
  CURRENT_SECTION: "currentSection",
  CURRENT_QUESTION_ID: "currentQuestionId",
  TIME_LEFT: "timeLeft",
  EXAM_STARTED: "examStarted",
  EXAM_START_TIME: "examStartTime",
  STUDENT_NAME: "studentName",
  STUDENT_EMAIL: "studentEmail",
};

const ExamInterface = () => {
  const { data: examData, isLoading } = api.post.getAllPapers.useQuery(
    "cm8vm5asq002j132cbt5yuau4",
  );

  // Initialize states without depending on localStorage during render
  const [questionPaper, setQuestionPaper] = useState<QuestionPaperSection[]>(
    [],
  );
  const [currentSection, setCurrentSection] = useState<string>("");
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(10800); // 3 hours in seconds
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>("");
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | null>(null);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState<boolean>(false);
  const [showStartDialog, setShowStartDialog] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Set isClient to true on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load saved state from localStorage after component mounts on the client
  useEffect(() => {
    if (isClient) {
      const storedExamStarted =
        localStorage.getItem(STORAGE_KEYS.EXAM_STARTED) === "true";
      setExamStarted(storedExamStarted);
      setShowStartDialog(!storedExamStarted);

      if (storedExamStarted) {
        // Load other saved state only if exam has started
        const storedSection = localStorage.getItem(
          STORAGE_KEYS.CURRENT_SECTION,
        );
        if (storedSection) setCurrentSection(storedSection);

        const storedQuestionId = localStorage.getItem(
          STORAGE_KEYS.CURRENT_QUESTION_ID,
        );
        if (storedQuestionId) setCurrentQuestionId(parseInt(storedQuestionId));

        const storedTimeLeft = localStorage.getItem(STORAGE_KEYS.TIME_LEFT);
        if (storedTimeLeft) setTimeLeft(parseInt(storedTimeLeft));

        const storedName = localStorage.getItem(STORAGE_KEYS.STUDENT_NAME);
        if (storedName) setStudentName(storedName);

        const storedEmail = localStorage.getItem(STORAGE_KEYS.STUDENT_EMAIL);
        if (storedEmail) setStudentEmail(storedEmail);
      }
    }
  }, [isClient]);

  // Log examination data structure for debugging
  useEffect(() => {
    if (examData && examData.subjects.length > 0) {
      const firstSection = examData.subjects[0].sections.find(
        (s) => s.type === "MCQ",
      );
      if (firstSection && firstSection.questions.length > 0) {
        console.log(
          "First question options format:",
          firstSection.questions[0].options,
        );

        if (firstSection.questions[0].options.length > 0) {
          console.log(
            "First option structure:",
            JSON.stringify(firstSection.questions[0].options[0], null, 2),
          );
        }
      }
    }
  }, [examData]);

  // Helper function to extract option text
  const getOptionText = (option: any): string => {
    if (typeof option === "object" && option !== null) {
      if ("option" in option) return String(option.option || "");
      if ("text" in option) return String(option.text || "");
      if ("value" in option) return String(option.value || "");
      return JSON.stringify(option);
    }
    return typeof option === "string" ? option : String(option || "");
  };

  // Initialize question paper from examData or localStorage
  useEffect(() => {
    if (!isClient) return; // Skip this effect during SSR

    // Try to load saved state from localStorage first
    const storedExamState = localStorage.getItem(STORAGE_KEYS.EXAM_STATE);

    if (storedExamState && examStarted) {
      try {
        const parsedState = JSON.parse(storedExamState);
        setQuestionPaper(parsedState);
        console.log("Loaded exam state from localStorage");
        return; // Exit early as we've loaded from localStorage
      } catch (error) {
        console.error("Error parsing stored exam state:", error);
        // Fall through to initialize from examData
      }
    }

    // If no valid localStorage data, initialize from examData
    if (examData) {
      const transformed: QuestionPaperSection[] = [];
      let globalQuestionId = 1;

      // Convert the structured data into the format needed by the UI
      examData.subjects.forEach((subject) => {
        const questions: Question[] = [];

        // Process all questions from this subject
        subject.sections.forEach((section) => {
          if (section.type === "MCQ") {
            section.questions.forEach((q) => {
              // Ensure question text is a string
              const questionText =
                typeof q.question === "string"
                  ? q.question
                  : String(q.question || "");

              // Extract option text from options objects
              const options = Array.isArray(q.options)
                ? q.options.map(getOptionText)
                : [];

              questions.push({
                id: globalQuestionId++,
                text: questionText,
                options: options,
                section: subject.name,
                status: "not-visited",
                timeSpent: 0,
              });
            });
          }
        });

        // Add this subject to the question paper if it has questions
        if (questions.length > 0) {
          transformed.push({
            name: subject.name,
            questions: questions,
          });
        }
      });

      setQuestionPaper(transformed);
    }
  }, [examData, examStarted, isClient]);

  // Derived values using useMemo
  const allQuestions = useMemo(() => {
    return questionPaper.flatMap((section) => section.questions);
  }, [questionPaper]);

  const currentQuestion = useMemo(() => {
    return allQuestions.find((q) => q.id === currentQuestionId);
  }, [allQuestions, currentQuestionId]);

  const stats = useMemo(() => {
    return {
      total: allQuestions.length,
      answered: allQuestions.filter((q) => q.status === "answered").length,
      notAnswered: allQuestions.filter((q) => q.status === "not-answered")
        .length,
      notVisited: allQuestions.filter((q) => q.status === "not-visited").length,
      markedReview: allQuestions.filter((q) => q.status === "marked-review")
        .length,
      markedReviewAnswered: allQuestions.filter(
        (q) => q.status === "marked-review-answered",
      ).length,
      guessed: allQuestions.filter((q) => q.status === "guessed").length,
      totalTimeSpent: allQuestions.reduce((acc, q) => acc + q.timeSpent, 0),
    };
  }, [allQuestions]);

  const sectionTimeStats = useMemo(() => {
    return questionPaper.map((section) => {
      const sectionQuestions = section.questions;
      const sectionTimeSpent = sectionQuestions.reduce(
        (acc, q) => acc + q.timeSpent,
        0,
      );
      const sectionPercentage =
        stats.totalTimeSpent > 0
          ? Math.round((sectionTimeSpent / stats.totalTimeSpent) * 100)
          : 0;

      return {
        name: section.name,
        timeSpent: sectionTimeSpent,
        percentage: sectionPercentage,
        answeredQuestions: sectionQuestions.filter(
          (q) =>
            q.status === "answered" ||
            q.status === "guessed" ||
            q.status === "marked-review-answered",
        ).length,
        totalQuestions: sectionQuestions.length,
      };
    });
  }, [questionPaper, stats.totalTimeSpent]);

  const averageTimePerQuestion = useMemo(() => {
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
  }, [allQuestions]);

  // Save question paper state to localStorage
  useEffect(() => {
    if (isClient && examStarted && questionPaper.length > 0) {
      localStorage.setItem(
        STORAGE_KEYS.EXAM_STATE,
        JSON.stringify(questionPaper),
      );
    }
  }, [questionPaper, examStarted, isClient]);

  // Save current section to localStorage
  useEffect(() => {
    if (isClient && examStarted && currentSection) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SECTION, currentSection);
    }
  }, [currentSection, examStarted, isClient]);

  // Save current question ID to localStorage
  useEffect(() => {
    if (isClient && examStarted) {
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_QUESTION_ID,
        currentQuestionId.toString(),
      );
    }
  }, [currentQuestionId, examStarted, isClient]);

  // Save time left to localStorage
  useEffect(() => {
    if (isClient && examStarted) {
      localStorage.setItem(STORAGE_KEYS.TIME_LEFT, timeLeft.toString());
    }
  }, [timeLeft, examStarted, isClient]);

  // Save exam started state to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(STORAGE_KEYS.EXAM_STARTED, examStarted.toString());
    }
  }, [examStarted, isClient]);

  // Save student info to localStorage
  useEffect(() => {
    if (isClient && examStarted) {
      localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, studentName);
      localStorage.setItem(STORAGE_KEYS.STUDENT_EMAIL, studentEmail);
    }
  }, [studentName, studentEmail, examStarted, isClient]);

  // Main timer effect
  useEffect(() => {
    if (!isClient || !examStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          // Auto-submit exam when time runs out
          setShowSubmitDialog(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, isClient]);

  // Question-specific timer effect
  useEffect(() => {
    if (!isClient || !examStarted) return;

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
  }, [currentQuestionId, examStarted, isClient]);

  // Set initial section when question paper is loaded
  useEffect(() => {
    if (questionPaper.length > 0 && !currentSection) {
      const initialSection = questionPaper[0].name;
      setCurrentSection(initialSection);

      if (isClient) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_SECTION, initialSection);
      }
    }
  }, [questionPaper, currentSection, isClient]);

  // Format time function
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

  // Start exam function
  const startExam = () => {
    const startTime = new Date().toISOString();

    setExamStarted(true);
    setShowStartDialog(false);

    // Store exam start time
    if (isClient) {
      localStorage.setItem(STORAGE_KEYS.EXAM_START_TIME, startTime);
      localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, studentName);
      localStorage.setItem(STORAGE_KEYS.STUDENT_EMAIL, studentEmail);
      localStorage.setItem(STORAGE_KEYS.EXAM_STARTED, "true");
    }

    // Set initial section if not already set
    if (!currentSection && questionPaper.length > 0) {
      const initialSection = questionPaper[0].name;
      setCurrentSection(initialSection);

      if (isClient) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_SECTION, initialSection);
      }
    }
  };

  // Submit exam function
  const submitExam = async () => {
    if (!isClient) return;

    // Create the submission object
    const submission: ExamSubmission = {
      examId: "jee_main_2025",
      studentName: studentName || "Anonymous",
      studentEmail: studentEmail || "anonymous@example.com",
      submittedAt: new Date().toISOString(),
      startTime:
        localStorage.getItem(STORAGE_KEYS.EXAM_START_TIME) ||
        new Date(Date.now() - (10800 - timeLeft) * 1000).toISOString(),
      timeSpent: 10800 - timeLeft, // Total time spent

      // Process each question using allQuestions
      answers: allQuestions.map((question) => {
        return {
          questionId: question.id.toString(),
          numericId: question.id,
          section: question.section,
          selectedOption: question.selectedOption,
          status: question.status,
          timeSpent: question.timeSpent,
        };
      }),

      // Process section statistics using sectionTimeStats
      sectionStats: sectionTimeStats.map((sectionStat) => {
        return {
          name: sectionStat.name,
          timeSpent: sectionStat.timeSpent,
          questionsAnswered: sectionStat.answeredQuestions,
          questionsTotal: sectionStat.totalQuestions,
        };
      }),

      // Include summary statistics
      summary: {
        totalQuestions: stats.total,
        answered: stats.answered,
        notAnswered: stats.notAnswered,
        notVisited: stats.notVisited,
        markedReview: stats.markedReview,
        markedReviewAnswered: stats.markedReviewAnswered,
        guessed: stats.guessed,
      },
    };

    try {
      // Show submission animation/message here
      console.log("Submitting exam data:", submission);
      // Simulate an API call to submit the exam data
      // const response = await fetch("/api/submit-exam", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(submission),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to submit exam data");
      // }

      // const result = await response.json();
      // console.log("Exam submission result:", result);

      // Clear all localStorage after successful submission
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });

      alert("Exam submitted successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Failed to submit exam. Please try again.");
    }
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

  // If we're still in the server-rendering phase or loading, return a minimal UI
  if (!isClient || isLoading) {
    return <ExamLoader />;
  }

  return (
    <div
      className="flex h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"
      suppressHydrationWarning={true}
    >
      {/* Start Exam Dialog */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mock Test: JEE Main 2025</DialogTitle>
            <DialogDescription>
              Please enter your details to start the exam.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>
            <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
                <AlertCircle className="h-5 w-5" />
                <h3 className="font-semibold">Important Instructions</h3>
              </div>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-amber-700 dark:text-amber-300">
                <li>This exam has a duration of 3 hours</li>
                <li>Do not refresh the page during the exam</li>
                <li>Each question carries equal marks</li>
                <li>No negative marking for wrong answers</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={startExam}
              disabled={!studentName || !studentEmail}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Start Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Only render exam content if exam has started */}
      {examStarted && (
        <>
          {" "}
          {/* Top Bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Mock Test: JEE Main 2025</h1>
              <Badge className="bg-blue-600 dark:bg-blue-700">
                Online Exam
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <DarkModeToggle />

              <div className="flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 shadow-sm dark:bg-zinc-800">
                <Clock className="h-5 w-5 text-red-500 dark:text-red-400" />
                <span className="text-lg font-bold">
                  {formatTime(timeLeft)}
                </span>
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

              <Dialog
                open={showSubmitDialog}
                onOpenChange={setShowSubmitDialog}
              >
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Submit Test</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to submit your test? This action
                      cannot be undone.
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
                      <Button
                        variant="outline"
                        onClick={() => setShowSubmitDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={submitExam}>
                        Submit Test
                      </Button>
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
                      <h3 className="mb-4 text-lg font-semibold">
                        Time Analysis
                      </h3>
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
                            {formatTime(averageTimePerQuestion)}
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
                          <span className="font-semibold">
                            {stats.answered}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500 dark:bg-red-600"></div>
                            <span>Not Answered</span>
                          </div>
                          <span className="font-semibold">
                            {stats.notAnswered}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-zinc-400 dark:bg-zinc-500"></div>
                            <span>Not Visited</span>
                          </div>
                          <span className="font-semibold">
                            {stats.notVisited}
                          </span>
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
                        {/* Use the memoized sectionTimeStats directly */}
                        {sectionTimeStats.map((sectionStat) => (
                          <div key={sectionStat.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {sectionStat.name}
                              </span>
                              <span>
                                {formatTime(sectionStat.timeSpent)} (
                                {sectionStat.percentage}%)
                              </span>
                            </div>
                            <Progress
                              value={sectionStat.percentage}
                              className="h-2 bg-zinc-200 dark:bg-zinc-700"
                            />
                          </div>
                        ))}
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
                        <Badge
                          className={getStatusColor(currentQuestion.status)}
                        >
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

                    {/* Add proper checks and conversions */}
                    <MarkdownQuestionDisplay
                      question={{
                        text:
                          typeof currentQuestion.text === "string"
                            ? currentQuestion.text
                            : String(currentQuestion.text || ""),
                        options: Array.isArray(currentQuestion.options)
                          ? currentQuestion.options.map(getOptionText)
                          : [],
                        selectedOption: currentQuestion.selectedOption,
                      }}
                      onSelectOption={selectOption}
                    />

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
                          disabled={
                            currentQuestion.selectedOption === undefined
                          }
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
                          disabled={
                            currentQuestion.selectedOption === undefined
                          }
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
                <div className="mt-4 flex gap-2 justify-between overflow-x-auto pb-1 text-sm">
                  <div className="flex items-center gap-1 rounded-sm w-full bg-white px-4 py-2 whitespace-nowrap shadow-sm dark:bg-zinc-800">
                    <Flag className="h-4 w-4 text-purple-500" />
                    <span>{stats.markedReview} Marked</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-sm w-full bg-white px-4 py-2 whitespace-nowrap shadow-sm dark:bg-zinc-800">
                    <HelpCircle className="h-4 w-4 text-blue-500" />
                    <span>{stats.markedReviewAnswered} Marked & Answered</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-sm w-full bg-white px-4 py-2 whitespace-nowrap shadow-sm dark:bg-zinc-800">
                    <LightbulbIcon className="h-4 w-4 text-amber-500" />
                    <span>{stats.guessed} Guessed</span>
                  </div>
                </div>

                {/* Slim progress bar */}
                {/* <div className="mt-2">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-in-out"
                  style={{
                    width: `${((stats.answered + stats.guessed + stats.markedReviewAnswered) / stats.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div> */}
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
                                      onClick={() =>
                                        changeQuestion(question.id)
                                      }
                                    >
                                      {question.id -
                                        section.questions[0]!.id +
                                        1}
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
                                          .replace(/\b\w/g, (l) =>
                                            l.toUpperCase(),
                                          )}
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
        </>
      )}
    </div>
  );
};
export default ExamInterface;
