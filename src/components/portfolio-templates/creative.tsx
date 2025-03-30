"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PageConfig } from "@/utils/types";

interface CreativePortfolioProps {
  primaryColor: string;
  secondaryColor: string;
  userDetails?: any;
  currentPage?: string;
  pages?: PageConfig[];
}

export default function CreativePortfolio({
  primaryColor,
  secondaryColor,
  userDetails,
  currentPage = "home",
  pages = [],
}: CreativePortfolioProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cssVariables = {
    "--primary-color": primaryColor,
    "--secondary-color": secondaryColor,
    "--gradient-text": `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
  } as React.CSSProperties;

  const getPlaceholderImage = (width: number, height: number) => {
    return `/placeholder.svg?height=${height}&width=${width}`;
  };

  // Home page content
  const renderHomePage = () => (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-l from-secondary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold gradient-text animate-float">
                {userDetails?.title || "Creative Designer"}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                {userDetails?.bio?.substring(0, 150) ||
                  "Crafting digital experiences that blend creativity with functionality, bringing ideas to life through innovative design."}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                className="group text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-sm hover:cursor-pointer"
                style={{ backgroundColor: primaryColor }}
                onClick={()=>{router.push('/portfolio/projects')}}
              >
                View Projects
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 text-lg rounded-full border-2 transition-all duration-300 hover:scale-105 text-sm hover:cursor-pointer"
                style={{ borderColor: secondaryColor, color: secondaryColor }}
              >
                Contact Me
              </Button>
            </div>

            <div className="flex gap-6">
              {userDetails?.socialLinks?.github && (
                <Link
                  href={userDetails.socialLinks.github}
                  className="hover-card p-4 rounded-full"
                  style={{ backgroundColor: `${primaryColor}10` }}
                >
                  <Github className="w-6 h-6" />
                </Link>
              )}
              {userDetails?.socialLinks?.linkedin && (
                <Link
                  href={userDetails.socialLinks.linkedin}
                  className="hover-card p-4 rounded-full"
                  style={{ backgroundColor: `${primaryColor}10` }}
                >
                  <Linkedin className="w-6 h-6" />
                </Link>
              )}
              {userDetails?.socialLinks?.twitter && (
                <Link
                  href={userDetails.socialLinks.twitter}
                  className="hover-card p-4 rounded-full"
                  style={{ backgroundColor: `${primaryColor}10` }}
                >
                  <Twitter className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: secondaryColor }}
            />
            <img
              src={userDetails?.profileImage || getPlaceholderImage(600, 600)}
              alt="Profile"
              className="relative z-10 w-full h-[500px] object-cover rounded-3xl hover-card"
            />
          </div>
        </div>
      </div>
    </section>
  );

  // About page content
  const renderAboutPage = () => (
    <section className="py-32 relative overflow-hidden flex items-center justify-center min-h-screen">
      {/* Background decorative elements */}
      <div
        className="absolute top-20 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: primaryColor }}
      ></div>
      <div
        className="absolute bottom-20 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: secondaryColor }}
      ></div>

      <div className="container mx-auto px-6 flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 gradient-text relative inline-block">
            About Me
            <span
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full"
              style={{ backgroundColor: secondaryColor }}
            ></span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            {userDetails?.bio ||
              "I'm passionate about creating meaningful digital experiences that combine aesthetics with functionality. With a keen eye for detail and a commitment to excellence, I strive to deliver innovative solutions that exceed expectations."}
          </p>
        </div>
      </div>
    </section>
  );

  // Experience page content
  const renderExperiencePage = () => (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-20 gradient-text">
          Professional Journey
        </h2>

        <div className="max-w-4xl mx-auto">
          {userDetails?.experience?.map((exp: any, index: number) => (
            <div
              key={index}
              className="hover-card mb-12 p-8 rounded-2xl relative"
              style={{ backgroundColor: `${primaryColor}05` }}
            >
              <div
                className="absolute top-0 left-0 w-2 h-full rounded-l-2xl"
                style={{ backgroundColor: secondaryColor }}
              />
              <div className="ml-6">
                <h3 className="text-2xl font-bold mb-2">{exp.position}</h3>
                <div
                  className="inline-block px-4 py-1 rounded-full text-sm mb-4"
                  style={{
                    backgroundColor: `${secondaryColor}20`,
                    color: secondaryColor,
                  }}
                >
                  {exp.company} • {exp.period}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Projects page content
  const renderProjectsPage = () => (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-20 gradient-text">
          Featured Work
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {userDetails?.projects?.map((project: any, index: number) => (
            <div
              key={index}
              className="group hover-card rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-video">
                <img
                  src={project.image || getPlaceholderImage(800, 600)}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/80 mb-4">{project.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Skills page content
  const renderSkillsPage = () => (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-20 gradient-text">
          Skills & Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div
            className="hover-card p-8 rounded-2xl"
            style={{ backgroundColor: `${primaryColor}05` }}
          >
            <h3
              className="text-2xl font-bold mb-8"
              style={{ color: secondaryColor }}
            >
              Design Skills
            </h3>
            <div className="space-y-6">
              {userDetails?.skills
                ?.slice(0, 4)
                .map((skill: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">
                        {typeof skill === "string" ? skill : skill.name}
                      </span>
                      <span style={{ color: secondaryColor }}>90%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: "90%",
                          backgroundColor: secondaryColor,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div
            className="hover-card p-8 rounded-2xl"
            style={{ backgroundColor: `${primaryColor}05` }}
          >
            <h3
              className="text-2xl font-bold mb-8"
              style={{ color: secondaryColor }}
            >
              Technical Skills
            </h3>
            <div className="space-y-6">
              {userDetails?.skills
                ?.slice(4, 8)
                .map((skill: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">
                        {typeof skill === "string" ? skill : skill.name}
                      </span>
                      <span style={{ color: secondaryColor }}>85%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: "85%",
                          backgroundColor: secondaryColor,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Contact page content
  const renderContactPage = () => (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-6 gradient-text">
            Let's Connect
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16">
            Have a project in mind? Let's create something amazing together.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div
              className="hover-card p-8 rounded-2xl flex items-center gap-6"
              style={{ backgroundColor: `${primaryColor}05` }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${secondaryColor}20` }}
              >
                <Mail className="w-8 h-8" style={{ color: secondaryColor }} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Email</h3>
                <a
                  href={`mailto:${userDetails?.email || "contact@example.com"}`}
                  className="text-lg hover:underline"
                  style={{ color: secondaryColor }}
                >
                  {userDetails?.email || "contact@example.com"}
                </a>
              </div>
            </div>

            <div
              className="hover-card p-8 rounded-2xl flex items-center gap-6"
              style={{ backgroundColor: `${primaryColor}05` }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${secondaryColor}20` }}
              >
                <Phone className="w-8 h-8" style={{ color: secondaryColor }} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Phone</h3>
                <a
                  href={`tel:${userDetails?.phone || "+1234567890"}`}
                  className="text-lg hover:underline"
                  style={{ color: secondaryColor }}
                >
                  {userDetails?.phone || "+1 (234) 567-890"}
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3
              className="text-2xl font-bold mb-8"
              style={{ color: secondaryColor }}
            >
              Follow Me
            </h3>
            <div className="flex justify-center gap-6">
              {userDetails?.socialLinks?.github && (
                <Link
                  href={userDetails.socialLinks.github}
                  className="hover-card p-6 rounded-full"
                  style={{ backgroundColor: `${primaryColor}05` }}
                >
                  <Github className="w-8 h-8" />
                </Link>
              )}
              {userDetails?.socialLinks?.linkedin && (
                <Link
                  href={userDetails.socialLinks.linkedin}
                  className="hover-card p-6 rounded-full"
                  style={{ backgroundColor: `${primaryColor}05` }}
                >
                  <Linkedin className="w-8 h-8" />
                </Link>
              )}
              {userDetails?.socialLinks?.twitter && (
                <Link
                  href={userDetails.socialLinks.twitter}
                  className="hover-card p-6 rounded-full"
                  style={{ backgroundColor: `${primaryColor}05` }}
                >
                  <Twitter className="w-8 h-8" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Render the appropriate page content based on currentPage
  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return renderHomePage();
      case "about":
        return renderAboutPage();
      case "experience":
        return renderExperiencePage();
      case "projects":
        return renderProjectsPage();
      case "skills":
        return renderSkillsPage();
      case "contact":
        return renderContactPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div style={cssVariables} className="min-h-screen font-sans">
      {/* Navigation */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "py-4 glass-effect shadow-lg" : "py-6"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold gradient-text">
              {userDetails?.name || "Portfolio"}
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: primaryColor }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav className="hidden md:flex items-center space-x-8">
              {pages
                .filter((p) => p.enabled)
                .map((page) => (
                  <Link
                    key={page.id}
                    href={`/portfolio/${page.id}`}
                    className={`relative py-2 transition-colors ${
                      currentPage === page.id
                        ? "font-medium"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    }`}
                    style={{
                      color: currentPage === page.id ? primaryColor : undefined,
                    }}
                  >
                    {page.name}
                    {currentPage === page.id && (
                      <span
                        className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                        style={{ backgroundColor: secondaryColor }}
                      />
                    )}
                  </Link>
                ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="ml-4 rounded-full"
              >
                Back to Builder
              </Button>
            </nav>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 py-4 border-t">
              {pages
                .filter((p) => p.enabled)
                .map((page) => (
                  <Link
                    key={page.id}
                    href={`/portfolio/${page.id}`}
                    className={`block py-3 ${
                      currentPage === page.id
                        ? "font-medium"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                    style={{
                      color: currentPage === page.id ? primaryColor : undefined,
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {page.name}
                  </Link>
                ))}
              <Link
                href="/"
                className="block py-3 text-gray-600 dark:text-gray-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Back to Builder
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main content */}
      <main>{renderPageContent()}</main>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} {userDetails?.name || "Portfolio"}.
              All rights reserved.
            </p>
            <div className="flex gap-6">
              {userDetails?.socialLinks?.github && (
                <Link
                  href={userDetails.socialLinks.github}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <Github size={20} />
                </Link>
              )}
              {userDetails?.socialLinks?.linkedin && (
                <Link
                  href={userDetails.socialLinks.linkedin}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <Linkedin size={20} />
                </Link>
              )}
              {userDetails?.socialLinks?.twitter && (
                <Link
                  href={userDetails.socialLinks.twitter}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <Twitter size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
