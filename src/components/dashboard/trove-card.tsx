import useTroveState from "@/hooks/useTroveState"

export default function TroveCard() {
  const { state } = useTroveState()

  return(
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.troves.map((trove, index) => (
            <div key={index} className="rounded-2xl border border-border bg-card p-4">
              <div className="">
                <div className="rounded-md font-semibold mb-4">Open loan</div>
                <div className="p-3 rounded-md  bg-white/5">Token ID:</div>
              </div>
            </div>
          ))}
        </div>
  )
}