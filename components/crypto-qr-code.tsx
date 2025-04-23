"use client"

import { QRCodeSVG } from "qrcode.react"
import { useState, useEffect } from "react"

interface CryptoQRCodeProps {
  address: string
  currency: string
  amount?: string
  size?: number
  bgColor?: string
  fgColor?: string
}

export default function CryptoQRCode({
  address,
  currency,
  amount,
  size = 200,
  bgColor = "#ffffff",
  fgColor = "#000000",
}: CryptoQRCodeProps) {
  const [qrValue, setQrValue] = useState("")

  useEffect(() => {
    if (!address) return

    // Format QR code value based on cryptocurrency
    let value = address

    // For some cryptocurrencies, we can use URI schemes
    switch (currency.toLowerCase()) {
      case "btc":
        value = amount ? `bitcoin:${address}?amount=${amount}` : `bitcoin:${address}`
        break
      case "eth":
        value = `ethereum:${address}`
        break
      case "litecoin":
        value = amount ? `litecoin:${address}?amount=${amount}` : `litecoin:${address}`
        break
      // For others, just use the address
      default:
        value = address
    }

    setQrValue(value)
  }, [address, currency, amount])

  if (!address) return null

  return (
    <div className="p-4 bg-white rounded-lg inline-block">
      <QRCodeSVG
        value={qrValue}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level="H" // High error correction capability
        includeMargin={true}
      />
      <div className="mt-2 text-center text-xs text-black font-medium">{currency.toUpperCase()}</div>
    </div>
  )
}
