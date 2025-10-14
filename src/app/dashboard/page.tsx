"use client";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background py-15">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-white/10 mb-7">Dashboard</h1> 
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div className="mb-2 h-4 w-24 rounded bg-white/5" />
              <div className="h-8 w-32 rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}