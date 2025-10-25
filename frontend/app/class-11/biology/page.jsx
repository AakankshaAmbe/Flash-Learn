"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft, Dna } from "lucide-react"
import { motion } from "framer-motion"

export default function BiologyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #059669, #dc2626, #059669)",
            "linear-gradient(135deg, #dc2626, #059669, #dc2626)",
            "linear-gradient(135deg, #059669, #dc2626, #059669)",
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Floating DNA strands animation */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          >
            <Dna className="h-6 w-6 text-white/40" />
          </motion.div>
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
          <Link href="/class-11">
            <Button variant="outline" className="text-white border-white hover:bg-white/10 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Class 11
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
            animate={{
              rotateZ: [0, 360],
              scale: [1, 1.15, 1],
            }}
            transition={{
              rotateZ: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
            }}
            className="w-24 h-24 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Dna className="h-12 w-12 text-white" />
          </motion.div>
          <h2 className="text-5xl font-bold text-white mb-4">Biology - Class 11</h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Explore the fascinating world of life. From DNA structures to cellular processes and organ systems.
          </p>
        </motion.div>

        {/* 3D Model Placeholder */}
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
                  "radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 75% 75%, rgba(220, 38, 38, 0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10">
              <motion.div
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, -360],
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-32 h-32 bg-gradient-to-r from-green-500 to-red-500 rounded-full mx-auto mb-8 flex items-center justify-center"
              >
                <Dna className="h-16 w-16 text-white" />
              </motion.div>

              <h3 className="text-3xl font-bold text-white mb-4">Interactive Biology Models</h3>
              <p className="text-gray-100 mb-8 text-lg">
                Journey through DNA double helixes, cellular structures, and complex biological systems in stunning
                detail.
              </p>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                {["DNA Structure & Replication", "Cell Division & Mitosis", "Organ Systems & Physiology"].map(
                  (topic, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.2 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                    >
                      <div className="w-3 h-3 bg-green-400 rounded-full mb-2"></div>
                      <p className="text-white font-medium">{topic}</p>
                    </motion.div>
                  ),
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  )
}
