"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ShowResults = ({ data }) => {
  const [activeTab, setActiveTab] = useState("summary");

  if (!data) return <div>Loading results...</div>;

  const { subjects, summary, stats } = data;

  // Format time spent
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Exam Results</CardTitle>
          <CardDescription>
            Your performance across all subjects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {summary?.totalQuestions || 0}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Answered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{summary?.answered || 0}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Unanswered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {summary?.notAnswered + summary?.notVisited || 0}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="summary"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Overall Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Correct Answers: {stats.overall.correct} /{" "}
                      {stats.overall.total}
                    </span>
                    <span className="text-sm font-medium">
                      {Math.round(
                        (stats.overall.correct / stats.overall.total) * 100,
                      ) || 0}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (stats.overall.correct / stats.overall.total) * 100 || 0
                    }
                    className="h-2"
                  />
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">
                    Time Spent Per Section
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Section</TableHead>
                        <TableHead>Time Spent</TableHead>
                        <TableHead>Questions Answered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.sectionStats.map((section) => (
                        <TableRow key={section.id}>
                          <TableCell className="font-medium">
                            {section.name}
                          </TableCell>
                          <TableCell>
                            {formatTime(section.timeSpentInSec)}
                          </TableCell>
                          <TableCell>
                            {section.questionAnswered} /{" "}
                            {section.questionsTotal}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {subjects.map((subject, index) => (
                  <AccordionItem key={index} value={`subject-${index}`}>
                    <AccordionTrigger className="px-4">
                      <div className="flex w-full items-center justify-between pr-4">
                        <span>{subject.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              subject.stats.correct === 0
                                ? "destructive"
                                : "default"
                            }
                          >
                            {subject.stats.correct} / {subject.stats.total}{" "}
                            correct
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-4 pt-2">
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Accuracy
                            </span>
                            <span className="text-sm font-medium">
                              {Math.round(
                                (subject.stats.correct / subject.stats.total) *
                                  100,
                              ) || 0}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              (subject.stats.correct / subject.stats.total) *
                                100 || 0
                            }
                            className="h-2"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="p-4 pb-2">
                              <CardTitle className="text-sm">Correct</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <p className="text-2xl font-bold text-green-600">
                                {subject.stats.correct}
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="p-4 pb-2">
                              <CardTitle className="text-sm">
                                Incorrect
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <p className="text-2xl font-bold text-red-600">
                                {subject.stats.incorrect}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Question Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {subjects.map((subject, subjectIndex) => (
                  <AccordionItem
                    key={subjectIndex}
                    value={`question-subject-${subjectIndex}`}
                  >
                    <AccordionTrigger className="px-4">
                      {subject.name}
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      {subject.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-6">
                          <h3 className="mb-4 text-lg font-medium">
                            {section.type} Questions
                          </h3>
                          <div className="space-y-4">
                            {section.questions.map(
                              (question, questionIndex) => (
                                <Card
                                  key={questionIndex}
                                  className="border-l-4 border-l-blue-500"
                                >
                                  <CardHeader className="p-4 pb-2">
                                    <div className="flex items-start justify-between">
                                      <CardTitle className="text-base font-medium">
                                        Q{questionIndex + 1}:{" "}
                                        {question.question}
                                      </CardTitle>
                                      <Badge
                                        variant={
                                          question.answerStatus === "correct"
                                            ? "success"
                                            : question.answerStatus ===
                                                "incorrect"
                                              ? "destructive"
                                              : "outline"
                                        }
                                      >
                                        {question.answerStatus === "unanswered"
                                          ? "Unanswered"
                                          : question.answerStatus}
                                      </Badge>
                                    </div>
                                    <div className="mt-2 text-sm">
                                      <span className="font-medium">
                                        Difficulty:{" "}
                                      </span>
                                      <Badge variant="outline">
                                        {question.difficulty}
                                      </Badge>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="p-4 pt-2">
                                    <div className="space-y-2">
                                      <h4 className="font-medium">Options:</h4>
                                      <ul className="space-y-1">
                                        {question.options.map(
                                          (option, optionIndex) => (
                                            <li
                                              key={optionIndex}
                                              className={`rounded p-2 ${
                                                option.isCorrect
                                                  ? "bg-green-100"
                                                  : question.selectedOptionId ===
                                                        option.id &&
                                                      !option.isCorrect
                                                    ? "bg-red-100"
                                                    : ""
                                              }`}
                                            >
                                              {option.option}
                                              {option.isCorrect && (
                                                <span className="ml-2 text-green-600">
                                                  {" "}
                                                  (Correct)
                                                </span>
                                              )}
                                            </li>
                                          ),
                                        )}
                                      </ul>

                                      <div className="mt-4">
                                        <h4 className="font-medium">
                                          Explanation:
                                        </h4>
                                        <p className="mt-1 text-sm">
                                          {question.explanation}
                                        </p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ),
                            )}
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShowResults;
