"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Zap, Brain } from "lucide-react"


export default function PhysicalWorldTopic() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 border-b border-white/10"
      >
        <div className="flex items-center gap-4">
          <Link href="/class-11/physics/syllabus" className="text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Unit 1: Physical World</h1>
            <p className="text-white/70">Class 11 Physics</p>
          </div>
        </div>
      </motion.header>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Left Panel - 70% */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-[70%] p-6 overflow-y-auto"
        >
          {/* Topic Info Container */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">Physical World & Measurement</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Explore the fundamental concepts of physics, understanding how we observe and measure the physical world
              around us. This unit introduces the scope of physics, its relation with other sciences, and the importance
              of measurement in scientific investigations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-teal-500/20 rounded-xl p-4 border border-teal-400/30">
                <h3 className="text-teal-300 font-semibold mb-2">Key Concepts</h3>
                <ul className="text-white/80 space-y-1 text-sm">
                  <li>• Scope and excitement of Physics</li>
                  <li>• Physics, technology and society</li>
                  <li>• Fundamental forces in nature</li>
                  <li>• Nature of physical laws</li>
                </ul>
              </div>
              <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30">
                <h3 className="text-blue-300 font-semibold mb-2">Learning Outcomes</h3>
                <ul className="text-white/80 space-y-1 text-sm">
                  <li>• Understand physics scope</li>
                  <li>• Identify fundamental forces</li>
                  <li>• Appreciate physics in daily life</li>
                  <li>• Recognize measurement importance</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - 30% */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-[30%] p-6 border-l border-white/10"
        >
          <h3 className="text-white font-semibold mb-6 text-lg">Learning Tools</h3>

          <div className="space-y-4">
            {/* Show Flash Cards */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/class-11/physics/flashcards")}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white p-4 rounded-2xl shadow-lg shadow-teal-500/25 transition-all duration-300 flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Show Flash Cards</span>
            </motion.button>

            {/* ✅ Practical Flash Card → Go to Flashcard Generator */}
            <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/class-11/physics/3d_model")}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-400 hover:to-pink-500 text-white p-4 rounded-2xl shadow-lg shadow-pink-500/25 transition-all duration-300 flex items-center gap-3"
          >
            <Zap className="w-5 h-5" />
            <span className="font-medium"> 3D Model</span>
</motion.button>


            {/* Generate Quiz */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
               onClick={() => router.push("/class-11/physics/quiz")}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white p-4 rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 flex items-center gap-3"
            >
              <Brain className="w-5 h-5" />
              <span className="font-medium">Generate Quiz</span>
            </motion.button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <h4 className="text-white/90 font-medium mb-2">Quick Stats</h4>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>2 weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span className="text-green-400">Beginner</span>
              </div>
              <div className="flex justify-between">
                <span>Progress:</span>
                <span className="text-teal-400">0%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
