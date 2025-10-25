"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft, Atom } from "lucide-react"
import { motion } from "framer-motion"

export default function PhysicsPage12() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Background Gradient Animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, #0f766e, #1e3a8a, #0f766e)",
            "linear-gradient(45deg, #1e3a8a, #0f766e, #1e3a8a)",
            "linear-gradient(45deg, #0f766e, #1e3a8a, #0f766e)",
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-6 relative z-10"
      >
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">3D Learning Hub</h1>
          </div>
          <Link href="/class-12">
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white/10 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Class 12
            </Button>
          </Link>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotateZ: [0, 360], scale: [1, 1.1, 1] }}
            transition={{
              rotateZ: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            }}
            className="w-24 h-24 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Atom className="h-12 w-12 text-white" />
          </motion.div>
          <h2 className="text-5xl font-bold text-white mb-4">Physics - Class 12</h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Explore the laws of electricity, magnetism, and optics with interactive visualizations to strengthen your concepts.
          </p>
        </motion.div>

        {/* 3D Model Placeholder with Key Topics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-12 text-center relative overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 30% 40%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 30% 40%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10">
              <motion.div
                animate={{ rotateY: [0, 360], scale: [1, 1.2, 1] }}
                transition={{
                  rotateY: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                }}
                className="w-32 h-32 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-full mx-auto mb-8 flex items-center justify-center"
              >
                <Atom className="h-16 w-16 text-white" />
              </motion.div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Interactive Physics Models
              </h3>
              <p className="text-gray-100 mb-8 text-lg">
                Visualize electric fields, magnetic effects, and optical phenomena in 3D.
              </p>

              {/* Key Topics */}
              <div className="grid md:grid-cols-3 gap-6 text-left">
                {[
                  "Electrostatics",
                  "Current Electricity",
                  "Magnetism & Magnetic Effects of Current",
                  "Electromagnetic Induction & AC",
                  "Wave Optics",
                ].map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.2 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  >
                    <div className="w-3 h-3 bg-indigo-400 rounded-full mb-2"></div>
                    <p className="text-white font-medium">{topic}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  )
}
