"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Mail, Database, CreditCard, PenTool, Package } from "lucide-react"
import type { Product } from "@/types/product"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  // Get icon based on product category
  const getIconByCategory = () => {
    switch (product.category) {
      case "email":
      case "sms":
        return <Mail className="w-8 h-8 text-emerald-400" />
      case "database":
        return <Database className="w-8 h-8 text-emerald-400" />
      case "account":
        return <CreditCard className="w-8 h-8 text-emerald-400" />
      case "tool":
        return <PenTool className="w-8 h-8 text-emerald-400" />
      default:
        return <Package className="w-8 h-8 text-emerald-400" />
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center mb-2 text-white h-auto w-full cursor-pointer shadow-md overflow-hidden"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <Badge variant="outline" className="text-[10px] bg-gray-800 border-gray-700 text-gray-300">
          {product.category.toUpperCase()}
        </Badge>
        {product.verified && (
          <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">
            <ShieldCheck className="w-3 h-3 mr-1" />
            VERIFIED
          </Badge>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-2">
          {getIconByCategory()}
        </div>

        <h4 className="text-sm font-bold mb-1 line-clamp-1">{product.name}</h4>
        <p className="text-[10px] mb-2 text-gray-400 font-normal line-clamp-2">{product.description.split(",")[0]}</p>

        <div className="mt-auto">
          <h4 className="text-sm text-emerald-400 font-bold">${product.price.toFixed(2)}</h4>
        </div>
      </div>
    </motion.div>
  )
}
