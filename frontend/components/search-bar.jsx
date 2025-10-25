"use client"

import { useState } from "react"
import { SearchIcon } from "./icons"

export default function SearchBar({ onChange }) {
  const [value, setValue] = useState("")
  return (
    <div className="w-full">
      <label className="sr-only" htmlFor="topic-search">
        Search topics
      </label>
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
        <SearchIcon className="h-5 w-5 text-white/70" />
        <input
          id="topic-search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onChange?.(e.target.value)
          }}
          placeholder="Search topics..."
          className="w-full bg-transparent outline-none text-white placeholder:text-white/60"
          onFocus={(e) =>
            e.currentTarget.parentElement?.classList.add(
              "ring-2",
              "ring-teal-400/50",
              "shadow-[0_0_0_8px_rgba(45,212,191,0.15)]",
            )
          }
          onBlur={(e) =>
            e.currentTarget.parentElement?.classList.remove(
              "ring-2",
              "ring-teal-400/50",
              "shadow-[0_0_0_8px_rgba(45,212,191,0.15)]",
            )
          }
        />
      </div>
    </div>
  )
}
