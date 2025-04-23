"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ShieldCheck,
  Copy,
  Check,
  AlertCircle,
  ArrowLeft,
  Clock,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import CryptoQRCode from "./crypto-qr-code"

interface PaymentSectionProps {
  product: Product
}

export default function PaymentSection({ product }: PaymentSectionProps) {
  const [selectedCrypto, setSelectedCrypto] = useState("")
  const [cryptoAmount, setCryptoAmount] = useState("")
  const [cryptoAddress, setCryptoAddress] = useState("")
  const [fullAddress, setFullAddress] = useState("")
  const [countdown, setCountdown] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const conversionRates: Record<string, number> = {
    BTC: 0.000012,
    ETH: 0.0005,
    USDT: 1,
    SOLANA: 0.0078,
    LITECOIN: 0.011,
    XMR: 0.0047,
  }

  const cryptoAddresses: Record<string, string> = {
    BTC: "bc1q4h77y69kwdcr558w7ejzyntmjr9xy5wsqp9sys",
    ETH: "0x1f2a5b807058c171aa28a19b21ee77a1ab93da06",
    USDT: "TUZKzK18cp2J1gxK9zNrEBkARBntgcZFEz",
    SOLANA: "B2fBMqSxTRRYpNHVHCKB5vi5iA7y6wXAEs3UkBrvi3Pf",
    LITECOIN: "LU2KwsLukY2onmTRwtbTfLQserH6StS496",
    XMR: "85XyJpNNE7CFiyqKdgKbLXVrUbtabDrY3dk7QzzTVeETU9zMrTWTrN4WqTHQfvf89EfzoAb1Yd6JMc6W1nBbjSaWBgePuNM",
  }

  const handleCryptoChange = (value: string) => {
    setSelectedCrypto(value)

    if (value) {
      const conversionAmount = (product.price * conversionRates[value]).toFixed(8)
      setCryptoAmount(conversionAmount)

      const address = cryptoAddresses[value]
      setFullAddress(address)
      setCryptoAddress(`${address.slice(0, 8)}...${address.slice(-8)}`)

      toast({
        title: "Payment Method Selected",
        description: `You've selected ${value} as your payment method`,
        duration: 2000,
      })
    }
  }

  // Update the copyAddress function to properly use Telegram WebApp
  const copyAddress = () => {
    if (fullAddress) {
      navigator.clipboard
        .writeText(fullAddress)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 3000)

          // Use Telegram's native alert if available
          if (typeof window !== "undefined" && window.Telegram) {
            window.Telegram.WebApp.showAlert("Payment address copied to clipboard")
          }

          toast({
            title: "Address Copied",
            description: "Payment address copied to clipboard",
            duration: 2000,
          })
        })
        .catch((err) => {
          console.error("Failed to copy address: ", err)
          toast({
            title: "Copy Failed",
            description: "Failed to copy address to clipboard",
            variant: "destructive",
            duration: 2000,
          })
        })
    } else {
      // Use Telegram's native popup if available
      if (typeof window !== "undefined" && window.Telegram) {
        window.Telegram.WebApp.showPopup({
          title: "Error",
          message: "Please select a cryptocurrency first!",
          buttons: [{ text: "OK", type: "default" }],
        })
      }

      toast({
        title: "No Cryptocurrency Selected",
        description: "Please select a cryptocurrency first",
        variant: "destructive",
        duration: 2000,
      })
    }
  }

  const startPaymentProcess = () => {
    if (!selectedCrypto) {
      toast({
        title: "No Cryptocurrency Selected",
        description: "Please select a cryptocurrency first",
        variant: "destructive",
        duration: 2000,
      })
      return
    }

    // Start a 1-minute countdown
    setCountdown(60)

    toast({
      title: "Payment Verification Started",
      description: "We are now checking for your payment",
      duration: 2000,
    })
  }

  // Update the payment verification to properly use Telegram WebApp
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      setLoading(true)

      // Simulate checking payment
      setTimeout(() => {
        setLoading(false)

        // Use Telegram's native popup if available
        if (typeof window !== "undefined" && window.Telegram) {
          window.Telegram.WebApp.showPopup({
            title: "Payment Not Detected",
            message:
              "We couldn't detect your payment. Please ensure you've sent the correct amount to the provided address.",
            buttons: [{ text: "Try Again", type: "default" }],
          })
        }

        toast({
          title: "Payment Not Detected",
          description: "Please ensure you've sent the correct amount",
          variant: "destructive",
          duration: 3000,
        })
      }, 3000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [countdown, toast])

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 text-center border-b border-gray-800 shadow-md">
        <div className="flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-emerald-500" />
          <h2 className="font-serif text-xl tracking-widest">SECURE PAYMENT</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">End-to-End Encrypted Transaction</p>
      </header>

      <div className="p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="sm" className="text-gray-400 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div className="ml-auto flex items-center">
              <Badge className="bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Secure Payment
              </Badge>
            </div>
          </div>

          <Card className="bg-gray-900 border-gray-800 shadow-lg mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Order Summary</h3>
                <Badge variant="outline" className="bg-gray-800 border-gray-700">
                  #
                  {Math.floor(Math.random() * 1000000)
                    .toString()
                    .padStart(6, "0")}
                </Badge>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                  {(() => {
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
                  })()}
                </div>
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-400">{product.description.split(",")[0]}</p>
                </div>
                <div className="ml-auto">
                  <span className="font-bold text-emerald-400">${product.price.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="mb-4 bg-gray-800" />

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Payment Method</label>
                <Select onValueChange={handleCryptoChange} value={selectedCrypto}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select Cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="BTC">BTC (Bitcoin)</SelectItem>
                    <SelectItem value="ETH">ETH (Ethereum)</SelectItem>
                    <SelectItem value="USDT">USDT (Tether)</SelectItem>
                    <SelectItem value="SOLANA">SOL (Solana)</SelectItem>
                    <SelectItem value="LITECOIN">LTC (Litecoin)</SelectItem>
                    <SelectItem value="XMR">XMR (Monero)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedCrypto && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Amount to Pay:</span>
                      <span className="font-mono font-bold">
                        {cryptoAmount} {selectedCrypto}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Address:</span>
                      <div className="flex items-center">
                        <span className="font-mono text-sm mr-2">{cryptoAddress}</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={copyAddress}>
                          {copied ? (
                            <Check className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    {fullAddress && (
                      <CryptoQRCode address={fullAddress} currency={selectedCrypto} amount={cryptoAmount} size={200} />
                    )}
                  </div>

                  <div className="flex items-center justify-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
                    <p className="text-sm text-yellow-500">
                      Send exactly {cryptoAmount} {selectedCrypto} to the address above
                    </p>
                  </div>

                  {countdown !== null && (
                    <div className="text-center p-3 bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-400 mb-2">Checking for payment...</p>
                      <div className="flex items-center justify-center">
                        <Clock className="w-4 h-4 text-emerald-500 mr-2 animate-pulse" />
                        <span className="font-mono">
                          {String(Math.floor(countdown / 60)).padStart(2, "0")}:
                          {String(countdown % 60).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      onClick={copyAddress}
                      variant="outline"
                      className="flex-1 bg-gray-800 border-gray-700 hover:bg-gray-700"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Address
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={startPaymentProcess}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      disabled={countdown !== null || loading}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="mr-2"
                          >
                            <Clock className="h-4 w-4" />
                          </motion.div>
                          Verifying...
                        </>
                      ) : countdown !== null ? (
                        "Checking..."
                      ) : (
                        "I've Paid"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="bg-gray-800 rounded-full p-1 mr-3 mt-0.5">
                <Check className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Secure Transaction</h4>
                <p className="text-xs text-gray-400">All payments are processed through secure blockchain networks</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-800 rounded-full p-1 mr-3 mt-0.5">
                <Check className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Instant Delivery</h4>
                <p className="text-xs text-gray-400">
                  Your purchase will be delivered instantly after payment confirmation
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-800 rounded-full p-1 mr-3 mt-0.5">
                <Check className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium">24/7 Support</h4>
                <p className="text-xs text-gray-400">Our support team is available around the clock to assist you</p>
              </div>
            </div>
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
            Protected by 256-bit encryption. Your transaction details are secure.
          </p>
        </motion.div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="mb-4"
            >
              <div className="w-16 h-16 border-4 border-t-emerald-500 border-gray-700 rounded-full"></div>
            </motion.div>
            <h3 className="text-lg font-bold mb-2">Verifying Payment</h3>
            <p className="text-sm text-gray-400 text-center">
              Please wait while we verify your transaction on the blockchain
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
