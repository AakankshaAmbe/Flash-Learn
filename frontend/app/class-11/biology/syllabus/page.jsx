"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Play } from "lucide-react"
import { motion } from "framer-motion"

export default function BiologySyllabusPage() {
  const syllabusTopics = [
    {
      chapter: "Chapter 1",
      title: "The Living World",
      topics: [
        "Diversity of Life",
        "Characteristics of Living Organisms",
        "Taxonomic Principles",
      ],
      slug: "the-living-world",
    },
    {
      chapter: "Chapter 2",
      title: "Biological Classification",
      topics: [
        "Five Kingdoms",
        "Basis of Classification",
        "Linnaean System",
        "Molecular Classification",
      ],
      slug: "biological-classification",
    },
    {
      chapter: "Chapter 3",
      title: "Plant Kingdom",
      topics: [
        "Algae",
        "Fungi",
        "Bryophytes",
        "Pteridophytes",
        "Gymnosperms",
        "Angiosperms",
      ],
      slug: "plant-kingdom",
    },
    {
      chapter: "Chapter 4",
      title: "Animal Kingdom",
      topics: [
        "Porifera",
        "Cnidaria",
        "Platyhelminthes",
        "Annelida",
        "Arthropoda",
        "Mollusca",
        "Chordata",
      ],
      slug: "animal-kingdom",
    },
    {
      chapter: "Chapter 5",
      title: "Cell Structure and Function",
      topics: [
        "Cell Theory",
        "Prokaryotic vs Eukaryotic Cells",
        "Cell Organelles",
        "Cell Division",
      ],
      slug: "cell-structure",
    },
  ]

  // helper: convert topic name -> slug
  const toSlug = (text) =>
    text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-black relative">
      {/* Animated Background - floating green circles (cells/leaves) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-green-400 rounded-full opacity-30"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 container mx-auto px-4 py-6 flex items-center justify-between"
      >
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-green-400" />
          Biology - Class 11
        </h1>
        <Link href="/class-11">
          <Button
            variant="outline"
            className="text-green-400 border-green-400 hover:bg-green-400/10 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
        </Link>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Biology Syllabus</h2>
          <p className="text-lg text-green-200 max-w-2xl mx-auto">
            Click on any chapter or topic to explore detailed explanations,
            illustrations, and interactive modules.
          </p>
        </motion.div>

        {/* Chapters */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          {syllabusTopics.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.02, x: 10 }}
            >
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {/* Chapter Title */}
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-green-400 font-semibold text-sm">
                        {item.chapter}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Topics as clickable vertical buttons */}
                    <div className="flex flex-col gap-2 mt-2">
                      {item.topics.map((topic, topicIndex) => (
                        <motion.div
                          key={topicIndex}
                          whileHover={{ scale: 1.03, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            href={`/class-11/biology/${item.slug}/${toSlug(topic)}`}
                          >
                            <button className="w-full text-left px-4 py-2 rounded-lg bg-green-500/20 text-green-200 hover:bg-green-400/30 transition-all">
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
