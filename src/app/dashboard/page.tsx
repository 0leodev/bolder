"use client";

import DashboardCard from "@/components/dashboard/dashboard-card";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background py-15">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-white/10 mb-7">Dashboard</h1>
          <DashboardCard/> 
        </div>
      </div>
    </main>
  )
}