"use client"

import { Search, Filter, CreditCard, ShieldCheck } from "lucide-react"
import type { Product } from "@/types/product"
import ProductCard from "./product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

interface AccountsSectionProps {
  onProductSelect: (product: Product) => void
}

export default function AccountsSection({ onProductSelect }: AccountsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const products: Product[] = [
    {
      id: "verified-coinbase",
      name: "VERIFIED COINBASE",
      description: "USA BASED ACCOUNT, Full access with verification, Premium features",
      price: 85,
      image: "",
      category: "account",
      verified: true,
      rating: 4.7,
      reviews: 42,
    },
    {
      id: "verified-stripe",
      name: "VERIFIED STRIPE",
      description: "FULL ACCESS, Complete account access with verification, Business ready",
      price: 150,
      image: "",
      category: "account",
      verified: true,
      rating: 4.9,
      reviews: 58,
    },
    {
      id: "google-ads-1k",
      name: "GOOGLE ADS $1K BALANCE",
      description: "READY TO ADVERTISE, Full access to advertising platform, Premium features",
      price: 150,
      image: "",
      category: "account",
      verified: true,
      rating: 4.8,
      reviews: 37,
    },
    {
      id: "google-ads-2k",
      name: "GOOGLE ADS $2K BALANCE",
      description: "READY TO ADVERTISE, Full access to advertising platform, Premium features",
      price: 200,
      image: "",
      category: "account",
      verified: true,
      rating: 4.9,
      reviews: 29,
    },
    {
      id: "stubhub-premium",
      name: "STUBHUB PREMIUM",
      description: "1 YEAR ACCOUNT, Full access to premium features, Verified account",
      price: 20,
      image: "",
      category: "account",
      verified: true,
      rating: 4.5,
      reviews: 18,
    },
    {
      id: "ebay-premium",
      name: "EBAY PREMIUM",
      description: "FULL ACCESS, Premium account with all features, Verified seller status",
      price: 50,
      image: "",
      category: "account",
      verified: true,
      rating: 4.6,
      reviews: 31,
    },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 text-center border-b border-gray-800 shadow-md">
        <div className="flex items-center justify-center">
          <CreditCard className="w-5 h-5 mr-2 text-emerald-500" />
          <h2 className="font-serif text-xl tracking-widest">PREMIUM ACCOUNTS</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">Verified Accounts with Full Access</p>
      </header>

      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search accounts..."
            className="pl-10 bg-gray-900 border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-gray-900 text-white border-gray-800">
              All Accounts
            </Badge>
            <Badge
              variant="outline"
              className="bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 cursor-pointer"
            >
              Business
            </Badge>
            <Badge
              variant="outline"
              className="bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 cursor-pointer"
            >
              Personal
            </Badge>
          </div>

          <Button variant="ghost" size="sm" className="text-gray-400">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-400">{filteredProducts.length} accounts</p>
          <Badge className="bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-3 h-3 mr-1" />
            100% Verified
          </Badge>
        </div>

        <Separator className="mb-4 bg-gray-800" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-20">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => onProductSelect(product)} />
          ))}
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 bg-gradient-to-t from-black to-transparent h-8 pointer-events-none"></div>
    </div>
  )
}
