"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const routes = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Borrow", path: "/borrow" },
  ]

  const linkClass = (path: string) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      pathname === path
        ? "bg-white/5 text-white"
        : "text-white/50 hover:bg-white/5 hover:text-white/70"
    }`

  return (
    <nav className="fixed top-0 w-full bg-navigation/80 backdrop-blur-lg text-white z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="text-lg font-bold text-white">Bolder</span>
            <div className="hidden lg:flex items-center gap-2">
              {routes.map((route) => (
                <Link key={route.path} href={route.path} className={linkClass(route.path)}>
                  {route.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center">
            <ConnectButton showBalance={false} accountStatus="address" />
          </div>

          <div className="flex items-center justify-end lg:hidden">
            <div className="mr-3">
              <ConnectButton showBalance={false} accountStatus="address" />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-white/50 transition-colors duration-200 hover:bg-white/5 hover:text-white/70"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-white/5 lg:hidden animate-in slide-in-from-top duration-200">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setIsOpen(false)}
                className={`block ${linkClass(route.path)}`}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}