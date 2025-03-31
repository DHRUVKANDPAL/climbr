import { z } from "zod";

import {
  createTRPCRouter,
  protectedProdcedure,
  publicProcedure,
} from "@/server/api/trpc";
import generateQuestions from "@/lib/generateQuestion";
import { create } from "domain";

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


function transformSubmissionData(
  submissionResult: any,
  paperQuestion: any,
  status: number[],
  examDetails: any,
) {
  // Initialize overall stats
  const overallStats = {
    total: paperQuestion.paperQuestion.questions.length,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
  };

  const subjects = examDetails.subjects.map((subject: any) => {
    // Initialize subject stats
    const subjectStats = {
      total: 0,
      correct: 0,
      incorrect: 0,
      unanswered: 0,
    };

    // Initialize section stats map for this subject
    const sectionStatsMap = new Map();
    examDetails.section.forEach((section: any) => {
      sectionStatsMap.set(section.type, {
        total: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
      });
    });

    // Filter questions for the current subject
    const subjectQuestions = paperQuestion.paperQuestion.questions
      .filter((question: any, index: number) =>
        question.subject.some((sub: any) => sub.name === subject.name),
      )
      .map((question: any, index: number) => {
        // Find the index of this question in the original questions array
        const questionIndex = paperQuestion.paperQuestion.questions.findIndex(
          (q: any) => q.id === question.id,
        );

        // Get the status for this question
        const questionStatus = status[questionIndex];

        // Determine the answer status
        let answerStatus;
        if (questionStatus === 1) {
          answerStatus = "correct";
          subjectStats.correct++;
          overallStats.correct++;
          sectionStatsMap.get(question.type).correct++;
        } else if (questionStatus === -1) {
          answerStatus = "incorrect";
          subjectStats.incorrect++;
          overallStats.incorrect++;
          sectionStatsMap.get(question.type).incorrect++;
        } else {
          answerStatus = "unanswered";
          subjectStats.unanswered++;
          overallStats.unanswered++;
          sectionStatsMap.get(question.type).unanswered++;
        }

        // Increment total counts
        subjectStats.total++;
        sectionStatsMap.get(question.type).total++;

        return {
          ...question,
          answerStatus,
          selectedOptionId:
            submissionResult.answer?.[questionIndex]?.selectedOptionId,
        };
      });

    // Group questions by section type
    const sections = examDetails.section.map((section: any) => {
      const sectionQuestions = subjectQuestions.filter(
        (question: any) => question.type === section.type,
      );

      return {
        type: section.type,
        questions: sectionQuestions,
        stats: sectionStatsMap.get(section.type),
      };
    });

    return {
      name: subject.name,
      sections,
      stats: subjectStats,
    };
  });

  // Calculate section-wise stats across all subjects
  const sectionStats = examDetails.section.map((section: any) => {
    const stats = {
      type: section.type,
      total: 0,
      correct: 0,
      incorrect: 0,
      unanswered: 0,
    };

    // Aggregate stats from all subjects for this section
    subjects.forEach((subject: any) => {
      const sectionData = subject.sections.find(
        (s: any) => s.type === section.type,
      );
      if (sectionData && sectionData.stats) {
        stats.total += sectionData.stats.total;
        stats.correct += sectionData.stats.correct;
        stats.incorrect += sectionData.stats.incorrect;
        stats.unanswered += sectionData.stats.unanswered;
      }
    });

    return stats;
  });

  return {
    subjects,
    summary: submissionResult.summary,
    sectionStats: submissionResult.sectionStats,
    stats: {
      overall: overallStats,
      subjects: subjects.map((subject: any) => ({
        name: subject.name,
        ...subject.stats,
      })),
      sections: sectionStats,
    },
  };
}

export const postRouter = createTRPCRouter({
  hello: protectedProdcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });
  }),

  create: protectedProdcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  createQuestion: protectedProdcedure
    .input(
      z.object({
        question: z.string().min(1),
        examId: z.string().optional(),
        diagramUrl: z.array(z.string()).optional(),
        subject: z.array(z.string()).optional(),
        difficulty: z
          .enum(["Easy", "Medium", "Hard"])
          .optional()
          .default("Medium"),
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.db.question.create({
        data: {
          question: input.question,
          examId: input.examId,
          difficulty: input.difficulty,
          explanation: input.explanation,
          topic: {
            connectOrCreate: input.topic?.map((name) => ({
              where: { name: name },
              create: { name },
            })),
          },
          subject: {
            connectOrCreate: input.subject?.map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          options: {
            create: input.options?.map((option) => ({
              option: option.option,
              isCorrect: option.isCorrect,
            })),
          },
        },
      });

      return question;
    }),

  createExam: protectedProdcedure
    .input(
      z.object({
        name: z.string().min(1),
        date: z.date(),
        durationInMinutes: z.number(),
        totalMarks: z.number(),
        subjectIds: z.array(z.string()),
        sections: z.array(
          z.object({
            type: z.enum(["MCQ", "Numericals"]),
            numberOfQuestions: z.number(),
            weightage: z.number().optional(),
            negativeMarking: z.number().optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const exam = await ctx.db.exams.create({
        data: {
          id: input.name.toLowerCase(),
          date: input.date,
          durationInMinutes: input.durationInMinutes,
          totalMarks: input.totalMarks,
          subjects: {
            connectOrCreate: input.subjectIds.map((id) => ({
              where: { name: id },
              create: { name: id },
            })),
          },
          section: {
            create: input.sections.map((sec) => ({
              type: sec.type,
              numberOfQuestions: sec.numberOfQuestions,
              weightage: sec.weightage,
              negativeMarking: sec.negativeMarking,
            })),
          },
        },
      });

      return exam;
    }),

  createPaper: protectedProdcedure
    .input(
      z.object({
        name: z.string().min(1),
        examName: z.string(),
        // userId: z.string(),
        timeDurationInMinutes: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //TODO: Generate Question for all sections using promise.allSettled and hitting generateQuestion API
      const userIdThroughClerk = ctx.user.userId;
      if (!userIdThroughClerk) throw new Error("User not found");
      console.log(userIdThroughClerk, "userIdThroughClerk");
      // console.log(input.userId,"input.userId")

      const examDetails = await ctx.db.exams.findFirst({
        where: {
          id: input.examName.toLowerCase(),
        },
        include: {
          section: true,
          subjects: true,
        },
      });

      // const examDetails = {
      //   name: "Midterm Exam",
      //   date: "2025-04-10T00:00:00.000Z",
      //   durationInMinutes: 120,
      //   totalMarks: 100,
      //   subjects: [
      //     {
      //       name: "Mathematics",
      //     },
      //     {
      //       name: "Physics",
      //     },
      //   ],
      //   section: [
      //     {
      //       type: "MCQ",
      //       numberOfQuestions: 2,
      //     },
      //     {
      //       type: "Numericals",
      //       numberOfQuestions: 2,
      //     },
      //   ],
      // };

      const questions = await Promise.allSettled(
        examDetails?.section
          ? examDetails.section.flatMap((section) => {
              return examDetails?.subjects?.map(async (subject) => {
                return await generateQuestions(
                  section.numberOfQuestions,
                  subject.name,
                  input.examName,
                  section.type,
                );
              });
            })
          : [],
      );

      console.log("questions", questions);
      //  const fulfilledQuestions = questions
      //    .filter((result) => result.status === "fulfilled")
      //    .map((result) => result.value);

      //  console.log("Fulfilled Questions:", fulfilledQuestions);
      const paper = await ctx.db.paper.create({
        data: {
          name: input.name,
          userId: userIdThroughClerk,
          timeDurationInMinutes: input.timeDurationInMinutes,
          examId: input.examName.toLowerCase(),
          paperQuestion: {
            create: {
              questions: {
                create: questions
                  .filter((q) => q.status === "fulfilled")
                  .flatMap((question: any) =>
                    question.value.questions.map((q: any) => ({
                      question: q.question,
                      type: question.value.type,
                      examId: q.examId,
                      subject: {
                        connectOrCreate: q.subject.map((name: string) => ({
                          where: { name },
                          create: { name },
                        })),
                      },
                      difficulty: q.difficulty,
                      explanation: q.explanation,
                      topic: {
                        connectOrCreate: q.topic.map((name: string) => ({
                          where: { name },
                          create: { name },
                        })),
                      },
                      options: {
                        create: q.options.map((option: any) => ({
                          option: option.option,
                          isCorrect: option.isCorrect,
                        })),
                      },
                    })),
                  ),
              },
            },
          },
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

      return paper;
    }),

  getAllPapers: protectedProdcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const papers = await ctx.db.paper.findUnique({
        where: {
          id: input,
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

      const examDetails = await ctx.db.exams.findFirst({
        where: { id: papers?.examId },
        include: {
          section: true,
          subjects: true,
        },
      });
      const transformedData = transformData(papers, examDetails);
      console.log(JSON.stringify(transformedData, null, 2));
      // console.log({ message: input, papers, examDetails });
      return transformedData;
    }),

  mapUserToLanguageRoom: protectedProdcedure
    .input(z.object({ language1: z.string(), language2: z.string() }))
    .query(async ({ ctx, input }) => {
      const mapping = await ctx.db.languageRooms.findMany({
        include: {
          languages: true,
        },
        where: {
          AND: [
            {
              languages: {
                some: {
                  name: input.language1,
                },
              },
            },
            {
              languages: {
                some: {
                  name: input.language2,
                },
              },
            },
          ],
        },
      });
      console.log(mapping, "mapping");
      const mappingwithIdOnly = mapping.map((room) => ({
        roomId: room.roomId,
      }));
      // const randomRoom = mapping[Math.floor(Math.random() * mapping.length)];
      // console.log(randomRoom?.roomId, "randomRoom");
      return mappingwithIdOnly;
    }),

  submit: protectedProdcedure
    .input(
      z.object({
        paperId: z.string(),
        examId: z.string(),
        submittedAt: z.string(),
        startTime: z.string(),
        timeSpent: z.number(),

        answers: z.array(
          z.object({
            questionId: z.string(),
            numericId: z.number(),
            section: z.string(),
            selectedOption: z.number().optional(),
            status: z.string(),
            timeSpent: z.number(),
          }),
        ),

        sectionStats: z.array(
          z.object({
            name: z.string(),
            timeSpent: z.number(),
            questionsAnswered: z.number(),
            questionsTotal: z.number(),
          }),
        ),

        summary: z.object({
          totalQuestions: z.number(),
          answered: z.number(),
          notAnswered: z.number(),
          notVisited: z.number(),
          markedReview: z.number(),
          markedReviewAnswered: z.number(),
          guessed: z.number(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {


      const result = await ctx.db.submission.create({
        data: {
          paperId: input.paperId,
          submittedAt: input.submittedAt,
          startTime: input.startTime,
          timeSpent: input.timeSpent,
          answer: {
            create: input.answers.map((answer) => ({
              questionId: answer.questionId,
              numericId: answer.numericId,
              section: answer.section,
              selectedOptionId: answer.selectedOption || -1,
              status: answer.status,
              timeSpentInSec: answer.timeSpent,
            })),
          },
          sectionStats: {
            create: input.sectionStats.map((section) => ({
              name: section.name,
              timeSpentInSec: section.timeSpent,
              questionAnswered: section.questionsAnswered,
              questionsTotal: section.questionsTotal,
            })),
          },
          summary: {
            create: {
              totalQuestions: input.summary.totalQuestions,
              answered: input.summary.answered,
              notAnswered: input.summary.notAnswered,
              notVisited: input.summary.notVisited,
              markedForReview: input.summary.markedReview,
              markedReviewAnswered: input.summary.markedReviewAnswered,
              guessed: input.summary.guessed,
            },
          },
        },
      });

      console.log(result, "result");

    }),
    generateResult:protectedProdcedure.input(z.string()).query(async ({ctx,input})=>{
      const result = await ctx.db.submission.findUnique({
        where:{
          id:input
        },
        include:{
          answer:true,
          sectionStats:true,
          summary:true
        }
      })
      const paperQuestion = await ctx.db.paper.findUnique({
        where:{
          id:result?.paperId
        },
        include:{
          paperQuestion:{
            include:{
              questions:{
                include:{
                  subject:true,
                  topic:true,
                  options:true
                }
              }
            }
          }
        }
      })
      let status=[];
      if (paperQuestion?.paperQuestion?.questions) {
        for (let i = 0; i < paperQuestion?.paperQuestion?.questions.length; i++) {
          // Your logic here
          const question = paperQuestion?.paperQuestion?.questions[i];
          const optionsArray= question?.options;
          const selectedOptionId = result?.answer[i]?.selectedOptionId;
          if (selectedOptionId !== undefined && (optionsArray ?? [])[selectedOptionId]?.isCorrect) {
            status.push(1);
          } else if (selectedOptionId !== undefined && selectedOptionId!==-1 && !(optionsArray ?? [])[selectedOptionId]?.isCorrect) {
            status.push(-1);
          }else{
            status.push(0);
          }


        }
      }
      const examDetails = await ctx.db.exams.findFirst({
        where:{
          id:paperQuestion?.examId
        },
        include:{
          section:true,
          subjects:true
        }
      })


      const transformedData = transformSubmissionData(result,paperQuestion,status,examDetails)
      console.log(transformedData,"generateResult")
      return transformedData
    }),
});
