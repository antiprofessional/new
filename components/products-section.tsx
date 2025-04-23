"use client"

import { Search, Filter, ShieldCheck, Mail } from "lucide-react"
import type { Product } from "@/types/product"
import ProductCard from "./product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

interface ProductsSectionProps {
  onProductSelect: (product: Product) => void
}

export default function ProductsSection({ onProductSelect }: ProductsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const products: Product[] = [
    {
      id: "aws-ses-50k",
      name: "AMAZON SES",
      description: "50,000 DAILY LIMITS, High email deliverability, Easy to scale, Dedicated IP support",
      price: 100,
      image: "",
      category: "email",
      verified: true,
      rating: 4.8,
      reviews: 124,
    },
    {
      id: "aws-ses-100k",
      name: "AMAZON SES",
      description: "100,000 DAILY LIMITS, High email deliverability, Easy to scale, Dedicated IP support",
      price: 150,
      image: "",
      category: "email",
      verified: true,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: "mailgun-200k",
      name: "MAILGUN",
      description: "200,000 DAILY LIMITS, API SUPPORT, WHITELISTED DOMAIN SENDER, DEDICATED IP SUPPORT",
      price: 250,
      image: "",
      category: "email",
      verified: true,
      rating: 4.7,
      reviews: 56,
    },
    {
      id: "sendgrid-api",
      name: "SENDGRID(API)",
      description: "100,000 DAILY LIMITS, WHITELISTED DOMAIN SENDER, DEDICATED IP SUPPORT",
      price: 155,
      image: "",
      category: "email",
      verified: true,
      rating: 4.6,
      reviews: 78,
    },
    {
      id: "mailjet-api",
      name: "MAILJET",
      description: "50,000 DAILY LIMITS, HIGH EMAIL DELIVERABILITY, EASY TO SCALE, DEDICATED IP SUPPORT",
      price: 75,
      image: "",
      category: "email",
      verified: true,
      rating: 4.5,
      reviews: 42,
    },
    {
      id: "telnyx-upgraded",
      name: "TELNYX UPGRADED",
      description: "WITH $100 BALANCE, Full access to premium features, API integration",
      price: 120,
      image: "",
      category: "sms",
      verified: true,
      rating: 4.7,
      reviews: 63,
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
          <Mail className="w-5 h-5 mr-2 text-emerald-500" />
          <h2 className="font-serif text-xl tracking-widest">EMAIL/SMS API</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">Premium Services with Verified Security</p>
      </header>

      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            className="pl-10 bg-gray-900 border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-gray-900 text-white border-gray-800">
              All Products
            </Badge>
            <Badge
              variant="outline"
              className="bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 cursor-pointer"
            >
              Email
            </Badge>
            <Badge
              variant="outline"
              className="bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 cursor-pointer"
            >
              SMS
            </Badge>
          </div>

          <Button variant="ghost" size="sm" className="text-gray-400">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-400">{filteredProducts.length} products</p>
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
