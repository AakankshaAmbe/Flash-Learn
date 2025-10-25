"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userClass, setUserClass] = useState("class-11") // default Class 11
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, userClass }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Registration failed ❌")
        setLoading(false)
        return
      }

      alert("Account created successfully! 🎉 Redirecting...")
      router.push("/login")
    } catch (err) {
      console.error("Registration error:", err)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center justify-center overflow-hidden relative px-4">
      
      {/* ✨ Floating Glowing Dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -200, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}
      </div>

      {/* 🌌 Glassmorphic Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-sm sm:max-w-md"
      >
        <Card className="border border-cyan-500/30 bg-white/10 backdrop-blur-2xl shadow-[0_0_30px_rgba(56,189,248,0.25)] rounded-2xl p-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-md">
              Create Account 🚀
            </CardTitle>
            <p className="text-slate-300 text-sm mt-2">
              Join the 3D Learning platform today
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="grid gap-5 mt-4">
              {/* Name */}
              <div className="grid gap-2">
                <label className="text-sm text-slate-300">Full Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-slate-800/70 border-slate-700 text-white focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all duration-300"
                  required
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <label className="text-sm text-slate-300">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-slate-800/70 border-slate-700 text-white focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all duration-300"
                  required
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <label className="text-sm text-slate-300">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-800/70 border-slate-700 text-white focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <label className="text-sm text-slate-300">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-800/70 border-slate-700 text-white focus-visible:ring-2 focus-visible:ring-purple-400 transition-all duration-300"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-2 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-semibold py-2 rounded-xl hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-transform duration-300 disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register"}
              </Button>

              {/* Links */}
              <div className="text-center mt-4 space-y-1">
                <p className="text-sm text-slate-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-cyan-400 hover:text-blue-400 hover:underline transition-all"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
