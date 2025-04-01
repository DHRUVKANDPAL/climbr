"use client";
// MockExamForm.tsx
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // Add this import at the top

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Clock } from "lucide-react";
import { api } from "@/trpc/react";

// Define the schema for the form
const formSchema = z.object({
  mockExamName: z.string().min(1, "Mock exam name is required"),
  actualExamName: z.string().min(1, "Actual exam name is required"),
  timeDurationInMinutes: z
    .number()
    .min(1, "Duration must be at least 1 minute")
    .max(480, "Duration cannot exceed 8 hours"),
});

// Define the type based on the schema
type FormValues = z.infer<typeof formSchema>;

export default function MockExamForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mockExamName: "",
      actualExamName: "",
      timeDurationInMinutes: 60,
    },
  });
  const router = useRouter();
  const submitForm = api.post.createPaper.useMutation();

  // Submit handler
  const onSubmit = (data: FormValues) => {
    console.log(data);

    // Map the form values to the expected API format
    const apiData = {
      name: data.mockExamName,
      examName: data.actualExamName,
      timeDurationInMinutes: data.timeDurationInMinutes,
    };

    submitForm.mutate(apiData, {
      onSuccess: (data) => {
        console.log("Paper Created:", data.id);
        form.reset(); // Reset form after successful submission
        router.push(`/paper/${data.id}`);
      },
      onError: (error) => {
        console.error("Error:", error);
        alert("Failed to create exam paper: " + error.message);
      },
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md shadow-lg">
      <CardHeader className="rounded-t-lg bg-slate-50">
        <CardTitle className="text-2xl font-bold text-slate-800">
          Create Exam Paper
        </CardTitle>
        <CardDescription>
          Create a new mock exam for students to practice with
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mockExamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Mock Exam Name</FormLabel>
                  <FormDescription>
                    Enter a name for this practice exam
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="e.g., Practice Test March 2025"
                      className="focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="actualExamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    Actual Exam Name
                  </FormLabel>
                  <FormDescription>
                    Enter the name of the real exam this mock is based on
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="e.g., CompTIA Security+ SY0-601"
                      className="focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeDurationInMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    Time Duration (minutes)
                  </FormLabel>
                  <FormDescription>
                    Set how long students will have to complete the exam
                  </FormDescription>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="number"
                        className="pl-10 focus:ring-2 focus:ring-blue-500"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 py-6 text-lg font-medium transition-colors hover:bg-blue-700"
              disabled={submitForm.isLoading}
            >
              {submitForm.isLoading ? "Creating..." : "Create Exam Paper"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
