import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import { ExamMarquee } from "@/components/ExamMarquee";
import Features from "@/components/Features";
import TestimonialCarousel from "@/components/Testimonials";
import Footer from "@/components/Footer";
import CallToAction from "@/components/CTA";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen text-white">
        <Header />
        <Hero />
        <ExamMarquee />
        <Features />
        <TestimonialCarousel />
        <CallToAction />
        {/* <ExamMarquee /> */}
        <Footer />
      </main>
    </HydrateClient>
  );
}
