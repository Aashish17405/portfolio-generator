import { UserDetails } from "@/components/user-details-form";

export const defaultUserDetailsData: UserDetails = {
  name: "John Doe",
  title: "Web Developer",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  bio: "I'm a passionate web developer with over 5 years of experience creating beautiful and functional websites. I specialize in front-end development with a focus on creating intuitive user experiences.",
  skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  experience: [
    {
      position: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2020 - Present",
      description:
        "Leading frontend development for enterprise applications, mentoring junior developers, and implementing best practices.",
    },
    {
      position: "Web Developer",
      company: "Digital Agency",
      period: "2018 - 2020",
      description:
        "Developed responsive websites for various clients across different industries. Collaborated with designers to implement pixel-perfect interfaces.",
    },
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      tags: ["Next.js", "Tailwind CSS", "Supabase"],
    },
  ],
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
}