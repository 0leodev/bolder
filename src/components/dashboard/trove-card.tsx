import useTroveState from "@/hooks/useTroveState";
import { useTokenIdsAlchemy } from "@/hooks/useTokenIdsAlchemy";

export default function TroveCard() {
  const { state } = useTroveState();
  const { tokenIds, isLoading, error } = useTokenIdsAlchemy();

  if (isLoading) return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[0,0,0].map((_, index) => (
        <div key={index} className="rounded-2xl border border-border bg-card p-4 h-50 loading-shimmer" style={{ animationDelay: `${index * 0.3}s` }}>
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tokenIds.map((tokenId, index) => (
        <div key={index} className="rounded-2xl border border-border bg-card p-4 h-50">
          <div className="">
            <div className="rounded-md font-semibold mb-4">Open loan</div>
            <div className="p-3 rounded-md bg-white/5 truncate max-w-60">Token ID {tokenId}</div>
          </div>
        </div>
      ))}
    </div>
  );
}