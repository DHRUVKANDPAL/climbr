"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Brain,
  BarChart,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.15)" }:any) => {
  const divRef:any = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e:any) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 overflow-hidden p-4 backdrop-blur-sm ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

const Features: React.FC = () => {
  const featureCategories = [
    {
      title: "Personalized Learning",
      features: [
        {
          icon: Target,
          title: "Adaptive PYQs",
          description: "Dynamically adjust question difficulty based on user performance",
        },
        {
          icon: Brain,
          title: "Topic Analysis",
          description: "AI detects weak areas and suggests focused practice",
        },
        {
          icon: BarChart,
          title: "SWOT Insights",
          description: "Comprehensive analysis of learning strengths and opportunities",
        },
      ],
    },
    {
      title: "Intelligent Feedback",
      features: [
        {
          icon: Zap,
          title: "AI Performance Analysis",
          description: "Detailed insights on speed, accuracy, and weak topics",
        },
        {
          icon: TrendingUp,
          title: "Progress Tracking",
          description: "Visualize improvement with comprehensive dashboards",
        },
        {
          icon: Award,
          title: "Real-time Feedback",
          description: "Instant error identification and improvement suggestions",
        },
      ],
    },
  ];

  const statsData = [
    { 
      value: "5000+", 
      label: "Total Questions", 
      lightColor: "text-blue-600", 
      darkColor: "text-blue-400" 
    },
    { 
      value: "15+", 
      label: "Exam Types", 
      lightColor: "text-green-600", 
      darkColor: "text-green-400" 
    },
    { 
      value: "95%", 
      label: "Learning Efficiency", 
      lightColor: "text-purple-600", 
      darkColor: "text-purple-400" 
    },
    { 
      value: "+10k", 
      label: "Happy Learners", 
      lightColor: "text-pink-600", 
      darkColor: "text-pink-400" 
    },
    { 
      value: "24/7", 
      label: "Support Access", 
      lightColor: "text-indigo-600", 
      darkColor: "text-indigo-400" 
    },
    { 
      value: "3+", 
      label: "Learning Modes", 
      lightColor: "text-orange-600", 
      darkColor: "text-orange-400" 
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white dark:bg-zinc-950 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {/* Section Heading */}
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-100"
            >
              Elevate Your Learning Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400"
            >
              Unlock your full potential with our intelligent learning platform. 
              Personalized insights, adaptive learning, and comprehensive support 
              designed to transform your educational journey.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Compact Statistics Spotlight Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4 lg:col-span-1"
            >
              {statsData.map((stat, index) => (
                <SpotlightCard key={index}>
                  <div className="text-center">
                    <h5 className={`text-3xl font-bold ${stat.lightColor} dark:${stat.darkColor}`}>
                      {stat.value}
                    </h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                      {stat.label}
                    </p>
                  </div>
                </SpotlightCard>
              ))}
            </motion.div>

            {/* Feature Categories */}
            <div className="space-y-6 lg:col-span-2">
              {featureCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: categoryIndex * 0.2,
                  }}
                  className="grid gap-4 md:grid-cols-3"
                >
                  {category.features.map((feature, index) => (
                    <SpotlightCard key={feature.title}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1,
                        }}
                        className="flex flex-col h-full"
                      >
                        <div className="mb-4 inline-block rounded-xl bg-neutral-100 dark:bg-neutral-800 p-3 self-start">
                          <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-colors" />
                        </div>
                        <h4 className="mb-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 flex-grow">
                          {feature.description}
                        </p>
                      </motion.div>
                    </SpotlightCard>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;