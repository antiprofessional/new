"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ShieldCheck,
  Star,
  Users,
  Clock,
  Check,
  Info,
  Lock,
  CheckCircle,
  Mail,
  Database,
  CreditCard,
  PenTool,
  Package,
} from "lucide-react"
import type { Product } from "@/types/product"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductDetailsProps {
  product: Product
  onProceedToPayment: () => void
}

export default function ProductDetails({ product, onProceedToPayment }: ProductDetailsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleProceed = () => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      onProceedToPayment()
    }, 1000)
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 text-center border-b border-gray-800 shadow-md">
        <div className="flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-emerald-500" />
          <h2 className="font-serif text-xl tracking-widest">ORDER DETAILS</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">Secure Purchase Verification</p>
      </header>

      <div className="p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
              {product.category.toUpperCase()}
            </Badge>
            {product.verified && (
              <Badge className="bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-3 h-3 mr-1" />
                VERIFIED
              </Badge>
            )}
          </div>

          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mr-4">
              {(() => {
                switch (product.category) {
                  case "email":
                  case "sms":
                    return <Mail className="w-10 h-10 text-emerald-400" />
                  case "database":
                    return <Database className="w-10 h-10 text-emerald-400" />
                  case "account":
                    return <CreditCard className="w-10 h-10 text-emerald-400" />
                  case "tool":
                    return <PenTool className="w-10 h-10 text-emerald-400" />
                  default:
                    return <Package className="w-10 h-10 text-emerald-400" />
                }
              })()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm">{product.rating}</span>
                </div>
                <div className="flex items-center ml-3">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="ml-1 text-sm text-gray-400">{product.reviews} reviews</span>
                </div>
                <div className="flex items-center ml-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="ml-1 text-sm text-gray-400">Instant delivery</span>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-gray-900 border-gray-800 shadow-lg mb-6">
            <CardContent className="p-4">
              <Tabs defaultValue="details">
                <TabsList className="bg-gray-800 border-gray-700">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-4">
                  <p className="text-gray-300 text-sm">{product.description}</p>
                  <Separator className="my-4 bg-gray-800" />
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-sm">100% Secure and Verified</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-sm">Instant Digital Delivery</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-sm">24/7 Technical Support</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-sm">Satisfaction Guaranteed</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="pt-4">
                  <ul className="space-y-2 text-sm">
                    {product.description.split(",").map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 mt-0.5" />
                        <span>{feature.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="reviews" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-2">
                          <span className="text-xs">JD</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">John D.</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Excellent product, works exactly as described. Fast delivery and great support.
                    </p>
                    <Separator className="bg-gray-800" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-2">
                          <span className="text-xs">SM</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Sarah M.</p>
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            ))}
                            <Star className="w-3 h-3 text-gray-600" />
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">1 week ago</span>
                    </div>
                    <p className="text-sm text-gray-300">Very good service, would recommend to others.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Order Summary</h3>
              <Badge variant="outline" className="bg-gray-800 border-gray-700">
                <Info className="w-3 h-3 mr-1" />
                Secure Order
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Product Price</span>
                <span>${product.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Processing Fee</span>
                <span>$0.00</span>
              </div>
              <Separator className="my-2 bg-gray-800" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-emerald-400">${product.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" />
              <span className="text-xs text-gray-400">Your purchase is protected by our secure payment system</span>
            </div>

            <Button
              onClick={handleProceed}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2"
                  >
                    <Clock className="h-4 w-4" />
                  </motion.div>
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="bg-gray-800 rounded-full p-2">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
            </div>
            <div className="bg-gray-800 rounded-full p-2">
              <Lock className="h-6 w-6 text-emerald-500" />
            </div>
            <div className="bg-gray-800 rounded-full p-2">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
            </div>
          </div>

          <p className="text-center text-xs text-gray-400">
            By proceeding with this purchase, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
