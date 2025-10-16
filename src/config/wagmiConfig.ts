import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";
import { reown } from "@/config/env";

const walletConnectProjectId =
  reown.PROJECT_ID ??
  (() => {
    throw new Error("WalletConnect project ID is required");
  })();

export const config = getDefaultConfig({
  appName: "Bolder",
  projectId: walletConnectProjectId,
  chains: [mainnet, sepolia],
  ssr: true,
});

export const chains = [mainnet, sepolia];
