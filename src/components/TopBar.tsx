"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function TopBar() {
  return (
    <header className="fixed top-0 w-full bg-top-bar/80 backdrop-blur-lg text-white z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Bolder</h1>
        <div>
          <ConnectButton showBalance={false} accountStatus="address" />
        </div>
      </div>
    </header>
  );
}