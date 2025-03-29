import Link from "next/link";
import {
  Rocket,
  CheckCircle,
  StarIcon,
  BookOpen,
  TrendingUp,
  PlayCircle,
} from "lucide-react";
import { SignIn } from "@clerk/nextjs";

export default function EnhancedCallToAction() {
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
      icon: StarIcon,
      title: "AI Guidance",
      description: "Intelligent learning recommendations",
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100">
      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-indigo-50 to-indigo-100 opacity-10 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900"></div> */}

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

          {/* Right Side: Interactive Signup */}
          <div className=" flex justify-center items-center w-full">
            <SignIn/>
            {/* <h3 className="mb-4 text-center text-2xl font-bold">
              Start Your Learning Journey
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700"
              />
              <select className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700">
                <option>Select Learning Goal</option>
                <option>Professional Development</option>
                <option>Academic Preparation</option>
                <option>Skill Enhancement</option>
                <option>Career Transition</option>
              </select>
              <button className="w-full rounded-lg bg-indigo-600 py-3 text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400">
                Unlock Your Potential
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500 dark:text-zinc-400">
              By signing up, you agree to our
              <Link
                href="/terms"
                className="ml-1 text-indigo-600 hover:underline"
              >
                Terms of Service
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
