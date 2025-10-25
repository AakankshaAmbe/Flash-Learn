"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Please enter both email and password")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Login failed ❌")
        setLoading(false)
        return
      }

      // Save JWT & user data
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      alert("Login successful ✅")
      router.push("/home")
    } catch (err) {
      console.error("Login error:", err)
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
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
            animate={{ 
              y: [0, -200, 0], 
              opacity: [0.3, 0.8, 0.3], 
              scale: [1, 1.5, 1] 
            }}
            transition={{ 
              duration: 5 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 4 
            }}
          />
        ))}
      </div>

      {/* 🌌 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-sm sm:max-w-md"
      >
        <Card className="border border-cyan-500/30 bg-white/10 backdrop-blur-2xl shadow-[0_0_30px_rgba(56,189,248,0.25)] rounded-2xl p-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-md">
              Welcome Back 👋
            </CardTitle>
            <p className="text-slate-300 text-sm mt-2">
              Sign in to continue your 3D Learning journey
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-5 mt-4">
              {/* Email */}
              <div className="grid gap-2">
                <label className="text-sm text-white">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="text-white placeholder-white bg-transparent border border-white/30"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <label className="text-sm text-white">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="text-white placeholder-white bg-transparent border border-white/30"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-2 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-semibold py-2 rounded-xl disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Register link */}
              <p className="text-sm text-slate-400 text-center mt-4">
                New here?{" "}
                <Link href="/register" className="text-cyan-400 hover:underline">
                  Create an account
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
