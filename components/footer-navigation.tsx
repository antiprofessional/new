"use client"

import { motion } from "framer-motion"
import { User, Mail, Database, CreditCard, PenTool } from "lucide-react"

interface FooterNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function FooterNavigation({ activeSection, onSectionChange }: FooterNavigationProps) {
  const navItems = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "products", icon: Mail, label: "Products" },
    { id: "database", icon: Database, label: "Database" },
    { id: "accounts", icon: CreditCard, label: "Accounts" },
    { id: "tools", icon: PenTool, label: "Tools" },
  ]

  return (
    <div className="fixed bottom-0 w-full bg-gradient-to-t from-black to-gray-900/95 flex justify-around p-3 border-t border-gray-800 z-50 backdrop-blur-sm">
      {navItems.map((item) => {
        const isActive = activeSection === item.id
        const Icon = item.icon

        return (
          <button
            key={item.id}
            className={`relative flex flex-col items-center justify-center w-1/5 transition-colors duration-200 ${
              isActive ? "text-emerald-500" : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => onSectionChange(item.id)}
          >
            <div className="relative">
              <Icon className="w-5 h-5 mb-1" />
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
