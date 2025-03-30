"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  CheckCircle,
  ExternalLink,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PageConfig } from "@/utils/types";

interface CorporatePortfolioProps {
  primaryColor: string;
  secondaryColor: string;
  userDetails?: any;
  currentPage?: string;
  pages?: PageConfig[];
}

// Function to generate placeholder images
const getPlaceholderImage = (width: number, height: number) => {
  return `https://via.placeholder.com/${width}x${height}`;
};

export default function CorporatePortfolio({
  primaryColor,
  secondaryColor,
  userDetails,
  currentPage = "home",
  pages = [],
}: CorporatePortfolioProps) {
  const router = useRouter();

  // Create CSS variables for the selected colors
  const cssVariables = {
    "--primary-color": primaryColor,
    "--secondary-color": secondaryColor,
  } as React.CSSProperties;

  // Helper function to get placeholder image URL
  const getPlaceholderImage = (width: number, height: number) => {
    return `/placeholder.svg?height=${height}&width=${width}`;
  };

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

  // Home page content
  const renderHomePage = () => (
    <section
      className="py-20"
      style={{
        backgroundColor: userDetails?.backgroundImage
          ? "transparent"
          : primaryColor,
        backgroundImage: userDetails?.backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${userDetails.backgroundImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {userDetails?.name || "Your Name"}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-md">
              {userDetails?.title || "Your Professional Title"}
            </p>
            <div className="flex gap-4">
              <Link href="/portfolio/about">
                <Button
                  className="text-white text-sm rounded-md px-6 py-3 hover:cursor-pointer"
                  style={{
                    backgroundColor: secondaryColor,
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Learn More About Me
                </Button>
              </Link>
              <Link href="/portfolio/contact">
                <Button
                  variant="outline"
                  className="rounded-md px-6 py-3 text-lg text-gray-900 text-sm border-white hover:bg-white/10 hover:cursor-pointer"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={userDetails?.profileImage || getPlaceholderImage(400, 400)}
              alt={userDetails?.name || "Profile Image"}
              className="rounded-full w-64 h-64 object-cover border-4 border-white shadow-lg"
              onError={(e) => {
                e.currentTarget.src = getPlaceholderImage(400, 400);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );

  // About page content
  const renderAboutPage = () => (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            About Me
          </h2>
          <div
            className="w-20 h-1 mx-auto rounded-full"
            style={{ backgroundColor: secondaryColor }}
          ></div>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row gap-10 items-start bg-white p-8 rounded-lg shadow-sm">
            <div className="md:w-1/3">
              <img
                src={
                  userDetails?.profileImage ||
                  `https://via.placeholder.com/400x300`
                }
                alt={userDetails?.name || "Profile Image"}
                className="w-full h-[300px] rounded-lg shadow-sm object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/400x300`;
                }}
              />
            </div>
            <div className="md:w-2/3">
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: secondaryColor }}
              >
                Professional Background
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>{userDetails?.bio || "Add your professional bio here."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Experience page content
  const renderExperiencePage = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Professional Experience
          </h2>
          <div
            className="w-20 h-1 mx-auto rounded-full"
            style={{ backgroundColor: secondaryColor }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {userDetails?.experience?.map((exp: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <div className="font-medium text-xl mb-1">{exp.position}</div>
                <div
                  className="text-sm mb-3 inline-block px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: secondaryColor + "20",
                    color: secondaryColor,
                  }}
                >
                  {exp.company} | {exp.period}
                </div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
            {(!userDetails?.experience ||
              userDetails.experience.length === 0) && (
              <div className="text-center py-10 text-gray-500">
                <p>
                  No experience entries found. Add your professional experience
                  in the builder.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  // Projects page content
  const renderProjectsPage = () => (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Featured Projects
          </h2>
          <div
            className="w-20 h-1 mx-auto rounded-full"
            style={{ backgroundColor: secondaryColor }}
          ></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userDetails?.projects?.map((project: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                {project.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image || getPlaceholderImage(600, 400)}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = getPlaceholderImage(600, 400);
                      }}
                    />
                  </div>
                )}
                <div className="p-4" style={{ backgroundColor: primaryColor }}>
                  <h4 className="text-white font-medium text-lg">
                    {project.title}
                  </h4>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: secondaryColor + "20",
                          color: secondaryColor,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* <Button
                    variant="outline"
                    size="sm"
                    className="w-full hover:cursor-pointer"
                    style={{
                      borderColor: primaryColor,
                      color: primaryColor,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    View Project <ExternalLink className="ml-2" size={14} />
                  </Button> */}
                </div>
              </div>
            ))}
            {(!userDetails?.projects || userDetails.projects.length === 0) && (
              <div className="text-center py-10 text-gray-500 col-span-2">
                <p>No projects found. Add your projects in the builder.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  // Skills page content
  const renderSkillsPage = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Skills & Expertise
          </h2>
          <div
            className="w-20 h-1 mx-auto rounded-full"
            style={{ backgroundColor: secondaryColor }}
          ></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userDetails?.skills?.map((skill: string, index: number) => (
              <div
                key={index}
                className="p-8 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: secondaryColor + "20" }}
                >
                  <CheckCircle size={28} style={{ color: secondaryColor }} />
                </div>
                <h3 className="text-xl font-medium mb-3">{skill}</h3>
                <p className="text-gray-600">
                  {userDetails?.bio?.substring(0, 100) ||
                    "I have extensive experience in this area and can deliver high-quality results."}
                </p>
              </div>
            ))}
            {(!userDetails?.skills || userDetails.skills.length === 0) && (
              <div className="text-center py-10 text-gray-500 col-span-3">
                <p>No skills found. Add your skills in the builder.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  // Contact page content
  const renderContactPage = () => (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Contact Information
          </h2>
          <div
            className="w-20 h-1 mx-auto rounded-full"
            style={{ backgroundColor: secondaryColor }}
          ></div>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            {userDetails?.bio?.substring(0, 150) ||
              "Ready to collaborate? Get in touch to discuss potential opportunities."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 border rounded-lg flex items-start space-x-6 hover:shadow-md transition-all">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mt-1"
                style={{ backgroundColor: primaryColor }}
              >
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Email Address</h3>
                <p className="text-gray-500 mb-3">
                  For inquiries and collaborations
                </p>
                <a
                  href={`mailto:${
                    userDetails?.email || "your.email@example.com"
                  }`}
                  className="font-medium text-lg"
                  style={{ color: secondaryColor }}
                >
                  {userDetails?.email || "your.email@example.com"}
                </a>
              </div>
            </div>
            <div className="p-8 border rounded-lg flex items-start space-x-6 hover:shadow-md transition-all">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mt-1"
                style={{ backgroundColor: primaryColor }}
              >
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Phone Number</h3>
                <p className="text-gray-500 mb-3">
                  Available during business hours
                </p>
                <a
                  href={`tel:${userDetails?.phone || "+1234567890"}`}
                  className="font-medium text-lg"
                  style={{ color: secondaryColor }}
                >
                  {userDetails?.phone || "+1 (234) 567-890"}
                </a>
              </div>
            </div>
          </div>

          <h3
            className="text-xl font-semibold mb-6 text-center"
            style={{ color: secondaryColor }}
          >
            Professional Networks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userDetails?.socialLinks?.linkedin && (
              <Link
                href={userDetails.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 border rounded-lg flex items-center space-x-4 hover:shadow-md transition-all"
              >
                <Linkedin size={24} style={{ color: primaryColor }} />
                <span className="font-medium">LinkedIn</span>
              </Link>
            )}
            {userDetails?.socialLinks?.twitter && (
              <Link
                href={userDetails.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 border rounded-lg flex items-center space-x-4 hover:shadow-md transition-all"
              >
                <Twitter size={24} style={{ color: primaryColor }} />
                <span className="font-medium">Twitter</span>
              </Link>
            )}
            {userDetails?.socialLinks?.github && (
              <Link
                href={userDetails.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 border rounded-lg flex items-center space-x-4 hover:shadow-md transition-all"
              >
                <Github size={24} style={{ color: primaryColor }} />
                <span className="font-medium">GitHub</span>
              </Link>
            )}
            {!userDetails?.socialLinks?.linkedin &&
              !userDetails?.socialLinks?.twitter &&
              !userDetails?.socialLinks?.github && (
                <div className="text-center py-10 text-gray-500 col-span-3">
                  <p>
                    No social links found. Add your social profiles in the
                    builder.
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div style={cssVariables} className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl" style={{ color: primaryColor }}>
              {userDetails?.name || "Your Name"}
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-6">
              {pages
                .filter((p) => p.enabled)
                .map((page) => (
                  <Link
                    key={page.id}
                    href={`/portfolio/${page.id}`}
                    className={`py-2 px-1 relative transition-colors ${
                      currentPage === page.id
                        ? "font-medium"
                        : "text-gray-600 hover:text-gray-900"
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
                      ></span>
                    )}
                  </Link>
                ))}
            </nav>
            <div className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="ml-4"
              >
                Back to Builder
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => {
                // Create a state for mobile menu if it doesn't exist
                const mobileMenuOpen = (window as any).mobileMenuOpen;
                (window as any).mobileMenuOpen = !mobileMenuOpen;
                document
                  .getElementById("mobile-menu")
                  ?.classList.toggle("hidden");
              }}
              style={{ color: primaryColor }}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Mobile navigation */}
          <nav
            id="mobile-menu"
            className="md:hidden pt-4 pb-2 flex flex-col space-y-3 hidden bg-white border-t mt-2"
          >
            {pages
              .filter((p) => p.enabled)
              .map((page) => (
                <Link
                  key={page.id}
                  href={`/portfolio/${page.id}`}
                  className={`py-2 ${
                    currentPage === page.id ? "font-medium" : "text-gray-600"
                  }`}
                  style={{
                    color: currentPage === page.id ? primaryColor : undefined,
                  }}
                  onClick={() => {
                    document
                      .getElementById("mobile-menu")
                      ?.classList.add("hidden");
                    (window as any).mobileMenuOpen = false;
                  }}
                >
                  {page.name}
                </Link>
              ))}
            <Link
              href="/"
              className="py-2 text-gray-600 font-medium"
              onClick={() => {
                document.getElementById("mobile-menu")?.classList.add("hidden");
                (window as any).mobileMenuOpen = false;
              }}
            >
              Back to Builder
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow">{renderPageContent()}</main>

      {/* Footer */}
      <footer
        className="py-10 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="font-bold text-xl mb-2">
                {userDetails?.name || "Your Name"}
              </div>
              <p className="text-white/80">
                {userDetails?.title || "Your Professional Title"}
              </p>
            </div>
            <div className="flex space-x-6">
              {userDetails?.socialLinks?.linkedin && (
                <Link
                  href={userDetails.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </Link>
              )}
              {userDetails?.socialLinks?.twitter && (
                <Link
                  href={userDetails.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Twitter size={20} />
                </Link>
              )}
              {userDetails?.socialLinks?.github && (
                <Link
                  href={userDetails.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </Link>
              )}
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            © {new Date().getFullYear()} {userDetails?.name || "Your Name"}. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
