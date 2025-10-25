"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function Flashcard({ q, a, delay = 0 }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.button
      type="button"
      aria-label={flipped ? "Show question" : "Show answer"}
      onClick={() => setFlipped((f) => !f)}
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="relative h-40 w-full overflow-hidden rounded-2xl bg-white/5 p-4 text-left shadow-lg ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
      style={{ perspective: 1000 }}
    >
      <div
        className={[
          "absolute inset-0 grid place-items-center rounded-2xl px-4 text-white transition-transform duration-500",
          flipped ? "rotate-y-180" : "rotate-y-0",
          "backface-hidden",
        ].join(" ")}
        style={{ transformStyle: "preserve-3d" }}
      >
        <p className="text-base md:text-lg font-medium">{q}</p>
      </div>
      <div
        className={[
          "absolute inset-0 grid place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-pink-400 px-4 text-white transition-transform duration-500 rotate-y-180 backface-hidden",
          flipped ? "rotate-y-0" : "rotate-y-180",
        ].join(" ")}
        style={{ transformStyle: "preserve-3d" }}
      >
        <p className="text-base md:text-lg font-semibold">{a}</p>
      </div>
    </motion.button>
  )
}
