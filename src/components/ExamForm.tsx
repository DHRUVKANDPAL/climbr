// ExamForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the schema for section
const sectionSchema = z.object({
  type: z.enum(["MCQ", "Numericals"]),
  numberOfQuestions: z.number(),
  weightage: z.number().optional(),
  negativeMarking: z.number().optional(),
});

// Define the schema for the form
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.date(),
  durationInMinutes: z.number().min(1, "Duration must be at least 1 minute"),
  totalMarks: z.number().min(1, "Total marks must be at least 1"),
  subjectIds: z.array(z.string()).nonempty("Select at least one subject"),
  sections: z.array(sectionSchema).nonempty("Add at least one section"),
});

// Define the type based on the schema
type FormValues = z.infer<typeof formSchema>;

interface Subject {
  id: string;
  name: string;
}

// Mock subjects data
const subjects: Subject[] = [
  { id: "s1", name: "Mathematics" },
  { id: "s2", name: "Physics" },
  { id: "s3", name: "Chemistry" },
  { id: "s4", name: "Biology" },
  { id: "s5", name: "Computer Science" },
];

export default function ExamForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      durationInMinutes: 60,
      totalMarks: 100,
      subjectIds: [],
      sections: [],
    },
  });

  const { fields, append, remove } = form.control._formValues.sections || [];

  // Handler for adding a new section
  const handleAddSection = () => {
    const sections = form.getValues("sections") || [];
    form.setValue("sections", [
      ...sections,
      { type: "MCQ", numberOfQuestions: 10 },
    ]);
  };

  // Handler for removing a section
  const handleRemoveSection = (index: number) => {
    const sections = form.getValues("sections") || [];
    form.setValue(
      "sections",
      sections.filter((_, i) => i !== index),
    );
  };

  // Submit handler
  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Add your submission logic here
    alert("Form submitted: " + JSON.stringify(data, null, 2));
  };

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Create Exam</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter exam name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Exam Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="durationInMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalMarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Marks</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subjectIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subjects</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((subject) => (
                      <Button
                        key={subject.id}
                        type="button"
                        variant={
                          field.value.includes(subject.id)
                            ? "default"
                            : "outline"
                        }
                        onClick={() => {
                          const values = [...field.value];
                          if (values.includes(subject.id)) {
                            field.onChange(
                              values.filter((id) => id !== subject.id),
                            );
                          } else {
                            field.onChange([...values, subject.id]);
                          }
                        }}
                        className="mb-2"
                      >
                        {subject.name}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <div className="mb-4 flex items-center justify-between">
                <FormLabel className="text-lg">Sections</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSection}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Section
                </Button>
              </div>

              <div className="space-y-4">
                {form.watch("sections")?.map((section, index) => (
                  <Card key={index} className="relative p-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleRemoveSection(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`sections.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="MCQ">MCQ</SelectItem>
                                <SelectItem value="Numericals">
                                  Numericals
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`sections.${index}.numberOfQuestions`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Questions</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`sections.${index}.weightage`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Weightage (Marks per Question)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? Number(e.target.value)
                                      : undefined,
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`sections.${index}.negativeMarking`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Negative Marking</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? Number(e.target.value)
                                      : undefined,
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Points deducted for wrong answers
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}

                {(!form.watch("sections") ||
                  form.watch("sections").length === 0) && (
                  <div className="rounded-lg border border-dashed p-6 text-center">
                    <p className="text-muted-foreground">
                      No sections added. Click the "Add Section" button to add a
                      section.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Exam
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
