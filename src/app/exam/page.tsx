"use client";
// ExamInterface.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import MarkdownQuestionDisplay from "@/components/MarkdownQuestionDisplay";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Eye,
  EyeOff,
  Flag,
  CheckCircle2,
  HelpCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Save,
  RotateCcw,
  LightbulbIcon,
  BarChart,
  List,
  X,
  ListChecks,
  ClipboardCheck,
  Circle,
  Eraser,
  Send,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import DarkModeToggle from "@/components/DarkModeToggle";
import { api } from "@/trpc/react";

// Types
type QuestionStatus =
  | "not-visited"
  | "not-answered"
  | "answered"
  | "marked-review"
  | "marked-review-answered"
  | "guessed";

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer?: number;
  section: string;
  status: QuestionStatus;
  selectedOption?: number;
  timeSpent: number; // Time spent on this question in seconds
};
type ExamSubmission = {
  examId: string;
  studentName: string;
  studentEmail: string;
  submittedAt: string;
  startTime: string;
  timeSpent: number;
  answers: Array<{
    questionId: string;
    numericId: number;
    section: string;
    selectedOption?: number;
    status: QuestionStatus;
    timeSpent: number;
  }>;
  sectionStats: Array<{
    name: string;
    timeSpent: number;
    questionsAnswered: number;
    questionsTotal: number;
  }>;
  summary: {
    totalQuestions: number;
    answered: number;
    notAnswered: number;
    notVisited: number;
    markedReview: number;
    markedReviewAnswered: number;
    guessed: number;
  };
};

type QuestionPaperSection = {
  name: string;
  questions: Question[];
};

// Sample data
// Sample question data with markdown formatting
// Replace the existing generateSampleData function with this one
const generateSampleData = (): QuestionPaperSection[] => {
  // This is your structured question data
  const examData = {
    subjects: [
      {
        name: "Mathematics",
        sections: [
          {
            type: "MCQ",
            questions: [
              {
                id: "cm8vc8tsj0005m50m8q52ntls",
                question:
                  "The range of the function $f(x) = \\sin^2(x) + \\sin^2(x + \\frac{\\pi}{3}) + \\cos(x)\\cos(x + \\frac{\\pi}{3})$ is:",
                examId: "jee",
                difficulty: "Medium",
                explanation:
                  "Let $f(x) = \\sin^2(x) + \\sin^2(x + \\frac{\\pi}{3}) + \\cos(x)\\cos(x + \\frac{\\pi}{3})$. Using trigonometric identities, we can simplify $f(x)$ to a constant value. Expanding $\\sin^2(x + \\frac{\\pi}{3})$ and $\\cos(x + \\frac{\\pi}{3})$ and simplifying using $\\sin^2(x) + \\cos^2(x) = 1$ and other trigonometric relationships reveals that $f(x) = \\frac{3}{2}$. Hence, the range is a singleton set {$\\frac{3}{2}$}.",
                options: [
                  "A) ${0}$",
                  "B) ${1}$",
                  "C) ${\\frac{3}{2}}$",
                  "D) ${2}$",
                ],
              },
              {
                id: "cm8vc8tsk0009m50mesg5eikk",
                question:
                  "The distance of the plane $x + 2y - z = 4$ from the origin is:",
                examId: "jee",
                difficulty: "Hard",
                explanation:
                  "The given equation represents a plane. The distance 'd' of the plane from the origin is given by  $d = |(a(0) + b(0) + c(0) - k)| / sqrt(a^2 + b^2 + c^2)$, which simplifies to $|k| / sqrt(a^2 + b^2 + c^2)$. Here, the equation is $x + 2y - z = 4$.  So, $a = 1$, $b = 2$, $c = -1$, and $k = 4$. Therefore, the distance d = $|4| / sqrt(1^2 + 2^2 + (-1)^2) = 4 / sqrt(6) = (4 * sqrt{6}) / 6 = (2 * sqrt{6}) / 3$. Rationalizing gives (2√6)/3",
                options: [
                  "A) $\\frac{2\\sqrt{6}}{3}$",
                  "B) $\\frac{4\\sqrt{6}}{3}$",
                  "C) $\\frac{\\sqrt{6}}{3}$",
                  "D) $\\frac{4\\sqrt{3}}{6}$",
                ],
              },
              {
                id: "cm8vc8tsk000vm50msm5h26bk",
                question:
                  "Evaluate the definite integral: ∫₀^(π/2) (cos³x) / (sin³x + cos³x) dx",
                examId: "jee",
                difficulty: "Medium",
                explanation:
                  "Let the given integral be I.  Using the property ∫ₐᵇ f(x) dx = ∫ₐᵇ f(a+b-x) dx, we have I = ∫₀^(π/2) (sin³x) / (sin³x + cos³x) dx.  Adding the two forms of I gives 2I = ∫₀^(π/2) 1 dx = π/2, hence I = π/4.",
                options: [
                  "A) $\\frac{\\pi}{4}$",
                  "B) $\\frac{\\pi}{2}$",
                  "C) $\\pi$",
                  "D) $2\\pi$",
                ],
              },
              {
                id: "cm8vc8tsk000ym50mt7cj6yld",
                question: "Evaluate the indefinite integral: ∫1 / (x² + 4) dx",
                examId: "jee",
                difficulty: "Hard",
                explanation:
                  "Let x = tan θ, then dx = sec² θ dθ.  The integral becomes ∫(sec² θ) / (tan² θ + 4) dθ = ∫(1 + tan² θ) / (tan² θ + 4) dθ = ∫(tan² θ + 4 - 3) / (tan² θ + 4) dθ = ∫(1 - 3 / (tan² θ + 4)) dθ = θ - (3/2) * (1/2)arctan(tan(θ)/2) + C = arctan(x) - (3/4)arctan(x/2) + C",
                options: [
                  "A) $\\arctan(x) - \\frac{3}{4}\\arctan(\\frac{x}{2}) + C$",
                  "B) $\\frac{1}{2}\\arctan(\\frac{x}{2}) + C$",
                  "C) $\\arctan(x) + C$",
                  "D) $\\frac{1}{4}\\arctan(\\frac{x}{4}) + C$",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Physics",
        sections: [
          {
            type: "MCQ",
            questions: [
              {
                id: "cm8vc8tsk000dm50m1lko7qzp",
                question:
                  "A long, straight wire carries a steady current. If the distance from the wire is doubled, what happens to the strength of the magnetic field?",
                examId: "jee",
                difficulty: "Medium",
                explanation:
                  "The magnetic field due to a current-carrying wire is inversely proportional to the distance from the wire. Therefore, doubling the distance will halve the magnetic field strength.",
                options: [
                  "A) It becomes half",
                  "B) It becomes double",
                  "C) It becomes one-fourth",
                  "D) It remains the same",
                ],
              },
              {
                id: "cm8vc8tsk000hm50moz0erypd",
                question:
                  "In a photoelectric effect experiment, if the frequency of the incident light is doubled, what happens to the maximum kinetic energy of the emitted electrons?",
                examId: "jee",
                difficulty: "Hard",
                explanation:
                  "The work function is the minimum energy required to remove an electron from the surface of a metal. The maximum kinetic energy of the emitted electron is given by KE = hf - Φ, where h is Planck's constant, f is the frequency of the incident light, and Φ is the work function.  If the frequency is doubled, the new kinetic energy will be KE' = h(2f) - Φ = 2hf - Φ.  Since KE = hf - Φ, then hf = KE + Φ. Substituting this into the equation for KE', we get KE' = 2(KE + Φ) - Φ = 2KE + Φ.  Therefore, the new kinetic energy is twice the initial kinetic energy plus the work function.",
                options: [
                  "A) It doubles",
                  "B) It becomes 2KE + Φ",
                  "C) It remains the same",
                  "D) It increases by a factor of 4",
                ],
              },
              {
                id: "cm8vc8tsl0011m50majqq7m4d",
                question:
                  "A rectangular block of wood has a density of 600 kg/m³. If the block is placed in fresh water (density 1000 kg/m³), what percentage of the block's volume will be submerged?",
                examId: "jee",
                difficulty: "Medium",
                explanation:
                  "The buoyant force is equal to the weight of the water displaced.  The volume of water displaced equals the volume of the submerged portion of the block. Therefore, B = ρ_water * V_submerged * g. Since the block floats, the buoyant force equals the weight of the block: B = ρ_block * V_block * g. Combining these, we get ρ_water * V_submerged * g = ρ_block * V_block * g. Solving for V_submerged / V_block, we find that the fraction submerged is ρ_block / ρ_water = 600 / 1000 = 0.6.  Therefore, 60% of the volume is submerged.",
                options: ["A) 40%", "B) 50%", "C) 60%", "D) 70%"],
              },
              {
                id: "cm8vc8tsl0015m50mpkkhk8gv",
                question:
                  "If the length of a simple pendulum is increased by 44%, then what is the percentage increase in its time period?",
                examId: "jee",
                difficulty: "Hard",
                explanation:
                  "The time period of a simple pendulum is given by T = 2π√(L/g). If the length is increased by 44%, the new length is L' = 1.44L. Therefore, the new time period T' = 2π√(1.44L/g) = 2π√(1.44)√(L/g) = 1.2 * 2π√(L/g) = 1.2T. The percentage increase in time period is ((T' - T) / T) * 100 = ((1.2T - T) / T) * 100 = (0.2T / T) * 100 = 20%.",
                options: ["A) 10%", "B) 15%", "C) 20%", "D) 44%"],
              },
            ],
          },
        ],
      },
      {
        name: "Chemistry",
        sections: [
          {
            type: "MCQ",
            questions: [
              {
                id: "cm8vc8tsk000lm50mhn0dbet4",
                question:
                  "Which of the following is most effective in causing the coagulation of a negatively charged sol?",
                examId: "jee",
                difficulty: "Medium",
                explanation:
                  "According to the Hardy-Schulze rule, the coagulating power of an electrolyte is directly proportional to the valency of the ion carrying the charge opposite to that of the colloid particle. Since Al3+ has a higher charge than Na+, AlCl3 will be more effective in causing coagulation of a negatively charged sol.",
                options: ["A) NaCl", "B) AlCl₃", "C) K₂SO₄", "D) MgSO₄"],
              },
              {
                id: "cm8vc8tsk000qm50mz7tmbick",
                question:
                  "How does an increase in temperature generally affect the rate of a chemical reaction, in terms of the pre-exponential factor and the exponential factor in the Arrhenius equation?",
                examId: "jee",
                difficulty: "Medium",
                explanation:
                  "The rate of reaction typically increases with temperature due to an increase in the kinetic energy of the molecules. This leads to more frequent and effective collisions, overcoming the activation energy barrier. The Arrhenius equation, k = A * exp(-Ea/RT), mathematically describes this relationship. Therefore, the pre-exponential factor A (related to collision frequency) and exponential factor increases.",
                options: [
                  "A) Both increase",
                  "B) Both decrease",
                  "C) Pre-exponential factor increases, exponential factor decreases",
                  "D) Pre-exponential factor decreases, exponential factor increases",
                ],
              },
              {
                id: "cm8vc8tsl0019m50my9qjbb7h",
                question:
                  "The standard electrode potential (E°) for the cell Zn(s)|Zn2+(0.1 M)||Cu2+(0.01 M)|Cu(s) is 1.10 V at 298 K.  What is the cell potential (E)?",
                examId: "jee",
                difficulty: "Medium",
                explanation:
                  "The Nernst equation relates cell potential to the concentrations of reactants and products.  E = E° - (0.0592/n) * log(Q), where n is the number of moles of electrons transferred (2 in this case) and Q is the reaction quotient ([Zn2+]/[Cu2+]). Plugging in the values, E = 1.10 - (0.0592/2) * log(0.1/0.01) = 1.10 - (0.0592/2) * log(10) = 1.10 - 0.0296 = 1.0704 V. Hence, approximately 1.07 V.",
                options: ["A) 1.07 V", "B) 1.10 V", "C) 1.13 V", "D) 1.16 V"],
              },
              {
                id: "cm8vc8tsl001cm50m9j1fdlyr",
                question:
                  "What is the van't Hoff factor (i) for K2SO4, assuming complete dissociation?",
                examId: "jee",
                difficulty: "Medium",
                explanation:
                  "The van't Hoff factor (i) relates the actual number of particles in solution after dissociation to the number of formula units initially dissolved. For K2SO4, it dissociates into 2K+ and 1 SO42- ions, resulting in 3 ions. Hence, the van't Hoff factor is 3.",
                options: ["A) 1", "B) 2", "C) 3", "D) 4"],
              },
            ],
          },
        ],
      },
    ],
  };
  // const { data:examData } = api.post.getAllPapers.useQuery(
  //   "cm8vc8tsj0003m50mc49yukds",
  // ) ||[];

  const questionPaper: QuestionPaperSection[] = [];
  let globalQuestionId = 1; // Initialize a global counter for question IDs

  // Convert the structured data into the format needed by the UI
  examData.subjects.forEach((subject) => {
    const questions: Question[] = [];

    // Process all questions from this subject
    subject.sections.forEach((section) => {
      if (section.type === "MCQ") {
        section.questions.forEach((q) => {
          questions.push({
            id: globalQuestionId++, // Use and increment the global counter
            text: q.question,
            options: q.options || [],
            section: subject.name,
            status: "not-visited",
            timeSpent: 0,
            // We could store the original ID if needed
            // originalId: q.id,
          });
        });
      }
    });

    // Add this subject to the question paper if it has questions
    if (questions.length > 0) {
      questionPaper.push({
        name: subject.name,
        questions: questions,
      });
    }
  });

  return questionPaper;
};

const ExamInterface = () => {
  // Update the state initializations to use localStorage

  const { data:examData } = api.post.getAllPapers.useQuery(
    "cm8vc8tsj0003m50mc49yukds",
  )


  

  const [questionPaper, setQuestionPaper] = useState<QuestionPaperSection[]>(
    () => {
      // Try to get saved state from localStorage
      const savedExam = localStorage.getItem("examState");
      if (savedExam) {
        return JSON.parse(savedExam);
      }
      if(!examData){
        return generateSampleData();
      }
      return examData;
    },
  );

  const [currentSection, setCurrentSection] = useState<string>(() => {
    const savedSection = localStorage.getItem("currentSection");
    return savedSection || "Physics";
  });

  const [currentQuestionId, setCurrentQuestionId] = useState<number>(() => {
    const savedQuestionId = localStorage.getItem("currentQuestionId");
    return savedQuestionId ? parseInt(savedQuestionId) : 1;
  });

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedTimeLeft = localStorage.getItem("timeLeft");
    return savedTimeLeft ? parseInt(savedTimeLeft) : 10800; // 3 hours in seconds
  });
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | null>(null);

  const [examStarted, setExamStarted] = useState<boolean>(() => {
    return localStorage.getItem("examStarted") === "true";
  });
  const [showStats, setShowStats] = useState<boolean>(false);

  const [showSubmitDialog, setShowSubmitDialog] = useState<boolean>(false);
  const [showStartDialog, setShowStartDialog] = useState<boolean>(() => {
    return !localStorage.getItem("examStarted");
  });
  const [studentName, setStudentName] = useState<string>("");
  const [studentEmail, setStudentEmail] = useState<string>("");

  // Add this inside the ExamInterface component, right after all the state definitions

  // Start exam function
  const startExam = () => {
    // Save user info to localStorage
    const examSession = {
      studentName,
      studentEmail,
      examId: "jee_main_2025",
      startTime: new Date().toISOString(),
    };

    localStorage.setItem("examSession", JSON.stringify(examSession));
    setExamStarted(true);
    setShowStartDialog(false);
  };

  // Get the current question
  const currentQuestion = questionPaper
    .flatMap((section) => section.questions)
    .find((q) => q.id === currentQuestionId);

  // Calculate question stats
  const allQuestions = questionPaper.flatMap((section) => section.questions);
  const stats = {
    total: allQuestions.length,
    answered: allQuestions.filter((q) => q.status === "answered").length,
    notAnswered: allQuestions.filter((q) => q.status === "not-answered").length,
    notVisited: allQuestions.filter((q) => q.status === "not-visited").length,
    markedReview: allQuestions.filter((q) => q.status === "marked-review")
      .length,
    markedReviewAnswered: allQuestions.filter(
      (q) => q.status === "marked-review-answered",
    ).length,
    guessed: allQuestions.filter((q) => q.status === "guessed").length,
    totalTimeSpent: allQuestions.reduce((acc, q) => acc + q.timeSpent, 0),
  };

  // Add these effects to save state changes

  // Save question paper state
  useEffect(() => {
    if (examStarted) {
      localStorage.setItem("examState", JSON.stringify(questionPaper));
    }
  }, [questionPaper, examStarted]);

  // Save current section
  useEffect(() => {
    if (examStarted) {
      localStorage.setItem("currentSection", currentSection);
    }
  }, [currentSection, examStarted]);

  // Save current question ID
  useEffect(() => {
    if (examStarted) {
      localStorage.setItem("currentQuestionId", currentQuestionId.toString());
    }
  }, [currentQuestionId, examStarted]);

  // Save time left
  useEffect(() => {
    if (examStarted) {
      localStorage.setItem("timeLeft", timeLeft.toString());
    }
  }, [timeLeft, examStarted]);

  // Save exam started state
  useEffect(() => {
    localStorage.setItem("examStarted", examStarted.toString());
  }, [examStarted]);
  // Main timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Question-specific timer effect
  useEffect(() => {
    // Clear previous timer
    if (activeTimer) {
      clearInterval(activeTimer);
    }

    // Start new timer for current question
    const timer = setInterval(() => {
      setQuestionPaper((prevPaper) => {
        return prevPaper.map((section) => {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === currentQuestionId) {
                return {
                  ...question,
                  timeSpent: question.timeSpent + 1,
                };
              }
              return question;
            }),
          };
        });
      });
    }, 1000);

    setActiveTimer(timer);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [currentQuestionId]);

  // Format time
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle option selection
  const selectOption = (optionIndex: number) => {
    if (!currentQuestion) return;

    setQuestionPaper((prevPaper) => {
      return prevPaper.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === currentQuestionId) {
              return {
                ...question,
                selectedOption: optionIndex,
                status: question.status.includes("marked-review")
                  ? "marked-review-answered"
                  : "answered",
              };
            }
            return question;
          }),
        };
      });
    });
  };
  const submitExam = async () => {
    const sessionData = JSON.parse(localStorage.getItem("examSession") || "{}");

    // Create the submission object
    const submission: ExamSubmission = {
      examId: "jee_main_2025",
      studentName: sessionData.studentName || "Anonymous",
      studentEmail: sessionData.studentEmail || "anonymous@example.com",
      submittedAt: new Date().toISOString(),
      startTime: sessionData.startTime || new Date().toISOString(),
      timeSpent: 10800 - timeLeft, // Total time spent (initial time - time left)

      // Process each question
      answers: questionPaper.flatMap((section) =>
        section.questions.map((question) => {
          return {
            questionId: question.id.toString(),
            numericId: question.id,
            section: question.section,
            selectedOption: question.selectedOption,
            status: question.status,
            timeSpent: question.timeSpent,
          };
        }),
      ),

      // Process section statistics
      sectionStats: questionPaper.map((section) => {
        const sectionQuestions = section.questions;
        const answeredQuestions = sectionQuestions.filter(
          (q) =>
            q.status === "answered" ||
            q.status === "guessed" ||
            q.status === "marked-review-answered",
        );

        return {
          name: section.name,
          timeSpent: sectionQuestions.reduce((acc, q) => acc + q.timeSpent, 0),
          questionsAnswered: answeredQuestions.length,
          questionsTotal: sectionQuestions.length,
        };
      }),

      // Include summary statistics
      summary: {
        totalQuestions: stats.total,
        answered: stats.answered,
        notAnswered: stats.notAnswered,
        notVisited: stats.notVisited,
        markedReview: stats.markedReview,
        markedReviewAnswered: stats.markedReviewAnswered,
        guessed: stats.guessed,
      },
    };

    try {
      // Show submission animation/message here
      console.log("Submitting exam data:", submission);

      // Send to backend (uncomment when API is ready)
      /*
      const response = await fetch('/api/submit-exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit exam');
      }
      
      const result = await response.json();
      */

      // Clear all localStorage data
      localStorage.removeItem("examState");
      localStorage.removeItem("currentSection");
      localStorage.removeItem("currentQuestionId");
      localStorage.removeItem("timeLeft");
      localStorage.removeItem("examStarted");
      localStorage.removeItem("examSession");

      // Show success message or redirect
      alert("Exam submitted successfully!");
      window.location.href = "/"; // Redirect to home or results page
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Failed to submit exam. Please try again.");
    }
  };

  // Handle changing question
  const changeQuestion = (questionId: number) => {
    // Update current question's status if it's not visited
    setQuestionPaper((prevPaper) => {
      return prevPaper.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (
              question.id === questionId &&
              question.status === "not-visited"
            ) {
              return {
                ...question,
                status: "not-answered",
              };
            }
            return question;
          }),
        };
      });
    });

    setCurrentQuestionId(questionId);

    // Update current section if needed
    const newQuestion = allQuestions.find((q) => q.id === questionId);
    if (newQuestion && newQuestion.section !== currentSection) {
      setCurrentSection(newQuestion.section);
    }
  };

  // Navigate to next/previous question
  const goToNextQuestion = () => {
    const nextQuestionId = currentQuestionId + 1;
    if (nextQuestionId <= stats.total) {
      changeQuestion(nextQuestionId);
    }
  };

  const goToPrevQuestion = () => {
    const prevQuestionId = currentQuestionId - 1;
    if (prevQuestionId >= 1) {
      changeQuestion(prevQuestionId);
    }
  };

  // Mark for review
  const toggleMarkForReview = () => {
    if (!currentQuestion) return;

    setQuestionPaper((prevPaper) => {
      return prevPaper.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === currentQuestionId) {
              const hasAnswer = question.selectedOption !== undefined;
              let newStatus: QuestionStatus;

              if (question.status.includes("marked-review")) {
                newStatus = hasAnswer ? "answered" : "not-answered";
              } else {
                newStatus = hasAnswer
                  ? "marked-review-answered"
                  : "marked-review";
              }

              return {
                ...question,
                status: newStatus,
              };
            }
            return question;
          }),
        };
      });
    });

    // Automatically move to next question after marking
    goToNextQuestion();
  };

  // Guess and next
  // Guess and next
  const guessAndNext = () => {
    if (!currentQuestion) return;

    setQuestionPaper((prevPaper) => {
      return prevPaper.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === currentQuestionId) {
              return {
                ...question,
                // Keep the current selection, just change the status to "guessed"
                status: "guessed",
              };
            }
            return question;
          }),
        };
      });
    });

    // Go to next question
    goToNextQuestion();
  };

  // Clear response
  const clearResponse = () => {
    if (!currentQuestion) return;

    setQuestionPaper((prevPaper) => {
      return prevPaper.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === currentQuestionId) {
              return {
                ...question,
                selectedOption: undefined,
                status: question.status.includes("marked-review")
                  ? "marked-review"
                  : "not-answered",
              };
            }
            return question;
          }),
        };
      });
    });
  };

  // Get status color
  const getStatusColor = (status: QuestionStatus): string => {
    switch (status) {
      case "answered":
        return "bg-green-500 text-white dark:bg-green-600";
      case "not-answered":
        return "bg-red-500 text-white dark:bg-red-600";
      case "marked-review":
        return "bg-purple-500 text-white dark:bg-purple-600";
      case "marked-review-answered":
        return "bg-blue-500 text-white dark:bg-blue-600";
      case "guessed":
        return "bg-amber-500 text-white dark:bg-amber-600";
      case "not-visited":
        return "bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200";
      default:
        return "bg-zinc-300 dark:bg-zinc-700";
    }
  };

  // Get average time per question
  const getAverageTimePerQuestion = () => {
    const answeredQuestions = allQuestions.filter(
      (q) =>
        q.status === "answered" ||
        q.status === "guessed" ||
        q.status === "marked-review-answered",
    );
    if (answeredQuestions.length === 0) return 0;
    return Math.round(
      answeredQuestions.reduce((acc, q) => acc + q.timeSpent, 0) /
        answeredQuestions.length,
    );
  };

  

  return (
    <div className="flex h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Start Exam Dialog */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mock Test: JEE Main 2025</DialogTitle>
            <DialogDescription>
              Please enter your details to start the exam.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>
            <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
                <AlertCircle className="h-5 w-5" />
                <h3 className="font-semibold">Important Instructions</h3>
              </div>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-amber-700 dark:text-amber-300">
                <li>This exam has a duration of 3 hours</li>
                <li>Do not refresh the page during the exam</li>
                <li>Each question carries equal marks</li>
                <li>No negative marking for wrong answers</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={startExam}
              disabled={!studentName || !studentEmail}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Start Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Only render exam content if exam has started */}
      {examStarted && (
        <>
          {" "}
          {/* Top Bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Mock Test: JEE Main 2025</h1>
              <Badge className="bg-blue-600 dark:bg-blue-700">
                Online Exam
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <DarkModeToggle />

              <div className="flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 shadow-sm dark:bg-zinc-800">
                <Clock className="h-5 w-5 text-red-500 dark:text-red-400" />
                <span className="text-lg font-bold">
                  {formatTime(timeLeft)}
                </span>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowStats(!showStats)}
                className="transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                {showStats ? (
                  <List className="mr-2 h-4 w-4" />
                ) : (
                  <BarChart className="mr-2 h-4 w-4" />
                )}
                {showStats ? "Question View" : "Statistics"}
              </Button>

              <Button
                variant="destructive"
                onClick={() => setShowSubmitDialog(true)}
                className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
              >
                Submit Test
              </Button>

              <Dialog
                open={showSubmitDialog}
                onOpenChange={setShowSubmitDialog}
              >
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Submit Test</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to submit your test? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500 dark:bg-green-600">
                            {stats.answered}
                          </Badge>
                          <span>Answered</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-red-500 dark:bg-red-600">
                            {stats.notAnswered + stats.notVisited}
                          </Badge>
                          <span>Unanswered</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-500 dark:bg-purple-600">
                            {stats.markedReview + stats.markedReviewAnswered}
                          </Badge>
                          <span>Marked for Review</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-amber-500 dark:bg-amber-600">
                            {stats.guessed}
                          </Badge>
                          <span>Guessed</span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter className="flex justify-end gap-2 sm:justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setShowSubmitDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={submitExam}>
                        Submit Test
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Side - Question Display or Stats */}
            {showStats ? (
              <div className="flex w-2/3 flex-col overflow-auto border-r border-zinc-200 p-6 dark:border-zinc-800">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Performance Statistics</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowStats(false)}
                    className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <CardContent className="pt-6">
                      <h3 className="mb-4 text-lg font-semibold">
                        Time Analysis
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Total Time Spent
                          </p>
                          <p className="text-2xl font-bold">
                            {formatTime(stats.totalTimeSpent)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Average Time Per Question
                          </p>
                          <p className="text-2xl font-bold">
                            {formatTime(getAverageTimePerQuestion())}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Time Remaining
                          </p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {formatTime(timeLeft)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <CardContent className="pt-6">
                      <h3 className="mb-4 text-lg font-semibold">
                        Question Status
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500 dark:bg-green-600"></div>
                            <span>Answered</span>
                          </div>
                          <span className="font-semibold">
                            {stats.answered}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500 dark:bg-red-600"></div>
                            <span>Not Answered</span>
                          </div>
                          <span className="font-semibold">
                            {stats.notAnswered}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-zinc-400 dark:bg-zinc-500"></div>
                            <span>Not Visited</span>
                          </div>
                          <span className="font-semibold">
                            {stats.notVisited}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-amber-500 dark:bg-amber-600"></div>
                            <span>Guessed</span>
                          </div>
                          <span className="font-semibold">{stats.guessed}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-purple-500 dark:bg-purple-600"></div>
                            <span>Marked for Review</span>
                          </div>
                          <span className="font-semibold">
                            {stats.markedReview + stats.markedReviewAnswered}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-2 border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <CardContent className="pt-6">
                      <h3 className="mb-4 text-lg font-semibold">
                        Time Spent by Section
                      </h3>
                      <div className="space-y-4">
                        {questionPaper.map((section) => {
                          const sectionTimeSpent = section.questions.reduce(
                            (acc, q) => acc + q.timeSpent,
                            0,
                          );
                          const sectionPercentage =
                            Math.round(
                              (sectionTimeSpent / stats.totalTimeSpent) * 100,
                            ) || 0;

                          return (
                            <div key={section.name} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {section.name}
                                </span>
                                <span>
                                  {formatTime(sectionTimeSpent)} (
                                  {sectionPercentage}%)
                                </span>
                              </div>
                              <Progress
                                value={sectionPercentage}
                                className="h-2 bg-zinc-200 dark:bg-zinc-700"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="flex w-2/3 flex-col overflow-auto border-r border-zinc-200 p-6 dark:border-zinc-800">
                {currentQuestion && (
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold">
                          Question {currentQuestionId}{" "}
                          <span className="text-zinc-500 dark:text-zinc-400">
                            ({currentQuestion.section})
                          </span>
                        </h2>
                        <Badge
                          className={getStatusColor(currentQuestion.status)}
                        >
                          {currentQuestion.status
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          Time spent:
                        </span>
                        <Badge
                          variant="outline"
                          className="border-zinc-300 bg-transparent text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                        >
                          <Clock className="mr-1 h-3 w-3 text-amber-500 dark:text-amber-400" />
                          {formatTime(currentQuestion.timeSpent)}
                        </Badge>
                      </div>
                    </div>

                    <MarkdownQuestionDisplay
                      question={currentQuestion}
                      onSelectOption={selectOption}
                    />

                    <div className="flex flex-wrap justify-between gap-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={goToPrevQuestion}
                          disabled={currentQuestionId <= 1}
                          className="rounded-full border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Button>

                        <Button
                          variant="outline"
                          onClick={goToNextQuestion}
                          disabled={currentQuestionId >= stats.total}
                          className="rounded-full border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        >
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          onClick={clearResponse}
                          disabled={
                            currentQuestion.selectedOption === undefined
                          }
                          className="rounded-full border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Clear
                        </Button>

                        <Button
                          variant="outline"
                          onClick={toggleMarkForReview}
                          className={`rounded-full border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 ${
                            currentQuestion.status.includes("marked-review")
                              ? "text-purple-600 dark:text-purple-400"
                              : ""
                          }`}
                        >
                          <Flag className="mr-2 h-4 w-4" />
                          {currentQuestion.status.includes("marked-review")
                            ? "Unmark"
                            : "Mark for Review"}
                        </Button>

                        <Button
                          variant="outline"
                          onClick={guessAndNext}
                          disabled={
                            currentQuestion.selectedOption === undefined
                          }
                          className="rounded-full border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-700/50 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30"
                        >
                          <LightbulbIcon className="mr-2 h-4 w-4" />
                          Mark as Guessed
                        </Button>

                        <Button
                          variant="default"
                          onClick={goToNextQuestion}
                          disabled={currentQuestionId >= stats.total}
                          className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-700 dark:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save & Next
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Right Side - Question Palette and Status */}
            <div className="flex w-1/3 flex-col overflow-hidden border-l border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              {/* Compact Status Section */}
              <div className="border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-zinc-100 p-3 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/70">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-1.5 text-base font-bold">
                    <ClipboardCheck className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    Test Summary
                  </h2>

                  {/* Progress Badge */}
                  <div className="flex items-center gap-2 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    {Math.round(
                      ((stats.answered +
                        stats.guessed +
                        stats.markedReviewAnswered) /
                        stats.total) *
                        100,
                    )}
                    % Complete
                  </div>
                </div>

                {/* Compact stat cards in a single row */}
                <div className="mt-3 flex gap-2">
                  <div className="flex flex-1 flex-col rounded-lg bg-white px-2 py-1.5 shadow-sm dark:bg-zinc-800">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Answered
                      </span>
                    </div>
                    <span className="font-semibold">{stats.answered}</span>
                  </div>
                  <div className="flex flex-1 flex-col rounded-lg bg-white px-2 py-1.5 shadow-sm dark:bg-zinc-800">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Not Answered
                      </span>
                    </div>
                    <span className="font-semibold">{stats.notAnswered}</span>
                  </div>
                  <div className="flex flex-1 flex-col rounded-lg bg-white px-2 py-1.5 shadow-sm dark:bg-zinc-800">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Not Visited
                      </span>
                    </div>
                    <span className="font-semibold">{stats.notVisited}</span>
                  </div>
                </div>

                {/* Mini status pills */}
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1 text-xs">
                  <div className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 whitespace-nowrap shadow-sm dark:bg-zinc-800">
                    <Flag className="h-3 w-3 text-purple-500" />
                    <span>{stats.markedReview} Marked</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 whitespace-nowrap shadow-sm dark:bg-zinc-800">
                    <HelpCircle className="h-3 w-3 text-blue-500" />
                    <span>{stats.markedReviewAnswered} Marked & Answered</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 whitespace-nowrap shadow-sm dark:bg-zinc-800">
                    <LightbulbIcon className="h-3 w-3 text-amber-500" />
                    <span>{stats.guessed} Guessed</span>
                  </div>
                </div>

                {/* Slim progress bar */}
                {/* <div className="mt-2">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-in-out"
                  style={{
                    width: `${((stats.answered + stats.guessed + stats.markedReviewAnswered) / stats.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div> */}
              </div>

              {/* Question Palette - Modern Redesign */}
              <div className="flex-1 overflow-auto">
                <Tabs
                  defaultValue={currentSection}
                  value={currentSection}
                  onValueChange={setCurrentSection}
                  className="h-full"
                >
                  <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mb-2 flex flex-col items-start gap-2">
                      <h2 className="flex items-center gap-1.5 text-sm font-semibold">
                        <ListChecks className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                        Question Palette
                      </h2>
                      <div className="mb-3 grid grid-cols-3 gap-x-2 gap-y-1 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-sm bg-green-500"></div>
                          <span>Answered</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-sm bg-red-500"></div>
                          <span>Not Answered</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-sm bg-zinc-500"></div>
                          <span>Not Visited</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-sm bg-purple-500"></div>
                          <span>Marked</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-sm bg-yellow-500"></div>
                          <span>Guessed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-sm bg-blue-500"></div>
                          <span>Marked and answered</span>
                        </div>
                      </div>
                    </div>

                    <TabsList className="w-full rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-800">
                      {questionPaper.map((section) => (
                        <TabsTrigger
                          key={section.name}
                          value={section.name}
                          className="rounded-md py-1.5 text-xs transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-zinc-950"
                        >
                          {section.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  {questionPaper.map((section) => (
                    <TabsContent
                      key={section.name}
                      value={section.name}
                      className="m-0 h-full overflow-auto"
                    >
                      <ScrollArea className="h-[calc(100vh-280px)]">
                        <div className="p-3">
                          {/* Compact legend for question statuses */}

                          {/* Modern question grid with hover effects */}
                          <div className="grid grid-cols-5 gap-2">
                            {section.questions.map((question) => (
                              <TooltipProvider key={question.id}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      className={`flex h-10 w-10 items-center justify-center rounded-lg font-medium shadow-sm transition-all hover:scale-105 hover:shadow ${getStatusColor(
                                        question.status,
                                      )} ${
                                        currentQuestionId === question.id
                                          ? "ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-zinc-900"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        changeQuestion(question.id)
                                      }
                                    >
                                      {question.id -
                                        section.questions[0]!.id +
                                        1}
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="right"
                                    className="flex gap-2 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
                                  >
                                    <div className="text-sm">
                                      <div className="font-bold text-zinc-900 dark:text-zinc-100">
                                        Question {question.id}
                                      </div>
                                      <div className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                        <Circle className="h-1.5 w-1.5 fill-current" />
                                        {question.status
                                          .replace(/-/g, " ")
                                          .replace(/\b\w/g, (l) =>
                                            l.toUpperCase(),
                                          )}
                                      </div>
                                      {question.timeSpent > 0 && (
                                        <div className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                          <Clock className="h-1.5 w-1.5" />
                                          {formatTime(question.timeSpent)}
                                        </div>
                                      )}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              {/* Question Navigation - Modernized */}
              <div className="border-t border-zinc-200 bg-gradient-to-r from-zinc-50 to-zinc-100 p-3 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/70">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={goToPrevQuestion}
                    disabled={currentQuestionId <= 1}
                    size="sm"
                    className="border-zinc-300 bg-white px-3 transition-all hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  >
                    <ArrowLeft className="mr-1 h-3 w-3" />
                    Prev
                  </Button>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        {currentQuestionId}
                      </span>
                      <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">
                        of {stats.total}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={goToNextQuestion}
                    disabled={currentQuestionId >= stats.total}
                    size="sm"
                    className="border-zinc-300 bg-white px-3 transition-all hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  >
                    Next
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ExamInterface;
