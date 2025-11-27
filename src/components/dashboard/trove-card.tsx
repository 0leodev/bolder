import useTroveState from "@/hooks/useTroveState";
import { useTokenIdsAlchemy } from "@/hooks/useTokenIdsAlchemy";
import { Copy } from "lucide-react";
import { copiedToClipboard } from "@/lib/sonner-notifications";
import { Trove } from "@/types/borrow";
import { removeDigits, truncateWithDots } from "@/utils/format";
import BorrowCalculations from "@/lib/borrow-calculations";
import { COLLATERAL_TYPES } from "@/lib/constants";
import { usePriceFeeds } from "@/hooks/usePriceFeeds";

const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`bg-white/5 loading-shimmer ${className}`} />
);

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-md font-medium bg-white/5 px-4 h-12 rounded-lg items-center">
    <span className="truncate text-muted-foreground">{label}</span>
    <span className="truncate">{value}</span>
  </div>
);

const TroveItem = ({ tokenId, trove }: { tokenId: string; trove?: Trove | null }) => {
  const prices = usePriceFeeds();

  if (!trove) return;
  const collType = COLLATERAL_TYPES.find((c) => c.symbol === trove?.collateralSymbol);
  const debtNum = removeDigits(trove.debt, 18);
  const collNum = removeDigits(trove.coll, 18);
  const liquidationPriceNum = collType ? BorrowCalculations.calculateLiquidationPrice(debtNum, collNum, collType) : 0;
  const interestNum = removeDigits(trove.annualInterestRate, 16);
  const currentPriceNum = parseFloat(prices[trove.collateralSymbol as keyof typeof prices].toFixed(2));

  const dropPercentNum = currentPriceNum > 0 ? (liquidationPriceNum > 0 ? (((currentPriceNum - liquidationPriceNum) / currentPriceNum) * 100).toFixed(0) : 'N/A') : null;

  return (
    <div className="rounded-2xl border border-border bg-card p-4 h-88">
      <div className="font-semibold mb-4">Loan Bolding</div>
      <div className="space-y-2">
        {trove ? (
          <>
            <StatRow label="Debt" value={`${debtNum} BOLD `} />
            <StatRow label="Collateral" value={`${collNum} ${trove.collateralSymbol}`} />
            <StatRow label="Liquidation price" value={`$${liquidationPriceNum.toFixed(2)} ${dropPercentNum ? ` /🔻${dropPercentNum}%` : ''}`} />
            <StatRow label="Annual interest" value={`${interestNum}%`} />
          </>
        ) : (
          Array.from({ length: 4 }, (_, i) => <Shimmer key={i} className="px-4 h-12 rounded-lg" />)
        )}
      </div>
      <div className="mt-2 px-4 h-12 rounded-lg bg-white/5 flex items-center justify-between">
        <div>
          <button onClick={() => copiedToClipboard(tokenId)} className="mr-3 text-muted-foreground hover:text-foreground transition-colors">
            <Copy size={16} />
          </button>
          <span className="text-muted-foreground font-medium text-md">Token ID</span>
        </div>
        <span className="font-medium text-md">{truncateWithDots(tokenId)}</span>
      </div>
    </div>
  );
};

export default function TroveCard() {
  const { troves } = useTroveState();
  const { tokenIds, isLoading } = useTokenIdsAlchemy();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Shimmer key={i} className="h-88 rounded-2xl border border-border" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tokenIds.map((tokenId, i) => (
        <TroveItem key={tokenId} tokenId={tokenId} trove={troves[i]} />
      ))}
    </div>
  );
}
