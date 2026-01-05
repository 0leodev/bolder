import TrovesCard from "@/components/dashboard/trove-card";
import Link from "next/link";
import { useChainId, useAccount } from "wagmi";
import { writeContract } from "wagmi/actions";
import { config } from "@/config/wagmiConfig";
import { WETH } from "@/abi/WETH";
import { parseEther } from "viem";
import BalanceCard from "@/components/dashboard/balance-card";
import contractAddresses_1 from "@/addresses/1.json";

export default function DashboardCard() {
  const chainId = useChainId();
  const { address } = useAccount();

  const wrapperETH = async () => {
    if (!address) return;
    await writeContract(config, {
      address: contractAddresses_1.branches[0].collToken as `0x${string}`,
      abi: WETH,
      functionName: "deposit",
      value: parseEther("50"),
    });
  };
  
  return (
    <main>
      <div className="flex justify-between gap-4 mb-7 items-center">
        <Link href="/borrow">
          <button className="rounded-2xl bg-gradient-to-br from-muted/90 to-card/10 px-5 py-4 text-lg font-medium shadow-lg transition-all duration-300 hover:scale-[0.95] hover:from-navigation/90 active:scale-[0.98]">
            <span>New Borrow</span>
          </button>
        </Link>
        
        {chainId === 31337 && (
          <button
            onClick={wrapperETH}
            className="rounded-2xl bg-gradient-to-br from-muted/90 to-card/10 px-5 py-4 text-lg font-medium shadow-lg transition-all duration-300 hover:scale-[0.95] hover:from-navigation/90 active:scale-[0.98]"
          > <span>+ 50 WETH</span>
          </button>
        )}
      </div>
      <BalanceCard />
      <TrovesCard />
    </main>
  );
}
