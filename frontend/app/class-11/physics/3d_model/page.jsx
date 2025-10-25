"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export default function Interactive3DModel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-10">
      {/* 3D Canvas Area */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/20 w-full max-w-md">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-teal-400" />
          3D Interactive Model
        </h3>

        <div className="bg-slate-900/80 rounded-xl h-80 flex items-center justify-center border border-white/10 relative">
          {/* 3D Heart Model Placeholder */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotateY: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-32 h-32 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/30"
          >
            <div className="text-white text-4xl">❤</div>
          </motion.div>

          <div className="absolute mt-24 text-white/60 text-sm text-center w-full">
            3D Model Loading... (Sketchfab/Three.js Integration)
          </div>
        </div>
      </div>
    </div>
  );
}