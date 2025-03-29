"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

const CreatePaperTest = () => {
  const [name, setName] = useState("");
  const [examName, setExamName] = useState("");
  const [userId, setUserId] = useState("");
  const [timeDurationInMinutes, setTimeDurationInMinutes] = useState(60);

  const createPaperMutation = api.post.createPaper.useMutation({
    onSuccess: (data) => {
      console.log("Paper Created:", data);
      alert("Paper created successfully!");
    },
    onError: (error) => {
      console.error("Error:", error);
      alert("Failed to create paper!");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createPaperMutation.mutate({
      name,
      examName,
      userId,
      timeDurationInMinutes,
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Test Create Paper API</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Paper Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border p-2"
          required
        />
        <input
          type="text"
          placeholder="Exam Name"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          className="rounded border p-2"
          required
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="rounded border p-2"
          required
        />
        <input
          type="number"
          placeholder="Duration (Minutes)"
          value={timeDurationInMinutes}
          onChange={(e) => setTimeDurationInMinutes(Number(e.target.value))}
          className="rounded border p-2"
          required
        />
        <button
          type="submit"
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          disabled={createPaperMutation.isPending}
        >
          {createPaperMutation.isPending ? "Creating..." : "Create Paper"}
        </button>
      </form>
    </div>
  );
};

export default CreatePaperTest;
