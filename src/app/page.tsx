"use client";
import EthBalance from "@/components/EthBalance";
// import LeverageBorrowForm from "@/components/LeverageBorrowForm";

export default function Home() {
  return (
    <main className="max-w-sm mx-auto p-4">
      <EthBalance />
      {/* <div className="mt-6">
        <LeverageBorrowForm />
      </div> */}
    </main>
  );
}
