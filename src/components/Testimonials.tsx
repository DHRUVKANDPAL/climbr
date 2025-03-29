"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star, ArrowRight } from "lucide-react";

// Interface for Testimonial
interface Testimonial {
  name: string;
  role: string;
  content: string;
  achievement?: string;
  avatar?: string;
  rating: number;
  createdAt: string;
}

// Testimonials Data
const testimonials: Testimonial[] = [
  {
    name: "Aditya Sharma",
    role: "UPSC Aspirant",
    content:
      "The AI-driven personalized study plan transformed my preparation strategy. By identifying my weak areas, I could focus my efforts precisely where needed.",
    achievement: "Top 100 Rank in UPSC Prelims",
    rating: 5,
    createdAt: "2024-03-15",
  },
  {
    name: "Priya Patel",
    role: "Medical Entrance Candidate",
    content:
      "Real-time video recommendations and adaptive previous year questions made complex topics much clearer. The platform feels like a personalized mentor.",
    achievement: "All India Rank 23 in NEET",
    rating: 5,
    createdAt: "2024-03-10",
  },
  {
    name: "Rahul Gupta",
    role: "Engineering Student",
    content:
      "Gamification features kept me motivated. The leaderboards and progress tracking made studying feel like an engaging challenge rather than a chore.",
    achievement: "99 Percentile in JEE Mains",
    rating: 4,
    createdAt: "2024-03-05",
  },
  {
    name: "Sneha Reddy",
    role: "Civil Services Aspirant",
    content:
      "The SWOT analysis is revolutionary. It provided deep insights into my learning pattern, helping me strategize my preparation more effectively.",
    achievement: "Selected for IAS Interview",
    rating: 5,
    createdAt: "2024-02-28",
  },
];

// Testimonial Card Component
const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  index: number;
}> = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
      }}
      whileHover={{
        scale: 1.015,
        transition: {
          duration: 0.2,
          type: "spring",
          stiffness: 300,
        },
      }}
      className="group h-full"
    >
      <div className="h-full rounded-2xl border border-neutral-100 bg-indigo-50/50 p-6 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900/70">
        <div className="flex h-full flex-col space-y-5">
          {/* Minimalist Quote Section */}
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 h-8 w-8 text-neutral-200 opacity-50 dark:text-neutral-700" />
            <p className="pl-4 text-base font-light text-neutral-700 italic dark:text-neutral-300">
              "{testimonial.content}"
            </p>
          </div>

          {/* User Details with Clean Layout */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 ring-2 ring-neutral-100 dark:ring-neutral-800">
                <AvatarFallback className="bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-neutral-800 dark:text-neutral-200">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Minimalist Rating */}
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating
                      ? "fill-current text-neutral-800 dark:text-neutral-200"
                      : "text-neutral-300 dark:text-neutral-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Testimonial Carousel Component
const TestimonialCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-16 border-t dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="space-y-10 md:space-y-12">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-4xl font-bold text-neutral-900 dark:text-neutral-100"
            >
              Success Stories: From Preparation to Performance
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400"
            >
              Hear how our AI-powered platform is helping students transform
              their exam preparation with personalized learning paths and
              data-driven insights.
            </motion.p>
          </div>

          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="group w-full"
          >
            <CarouselContent className="-ml-4 py-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <TestimonialCard testimonial={testimonial} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex items-center justify-center gap-4">
              <CarouselPrevious className="static translate-x-0 translate-y-0 opacity-50 transition-opacity group-hover:opacity-100" />
              <CarouselNext className="static translate-x-0 translate-y-0 opacity-50 transition-opacity group-hover:opacity-100" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
