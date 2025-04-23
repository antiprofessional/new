"use client"

import { useState } from "react"
import { ShoppingBag, Search, ChevronRight, Package, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Order {
  id: string
  date: string
  product: string
  amount: number
  status: "completed" | "processing" | "failed"
  transactionId: string
}

export default function OrdersSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const orders: Order[] = [
    {
      id: "ORD-8723",
      date: "2024-04-22",
      product: "AMAZON SES",
      amount: 100,
      status: "completed",
      transactionId: "tx_45678912345",
    },
    {
      id: "ORD-9156",
      date: "2024-04-21",
      product: "VERIFIED COINBASE",
      amount: 85,
      status: "completed",
      transactionId: "tx_78912345678",
    },
    {
      id: "ORD-1045",
      date: "2024-04-18",
      product: "AUSTRALIAN BIZ LEADS",
      amount: 200,
      status: "processing",
      transactionId: "tx_12345678901",
    },
    {
      id: "ORD-7156",
      date: "2024-04-15",
      product: "SPOTIFY CHECKER",
      amount: 150,
      status: "failed",
      transactionId: "tx_56789012345",
    },
  ]

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-500/20 text-red-400">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  const handleViewDetails = (orderId: string) => {
    toast({
      title: "Order Details",
      description: `Viewing details for Order ${orderId}`,
      duration: 2000,
    })
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 text-center border-b border-gray-800 shadow-md">
        <div className="flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 mr-2 text-emerald-500" />
          <h2 className="font-serif text-xl tracking-widest">MY ORDERS</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">Track Your Purchase History</p>
      </header>

      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders..."
            className="pl-10 bg-gray-900 border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-400">{filteredOrders.length} orders</p>
          <Badge className="bg-emerald-500/20 text-emerald-400">
            <Package className="w-3 h-3 mr-1" />
            Order History
          </Badge>
        </div>

        <Separator className="mb-4 bg-gray-800" />

        {filteredOrders.length > 0 ? (
          <div className="space-y-3 mb-20">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="bg-gray-900 border-gray-800 shadow-md overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-bold text-sm">{order.id}</h4>
                        <span className="mx-1 text-gray-500">•</span>
                        <span className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm">{order.product}</p>
                      <p className="text-sm font-medium text-emerald-400">${order.amount.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      {getStatusBadge(order.status)}
                      <span className="text-xs text-gray-400 mt-1">TX: {order.transactionId.slice(0, 10)}...</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-gray-400 hover:bg-gray-800 hover:text-white"
                      onClick={() => handleViewDetails(order.id)}
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Package className="w-12 h-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-bold mb-1">No Orders Found</h3>
            <p className="text-sm text-gray-400 text-center">
              No orders match your search criteria or you haven't made any purchases yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
