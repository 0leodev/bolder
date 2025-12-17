import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";
import { defineChain } from "viem";
import { reown } from "@/config/env";

const hardhat = defineChain({
  id: 31337,
  name: 'Hardhat',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
});

const walletConnectProjectId =
  reown.PROJECT_ID ??
  (() => {
    throw new Error("WalletConnect project ID is required");
  })();

export const config = getDefaultConfig({
  appName: "Bolder",
  projectId: walletConnectProjectId,
  chains: [mainnet, sepolia, hardhat],
  ssr: true,
});

export const chains = [mainnet, sepolia, hardhat];
