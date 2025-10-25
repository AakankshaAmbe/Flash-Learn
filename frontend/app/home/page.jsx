"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, GraduationCap, BookOpen } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [email, setEmail] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail")
    if (storedEmail) setEmail(storedEmail)

    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-x-hidden relative">
      
       {/* Profile Circle + Dropdown */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-center">
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center cursor-pointer text-white text-xl font-bold shadow-lg"
        >
          {email ? email[0].toUpperCase() : "U"}
        </div>

        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-2 w-48 bg-slate-800 text-white rounded-lg shadow-lg p-4 flex flex-col items-center"
          >
            <p className="text-sm mb-2 break-all text-center">{email}</p>
            <Button
              onClick={handleLogout}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-md w-full"
            >
              Logout
            </Button>
          </motion.div>
        )}
      </div>


      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative">
        <motion.div style={{ y: y1, opacity }} className="text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Discover Science 
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
          >
            in a New Dimension
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-2xl md:text-3xl text-gray-300 mb-12"
          >
            Want to dive deeper?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <Button
              onClick={scrollToNext}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300"
            >
              Explore More Below
            </Button>
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="cursor-pointer"
            onClick={scrollToNext}
          >
            <ChevronDown className="h-8 w-8 text-cyan-400" />
          </motion.div>
        </motion.div>

        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Immerse Yourself Section */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden"
      >
        <motion.div style={{ y: y2 }} className="text-center max-w-4xl mx-auto relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Immerse Yourself in Science
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12 leading-relaxed"
          >
            Explore Physics, Chemistry, and Biology like never before with interactive models and 
            engaging learning environments tailored for Class 11 and 12 students. 
            Understand complex concepts through visually immersive and interactive lessons
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/learning-mode">
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-12 py-6 text-xl rounded-full shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300"
                >
                  Begin Immersive Learning
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Bubbles */}
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
      </motion.section>

      {/* --- New Flashcard Section Added --- */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden"
      >
        <h4 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          Select Flashcard Class
        </h4>

        <p className="text-xl text-gray-300 max-w-3xl text-center mb-12">
          Pick your grade to start practicing with interactive 3D flashcards for Class 11 and Class 12.
        </p>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <Link href="/class-11">
            <Card className="p-10 bg-gradient-to-tr from-cyan-500 to-blue-700 rounded-xl shadow-2xl text-white cursor-pointer hover:shadow-cyan-500/30 transition-all duration-500 text-center">
              <div className="mb-4 flex justify-center">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Class 11</h3>
              <p>Foundation flashcards for Physics, Chemistry, and Biology</p>
            </Card>
          </Link>

          <Link href="/class-12">
            <Card className="p-10 bg-gradient-to-tr from-cyan-500 to-blue-700 rounded-xl shadow-2xl text-white cursor-pointer hover:shadow-cyan-500/30 transition-all duration-500 text-center">
              <div className="mb-4 flex justify-center">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Class 12</h3>
              <p>Advanced flashcards and exam prep</p>
            </Card>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
