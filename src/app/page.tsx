"use client";
import EthBalance from "@/components/EthBalance"
import Notification from "@/components/notification";

export default function Home() {
  return (
    <main className="max-w-sm mx-auto p-4">
      <EthBalance />
      <Notification />
    </main>
  );
}