"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function PromptDialog({
  open,
  onClose,
  title = "Enter a topic",
  placeholder = "e.g., Gravitation, Human Brain Neurons, Motion in a Plane",
  onSubmit,
  pending = false,
}) {
  const [topic, setTopic] = React.useState("")

  React.useEffect(() => {
    if (!open) setTopic("")
  }, [open])

  function handleSubmit(e) {
    e.preventDefault()
    if (!topic.trim()) return
    onSubmit(topic.trim())
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent className="sm:max-w-md bg-slate-900 text-white border-slate-800">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-slate-300">
            We’ll generate results based on the topic you provide.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <Input
            autoFocus
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={placeholder}
            className="bg-slate-950 border-slate-800 focus-visible:ring-2 focus-visible:ring-teal-500"
          />
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} className="text-slate-300 hover:text-white">
              Cancel
            </Button>
            <Button
              disabled={pending}
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:opacity-90"
            >
              {pending ? "Generating..." : "Generate"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
