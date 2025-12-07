"use client"

import { motion } from "framer-motion"
import BorrowCard from "@/components/borrow/borrow-card"

export const dynamic = 'force-dynamic'

export default function BorrowPage() {
  return (
    <main className="min-h-screen bg-background py-15">
      <div className="container mx-auto px-3">
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-4xl md:text-5xl font-bold text-center text-foreground mb-7"
        >
          Make it BOLDER
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <BorrowCard />
        </motion.div>
      </div>
    </main>
  )
}
