"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import MockExamForm from "./CreatePaperForm"; // Import the form component we created earlier

export default function ExamFormDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Schedule New Test</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Exam Paper</DialogTitle>
          <DialogDescription>
            Set up a new mock exam for students to practice with
          </DialogDescription>
        </DialogHeader>

        {/* Our MockExamForm component */}
        <div className="mt-4 max-h-[80vh] overflow-y-auto">
          <MockExamForm
            onSuccess={() => {
              // Close the dialog on successful submission
              setIsOpen(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
