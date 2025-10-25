"use client"

import { useState } from "react"
import PromptDialog from "@/components/prompt-dialog"
import { FlaskConical, BookOpenText, Box, HelpCircle } from "lucide-react"

const actions = [
  { key: "lab-flashcards", label: "Show Lab Flash Cards", Icon: FlaskConical, gradient: "from-teal-500 to-blue-500" },
  {
    key: "theory-flashcards",
    label: "Show Theory Flash Cards",
    Icon: BookOpenText,
    gradient: "from-pink-500 to-blue-500",
  },
  { key: "3d-model", label: "Show 3D Model", Icon: Box, gradient: "from-blue-500 to-teal-500" },
  { key: "important-questions", label: "Show Important Que", Icon: HelpCircle, gradient: "from-teal-500 to-pink-500" },
]

export default function OptionsPage() {
  const [promptOpen, setPromptOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState(null)

  function openPrompt(key) {
    setSelected(key)
    setPromptOpen(true)
  }

  async function handleGenerate(topic) {
    if (!selected) return
    setPending(true)
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: selected, topic }),
      })
      const data = await res.json()
      setResult({ action: selected, topic, data })
    } catch (err) {
      setResult({ action: selected, topic, data: { error: "Failed to generate. Please try again." } })
    } finally {
      setPending(false)
      setPromptOpen(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white px-6 py-10">
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-semibold text-balance">Choose an option</h1>
        <p className="text-slate-300 mt-1">
          Enter a topic to generate lab/theory flashcards, 3D guidance, or important questions.
        </p>
      </header>

      <section className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
        {actions.map(({ key, label, Icon, gradient }) => (
          <button
            key={key}
            onClick={() => openPrompt(key)}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-left shadow-xl transition hover:shadow-teal-500/20"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-10 group-hover:opacity-20 transition`}
            />
            <div className="relative flex items-center gap-4">
              <div
                className={`h-12 w-12 rounded-xl grid place-items-center bg-gradient-to-br ${gradient} shadow-lg shadow-teal-500/20`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-medium">{label}</div>
                <div className="text-sm text-slate-300">Click to enter a topic and generate.</div>
              </div>
            </div>
          </button>
        ))}
      </section>

      <section className="max-w-5xl mx-auto mt-10">{result && <ResultView result={result} />}</section>

      <PromptDialog
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
        title="Enter a topic"
        placeholder="e.g., Gravitation, Human Brain Neurons, Motion in a Plane"
        onSubmit={handleGenerate}
        pending={pending}
      />
    </main>
  )
}

function ResultView({ result }) {
  const { action, topic, data } = result || {}
  if (!data) return null
  if (data.error) return <p className="text-red-400">{data.error}</p>

  if (action === "theory-flashcards" || action === "lab-flashcards") {
    const cards = Array.isArray(data.flashcards) ? data.flashcards : []
    if (!cards.length) return <p className="text-slate-300">No flashcards generated for “{topic}”.</p>
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Flashcards for “{topic}”</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((fc, idx) => (
            <FlipCard key={idx} front={fc.question} back={fc.answer} />
          ))}
        </div>
      </div>
    )
  }

  if (action === "important-questions") {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <h2 className="text-xl font-semibold mb-2">Important Questions for “{topic}”</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-200">
          {(data.questions || []).map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>
    )
  }

  if (action === "3d-model") {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 grid gap-3">
        <h2 className="text-xl font-semibold">3D Model Guidance for “{topic}”</h2>
        {data.model && <p className="text-slate-200">{data.model.description}</p>}
        {data.model?.suggestedSearch && (
          <p className="text-slate-300 text-sm">
            Suggested search: <span className="text-pink-400">{data.model.suggestedSearch}</span>
          </p>
        )}
        {data.model?.keyPoints?.length ? (
          <ul className="list-disc pl-5 space-y-1 text-slate-200">
            {data.model.keyPoints.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        ) : null}
      </div>
    )
  }

  return null
}

function FlipCard({ front, back }) {
  return (
    <div className="group perspective-1000">
      <div className="relative h-40 w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 rounded-xl border border-slate-800 bg-slate-900/60 p-4 [backface-visibility:hidden] shadow-lg shadow-teal-500/10">
          <p className="font-medium">{front}</p>
        </div>
        <div className="absolute inset-0 rounded-xl border border-slate-800 bg-gradient-to-br from-pink-500/20 to-blue-500/20 p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-slate-100">{back}</p>
        </div>
      </div>
    </div>
  )
}
