"use client"

import { useEffect, useState } from "react"
import ProfileSection from "@/components/profile-section"
import ProductsSection from "@/components/products-section"
import DatabaseSection from "@/components/database-section"
import AccountsSection from "@/components/accounts-section"
import ToolsSection from "@/components/tools-section"
import OrdersSection from "@/components/orders-section"
import AdminPanel from "@/components/admin-panel"
import FooterNavigation from "@/components/footer-navigation"
import ProductDetails from "@/components/product-details"
import PaymentSection from "@/components/payment-section"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/types/product"
import LoadingScreen from "@/components/loading-screen"

export default function Home() {
  const [activeSection, setActiveSection] = useState("profile")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [telegramUser, setTelegramUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Initialize Telegram WebApp
    const initTelegram = async () => {
      setIsLoading(true)
      try {
        if (typeof window !== "undefined" && window.Telegram) {
          // Ensure the WebApp is ready
          window.Telegram.WebApp.ready()

          // Get user data from Telegram
          const user = window.Telegram.WebApp.initDataUnsafe?.user

          if (user) {
            // Check if user is admin (specific user IDs only)
            const adminIds = [12345678, 123456789, 987654321] // Specific admin user IDs
            const isAdmin = adminIds.includes(user.id)

            // Set user data with admin status
            setTelegramUser({ ...user, isAdmin })

            toast({
              title: "Welcome to Telenonym",
              description: `Hello, ${user.first_name}! Your secure marketplace is ready.`,
              duration: 3000,
            })

            // Expand the viewport to the maximum available height
            window.Telegram.WebApp.expand()
          } else {
            console.warn("No user data available from Telegram WebApp")
            toast({
              title: "Telegram Connection Issue",
              description: "Unable to retrieve your Telegram profile information",
              variant: "destructive",
              duration: 3000,
            })
          }
        } else {
          console.warn("Telegram WebApp is not available")
          // For testing outside of Telegram
          setTelegramUser({
            id: 12345678, // Admin ID for testing
            first_name: "Test",
            last_name: "User",
            username: "testuser",
            isAdmin: true, // For testing
          })
        }
      } catch (error) {
        console.error("Failed to initialize Telegram WebApp:", error)
        toast({
          title: "Connection Error",
          description: "Failed to connect to Telegram. Please try again.",
          variant: "destructive",
          duration: 3000,
        })
      } finally {
        // Simulate loading for better UX
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }
    }

    initTelegram()
  }, [toast])

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    setActiveSection("product-details")
    toast({
      title: "Product Selected",
      description: `You've selected ${product.name}`,
      duration: 2000,
    })
  }

  const handlePaymentProceed = () => {
    setActiveSection("payment")
    toast({
      title: "Proceeding to Payment",
      description: "Please select your preferred payment method",
      duration: 2000,
    })
  }

  const handleSectionChange = (section: string) => {
    // Reset selected product if navigating away from product details/payment
    if (section !== "product-details" && section !== "payment") {
      setSelectedProduct(null)
    }
    setActiveSection(section)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {activeSection === "profile" && <ProfileSection user={telegramUser} onNavigate={handleSectionChange} />}

      {activeSection === "products" && <ProductsSection onProductSelect={handleProductSelect} />}

      {activeSection === "database" && <DatabaseSection onProductSelect={handleProductSelect} />}

      {activeSection === "accounts" && <AccountsSection onProductSelect={handleProductSelect} />}

      {activeSection === "tools" && <ToolsSection onProductSelect={handleProductSelect} />}

      {activeSection === "orders" && <OrdersSection />}

      {/* Only show admin panel if user is an admin */}
      {activeSection === "admin" && telegramUser?.isAdmin && <AdminPanel />}

      {activeSection === "product-details" && selectedProduct && (
        <ProductDetails product={selectedProduct} onProceedToPayment={handlePaymentProceed} />
      )}

      {activeSection === "payment" && selectedProduct && <PaymentSection product={selectedProduct} />}

      <FooterNavigation activeSection={activeSection} onSectionChange={handleSectionChange} />
    </main>
  )
}
