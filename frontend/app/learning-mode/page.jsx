"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, ArrowLeft, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

export default function LearningModePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-hidden">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-6 relative z-10"
      >
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
             Learning Hub
            </h1>
          </div>
          <Link href="/home">
            <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </nav>
      </motion.header>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Choose Your Class
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Select your grade level to access curriculum-specific 3D models and immersive learning environments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{
              scale: 1.05,
              rotateY: 8,
              rotateX: 5,
              y: -15,
            }}
            className="perspective-1000"
          >
            <Link href="/class-11">
              <Card className="p-10 bg-gradient-to-tr from-cyan-500 to-blue-700 rounded-xl shadow-2xl text-white border-0 cursor-pointer group relative overflow-hidden h-80 flex flex-col justify-center items-center text-center hover:shadow-cyan-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(29, 78, 216, 0.1))",
                      "linear-gradient(45deg, rgba(29, 78, 216, 0.1), rgba(6, 182, 212, 0.1))",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50"
                    whileHover={{ rotateY: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <GraduationCap className="h-12 w-12 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4">Class 11</h3>
                  <p className="text-cyan-100 text-lg mb-6">Foundation concepts in Physics, Chemistry, and Biology</p>
                </div>

                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-cyan-300/20 rounded-full blur-lg" />
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{
              scale: 1.05,
              rotateY: -8,
              rotateX: 5,
              y: -15,
            }}
            className="perspective-1000"
          >
            <Link href="/class-12">
              <Card className="p-10 bg-gradient-to-tr from-cyan-500 to-blue-700 rounded-xl shadow-2xl text-white border-0 cursor-pointer group relative overflow-hidden h-80 flex flex-col justify-center items-center text-center hover:shadow-cyan-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(29, 78, 216, 0.1))",
                      "linear-gradient(45deg, rgba(29, 78, 216, 0.1), rgba(6, 182, 212, 0.1))",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50"
                    whileHover={{ rotateY: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <GraduationCap className="h-12 w-12 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4">Class 12</h3>
                  <p className="text-cyan-100 text-lg mb-6">Advanced topics and exam preparation</p>
                </div>

                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-cyan-300/20 rounded-full blur-lg" />
              </Card>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
