"use client";
import React from "react";
// import GridMotion from "./GridMotion/GridMotion";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Target,
  Brain,
  Video,
  Trophy,
  Lightbulb,
  BarChart,
} from "lucide-react";

const Features: React.FC = () => {
  // const features = [
  //   {
  //     icon: <Target className="h-10 w-10 text-blue-500" />,
  //     title: "Adaptive PYQs",
  //     description:
  //       "Dynamically adjust question difficulty based on individual learning progress.",
  //     gradient: "from-blue-500/10 to-blue-500/30",
  //   },
  //   {
  //     icon: <Brain className="h-10 w-10 text-green-500" />,
  //     title: "AI-Powered Insights",
  //     description:
  //       "Personalized topic analysis identifying and targeting learning gaps.",
  //     gradient: "from-green-500/10 to-green-500/30",
  //   },
  //   {
  //     icon: <Video className="h-10 w-10 text-purple-500" />,
  //     title: "Dynamic Content",
  //     description:
  //       "Real-time YouTube video recommendations for supplementary learning.",
  //     gradient: "from-purple-500/10 to-purple-500/30",
  //   },
  //   {
  //     icon: <Trophy className="h-10 w-10 text-yellow-500" />,
  //     title: "Gamification",
  //     description:
  //       "Engaging leaderboards and achievement badges to motivate learning.",
  //     gradient: "from-yellow-500/10 to-yellow-500/30",
  //   },
  // ];

  // const gridItems = features
  //   .map((feature) => (
  //     <div
  //       key={feature.title}
  //       className={`flex items-center space-x-4 bg-gradient-to-br p-4 ${feature.gradient} rounded-xl`}
  //     >
  //       {feature.icon}
  //       <div>
  //         <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
  //         <p className="text-gray-700">{feature.description}</p>
  //       </div>
  //     </div>
  //   ))
  //   .concat([
  //     <Image
  //       key="hello-image-1"
  //       src="/hello.png"
  //       alt="Platform Screenshot"
  //       width={500}
  //       height={300}
  //       className="rounded-xl shadow-lg"
  //     />,
  //     <Image
  //       key="hello-image-2"
  //       src="/hello.png"
  //       alt="Platform Screenshot"
  //       width={500}
  //       height={300}
  //       className="rounded-xl shadow-lg"
  //     />,
  //   ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden py-16 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gray-50/50"></div>

      {/* <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-6 text-4xl leading-tight font-extrabold text-gray-900 md:text-5xl">
            Transform Your Learning Journey
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            An intelligent platform that understands your unique learning needs,
            providing personalized, adaptive, and engaging exam preparation.
          </p>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="w-full">
            <GridMotion items={gridItems} gradientColor="#1a202c" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="mb-6 text-3xl font-bold text-gray-900">
              Why Choose Our Platform?
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Lightbulb className="mt-1 h-8 w-8 flex-shrink-0 text-blue-500" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Deep Personalization
                  </h4>
                  <p className="text-gray-600">
                    Our AI analyzes your performance in real-time, creating a
                    learning pathway tailored specifically to your strengths and
                    weaknesses.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <BarChart className="mt-1 h-8 w-8 flex-shrink-0 text-green-500" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Comprehensive Insights
                  </h4>
                  <p className="text-gray-600">
                    Regular SWOT analysis provides actionable insights, helping
                    you understand your academic profile and drive targeted
                    improvements.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div> */}
    </motion.div>
  );
};

export default Features;
