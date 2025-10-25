"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, FlaskConical, Play } from "lucide-react"
import { motion } from "framer-motion"

export default function ChemistrySyllabusPage12() {
  const syllabusTopics = [
    {
      chapter: "Chapter 1",
      title: "Solid State",
      topics: [
        "Classification of Solids",
        "Crystal Lattices & Unit Cells",
        "Packing Efficiency",
        "Crystal Defects",
      ],
      slug: "solid-state",
    },
    {
      chapter: "Chapter 2",
      title: "Solutions",
      topics: [
        "Concentration of Solutions",
        "Raoult’s Law",
        "Colligative Properties",
        "Abnormal Molar Masses",
      ],
      slug: "solutions",
    },
    {
      chapter: "Chapter 3",
      title: "Electrochemistry",
      topics: [
        "Redox Reactions",
        "Electrochemical Cells",
        "Nernst Equation",
        "Conductance & Molar Conductivity",
      ],
      slug: "electrochemistry",
    },
    {
      chapter: "Chapter 4",
      title: "Chemical Kinetics",
      topics: [
        "Rate of Reaction",
        "Order & Molecularity",
        "Integrated Rate Equations",
        "Temperature Dependence of Rate",
      ],
      slug: "chemical-kinetics",
    },
    {
      chapter: "Chapter 5",
      title: "Surface Chemistry",
      topics: [
        "Adsorption",
        "Catalysis",
        "Colloids",
        "Emulsions",
      ],
      slug: "surface-chemistry",
    },
  ]

  const toSlug = (text) =>
    text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-30"
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
            <FlaskConical className="h-8 w-8 text-pink-400" />
            <h1 className="text-2xl font-bold text-white">Chemistry - Class 12</h1>
          </div>
          <Link href="/class-12">
            <Button
              variant="outline"
              className="text-pink-400 border-pink-400 hover:bg-pink-400/10 bg-transparent"
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
          <h2 className="text-4xl font-bold text-white mb-4">Chemistry Syllabus</h2>
          <p className="text-lg text-pink-200 max-w-2xl mx-auto">
            Click on any topic to explore detailed explanations, visualizations, and real-life examples.
            You can also open the complete chapter using the play button.
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
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-pink-400 font-semibold text-sm">{item.chapter}</span>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-col gap-2 mt-2">
                      {item.topics.map((topic, topicIndex) => (
                        <motion.div
                          key={topicIndex}
                          whileHover={{ scale: 1.03, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link href={`/class-12/chemistry/${item.slug}/${toSlug(topic)}`}>
                            <button className="w-full text-left px-4 py-2 rounded-lg bg-pink-500/20 text-pink-200 hover:bg-pink-400/30 transition-all">
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
