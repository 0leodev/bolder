import useTroveState from "@/hooks/useTroveState";
import { useTokenIdsAlchemy } from "@/hooks/useTokenIdsAlchemy";
import { Copy } from "lucide-react";
import { copiedToClipboard } from "@/lib/sonner-notifications";
import { Trove } from "@/types/borrow";
import { removeDigits, truncateWithDots, currencyString } from "@/utils/format";
import BorrowCalculations from "@/lib/borrow-calculations";
import { COLLATERAL_TYPES } from "@/lib/constants";
import { usePriceFeeds } from "@/hooks/usePriceFeeds";
import Image from "next/image";

const wETHintoETH = (collSymbol: string) => collSymbol === "WETH" ? "ETH" : collSymbol;

const Shimmer = ({ className = "" }: { className?: string }) => <div className={`bg-white/5 loading-shimmer ${className}`} />;

const StatRow = ({ label, value, svg }: { label: string; value: string; svg?: string }) => (
  <div className="flex justify-between gap-2 text-md font-medium bg-card px-4 h-12 rounded-lg items-center">
    <span className="truncate text-muted-foreground">{label}</span>
    <div className="flex justify-between gap-2 bg-card px-3 h-8 rounded-2xl items-center">
      {svg && <Image src={`${svg}`} alt={label} width={20} height={20} />}
      <span className="truncate">{value}</span>
    </div>
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

  const dropPercentNum = currentPriceNum > 0 ? (liquidationPriceNum > 0 ? (((currentPriceNum - liquidationPriceNum) / currentPriceNum) * 100).toFixed(0) : "N/A") : null;

  return (
    <div className="rounded-2xl bg-navigation p-4 h-88">
      <div className="font-semibold mb-4">Loan Bolding</div>
      <div className="space-y-2">
        {trove ? (
          <>
            <StatRow label="Debt" value={`${currencyString(debtNum)} BOLD `} svg="/logos/BOLD.svg" />
            <StatRow label="Collateral" value={`${collNum} ${wETHintoETH(trove.collateralSymbol)}`} svg={`/logos/${trove.collateralSymbol}.svg`} />
            <StatRow label="Liquidation price" value={`$${currencyString(liquidationPriceNum)} ${dropPercentNum ? ` /🔻${dropPercentNum}%` : ""}`} />
            <StatRow label="Annual interest" value={`${interestNum}%`} />
          </>
        ) : (
          Array.from({ length: 4 }, (_, i) => <Shimmer key={i} className="px-4 h-12 rounded-lg" />)
        )}
      </div>
      <div className="flex justify-between gap-2 mt-2 text-md font-medium bg-card px-4 h-12 rounded-lg items-center">
        <div className="truncate">
          <button onClick={() => copiedToClipboard(tokenId)} className="mr-3 text-muted-foreground hover:text-foreground transition-colors">
            <Copy size={16} />
          </button>
          <span className="text-muted-foreground font-medium text-md">Token ID</span>
        </div>
        <div className="flex justify-between bg-card px-3 h-8 rounded-2xl items-center">
          <span className="font-medium text-md">{truncateWithDots(tokenId)}</span>
        </div>
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
          <Shimmer key={i} className="h-88 rounded-2xl" />
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
