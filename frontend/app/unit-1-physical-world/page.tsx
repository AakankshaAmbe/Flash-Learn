"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Atom, FlaskConical, BookOpen, HelpCircle, Zap, Send, Loader2 } from "lucide-react"
import Link from "next/link"

interface Flashcard {
  id: number
  question: string
  answer: string
}

const TypingAnimation = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 30)
      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return <span>{displayText}</span>
}

const FlashcardComponent = ({ flashcard }: { flashcard: Flashcard }) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleShowAnswer = () => {
    setShowAnswer(true)
    setIsAnimating(true)
  }

  const colors = ["from-teal-500 to-cyan-500", "from-blue-500 to-indigo-500", "from-pink-500 to-rose-500"]
  const randomColor = colors[flashcard.id % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
        <div className={`h-2 bg-gradient-to-r ${randomColor}`} />
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-900 leading-tight">{flashcard.question}</h3>

            <AnimatePresence>
              {!showAnswer ? (
                <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center">
                  <Button
                    onClick={handleShowAnswer}
                    variant="outline"
                    className="bg-slate-50 hover:bg-slate-100 border-slate-200"
                  >
                    Show Answer
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                >
                  <div className="text-slate-700">
                    {isAnimating ? (
                      <TypingAnimation text={flashcard.answer} onComplete={() => setIsAnimating(false)} />
                    ) : (
                      flashcard.answer
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const revisionTopics = [
  {
    id: 1,
    title: "What is Physics?",
    description: "Understanding the fundamental nature of physics and its scope",
    icon: Atom,
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Physics and Mathematics",
    description: "The role of mathematics as the language of physics",
    icon: Zap,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 3,
    title: "Physics and Technology",
    description: "How physics drives technological advancement",
    icon: FlaskConical,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    title: "Scope and Excitement",
    description: "The breadth and wonder of physics in our world",
    icon: BookOpen,
    color: "from-purple-500 to-violet-500",
  },
]

const actionButtons = [
  {
    id: 1,
    title: "Show 3D Model",
    description: "Interactive 3D visualizations",
    icon: Atom,
    color: "from-teal-500 to-cyan-500",
    action: "3d-model",
  },
  {
    id: 2,
    title: "Show Lab Flashcards",
    description: "Practical experiments and procedures",
    icon: FlaskConical,
    color: "from-blue-500 to-indigo-500",
    action: "lab-flashcards",
  },
  {
    id: 3,
    title: "Show Theory Flashcards",
    description: "Conceptual understanding cards",
    icon: BookOpen,
    color: "from-pink-500 to-rose-500",
    action: "theory-flashcards",
  },
  {
    id: 4,
    title: "Show Important Questions",
    description: "Key questions for exam prep",
    icon: HelpCircle,
    color: "from-purple-500 to-violet-500",
    action: "important-questions",
  },
]

export default function Unit1PhysicalWorld() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)
  const [prompt, setPrompt] = useState("")
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTopicClick = (topicId: number) => {
    setSelectedTopic(selectedTopic === topicId ? null : topicId)
  }

  const generateFlashcards = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt
    if (!finalPrompt.trim()) return

    setLoading(true)
    setError("")
    setFlashcards([])

    try {
      const response = await fetch("http://localhost:5000/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: finalPrompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate flashcards")
      }

      const data = await response.json()
      setFlashcards(data.flashcards || [])
    } catch (err) {
      setError("⚠️ No flashcards found. Please try again.")
      console.error("Error generating flashcards:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleActionClick = (action: string) => {
    if (!selectedTopic) {
      alert("Please select a topic first.")
      return
    }

    const topic = revisionTopics.find((t) => t.id === selectedTopic)
    if (!topic) return

    let contextualPrompt = ""
    switch (action) {
      case "theory-flashcards":
        contextualPrompt = `Give theory flashcards on ${topic.title}`
        break
      case "lab-flashcards":
        contextualPrompt = `Give lab flashcards on ${topic.title}`
        break
      case "important-questions":
        contextualPrompt = `Give important questions on ${topic.title}`
        break
      case "3d-model":
        contextualPrompt = `Give 3D model concepts on ${topic.title}`
        break
    }

    setPrompt(contextualPrompt)
    generateFlashcards(contextualPrompt)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Updated Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">AI 3D Learning</h1>
              <p className="text-slate-600">Unit 1: Physical World - AI-Powered Flashcards</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prompt Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Generate AI Flashcards</h2>
              <div className="flex gap-3">
                <Input
                  placeholder='Type your prompt (e.g., "Give theory flashcards on Brain")'
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && generateFlashcards()}
                  className="flex-1"
                />
                <Button
                  onClick={() => generateFlashcards()}
                  disabled={loading || !prompt.trim()}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revision Topics Section */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Revision Topics</h2>
              <div className="space-y-4">
                {revisionTopics.map((topic, index) => {
                  const Icon = topic.icon
                  const isSelected = selectedTopic === topic.id

                  return (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          isSelected ? "ring-2 ring-teal-500 shadow-lg" : "hover:shadow-md"
                        }`}
                        onClick={() => handleTopicClick(topic.id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${topic.color}`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{topic.title}</CardTitle>
                              <CardDescription className="text-sm">{topic.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <div className="bg-slate-50 rounded-lg p-4">
                                <p className="text-sm text-slate-700">
                                  Selected topic: <span className="font-medium">{topic.title}</span>
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                  Choose an action below to explore this topic further.
                                </p>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Action Buttons Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Learning Actions</h2>
              <div className="grid gap-4">
                {actionButtons.map((button, index) => {
                  const Icon = button.icon

                  return (
                    <motion.div
                      key={button.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="cursor-pointer transition-all duration-300 hover:shadow-lg group"
                        onClick={() => handleActionClick(button.action)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-3 rounded-xl bg-gradient-to-r ${button.color} group-hover:shadow-lg transition-shadow duration-300`}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                                {button.title}
                              </h3>
                              <p className="text-sm text-slate-600">{button.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              {/* Selection Hint */}
              {!selectedTopic && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-lg"
                >
                  <p className="text-sm text-teal-700">
                    💡 <span className="font-medium">Tip:</span> Select a revision topic first, then choose a learning
                    action to explore it in depth.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Flashcards Display Section */}
        <AnimatePresence>
          {(loading || error || flashcards.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Generated Flashcards</h2>

              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-3" />
                    <p className="text-slate-600">✨ Generating flashcards...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {flashcards.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {flashcards.map((flashcard) => (
                    <FlashcardComponent key={flashcard.id} flashcard={flashcard} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
