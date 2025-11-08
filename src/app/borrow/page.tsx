"use client"

import BorrowCard from "@/components/borrow/borrow-card"

export default function BorrowPage() {
  return (
    <main className="min-h-screen bg-background py-15">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white/10 mb-7">Make it bolder</h1>
        <BorrowCard />
      </div>
    </main>
  )
}
