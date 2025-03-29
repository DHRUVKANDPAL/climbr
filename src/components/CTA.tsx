"use client";
import Link from "next/link";
import {
  Rocket,
  CheckCircle,
  Star,
  BookOpen,
  TrendingUp,
  PlayCircle,
  Lightbulb,
  Brain,
  Zap,
  Award,
  Target,
  BarChart,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function EnhancedCallToAction() {
  // Using client-side only initialization for animation
  const [mounted, setMounted] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description: "200+ expert-led learning paths",
    },
    {
      icon: TrendingUp,
      title: "Skill Tracking",
      description: "Personalized progress monitoring",
    },
    {
      icon: Star,
      title: "AI Guidance",
      description: "Intelligent learning recommendations",
    },
  ];

  const animationIcons = [
    { icon: Brain, color: "text-indigo-600" },
    { icon: Lightbulb, color: "text-amber-500" },
    { icon: Zap, color: "text-blue-600" },
    { icon: Target, color: "text-red-500" },
    { icon: Award, color: "text-emerald-500" },
    { icon: BarChart, color: "text-purple-600" },
  ];

  // Only run animations after component is mounted on client
  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setActiveIcon((current) => (current + 1) % animationIcons.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Generate fixed positions for initial render
  // This ensures server and client render the same initial state
  const getIconPosition = (index: any) => {
    // Using fixed values to ensure consistency between server and client
    const positions = [
      { x: 0, y: -80 }, // top
      { x: 70, y: -40 }, // top right
      { x: 70, y: 40 }, // bottom right
      { x: 0, y: 80 }, // bottom
      { x: -70, y: 40 }, // bottom left
      { x: -70, y: -40 }, // top left
    ];

    return positions[index % positions.length];
  };

  return (
    <section id="cta" className="relative overflow-hidden bg-white border-t text-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 py-24">
      <div className="relative container mx-auto px-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Left Side: Content */}
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-zinc-800 dark:text-zinc-300">
              <Rocket className="mr-2 inline-block h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Accelerate Your Learning Journey
            </div>

            <h2 className="text-4xl leading-tight font-bold sm:text-5xl">
              Transform Your Skills
              <br />
              <span className="text-indigo-600 dark:text-indigo-400">
                with AI-Powered Learning
              </span>
            </h2>

            <p className="max-w-xl text-lg text-indigo-800 dark:text-zinc-300">
              Join <span className="font-semibold">climbR</span> and unlock a
              personalized learning experience that adapts to your unique
              potential.
            </p>

            {/* Features List */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg dark:bg-zinc-800"
                >
                  <feature.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h4 className="text-sm font-semibold">{feature.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link
                href="/get-started"
                className="flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-lg font-medium text-white transition-all hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                <CheckCircle className="mr-2 h-6 w-6" />
                Get Started
              </Link>
              <Link
                href="/demo"
                className="flex items-center justify-center rounded-lg border-2 border-indigo-600 px-6 py-3 text-lg font-medium text-indigo-600 transition-all hover:bg-indigo-50 dark:border-indigo-500 dark:text-indigo-400 dark:hover:bg-zinc-800"
              >
                <PlayCircle className="mr-2 h-6 w-6" />
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Right Side: Interactive Animation */}
          <div className="flex w-full items-center justify-center">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:bg-zinc-800">

              <div className="relative h-64 w-full">
                {/* Learning Path Visual - with improved centering */}
                <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform">
                  {/* Outer circles - ensure they're perfectly centered */}
                  <div className="absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-dashed border-indigo-200 dark:border-zinc-700"></div>
                  <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-dashed border-indigo-300 dark:border-zinc-600"></div>

                  {/* Center Icon Container - ensuring perfect centering */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    {/* Center background circle */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Orbiting Icons - With fixed initial positions for SSR */}
                  {animationIcons.map((item, index) => {
                    const isActive = mounted && index === activeIcon;
                    // Use fixed positions for initial render to avoid hydration mismatch
                    const position = getIconPosition(index);

                    return (
                      <div
                        key={index}
                        className={`absolute top-1/2 left-1/2 flex h-12 w-12  transform items-center justify-center rounded-full ${
                          isActive
                            ? "bg-white shadow-lg dark:bg-zinc-700"
                            : "bg-gray-100 dark:bg-zinc-800"
                        } transition-all duration-300`}
                        style={{
                          transform: `translate(calc(-50% + ${position!.x}px), calc(-50% + ${position!.y}px)) scale(${isActive ? 1.2 : 0.8})`,
                          zIndex: isActive ? 10 : 5,
                        }}
                      >
                        <item.icon
                          className={`h-6 w-6 ${item.color} transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60"}`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Text Below Animation */}
                <div className="absolute right-0 bottom-0 left-0 text-center">
                  <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    Your Learning Evolution
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-zinc-300">
                    Watch your skills grow and transform through our AI-powered
                    platform
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Link
                  href="/get-started"
                  className="rounded-lg bg-indigo-600 px-6 py-3 text-center text-lg font-medium text-white transition-all hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                  Begin Your Journey
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
