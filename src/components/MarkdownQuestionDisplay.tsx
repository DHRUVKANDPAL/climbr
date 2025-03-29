import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// Types (extend your existing Question type)
type QuestionWithMarkdown = {
  id: number;
  text: string; // This will now contain markdown
  options: string[]; // These will now contain markdown
  correctAnswer?: number;
  section: string;
  status: string;
  selectedOption?: number;
  timeSpent: number;
};

// Styled option component
const MarkdownOption = ({
  index,
  content,
  isSelected,
  onClick,
}: {
  index: number;
  content: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`flex cursor-pointer items-start rounded-md border p-4 transition-colors ${
        isSelected
          ? "border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20"
          : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/50"
      }`}
      onClick={onClick}
    >
      <div
        className={`mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${
          isSelected
            ? "border-blue-500 bg-blue-500 text-white dark:border-blue-600 dark:bg-blue-600"
            : "border-zinc-400 dark:border-zinc-600"
        }`}
      >
        {String.fromCharCode(65 + index)}
      </div>
      <div className="markdown-content w-full pt-0.5">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

// Main component
const MarkdownQuestionDisplay = ({
  question,
  onSelectOption,
}: {
  question: QuestionWithMarkdown;
  onSelectOption: (index: number) => void;
}) => {
  return (
    <Card className="mb-4 flex-1 border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <CardContent className="pt-6">
        <ScrollArea className="h-[calc(100vh-320px)] pr-4">
          <div className="markdown-content mb-6 text-lg leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {question.text}
            </ReactMarkdown>
          </div>
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <MarkdownOption
                key={index}
                index={index}
                content={option}
                isSelected={question.selectedOption === index}
                onClick={() => onSelectOption(index)}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MarkdownQuestionDisplay;
