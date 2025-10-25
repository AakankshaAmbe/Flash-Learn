"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Atom, Play } from "lucide-react"
import { motion } from "framer-motion"

export default function PhysicsSyllabusPage() {
  const syllabusTopics = [
    {
      chapter: "Chapter 1",
      title: "Physical World",
      topics: [
        "Nature of Physical Laws",
        "Physics and Technology",
        "Scope and Excitement of Physics",
      ],
      slug: "unit-1-physical-world",
    },
    {
      chapter: "Chapter 2",
      title: "Units and Measurements",
      topics: [
        "International System of Units",
        "Measurement of Length",
        "Significant Figures",
        "Dimensional Analysis",
      ],
      slug: "units-measurements",
    },
    {
      chapter: "Chapter 3",
      title: "Motion in a Straight Line",
      topics: [
        "Position and Displacement",
        "Velocity",
        "Acceleration",
        "Kinematic Equations",
      ],
      slug: "motion-straight-line",
    },
    {
      chapter: "Chapter 4",
      title: "Motion in a Plane",
      topics: [
        "Vector Addition",
        "Projectile Motion",
        "Uniform Circular Motion",
        "Relative Velocity",
      ],
      slug: "motion-plane",
    },
  ]

  // helper to convert topic name -> slug (URL friendly)
  const toSlug = (text) =>
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
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
            <Atom className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Physics - Class 11</h1>
          </div>
          <Link href="/class-11">
            <Button
              variant="outline"
              className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10 bg-transparent"
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
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Click on any topic to explore interactive 3D models and detailed explanations. Or use the play button to open the full chapter.
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
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-cyan-400 font-semibold text-sm">
                        {item.chapter}
                      </span>
                      <h3 className="text-xl font-bold text-white transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Topics as buttons */}
                    <div className="flex flex-col gap-2 mt-2">
                      {item.topics.map((topic, topicIndex) => (
                        <Link
                          key={topicIndex}
                          href={`/class-11/physics/${item.slug}/${toSlug(topic)}`}
                        >
                          <motion.button
                            whileHover={{ scale: 1.03, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full text-left px-4 py-2 rounded-lg bg-blue-500/20 text-blue-200 hover:bg-cyan-400/30 transition-all"
                          >
                            {topic}
                          </motion.button>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Play button → opens full chapter */}
                  <Link href={`/class-11/physics/${item.slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      className="ml-4 cursor-pointer mt-1"
                    >
                      <Play className="h-6 w-6 text-cyan-400" />
                    </motion.div>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
