"use client";
import { Marquee } from "./magicui/marquee";

const exams = [
  "UPSC",
  "JEE Main",
  "GATE",
  "CAT",
  "NEET",
  "SSC",
  "Civil Services",
  "CUET",
  "CLAT",
  "IELTS",
  "GRE",
];

export function ExamMarquee() {
  const firstRow = exams.slice(0, exams.length / 2);
  const secondRow = exams.slice(exams.length / 2);

  return (
    <section className="relative bg-indigo-50 py-6 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        {/* <h2 className="mb-8 text-center text-3xl font-bold text-indigo-800 dark:text-white">
          Exam Preparation Across Multiple Domains
        </h2> */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((exam) => (
              <div
                key={exam}
                className="px-6 py-2 text-xl font-extrabold tracking-tight text-indigo-950 transition-colors duration-200 dark:text-indigo-100"
              >
                {exam}
              </div>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="mt-4 [--duration:20s]">
            {secondRow.map((exam) => (
              <div
                key={exam}
                className="px-6 py-2 text-xl font-extrabold tracking-tight text-indigo-950 transition-colors duration-200 dark:text-indigo-100"
              >
                {exam}
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-indigo-50 dark:from-zinc-900"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-indigo-50 dark:from-zinc-900"></div>
        </div>
      </div>
    </section>
  );
}
