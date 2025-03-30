"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "./magicui/animated-grid-pattern";
import { ShimmerButton } from "./magicui/shimmer-button";
import { Rocket, BookOpen } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="hero" className="relative flex min-h-[550px] w-full flex-col items-center justify-center overflow-hidden bg-indigo-50 px-4 text-center dark:bg-zinc-900">
      {/* Animated Background */}
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 w-full max-w-4xl px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="mb-6 text-4xl font-extrabold text-indigo-700 drop-shadow-lg sm:text-5xl md:text-6xl dark:text-indigo-300"
          variants={itemVariants}
        >
          Elevate Your Exam Preparation
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 max-w-3xl text-base text-indigo-900/80 sm:text-lg dark:text-zinc-300"
          variants={itemVariants}
        >
          Unlock your full potential with our AI-powered learning platform.
          Intelligent adaptive learning, comprehensive practice, and
          personalized insights to transform your exam strategy.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          <ShimmerButton
            background="#312c85"
            className="group relative w-full max-w-xs overflow-hidden rounded-xl bg-indigo-900 px-6 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50 sm:w-auto dark:bg-indigo-700 dark:text-white"
            >
            <Link className="relative z-10 flex items-center justify-center text-sm font-semibold tracking-tight sm:text-base"
            href="/profile">
              <Rocket className="mr-2 h-5 w-5" /> Start Your Journey
            </Link>
          </ShimmerButton>
          {/* 
          <ShimmerButton 
            className="group relative w-full max-w-xs overflow-hidden rounded-xl bg-transparent
            border border-indigo-600 px-6 py-3 text-indigo-700 
            shadow-md transition-all duration-300 hover:scale-105 
            hover:shadow-indigo-500/30 dark:border-indigo-400 
            dark:bg-zinc-800 dark:text-indigo-300 sm:w-auto"
            background=""
          >
            <span className="relative z-10 flex items-center justify-center text-sm font-semibold tracking-tight sm:text-base">
              <BookOpen className="mr-2 h-5 w-5" /> Learn More
            </span>
          </ShimmerButton> */}
        </motion.div>
      </motion.div>
    </section>
  );
}
