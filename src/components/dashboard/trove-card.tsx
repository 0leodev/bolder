import useTroveState from "@/hooks/useTroveState";
import { useTokenIdsAlchemy } from "@/hooks/useTokenIdsAlchemy";
import { Copy } from "lucide-react";
import { copiedToClipboard } from "@/lib/sonner-notifications";
import { Trove } from "@/types/borrow";

const formatBigInt = (value: bigint | undefined, decimals: number) =>
  (Number(value) / 10 ** decimals).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`bg-white/5 rounded-2xl loading-shimmer ${className}`} />
);

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-md font-medium bg-white/5 p-3 rounded-md">
    <span className="text-muted-foreground">{label}</span>
    <span>{value}</span>
  </div>
);

const TroveItem = ({ tokenId, trove }: { tokenId: string; trove?: Trove | null }) => (
  <div className="rounded-2xl border border-border bg-card p-4 h-75">
    <div className="font-semibold mb-4">Loan Bolding</div>
    <div className="space-y-2">
      {trove ? (
        <>
          <StatRow label="Debt" value={`${formatBigInt(trove.debt, 18)} BOLD`} />
          <StatRow label="Collateral" value={`${formatBigInt(trove.coll, 18)} ${trove.collateralSymbol}`} />
          <StatRow label="Annual Interest" value={`${formatBigInt(trove.annualInterestRate, 16)}%`} />
        </>
      ) : (
        Array.from({ length: 3 }, (_, i) => <Shimmer key={i} className="p-5.5" />)
      )}
    </div>
    <div className="mt-2 p-3 rounded-md bg-white/5 flex items-center justify-between">
      <div>
        <button onClick={() => copiedToClipboard(tokenId)} className="mr-3 text-muted-foreground hover:text-foreground transition-colors">
          <Copy size={16} />
        </button>
        <span className="text-muted-foreground font-medium text-md">Token ID</span>
      </div>
      <span className="truncate max-w-30 font-medium text-md">{tokenId}</span>
    </div>
  </div>
);

export default function TroveCard() {
  const { troves } = useTroveState();
  const { tokenIds, isLoading } = useTokenIdsAlchemy();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => <Shimmer key={i} className="h-75 rounded-2xl border border-border" />)}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tokenIds.map((tokenId, i) => <TroveItem key={tokenId} tokenId={tokenId} trove={troves[i]} />)}
    </div>
  );
}

// TODO: add the health factor