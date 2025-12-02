import TrovesCard from "@/components/dashboard/trove-card"
import Link from "next/link";

export default function DashboardCard() {
  return(
    <main>
      <div className="flex justify-between gap-4 mb-7 items-center">
        <Link href="/borrow">
          <button className="rounded-2xl bg-gradient-to-br from-muted/90 to-card/10 px-8 py-4 text-lg font-medium shadow-lg transition-all duration-300 hover:scale-[0.95] hover:from-navigation/90 active:scale-[0.98]">
            <span>New Borrow</span>
          </button>
        </Link>
      </div>
      <TrovesCard/>
    </main>
  )
}