import { z } from "zod";

import {
  createTRPCRouter,
  protectedProdcedure,
  publicProcedure,
} from "@/server/api/trpc";
import generateQuestions from "@/lib/generateQuestion";

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
              examId: input.name.toLowerCase(),
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
        userId: z.string(),
        timeDurationInMinutes: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //TODO: Generate Question for all sections using promise.allSettled and hitting generateQuestion API

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
          userId: input.userId,
          timeDurationInMinutes: input.timeDurationInMinutes,
          examId: input.examName.toLowerCase(),
          paperQuestion: {
            create: questions.map((question: any, index) => ({
              questions: {
                create: {
                  question: question.value.questions[index].question,
                  examId: question.value.questions[index].examId,
                  subject: {
                    connectOrCreate: question.value.questions[
                      index
                    ].subject.map((name: any) => ({
                      where: { name: name },
                      create: { name },
                    })),
                  },
                  difficulty: question.value.questions[index].difficulty,
                  explanation: question.value.questions[index].explanation,
                  topic: {
                    connectOrCreate: question.value.questions[index].topic.map(
                      (name: any) => ({
                        where: { name: name },
                        create: { name },
                      }),
                    ),
                  },
                },
              },
            })),
          },
        },
      });

      return paper;
    }),
});
