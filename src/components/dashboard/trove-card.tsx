import useTroveState from "@/hooks/useTroveState";
import { useTokenIdsAlchemy } from "@/hooks/useTokenIdsAlchemy";
import { Copy } from "lucide-react";
import { copiedToClipboard } from "@/lib/sonner-notifications";

export default function TroveCard() {
  const { troves } = useTroveState();
  const { tokenIds, isLoading, error } = useTokenIdsAlchemy();

  if (isLoading) return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 0, 0].map((_, index) => (
          <div key={index} className="rounded-2xl border border-border bg-card p-4 h-72 loading-shimmer" style={{ animationDelay: `${index * 0.3}s` }}></div>
        ))}
      </div>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tokenIds.map((tokenId, index) => {
        const trove = troves[index];
        const debt = (Number(trove?.debt) / 10**18).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
        const collateral = (Number(trove?.coll) / 10**18).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
        const annualInterest = (Number(trove?.annualInterestRate) / 10**16).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
        
        return (
          <div key={index} className="rounded-2xl border border-border bg-card p-4 h-72">
            <div className="">
              <div className="rounded-md font-semibold mb-4">Open loan</div>
              <div className="p-3 rounded-md bg-white/5 flex items-center justify-between">
              <div>
                <button onClick={() => copiedToClipboard(tokenId)} className="mr-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Copy size={16} />
                </button>
                <span className="text-muted-foreground">Token ID</span>
              </div>  
                <span className="truncate max-w-30 font-medium">{tokenId}</span>
              </div>
              {trove ? (
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm bg-white/5 p-3 rounded-md">
                    <span className="text-muted-foreground">Debt</span>
                    <span className="font-medium">{debt} BOLD</span>
                  </div>
                  <div className="flex justify-between text-sm bg-white/5 p-3 rounded-md">
                    <span className="text-muted-foreground">Collateral</span>
                    <span className="font-medium">{collateral} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm bg-white/5 p-3 rounded-md">
                    <span className="text-muted-foreground">Annual Interest</span>
                    <span className="font-medium">{annualInterest}%</span>
                  </div>
                </div>
              ) : 
              <div className="mt-2 space-y-2">
                {[0, 0, 0].map((_, index) => ( 
                  <div key={index} className="flex justify-between text-sm bg-white/5 p-5.5 rounded-md loading-shimmer" style={{ animationDelay: `${index * 0.3}s` }}></div>
                ))}   
              </div>               
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}
