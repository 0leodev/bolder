"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import DashboardCard from "@/components/dashboard/dashboard-card"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background py-15">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">

          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-4xl font-bold text-start text-foreground mb-7"
          >
            Dashboard
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
            <div className="flex justify-start gap-4 mb-7">
              <Link href="/borrow">
                <button className="rounded-2xl bg-gradient-to-br from-muted/90 to-card/10 px-8 py-4 text-lg font-medium shadow-lg transition-all duration-300 hover:scale-[0.95] hover:from-navigation/90 active:scale-[0.98]">
                  <span>New Borrow</span>
                </button>
              </Link>
            </div>
            
            <DashboardCard />
          </motion.div>

        </div>
      </div>
    </main>
  )
}
