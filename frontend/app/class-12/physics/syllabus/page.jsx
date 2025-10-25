"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Play } from "lucide-react"
import { motion } from "framer-motion"

export default function PhysicsSyllabusPage12() {
  const syllabusTopics = [
    {
      chapter: "Chapter 1",
      title: "Electrostatics",
      topics: [
        "Electric Charges & Fields",
        "Gauss’s Law",
        "Electrostatic Potential",
        "Capacitance",
      ],
      slug: "electrostatics",
    },
    {
      chapter: "Chapter 2",
      title: "Current Electricity",
      topics: [
        "Ohm’s Law",
        "Kirchhoff’s Laws",
        "Resistivity & Conductivity",
        "Combination of Resistors",
      ],
      slug: "current-electricity",
    },
    {
      chapter: "Chapter 3",
      title: "Magnetism & EMI",
      topics: [
        "Moving Charges & Magnetism",
        "Magnetic Properties of Materials",
        "Electromagnetic Induction",
        "Alternating Current",
      ],
      slug: "magnetism-emi",
    },
    {
      chapter: "Chapter 4",
      title: "Optics",
      topics: [
        "Ray Optics",
        "Wave Optics",
        "Interference & Diffraction",
        "Polarization",
      ],
      slug: "optics",
    },
    {
      chapter: "Chapter 5",
      title: "Modern Physics",
      topics: [
        "Dual Nature of Radiation",
        "Atoms & Nuclei",
        "Semiconductor Devices",
        "Communication Systems",
      ],
      slug: "modern-physics",
    },
  ]

  // helper to convert topic name -> slug (URL friendly)
  const toSlug = (text) =>
    text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 container mx-auto px-4 py-6"
      >
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">Physics - Class 12</h1>
          </div>
          <Link href="/class-12">
            <Button
              variant="outline"
              className="text-purple-400 border-purple-400 hover:bg-purple-400/10 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subjects
            </Button>
          </Link>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Physics Syllabus</h2>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Click on any topic to explore interactive explanations, diagrams, and problems.
            Or use the play button to open the full chapter.
          </p>
        </motion.div>

        {/* Syllabus Topics */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          {syllabusTopics.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.02, x: 10 }}
            >
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-purple-400 font-semibold text-sm">
                        {item.chapter}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Topics as vertical interactive buttons */}
                    <div className="flex flex-col gap-2 mt-2">
                      {item.topics.map((topic, topicIndex) => (
                        <motion.div
                          key={topicIndex}
                          whileHover={{ scale: 1.03, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            href={`/class-12/physics/${item.slug}/${toSlug(topic)}`}
                          >
                            <button className="w-full text-left px-4 py-2 rounded-lg bg-purple-500/20 text-purple-200 hover:bg-purple-400/30 transition-all">
                              {topic}
                            </button>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>


                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
