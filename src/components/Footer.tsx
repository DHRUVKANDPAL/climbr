import Link from "next/link";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  ChevronRight,
  Send,
} from "lucide-react";

export default function EnhancedFooter() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Products",
      items: [
        "Courses",
        "Skill Assessments",
        "Practice Sets",
        "AI Tutor",
        "Live Classes",
      ],
    },
    {
      title: "Community",
      items: [
        "Student Forums",
        "Leaderboards",
        "Mentors",
        "Rankings",
        "Challenges",
      ],
    },
    {
      title: "Resources",
      items: [
        "Blog",
        "Help Center",
        "FAQs",
        "Exam Prep Guides",
        "Affiliate Program",
      ],
    },
    {
      title: "For Institutes",
      items: [
        "Institutional Plans",
        "Campus Partnerships",
        "Custom Test Series",
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Github, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-indigo-200 to-indigo-50 text-indigo-900 shadow-lg dark:from-zinc-900 dark:to-zinc-800 dark:text-zinc-200">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-12">
        {/* Brand Section */}
        <div className="md:col-span-4 lg:col-span-3">
          <Link href="/" className="mb-4 flex items-center space-x-2">
            <span className="text-3xl font-bold text-indigo-700 dark:text-zinc-100">
              climb<span className="text-indigo-500">R</span>
            </span>
          </Link>
          <p className="mb-4 text-sm opacity-80">
            Empowering learners with AI-driven insights and transformative
            educational experiences.
          </p>

          {/* Newsletter Signup */}
          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-zinc-800">
            <h4 className="mb-2 font-semibold">Stay Updated</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-l-md border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button className="rounded-r-md bg-indigo-600 p-2 text-white transition hover:bg-indigo-700">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-4 flex space-x-3">
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110 dark:bg-zinc-800"
              >
                <Icon className="h-5 w-5 text-indigo-600 hover:text-indigo-800 dark:text-zinc-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-6 md:col-span-8 md:grid-cols-3 lg:col-span-9 lg:grid-cols-4">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h3 className="mb-2 border-b-2 border-indigo-300 pb-1 text-lg font-bold dark:border-zinc-700">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      href="#"
                      className="group flex items-center text-sm transition hover:text-indigo-600 dark:hover:text-zinc-300"
                    >
                      <ChevronRight className="mr-2 h-4 w-4 text-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-indigo-600 py-4 text-center text-white dark:bg-zinc-700">
        <p className="text-sm">
          © {currentYear} climbR. All rights reserved.
          <span className="ml-4 hidden opacity-75 md:inline">
            Designed with ❤️ for learners worldwide
          </span>
        </p>
      </div>
    </footer>
  );
}
