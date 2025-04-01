"use client";

import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { api } from "@/trpc/react";


type ReportReason = "harassment" | "hate_speech" | "impersonation" | "threats" | "doxxing" | "spam" | "other";



const ReportPage = () => {
  
const roomName = String(useParams().roomName);

  const [reportReason, setReportReason] = useState<ReportReason>("harassment");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<number>(3);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
   const report=api.post.reportRoom.useMutation()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
      report.mutate({roomName, reportReason, description, severity});
    // In a real app, you would send this data to your backend
    console.log({
      roomName,
      reportReason,
      description,
      severity,
      timestamp: new Date().toISOString(),
    });

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">
            Report Submitted
          </h2>
          <p className="mb-6 text-gray-600">
            Your report for {roomName} has been successfully submitted. Our team
            will review it shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setDescription("");
              setSeverity(3);
            }}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          {/* Header */}
          <div className="bg-blue-600 p-6 text-white">
            <h1 className="text-2xl font-semibold">Report an Issue</h1>
            <p className="mt-1 text-blue-100">
              Room: <span className="font-medium">{roomName}</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Issue Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Issue Type
                </label>
                <select
                  value={reportReason}
                  onChange={(e) =>
                    setReportReason(e.target.value as ReportReason)
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="harassment">Harassment</option>
                  <option value="hate_speech">Hate Speech</option>
                  <option value="impersonation">Impersonation</option>
                  <option value="threats">Threats</option>
                  <option value="doxxing">Doxxing</option>
                  <option value="spam">Spam</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Severity (1-5)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={severity}
                    onChange={(e) => setSeverity(parseInt(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                  />
                  <span className="w-8 text-center text-lg font-medium">
                    {severity}
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>Minor</span>
                  <span>Urgent</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-32 w-full resize-none rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Please provide details about the issue..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-md bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 ${loading ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Report"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Help and guidelines */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-3 text-lg font-medium text-gray-800">
            Reporting Guidelines
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <svg
                className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Please be as specific as possible in your description.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                For urgent safety concerns, please also contact the front desk
                directly.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Photos can be attached by emailing them to support@climbr.com
                with your report number.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
