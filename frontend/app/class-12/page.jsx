"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, ArrowLeft, Atom, Beaker, Dna } from "lucide-react"
import { motion } from "framer-motion"

export default function Class12Page() {
  const subjects = [
    {
      name: "Physics",
      icon: Atom,
      image: "/physics.jpg", // ✅ your image in public folder
      color: "from-blue-500 to-cyan-500",
      href: "/class-12/physics/syllabus",
      topics: [
        "Electrostatics",
        "Current Electricity",
        "Magnetic Effects of Current & Magnetism",
        "Electromagnetic Induction & AC",
        "Wave Optics"
      ],
      description: "Explore advanced physics concepts through interactive 3D models and problem-solving practice.",
    },
    {
      name: "Chemistry",
      icon: Beaker,
      image: "/chemistry.jpg", // ✅ your image in public folder
      color: "from-green-500 to-emerald-500",
      href: "/class-12/chemistry/syllabus",
      topics: [
        "Solid State & Solutions",
        "Electrochemistry",
        "Chemical Kinetics",
        "P-Block Elements (16, 17, 18)",
        "Aldehydes, Ketones & Carboxylic Acids"
      ],
      description: "Understand complex chemical processes with 3D molecular structures and visualizations.",
    },
    {
      name: "Biology",
      icon: Dna,
      image: "/biology.jpg", // ✅ your image in public folder
      color: "from-purple-500 to-pink-500",
      href: "/class-12/biology/syllabus",
      topics: [
        "Human Reproduction",
        "Reproductive Health",
        "Principles of Inheritance & Variation",
        "Molecular Basis of Inheritance",
        "Human Health & Disease"
      ],
      description: "Dive deeper into human biology and genetics with interactive 3D learning tools.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-6"
      >
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900"> Learning Hub</h1>
          </div>
          <Link href="/learning-mode">
            <Button variant="outline" className="text-indigo-600 border-indigo-600 hover:bg-indigo-50 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Classes
            </Button>
          </Link>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Class 12 - Science Subjects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a subject to explore interactive 3D models and enhance your understanding of key concepts.
          </p>
        </motion.div>

        {/* Subject Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {subjects.map((subject, index) => {
            const IconComponent = subject.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  y: -10,
                }}
              >
                <Link href={subject.href}>
                  <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div className="text-center mb-6">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                        whileHover={{ rotateY: 180, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{subject.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                    </div>

                    {/* ✅ Image Section (replaces placeholder) */}
                    <div className="mb-6">
                      <div className={`w-full h-40 bg-gradient-to-r ${subject.color} rounded-lg overflow-hidden relative`}>
                        <motion.img
                          src={subject.image}
                          alt={subject.name}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>

                    {/* Key Topics */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Topics:</h4>
                      <div className="space-y-1">
                        {subject.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="text-sm text-gray-600 flex items-center">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${subject.color} hover:opacity-90 text-white`}>
                      Explore {subject.name}
                    </Button>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
