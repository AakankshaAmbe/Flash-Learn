"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Beaker, Play } from "lucide-react"
import { motion } from "framer-motion"

export default function ChemistrySyllabusPage() {
  const syllabusTopics = [
    {
      chapter: "Chapter 1",
      title: "Some Basic Concepts of Chemistry",
      topics: ["Matter and its Nature", "Laws of Chemical Combination", "Atomic and Molecular Masses", "Mole Concept"],
      slug: "basic-concepts",
    },
    {
      chapter: "Chapter 2",
      title: "Structure of Atom",
      topics: ["Discovery of Electron", "Atomic Models", "Quantum Mechanical Model", "Electronic Configuration"],
      slug: "atomic-structure",
    },
    {
      chapter: "Chapter 3",
      title: "Classification of Elements",
      topics: ["Modern Periodic Law", "Periodic Trends", "s-Block Elements", "p-Block Elements"],
      slug: "periodic-classification",
    },
    {
      chapter: "Chapter 4",
      title: "Chemical Bonding",
      topics: ["Ionic Bonding", "Covalent Bonding", "Coordinate Bonding", "Metallic Bonding"],
      slug: "chemical-bonding",
    },
    {
      chapter: "Chapter 5",
      title: "States of Matter",
      topics: ["Gaseous State", "Liquid State", "Solid State", "Intermolecular Forces"],
      slug: "states-matter",
    },
  ]

  const toSlug = (text) =>
    text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-30"
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
            <Beaker className="h-8 w-8 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white">Chemistry - Class 11</h1>
          </div>
          <Link href="/class-11">
            <Button
              variant="outline"
              className="text-emerald-400 border-emerald-400 hover:bg-emerald-400/10 bg-transparent"
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
          <p className="text-lg text-emerald-200 max-w-2xl mx-auto">
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
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-emerald-400 font-semibold text-sm">{item.chapter}</span>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
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
                            href={`/class-11/chemistry/${item.slug}/${toSlug(topic)}`}
                          >
                            <button className="w-full text-left px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-200 hover:bg-emerald-400/30 transition-all">
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
