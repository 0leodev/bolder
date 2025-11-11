import useTroveState from "@/hooks/useTroveState"

export default function TroveCard() {
  const { state } = useTroveState()

  return(
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.troves.map((trove, index) => (
            <div key={index} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div>
                <div className="mb-2 h-4 w-24 rounded bg-white/5" />
                <div className="h-8 w-32 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
  )
}