import { db } from "@/server/db";
import { NextResponse } from "next/server";

function transformData(papers: any, examDetails: any) {
  const subjects = examDetails.subjects.map((subject: any) => {
    // Filter questions for the current subject
    const subjectQuestions = papers.paperQuestion.questions.filter(
      (question: any) =>
        question.subject.some((sub: any) => sub.name === subject.name),
    );

    // Group questions by section type
    const sections = examDetails.section.map((section: any) => {
      const sectionQuestions = subjectQuestions.filter(
        (question: any) => question.type === section.type,
      );

      return {
        type: section.type,
        questions: sectionQuestions,
      };
    });

    return {
      name: subject.name,
      sections,
    };
  });

  return { subjects };
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const papers = await db.paper.findUnique({
    where: {
      id: id,
    },
    include: {
      paperQuestion: {
        include: {
          questions: {
            include: {
              subject: true,
              topic: true,
              options: true,
            },
          },
        },
      },
    },
  });

  const examDetails = await db.exams.findFirst({
    where: { id: papers?.examId },
    include: {
      section: true,
      subjects: true,
    },
  });
  const transformedData = transformData(papers, examDetails);
  console.log(JSON.stringify(transformedData, null, 2));
  // console.log({ message: input, papers, examDetails });
  return NextResponse.json(transformedData);
}
