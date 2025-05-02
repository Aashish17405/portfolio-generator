"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  Briefcase,
  Minimize2,
  ChevronDown,
  Star,
  Palette,
  Layout,
  ImageIcon,
  Edit,
  Globe,
  Share2,
  Zap,
  Sliders,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Move the animation variants outside the main component to make them globally accessible
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as "reverse" | "loop" | "mirror",
    },
  },
}

export default function LandingPage() {
  const [activeStyle, setActiveStyle] = useState<"minimal" | "creative" | "corporate">("creative")
  const [isFeatureExpanded, setIsFeatureExpanded] = useState(false)
  const [currentColorTheme, setCurrentColorTheme] = useState<"purple" | "blue" | "green">("purple")
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorHovering, setCursorHovering] = useState(false)

  // For scrolling animations
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const templatesRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 })
  const isFeaturesInView = useInView(featuresRef, { once: false, amount: 0.2 })
  const isTemplatesInView = useInView(templatesRef, { once: false, amount: 0.2 })

  // For template customization demo
  const [fontChoice, setFontChoice] = useState("modern")
  const [layoutChoice, setLayoutChoice] = useState("grid")

  // For parallax effect
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -150])
  const y2 = useTransform(scrollY, [0, 1000], [0, -100])
  const y3 = useTransform(scrollY, [0, 1000], [0, -50])

  // For smooth animations
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 })
  const smoothY3 = useSpring(y3, { stiffness: 100, damping: 30 })

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Remove the animation variants from here since they're now defined globally

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950 overflow-hidden">
      {/* Custom cursor */}
      {/* <motion.div
        className={`fixed w-12 h-12 rounded-full pointer-events-none z-50 mix-blend-difference ${
          cursorHovering ? "bg-purple-500" : "bg-white"
        }`}
        animate={{
          x: cursorPosition.x - 24,
          y: cursorPosition.y - 24,
          scale: cursorHovering ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      /> */}

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto py-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-zinc-900/70"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2"
          onMouseEnter={() => setCursorHovering(true)}
          onMouseLeave={() => setCursorHovering(false)}
        >
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-bold">PortfolioTemplates</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center gap-8"
        >
          {["Templates", "Features"].map((item, index) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorHovering(true)}
              onMouseLeave={() => setCursorHovering(false)}
            >
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-sm hover:text-purple-600 transition-colors relative"
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorHovering(true)}
            onMouseLeave={() => setCursorHovering(false)}
          >
            <Button variant="outline" className="hidden sm:flex">
              Log In
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorHovering(true)}
            onMouseLeave={() => setCursorHovering(false)}
          >
            <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="container mx-auto py-20 md:py-32 relative">
        <motion.div
          style={{ y: smoothY1 }}
          className="absolute top-20 right-10 w-20 h-20 text-purple-200 dark:text-purple-900 opacity-50"
        >
          <Sparkles className="w-full h-full" />
        </motion.div>

        <motion.div
          style={{ y: smoothY2 }}
          className="absolute bottom-40 left-10 w-16 h-16 text-blue-200 dark:text-blue-900 opacity-50"
        >
          <Layout className="w-full h-full" />
        </motion.div>

        <motion.div
          style={{ y: smoothY3 }}
          className="absolute top-40 left-1/4 w-12 h-12 text-pink-200 dark:text-pink-900 opacity-50"
        >
          <Palette className="w-full h-full" />
        </motion.div>

        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              animate={{
                x: [0, -5, 5, -5, 0],
                y: [0, -5, 5, -5, 0],
                rotate: [0, -1, 1, -1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute -top-12 -right-12 text-purple-600"
            >
              <Sparkles className="h-10 w-10" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              Your Portfolio,{" "}
              <motion.span
                animate={{
                  color: [
                    "#9333ea", // purple-600
                    "#2563eb", // blue-600
                    "#16a34a", // green-600
                    "#9333ea", // back to purple-600
                  ],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                className="text-purple-600 relative"
              >
                Perfectly Styled
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600"
                  animate={{
                    scaleX: [0, 1, 1, 0],
                    x: ["-100%", "0%", "0%", "100%"],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mb-10"
          >
            Choose from our professionally designed templates and showcase your work with style. Minimal, Creative, or
            Corporate — we have the perfect design for your portfolio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorHovering(true)}
              onMouseLeave={() => setCursorHovering(false)}
            >
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 relative group">
                <span className="relative z-10">Browse Templates</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive Template Selector */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-20 relative"
        >
          <motion.div
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 rounded-xl blur-3xl"
          />

          <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col md:flex-row">
              {/* Template Selector */}
              <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xl font-bold mb-4">Choose Your Template</h3>

                <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants}>
                    <StyleOption
                      title="Minimal"
                      description="Clean, simple, and elegant"
                      icon={<Minimize2 />}
                      isActive={activeStyle === "minimal"}
                      onClick={() => setActiveStyle("minimal")}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyleOption
                      title="Creative"
                      description="Bold, colorful, and expressive"
                      icon={<Sparkles />}
                      isActive={activeStyle === "creative"}
                      onClick={() => setActiveStyle("creative")}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyleOption
                      title="Corporate"
                      description="Professional, polished, and trustworthy"
                      icon={<Briefcase />}
                      isActive={activeStyle === "corporate"}
                      onClick={() => setActiveStyle("corporate")}
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={fadeInUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800"
                >
                  <h4 className="text-sm font-medium mb-3">Customize Colors</h4>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => setCurrentColorTheme("purple")}
                      className={`w-8 h-8 rounded-full bg-purple-500 ${
                        currentColorTheme === "purple" ? "ring-2 ring-offset-2 ring-purple-600" : ""
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Purple theme"
                    />
                    <motion.button
                      onClick={() => setCurrentColorTheme("blue")}
                      className={`w-8 h-8 rounded-full bg-blue-500 ${
                        currentColorTheme === "blue" ? "ring-2 ring-offset-2 ring-blue-600" : ""
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Blue theme"
                    />
                    <motion.button
                      onClick={() => setCurrentColorTheme("green")}
                      className={`w-8 h-8 rounded-full bg-green-500 ${
                        currentColorTheme === "green" ? "ring-2 ring-offset-2 ring-green-600" : ""
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Green theme"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Font Style</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      onClick={() => setFontChoice("modern")}
                      className={`px-3 py-2 text-sm rounded-md ${
                        fontChoice === "modern"
                          ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600 border border-purple-600"
                          : "bg-zinc-100 dark:bg-zinc-800 border border-transparent"
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Modern
                    </motion.button>
                    <motion.button
                      onClick={() => setFontChoice("classic")}
                      className={`px-3 py-2 text-sm rounded-md ${
                        fontChoice === "classic"
                          ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600 border border-purple-600"
                          : "bg-zinc-100 dark:bg-zinc-800 border border-transparent"
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Classic
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" className="mt-4">
                  <h4 className="text-sm font-medium mb-3">Layout</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      onClick={() => setLayoutChoice("grid")}
                      className={`px-3 py-2 text-sm rounded-md ${
                        layoutChoice === "grid"
                          ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600 border border-purple-600"
                          : "bg-zinc-100 dark:bg-zinc-800 border border-transparent"
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Grid
                    </motion.button>
                    <motion.button
                      onClick={() => setLayoutChoice("masonry")}
                      className={`px-3 py-2 text-sm rounded-md ${
                        layoutChoice === "masonry"
                          ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600 border border-purple-600"
                          : "bg-zinc-100 dark:bg-zinc-800 border border-transparent"
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Masonry
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Preview */}
              <div className="p-6 md:w-2/3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Live Preview</h3>
                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Customize
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Use Template
                      </Button>
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeStyle}-${currentColorTheme}-${fontChoice}-${layoutChoice}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="h-[400px] md:h-[500px] rounded-lg overflow-hidden relative border border-zinc-200 dark:border-zinc-800"
                  >
                    {activeStyle === "minimal" && (
                      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-900 flex flex-col">
                        {/* Minimal Template Header */}
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center"
                        >
                          <div
                            className={`text-xl font-medium ${fontChoice === "classic" ? "font-serif" : "font-sans"}`}
                          >
                            Jane Smith
                          </div>
                          <div className="flex gap-6">
                            <motion.div whileHover={{ y: -2, color: "#9333ea" }} className="text-sm cursor-pointer">
                              Work
                            </motion.div>
                            <motion.div whileHover={{ y: -2, color: "#9333ea" }} className="text-sm cursor-pointer">
                              About
                            </motion.div>
                            <motion.div whileHover={{ y: -2, color: "#9333ea" }} className="text-sm cursor-pointer">
                              Contact
                            </motion.div>
                          </div>
                        </motion.div>

                        {/* Minimal Template Content */}
                        <div className="flex-1 p-6 overflow-auto">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mb-8"
                          >
                            <h2
                              className={`text-2xl font-medium mb-4 ${fontChoice === "classic" ? "font-serif" : "font-sans"}`}
                            >
                              Selected Work
                            </h2>

                            {layoutChoice === "grid" ? (
                              <motion.div
                                variants={staggerContainerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-2 gap-4"
                              >
                                {[1, 2, 3, 4].map((item) => (
                                  <motion.div
                                    key={item}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                    className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-md cursor-pointer"
                                  />
                                ))}
                              </motion.div>
                            ) : (
                              <motion.div
                                variants={staggerContainerVariants}
                                initial="hidden"
                                animate="visible"
                                className="columns-2 gap-4 space-y-4"
                              >
                                <motion.div
                                  variants={itemVariants}
                                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                  className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded-md break-inside-avoid cursor-pointer"
                                />
                                <motion.div
                                  variants={itemVariants}
                                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                  className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-md break-inside-avoid cursor-pointer"
                                />
                                <motion.div
                                  variants={itemVariants}
                                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                  className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-md break-inside-avoid cursor-pointer"
                                />
                                <motion.div
                                  variants={itemVariants}
                                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                  className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-md break-inside-avoid cursor-pointer"
                                />
                              </motion.div>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    )}

                    {activeStyle === "creative" && (
                      <div className="absolute inset-0 bg-white dark:bg-zinc-900 flex flex-col">
                        {/* Creative Template Header */}
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className={`p-6 flex justify-between items-center ${
                            currentColorTheme === "purple"
                              ? "bg-purple-500"
                              : currentColorTheme === "blue"
                                ? "bg-blue-500"
                                : "bg-green-500"
                          } text-white`}
                        >
                          <div
                            className={`text-2xl font-bold ${fontChoice === "classic" ? "font-serif" : "font-sans"}`}
                          >
                            ALEX CREATIVE
                          </div>
                          <div className="flex gap-6">
                            <motion.div
                              whileHover={{ y: -2, x: 2 }}
                              className="text-sm uppercase tracking-wider cursor-pointer"
                            >
                              Portfolio
                            </motion.div>
                            <motion.div
                              whileHover={{ y: -2, x: 2 }}
                              className="text-sm uppercase tracking-wider cursor-pointer"
                            >
                              About
                            </motion.div>
                            <motion.div
                              whileHover={{ y: -2, x: 2 }}
                              className="text-sm uppercase tracking-wider cursor-pointer"
                            >
                              Contact
                            </motion.div>
                          </div>
                        </motion.div>

                        {/* Creative Template Content */}
                        <div className="flex-1 p-6 overflow-auto">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mb-8"
                          >
                            <h2
                              className={`text-3xl font-bold mb-6 ${fontChoice === "classic" ? "font-serif" : "font-sans"}`}
                            >
                              My Work
                            </h2>

                            {layoutChoice === "grid" ? (
                              <motion.div
                                variants={staggerContainerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-3 gap-4"
                              >
                                {[
                                  { from: "purple-200", to: "pink-200", darkFrom: "purple-800", darkTo: "pink-800" },
                                  { from: "blue-200", to: "cyan-200", darkFrom: "blue-800", darkTo: "cyan-800" },
                                  { from: "amber-200", to: "yellow-200", darkFrom: "amber-800", darkTo: "yellow-800" },
                                  {
                                    from: "green-200",
                                    to: "emerald-200",
                                    darkFrom: "green-800",
                                    darkTo: "emerald-800",
                                  },
                                  { from: "red-200", to: "rose-200", darkFrom: "red-800", darkTo: "rose-800" },
                                  {
                                    from: "indigo-200",
                                    to: "violet-200",
                                    darkFrom: "indigo-800",
                                    darkTo: "violet-800",
                                  },
                                ].map((color, index) => (
                                  <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{
                                      scale: 1.05,
                                      rotate: Math.random() * 5 - 2.5,
                                      transition: { duration: 0.2 },
                                    }}
                                    className={`aspect-square bg-gradient-to-br from-${color.from} to-${color.to} dark:from-${color.darkFrom} dark:to-${color.darkTo} rounded-lg flex items-center justify-center cursor-pointer`}
                                  >
                                    <motion.div
                                      animate={{ rotate: [0, 360] }}
                                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    >
                                      <ImageIcon className="h-8 w-8 text-white" />
                                    </motion.div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            ) : (
                              <motion.div
                                variants={staggerContainerVariants}
                                initial="hidden"
                                animate="visible"
                                className="columns-3 gap-4 space-y-4"
                              >
                                {[
                                  {
                                    height: "h-48",
                                    from: "purple-200",
                                    to: "pink-200",
                                    darkFrom: "purple-800",
                                    darkTo: "pink-800",
                                  },
                                  {
                                    height: "h-64",
                                    from: "blue-200",
                                    to: "cyan-200",
                                    darkFrom: "blue-800",
                                    darkTo: "cyan-800",
                                  },
                                  {
                                    height: "h-40",
                                    from: "amber-200",
                                    to: "yellow-200",
                                    darkFrom: "amber-800",
                                    darkTo: "yellow-800",
                                  },
                                  {
                                    height: "h-56",
                                    from: "green-200",
                                    to: "emerald-200",
                                    darkFrom: "green-800",
                                    darkTo: "emerald-800",
                                  },
                                  {
                                    height: "h-36",
                                    from: "red-200",
                                    to: "rose-200",
                                    darkFrom: "red-800",
                                    darkTo: "rose-800",
                                  },
                                ].map((item, index) => (
                                  <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{
                                      scale: 1.02,
                                      rotate: Math.random() * 3 - 1.5,
                                      transition: { duration: 0.2 },
                                    }}
                                    className={`${item.height} bg-gradient-to-br from-${item.from} to-${item.to} dark:from-${item.darkFrom} dark:to-${item.darkTo} rounded-lg break-inside-avoid flex items-center justify-center cursor-pointer`}
                                  >
                                    <ImageIcon className="h-8 w-8 text-white" />
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    )}

                    {activeStyle === "corporate" && (
                      <div className="absolute inset-0 bg-white dark:bg-zinc-900 flex flex-col">
                        {/* Corporate Template Header */}
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center"
                        >
                          <div
                            className={`flex items-center gap-2 ${fontChoice === "classic" ? "font-serif" : "font-sans"}`}
                          >
                            <motion.div
                              whileHover={{ rotate: 180 }}
                              transition={{ duration: 0.5 }}
                              className={`h-8 w-8 rounded-sm ${
                                currentColorTheme === "purple"
                                  ? "bg-purple-600"
                                  : currentColorTheme === "blue"
                                    ? "bg-blue-600"
                                    : "bg-green-600"
                              }`}
                            ></motion.div>
                            <div className="text-xl font-bold">JOHNSON & CO.</div>
                          </div>
                          <div className="flex gap-6">
                            {["Services", "Portfolio", "Team", "Contact"].map((item) => (
                              <motion.div
                                key={item}
                                whileHover={{
                                  y: -2,
                                  color:
                                    currentColorTheme === "purple"
                                      ? "#9333ea"
                                      : currentColorTheme === "blue"
                                        ? "#2563eb"
                                        : "#16a34a",
                                }}
                                className="text-sm cursor-pointer"
                              >
                                {item}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Corporate Template Content */}
                        <div className="flex-1 p-6 overflow-auto">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mb-8"
                          >
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className={`h-40 w-full ${
                                currentColorTheme === "purple"
                                  ? "bg-purple-100 dark:bg-purple-900"
                                  : currentColorTheme === "blue"
                                    ? "bg-blue-100 dark:bg-blue-900"
                                    : "bg-green-100 dark:bg-green-900"
                              } flex items-center justify-center mb-8 relative overflow-hidden group`}
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                              />
                              <div
                                className={`text-2xl font-bold ${
                                  currentColorTheme === "purple"
                                    ? "text-purple-600"
                                    : currentColorTheme === "blue"
                                      ? "text-blue-600"
                                      : "text-green-600"
                                } ${fontChoice === "classic" ? "font-serif" : "font-sans"}`}
                              >
                                Our Portfolio
                              </div>
                            </motion.div>

                            <h3
                              className={`text-xl font-medium mb-4 ${fontChoice === "classic" ? "font-serif" : "font-sans"}`}
                            >
                              Recent Projects
                            </h3>

                            {layoutChoice === "grid" ? (
                              <motion.div
                                variants={staggerContainerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-3 gap-4"
                              >
                                {["Alpha", "Beta", "Gamma"].map((project, index) => (
                                  <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="flex flex-col cursor-pointer"
                                  >
                                    <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 mb-2 rounded overflow-hidden">
                                      <motion.div
                                        className="w-full h-full bg-gradient-to-br from-zinc-300 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                      />
                                    </div>
                                    <div className="text-sm font-medium">Project {project}</div>
                                    <div className="text-xs text-zinc-500">
                                      {index === 0 ? "Consulting" : index === 1 ? "Development" : "Strategy"}
                                    </div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            ) : (
                              <motion.div
                                variants={staggerContainerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-2 gap-6"
                              >
                                {[
                                  { name: "Alpha", type: "Consulting", height: "aspect-video" },
                                  { name: "Beta", type: "Development", height: "h-32" },
                                  { name: "Gamma", type: "Strategy", height: "h-40" },
                                  { name: "Delta", type: "Marketing", height: "aspect-square" },
                                ].map((project, index) => (
                                  <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="flex flex-col cursor-pointer"
                                  >
                                    <div
                                      className={`${project.height} bg-zinc-200 dark:bg-zinc-800 mb-2 rounded overflow-hidden`}
                                    >
                                      <motion.div
                                        className="w-full h-full bg-gradient-to-br from-zinc-300 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                      />
                                    </div>
                                    <div className="text-sm font-medium">Project {project.name}</div>
                                    <div className="text-xs text-zinc-500">{project.type}</div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Templates Section */}
      <section id="templates" ref={templatesRef} className="py-20 bg-zinc-100 dark:bg-zinc-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isTemplatesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isTemplatesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Professional Portfolio Templates
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isTemplatesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Choose from our collection of professionally designed templates to showcase your work in style.
            </motion.p>
          </motion.div>

          <Tabs defaultValue="all" className="w-full">

            <TabsContent value="all" className="mt-0">
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                animate={isTemplatesInView ? "visible" : "hidden"}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <TemplateCard
                  title="Minimal Portfolio"
                  category="minimal"
                  description="Clean and elegant design focused on showcasing your work"
                  image="/placeholder.svg?height=400&width=600"
                  popular={true}
                  index={0}
                />

                <TemplateCard
                  title="Corporate Profile"
                  category="corporate"
                  description="Professional template for business portfolios"
                  image="/placeholder.svg?height=400&width=600"
                  popular={false}
                  index={2}
                />

                <TemplateCard
                  title="Creative Porfolio"
                  category="creative"
                  description="Vibrant template for design studios and agencies"
                  image="/placeholder.svg?height=400&width=600"
                  popular={true}
                  index={4}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="minimal" className="mt-0">
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                animate={isTemplatesInView ? "visible" : "hidden"}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <TemplateCard
                  title="Minimal Portfolio"
                  category="minimal"
                  description="Clean and elegant design focused on showcasing your work"
                  image="/placeholder.svg?height=400&width=600"
                  popular={true}
                  index={0}
                />

                <TemplateCard
                  title="Minimal Gallery"
                  category="minimal"
                  description="Simple gallery-focused template for visual artists"
                  image="/placeholder.svg?height=400&width=600"
                  popular={false}
                  index={1}
                />

                <TemplateCard
                  title="Minimal Resume"
                  category="minimal"
                  description="Clean resume template with focus on readability"
                  image="/placeholder.svg?height=400&width=600"
                  popular={false}
                  index={2}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="creative" className="mt-0">
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                animate={isTemplatesInView ? "visible" : "hidden"}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <TemplateCard
                  title="Creative Showcase"
                  category="creative"
                  description="Bold and colorful template for creative professionals"
                  image="/placeholder.svg?height=400&width=600"
                  popular={false}
                  index={0}
                />

                <TemplateCard
                  title="Creative Studio"
                  category="creative"
                  description="Vibrant template for design studios and agencies"
                  image="/placeholder.svg?height=400&width=600"
                  popular={true}
                  index={1}
                />

                <TemplateCard
                  title="Artist Portfolio"
                  category="creative"
                  description="Expressive template for artists and illustrators"
                  image="/placeholder.svg?height=400&width=600"
                  popular={false}
                  index={2}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="corporate" className="mt-0">
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                animate={isTemplatesInView ? "visible" : "hidden"}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <TemplateCard
                  title="Corporate Profile"
                  category="corporate"
                  description="Professional template for business portfolios"
                  image="/placeholder.svg?height=400&width=600"
                  popular={false}
                  index={0}
                />

                <TemplateCard
                  title="Executive Resume"
                  category="corporate"
                  description="Polished template for executives and consultants"
                  image="/placeholder.svg?height=400&width=600"
                  popular={false}
                  index={1}
                />

                <TemplateCard
                  title="Business Consulting"
                  category="corporate"
                  description="Sophisticated template for consultants and agencies"
                  image="/placeholder.svg?height=400&width=600"
                  popular={true}
                  index={2}
                />
              </motion.div>
            </TabsContent>
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTemplatesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                View All Templates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="container mx-auto py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isFeaturesInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Designed for Professionals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            Our templates are crafted with attention to detail, ensuring your portfolio stands out with professional
            quality.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={<Palette className="h-10 w-10 text-purple-600" />}
            title="Customizable Designs"
            description="Personalize colors, fonts, and layouts to match your personal brand and style preferences."
          />

          <FeatureCard
            icon={<Layout className="h-10 w-10 text-purple-600" />}
            title="Responsive Layouts"
            description="All templates are fully responsive and look great on desktops, tablets, and mobile devices."
          />

          <FeatureCard
            icon={<Sliders className="h-10 w-10 text-purple-600" />}
            title="Easy Customization"
            description="Our intuitive editor makes it simple to customize your portfolio without coding knowledge."
          />

          <FeatureCard
            icon={<Globe className="h-10 w-10 text-purple-600" />}
            title="Custom Domain"
            description="Connect your own domain name to create a professional web presence for your portfolio."
          />

          <FeatureCard
            icon={<Zap className="h-10 w-10 text-purple-600" />}
            title="Fast Performance"
            description="Optimized templates ensure your portfolio loads quickly and performs smoothly for visitors."
          />

          <FeatureCard
            icon={<Share2 className="h-10 w-10 text-purple-600" />}
            title="Social Integration"
            description="Easily connect your social media profiles and share your work across platforms."
          />
        </motion.div>

        {/* Expandable Feature Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden"
        >
          <motion.div
            className="p-8 cursor-pointer"
            onClick={() => setIsFeatureExpanded(!isFeatureExpanded)}
            whileHover={{ backgroundColor: "rgba(147, 51, 234, 0.05)" }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">How It Works</h3>
              <motion.div animate={{ rotate: isFeatureExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>

          <AnimatePresence>
            {isFeatureExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <div className="p-8 pt-0">
                  <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/2">
                        <h4 className="text-xl font-semibold mb-4">Create Your Portfolio in 4 Steps</h4>
                        <motion.ol
                          variants={staggerContainerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          {[
                            {
                              title: "Choose your template",
                              description: "Select from minimal, creative, or corporate styles",
                            },
                            {
                              title: "Customize your design",
                              description: "Adjust colors, fonts, and layout preferences",
                            },
                            {
                              title: "Add your content",
                              description: "Upload your projects, bio, and contact information",
                            },
                            {
                              title: "Publish your portfolio",
                              description: "Share your professional portfolio with the world",
                            },
                          ].map((step, index) => (
                            <motion.li key={index} variants={itemVariants} className="flex gap-3" whileHover={{ x: 5 }}>
                              <motion.div
                                whileHover={{ scale: 1.2, backgroundColor: "#9333ea" }}
                                className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600"
                              >
                                {index + 1}
                              </motion.div>
                              <div>
                                <p className="font-medium">{step.title}</p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{step.description}</p>
                              </div>
                            </motion.li>
                          ))}
                        </motion.ol>
                      </div>

                      <div className="md:w-1/2 flex items-center justify-center">
                        <motion.div
                          variants={floatingVariants}
                          animate="animate"
                          className="relative w-full max-w-sm h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl overflow-hidden"
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="absolute inset-1 bg-white dark:bg-zinc-900 rounded-lg p-4"
                          >
                            <div className="flex items-center gap-2 mb-4">
                              <motion.div whileHover={{ scale: 1.2 }} className="h-3 w-3 rounded-full bg-red-500" />
                              <motion.div whileHover={{ scale: 1.2 }} className="h-3 w-3 rounded-full bg-yellow-500" />
                              <motion.div whileHover={{ scale: 1.2 }} className="h-3 w-3 rounded-full bg-green-500" />
                            </div>

                            <motion.div
                              variants={staggerContainerVariants}
                              initial="hidden"
                              animate="visible"
                              className="space-y-2"
                            >
                              <motion.div
                                variants={itemVariants}
                                className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded"
                              />
                              <motion.div
                                variants={itemVariants}
                                className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded"
                              />
                              <motion.div
                                variants={itemVariants}
                                className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-700 rounded"
                              />
                              <motion.div
                                variants={itemVariants}
                                className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-700 rounded"
                              />
                            </motion.div>

                            <motion.div
                              variants={staggerContainerVariants}
                              initial="hidden"
                              animate="visible"
                              className="mt-6 grid grid-cols-2 gap-2"
                            >
                              <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="h-20 bg-zinc-200 dark:bg-zinc-700 rounded"
                              />
                              <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="h-20 bg-zinc-200 dark:bg-zinc-700 rounded"
                              />
                              <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="h-20 bg-zinc-200 dark:bg-zinc-700 rounded"
                              />
                              <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="h-20 bg-zinc-200 dark:bg-zinc-700 rounded"
                              />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8 md:p-12 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Ready to Showcase Your Work?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8"
              >
                Join thousands of professionals who have transformed their online presence with our portfolio templates.
                It's completely free!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setCursorHovering(true)}
                  onMouseLeave={() => setCursorHovering(false)}
                >
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 relative group">
                    <span className="relative z-10">Get Started Now</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-100 dark:bg-zinc-900 py-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 mb-6 md:mb-0"
              onMouseEnter={() => setCursorHovering(true)}
              onMouseLeave={() => setCursorHovering(false)}
            >
              <Sparkles className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold">PortfolioTemplates</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-zinc-600 dark:text-zinc-400"
            >
              <p>© {new Date().getFullYear()} PortfolioTemplates. All rights reserved.</p>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

// Component for style option in the interactive selector
interface StyleOptionProps {
  title: string,
  description: string,
  icon: React.ReactNode,
  isActive: boolean,
  onClick: () => void,
}

function StyleOption({ title, description, icon, isActive, onClick } : StyleOptionProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, backgroundColor: isActive ? "" : "rgba(147, 51, 234, 0.05)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-colors ${
        isActive
          ? "bg-purple-100 dark:bg-purple-900/50 border-2 border-purple-600"
          : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-2 border-transparent"
      }`}
    >
      <div className="flex items-start gap-3">
        <motion.div
          animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className={`mt-1 ${isActive ? "text-purple-600" : "text-zinc-500 dark:text-zinc-400"}`}
        >
          {icon}
        </motion.div>
        <div>
          <h4 className={`font-medium ${isActive ? "text-purple-600" : ""}`}>{title}</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Component for feature cards
interface FeatureCardProps {
  icon: React.ReactNode,
  title: string,
  description: string;
}
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="mb-4"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
    </motion.div>
  )
}

// Component for template cards
interface TemplateCardProps {
  title: string,
  category: string,
  description: string,
  image?: string,
  popular?: boolean,
  index: number,
}
function TemplateCard({ title, category, description, image, popular, index }: TemplateCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 relative"
    >
      {popular && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 500 }}
          className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full z-10"
        >
          Popular
        </motion.div>
      )}

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="h-48 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden"
      >
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end"
        >
          <div className="p-4">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-medium text-white bg-black/30 px-2 py-1 rounded-full"
            >
              {category}
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Preview
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" variant="outline">
              Use Template
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}