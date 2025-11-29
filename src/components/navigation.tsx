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
    `rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ease-out ${
      pathname === path ? "bg-white/5 text-white" : "text-white/50 hover:bg-white/5 hover:text-white/70"
    }`

  return (
    <nav className="fixed top-0 w-full bg-navigation/80 backdrop-blur-lg text-white z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="text-lg font-bold text-white animate-in fade-in duration-500">Bolder</span>
            <div className="hidden lg:flex items-center gap-2">
              {routes.map((route, index) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`${linkClass(route.path)} animate-in fade-in slide-in-from-top-2`}
                  style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: "backwards" }}
                >
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
              className="rounded-lg p-2 text-white/50 transition-all duration-300 ease-out hover:bg-white/5 hover:text-white/70 hover:scale-110 active:scale-95"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <Menu
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ease-out ${
                    isOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                  }`}
                />
                <X
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ease-out ${
                    isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "pb-[100vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 pt-2">
          {routes.map((route, index) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className={`block ${linkClass(route.path)} ${isOpen ? "animate-in slide-in-from-left-2 fade-in" : ""}`}
              style={{
                animationDelay: isOpen ? `${index * 75}ms` : "0ms",
                animationFillMode: "backwards",
              }}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
