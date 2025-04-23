"use client"

import { Search, Filter, Database, ShieldCheck } from "lucide-react"
import type { Product } from "@/types/product"
import ProductCard from "./product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

interface DatabaseSectionProps {
  onProductSelect: (product: Product) => void
}

export default function DatabaseSection({ onProductSelect }: DatabaseSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const products: Product[] = [
    {
      id: "australian-biz-leads",
      name: "AUSTRALIAN BIZ LEADS",
      description: "10,000 LINES, High-quality Australian business leads with verified contact details",
      price: 200,
      image: "",
      category: "database",
      verified: true,
      rating: 4.6,
      reviews: 38,
    },
    {
      id: "business-leads-usa",
      name: "USA BUSINESS LEADS",
      description: "39,000 BIZ LEADS, Complete business information with contact details",
      price: 299,
      image: "",
      category: "database",
      verified: true,
      rating: 4.8,
      reviews: 72,
    },
    {
      id: "employee-dataset",
      name: "EMPLOYEE DATASET",
      description: "FULL EMPLOYEE DATASET, Comprehensive employee information for HR and recruitment",
      price: 500,
      image: "",
      category: "database",
      verified: true,
      rating: 4.9,
      reviews: 45,
    },
    {
      id: "marketing-leads",
      name: "MARKETING LEADS",
      description: "28,000 LINES, Targeted marketing leads with demographic information",
      price: 280,
      image: "",
      category: "database",
      verified: true,
      rating: 4.7,
      reviews: 53,
    },
    {
      id: "customer-info",
      name: "CUSTOMER INFO",
      description: "10,000 CUSTOMER INFO, Detailed customer information for marketing campaigns",
      price: 200,
      image: "",
      category: "database",
      verified: true,
      rating: 4.5,
      reviews: 29,
    },
    {
      id: "email-leads",
      name: "EMAIL LEADS",
      description: "271,836 VALID EMAIL LEADS, Verified email addresses for marketing campaigns",
      price: 300,
      image: "",
      category: "database",
      verified: true,
      rating: 4.8,
      reviews: 67,
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
          <Database className="w-5 h-5 mr-2 text-emerald-500" />
          <h2 className="font-serif text-xl tracking-widest">DATABASE/LEADS</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">Premium Data with Verified Accuracy</p>
      </header>

      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search databases..."
            className="pl-10 bg-gray-900 border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-gray-900 text-white border-gray-800">
              All Data
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
              Marketing
            </Badge>
          </div>

          <Button variant="ghost" size="sm" className="text-gray-400">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-400">{filteredProducts.length} databases</p>
          <Badge className="bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Verified Data
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
