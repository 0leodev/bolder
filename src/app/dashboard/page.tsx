"use client";

import { motion } from "framer-motion";
import DashboardCard from "@/components/dashboard/dashboard-card";
import { useAccount } from "wagmi";

export default function DashboardPage() {
  const { isConnected } = useAccount();
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
          {isConnected && (<DashboardCard />)}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
