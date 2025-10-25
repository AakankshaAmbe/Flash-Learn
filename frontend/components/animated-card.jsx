"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function AnimatedCard({
  title,
  subtitle,
  href,
  Icon,
  delay = 0,
  from = "from-teal-500",
  to = "to-blue-500",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      <Link href={href} className="group block focus:outline-none">
        <div
          className={[
            "rounded-2xl p-5 md:p-6 bg-gradient-to-br",
            from,
            to,
            "text-white shadow-lg transition-transform duration-300",
            "hover:scale-[1.03] focus:scale-[1.03]",
            "hover:ring-2 focus:ring-2 ring-white/40",
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            {Icon ? <Icon className="h-6 w-6 opacity-90" /> : null}
            <h3 className="text-lg md:text-xl font-semibold text-balance">{title}</h3>
          </div>
          {subtitle ? <p className="mt-2 text-sm md:text-base/6 text-white/90 text-pretty">{subtitle}</p> : null}
          <div className="mt-4 text-sm font-medium opacity-90">Explore →</div>
        </div>
      </Link>
    </motion.div>
  )
}
