"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Tag, BookOpen, X } from "lucide-react";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

// Zod Schema
const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  weightage: z.number().optional().default(4),
  negativeMarking: z.number().optional().default(-1),
  examId: z.string().optional(),
  diagramUrl: z.array(z.string()).optional(),
  subject: z.array(z.string()).optional(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).optional().default("Medium"),
  explanation: z.string().optional(),
  topic: z.array(z.string()).optional(),
  options: z
    .array(
      z.object({
        option: z.string(),
        isCorrect: z.boolean().optional().default(false),
      }),
    )
    .optional(),
  sectionId: z.string().optional(),
});

export default function QuestionInputForm() {
  const [topicInput, setTopicInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const submitForm = api.post.createQuestion.useMutation();
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      weightage: 4,
      negativeMarking: -1,
      difficulty: "Medium",
      options: [{ option: "", isCorrect: false }],
      topic: [],
      subject: [],
    },
  });

  // Topic Management
  const addTopic = () => {
    if (!topicInput.trim()) return;

    const currentTopics = form.getValues("topic") || [];
    if (!currentTopics.includes(topicInput.trim())) {
      form.setValue("topic", [...currentTopics, topicInput.trim()]);
      setTopicInput("");
    }
  };

  const removeTopic = (topicToRemove: string) => {
    const currentTopics = form.getValues("topic") || [];
    form.setValue(
      "topic",
      currentTopics.filter((topic) => topic !== topicToRemove),
    );
  };

  // Subject Management
  const addSubject = () => {
    if (!subjectInput.trim()) return;

    const currentSubjects = form.getValues("subject") || [];
    if (!currentSubjects.includes(subjectInput.trim())) {
      form.setValue("subject", [...currentSubjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };

  const removeSubject = (subjectToRemove: string) => {
    const currentSubjects = form.getValues("subject") || [];
    form.setValue(
      "subject",
      currentSubjects.filter((subject) => subject !== subjectToRemove),
    );
  };

  // Option Management
  const addOption = () => {
    const currentOptions = form.getValues("options") || [];
    form.setValue("options", [
      ...currentOptions,
      { option: "", isCorrect: false },
    ]);
  };

  const removeOption = (index: number) => {
    const currentOptions = form.getValues("options") || [];
    form.setValue(
      "options",
      currentOptions.filter((_, i) => i !== index),
    );
  };

  const onSubmit = (data: z.infer<typeof questionSchema>) => {
    console.log("Form Data:", data);
    // Handle form submission
    submitForm.mutate(data, {
      onSuccess: () => {
        // Reset form after successful submission
        form.reset();
        form.setValue("question", "");
        form.setValue("options", [{ option: "", isCorrect: false }]);
        form.setValue("topic", []);
        form.setValue("subject", []);
        form.setValue("difficulty", "Medium");
        form.setValue("weightage", 4);
        form.setValue("explanation", "");
        form.setValue("negativeMarking", -1);
        setTopicInput("");
        setSubjectInput("");
      },
    });
  };

  // Use the loading state from the mutation directly
  const isSubmitting = submitForm.isPending;

  return (
    <TooltipProvider>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-5xl shadow-2xl">
          <CardHeader className="rounded-t-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <CardTitle className="flex items-center justify-center text-center text-3xl font-bold">
              <Tag className="mr-3" /> Question Input Form
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Question Input */}
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-indigo-700">
                        <BookOpen className="mr-2 text-indigo-500" /> Question
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your question here"
                          className="min-h-[120px] resize-y border-indigo-200 transition-all duration-300 focus:border-indigo-500"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Options Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-indigo-700">
                    Options
                  </h3>
                  {form.watch("options")?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name={`options.${index}.option`}
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormControl>
                              <Input
                                placeholder={`Option ${index + 1}`}
                                {...field}
                                disabled={isSubmitting}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`options.${index}.isCorrect`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={field.value}
                                      onChange={(e) =>
                                        field.onChange(e.target.checked)
                                      }
                                      className="h-5 w-5 text-indigo-600"
                                      disabled={isSubmitting}
                                    />
                                    <span>Correct</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Mark if this is the correct option
                                </TooltipContent>
                              </Tooltip>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      {form.watch("options")!.length > 1 && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeOption(index)}
                              disabled={isSubmitting}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Remove this option</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addOption}
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Option
                  </Button>
                </div>

                {/* Topics Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={topicInput}
                      onChange={(e) => setTopicInput(e.target.value)}
                      placeholder="Enter Topic"
                      className="flex-grow"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTopic}
                      className="bg-indigo-50 hover:bg-indigo-100"
                      disabled={isSubmitting}
                    >
                      <Plus className="mr-2 h-4 w-4 text-indigo-600" /> Add
                      Topic
                    </Button>
                  </div>
                  {(form.watch("topic") || []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {form.watch("topic")?.map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="flex items-center space-x-2 bg-indigo-100 text-indigo-700"
                        >
                          <span>{topic}</span>
                          <X
                            className={cn(
                              "h-4 w-4 cursor-pointer hover:text-red-500",
                              isSubmitting && "cursor-not-allowed opacity-50",
                            )}
                            onClick={() => !isSubmitting && removeTopic(topic)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subjects Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={subjectInput}
                      onChange={(e) => setSubjectInput(e.target.value)}
                      placeholder="Enter Subject"
                      className="flex-grow"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addSubject}
                      className="bg-purple-50 hover:bg-purple-100"
                      disabled={isSubmitting}
                    >
                      <Plus className="mr-2 h-4 w-4 text-purple-600" /> Add
                      Subject
                    </Button>
                  </div>
                  {(form.watch("subject") ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {form.watch("subject")?.map((subject) => (
                        <Badge
                          key={subject}
                          variant="secondary"
                          className="flex items-center space-x-2 bg-purple-100 text-purple-700"
                        >
                          <span>{subject}</span>
                          <X
                            className={cn(
                              "h-4 w-4 cursor-pointer hover:text-red-500",
                              isSubmitting && "cursor-not-allowed opacity-50",
                            )}
                            onClick={() =>
                              !isSubmitting && removeSubject(subject)
                            }
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Difficulty and Weightage */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={isSubmitting}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Difficulty" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                          </TooltipTrigger>
                          <TooltipContent>
                            Select the difficulty level of the question
                          </TooltipContent>
                        </Tooltip>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weightage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weightage</FormLabel>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter weightage"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                disabled={isSubmitting}
                              />
                            </FormControl>
                          </TooltipTrigger>
                          <TooltipContent>
                            Assign a weight to the question
                          </TooltipContent>
                        </Tooltip>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Explanation */}
                <FormField
                  control={form.control}
                  name="explanation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Explanation</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a detailed explanation"
                          className="min-h-[100px] resize-y"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="default"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 hover:from-indigo-700 hover:to-purple-700",
                    isSubmitting && "cursor-not-allowed opacity-50",
                  )}
                >
                  {isSubmitting ? "Submitting..." : "Submit Question"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
