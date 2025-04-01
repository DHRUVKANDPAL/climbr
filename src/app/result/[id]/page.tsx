"use client";
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import MarkdownQuestionDisplay from "@/components/MarkdownQuestionDisplay";
import DarkModeToggle from "@/components/DarkModeToggle";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import {
  Clock,
  BarChart,
  ListChecks,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  CircleSlash,
  Calculator,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ResultPage = () => {
  const { id } = useParams();
  const paramId = Array.isArray(id) ? id[0] : id;

  // Fetch results data from API
  const { data, isLoading, error } = api.post.generateResult.useQuery(paramId);

  // Current selected section and question
  const [currentSection, setCurrentSection] = React.useState("");
  const [currentQuestionId, setCurrentQuestionId] = React.useState<string>("");

  // Set initial section and question when data loads
  React.useEffect(() => {
    if (data?.subjects?.length > 0) {
      setCurrentSection(data.subjects[0].name);

      const firstSection = data.subjects[0].sections[0];
      if (firstSection?.questions?.length > 0) {
        setCurrentQuestionId(firstSection.questions[0].id);
      }
    }
  }, [data]);

  // Get all questions in flat array for navigation
  const allQuestions = useMemo(() => {
    if (!data) return [];

    return data.subjects.flatMap((subject) =>
      subject.sections.flatMap((section) => section.questions),
    );
  }, [data]);

  // Get current question index
  const currentQuestionIndex = useMemo(() => {
    return allQuestions.findIndex((q) => q.id === currentQuestionId);
  }, [allQuestions, currentQuestionId]);

  // Get current question
  const currentQuestion = useMemo(() => {
    return allQuestions[currentQuestionIndex] || null;
  }, [allQuestions, currentQuestionIndex]);

  // Functions to navigate between questions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      const nextQuestion = allQuestions[currentQuestionIndex + 1];
      setCurrentQuestionId(nextQuestion.id);

      // If subject changed, update the current section
      const nextQuestionSubject = nextQuestion.subject[0]?.name;
      if (nextQuestionSubject && nextQuestionSubject !== currentSection) {
        setCurrentSection(nextQuestionSubject);
      }
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = allQuestions[currentQuestionIndex - 1];
      setCurrentQuestionId(prevQuestion.id);

      // If subject changed, update the current section
      const prevQuestionSubject = prevQuestion.subject[0]?.name;
      if (prevQuestionSubject && prevQuestionSubject !== currentSection) {
        setCurrentSection(prevQuestionSubject);
      }
    }
  };

  // Format time helper function
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Get status color based on answer status
  const getStatusColor = (status) => {
    switch (status) {
      case "correct":
        return "bg-green-500 text-white dark:bg-green-600";
      case "incorrect":
        return "bg-red-500 text-white dark:bg-red-600";
      case "unanswered":
        return "bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200";
      default:
        return "bg-zinc-300 dark:bg-zinc-700";
    }
  };

  // Calculate total score (4 * correct - incorrect)
  const calculateTotalScore = (stats) => {
    return 4 * stats.correct - stats.incorrect;
  };

  // Calculate maximum possible score
  const calculateMaxScore = (stats) => {
    return 4 * stats.total;
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-medium">Loading results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-medium text-red-500">
          Error loading results: {error.message}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-medium">No results found.</div>
      </div>
    );
  }

  // Calculate total score based on 4 * correct - incorrect
  const totalScore = calculateTotalScore(data.stats.overall);
  const maxScore = calculateMaxScore(data.stats.overall);
  const correctScore = 4 * data.stats.overall.correct;
  const incorrectScore = data.stats.overall.incorrect;

  return (
    <div className="flex h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Exam Result</h1>
          <Badge className="bg-blue-600 dark:bg-blue-700">
            Score: {totalScore}/{maxScore} (
            {Math.round((totalScore / maxScore) * 100)}%)
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Question Display */}
        <div className="flex w-2/3 flex-col overflow-auto p-6">
          {/* Current Question Display */}
          {currentQuestion && (
            <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Question {currentQuestionIndex + 1} of {allQuestions.length}
                </h2>
                <Badge className={getStatusColor(currentQuestion.answerStatus)}>
                  {currentQuestion.answerStatus.charAt(0).toUpperCase() +
                    currentQuestion.answerStatus.slice(1)}
                </Badge>
              </div>

              {/* Render the question with colored options */}
              <div className="mb-6">
                <div className="mb-4 text-base">{currentQuestion.question}</div>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={option.id}
                      className={`flex items-start gap-2 rounded-md p-3 ${
                        option.isCorrect
                          ? "border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                          : option.id === currentQuestion.selectedOptionId &&
                              !option.isCorrect
                            ? "border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                            : "border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50"
                      }`}
                    >
                      <div
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${
                          option.isCorrect
                            ? "border-green-500 text-green-500"
                            : option.id === currentQuestion.selectedOptionId &&
                                !option.isCorrect
                              ? "border-red-500 text-red-500"
                              : "border-zinc-300 text-zinc-500 dark:border-zinc-600"
                        }`}
                      >
                        {option.isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : option.id === currentQuestion.selectedOptionId ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <div className="text-sm">{option.option}</div>
                    </div>
                  ))}
                </div>
              </div>

              {currentQuestion.explanation && (
                <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
                  <h3 className="mb-2 flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-400">
                    <HelpCircle className="h-5 w-5" />
                    Explanation
                  </h3>
                  <div className="text-amber-700 dark:text-amber-300">
                    {currentQuestion.explanation}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  {currentQuestionIndex + 1} of {allQuestions.length}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === allQuestions.length - 1}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Results Summary, Time Details, and Question Palette */}
        <div className="flex w-1/3 flex-col overflow-hidden border-l border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <ScrollArea className="h-full">
            {/* Summary Score Panel */}
            <div className="border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-zinc-100 p-3 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/70">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-1.5 text-base font-bold">
                  <Calculator className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  Total Score
                </h2>
                <div className="rounded-md bg-blue-500 px-2.5 py-1 text-sm font-semibold text-white">
                  {totalScore}/{maxScore}
                </div>
              </div>

              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center justify-between">
                  <span>4 × Correct answers:</span>
                  <span>+{correctScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Incorrect answers:</span>
                  <span>-{incorrectScore}</span>
                </div>
                <div className="mt-1 flex items-center justify-between border-t border-zinc-200 pt-1 dark:border-zinc-700">
                  <span className="font-medium">Net Score:</span>
                  <span className="font-medium">{totalScore}</span>
                </div>
              </div>
            </div>

            {/* Result Summary Card */}
            <div className="border-b border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold">
                <ClipboardCheck className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                Result Summary
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Correct
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="font-semibold">
                      {data.stats.overall.correct}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Incorrect
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span className="font-semibold">
                      {data.stats.overall.incorrect}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Unanswered
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-zinc-400"></div>
                    <span className="font-semibold">
                      {data.stats.overall.unanswered}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Total
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold">
                      {data.stats.overall.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Details */}
            <div className="border-b border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold">
                <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                Time Details
              </h3>

              <div className="space-y-3">
                {data.sectionStats.map((section) => (
                  <div key={section.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span>{section.name}</span>
                      <span className="font-medium">
                        {formatTime(section.timeSpentInSec)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                      <span>Question Progress</span>
                      <span>
                        {section.questionAnswered}/{section.questionsTotal}
                      </span>
                    </div>
                    <Progress
                      value={
                        (section.questionAnswered / section.questionsTotal) *
                        100
                      }
                      className="h-1.5 bg-zinc-200 dark:bg-zinc-700"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Performance */}
            <div className="border-b border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold">
                <BarChart className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                Subject Performance
              </h3>

              <div className="space-y-3">
                {data.stats.subjects.map((subject) => (
                  <div key={subject.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span>{subject.name}</span>
                      <span className="font-medium">
                        {subject.correct}/{subject.total}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                      <span>Accuracy</span>
                      <span>
                        {Math.round((subject.correct / subject.total) * 100)}%
                      </span>
                    </div>
                    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        style={{
                          width: `${(subject.correct / subject.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question Palette */}
            <div className="p-3">
              <Tabs
                defaultValue={data.subjects[0]?.name || ""}
                value={currentSection}
                onValueChange={setCurrentSection}
                className="h-full"
              >
                <div className="sticky top-0 z-10 bg-white dark:bg-zinc-950">
                  <div className="mb-2 flex flex-col items-start gap-2">
                    <h2 className="flex items-center gap-1.5 text-sm font-semibold">
                      <ListChecks className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                      Question Review
                    </h2>
                    <div className="mb-3 grid grid-cols-3 gap-x-2 gap-y-1 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-sm bg-green-500"></div>
                        <span>Correct</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-sm bg-red-500"></div>
                        <span>Incorrect</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-sm bg-zinc-500"></div>
                        <span>Unanswered</span>
                      </div>
                    </div>
                  </div>

                  <TabsList className="w-full rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-800">
                    {data.subjects.map((subject) => (
                      <TabsTrigger
                        key={subject.name}
                        value={subject.name}
                        className="rounded-md py-1.5 text-xs transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-zinc-950"
                      >
                        {subject.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {data.subjects.map((subject) => (
                  <TabsContent
                    key={subject.name}
                    value={subject.name}
                    className="mt-3"
                  >
                    <div>
                      {subject.sections.map((section) => (
                        <div key={section.type} className="mb-6">
                          <h3 className="mb-2 flex items-center justify-between text-sm font-medium">
                            <span>{section.type}</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                              {section.stats.correct}/{section.stats.total}{" "}
                              Correct
                            </span>
                          </h3>

                          <div className="grid grid-cols-5 gap-2">
                            {section.questions.map((q, idx) => (
                              <button
                                key={q.id}
                                className={`flex h-10 w-10 items-center justify-center rounded-lg font-medium shadow-sm transition-all hover:scale-105 hover:shadow ${getStatusColor(q.answerStatus)} ${
                                  currentQuestionId === q.id
                                    ? "ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-zinc-900"
                                    : ""
                                }`}
                                onClick={() => setCurrentQuestionId(q.id)}
                              >
                                {idx + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
