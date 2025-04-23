"use client"

import { useState, useEffect } from "react"
import { Shield, ShieldCheck, User, Mail, Key, ShoppingBag, UserCog, Lock, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface ProfileSectionProps {
  user: any
  onNavigate: (section: string) => void
}

export default function ProfileSection({ user, onNavigate }: ProfileSectionProps) {
  const [profilePic, setProfilePic] = useState("/placeholder.svg?height=100&width=100")
  const [telegramInitialized, setTelegramInitialized] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (user?.photo_url) {
      setProfilePic(user.photo_url)
    }

    // Mark Telegram as initialized when user data is available
    if (user) {
      setTelegramInitialized(true)

      // Check if user is admin (specific user IDs only)
      const adminIds = [12345678, 123456789, 987654321] // Specific admin user IDs
      setIsAdmin(adminIds.includes(user.id))
    }
  }, [user])

  const handleOrdersClick = () => {
    onNavigate("orders")
    toast({
      title: "Order History",
      description: "Viewing your order history",
      duration: 2000,
    })
  }

  const handleAdminClick = () => {
    onNavigate("admin")
    toast({
      title: "Admin Panel",
      description: "Accessing admin controls",
      duration: 2000,
    })
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 text-center border-b border-gray-800 shadow-md">
        <div className="flex items-center justify-center">
          <Shield className="w-5 h-5 mr-2 text-emerald-500" />
          <h2 className="font-serif text-xl tracking-widest">PROFILE</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">Secure Telegram Integration</p>
      </header>

      <div className="flex flex-col items-center justify-center text-center mt-8 px-4">
        <div className="relative">
          <img
            src={profilePic || "/placeholder.svg"}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full mb-4 border-2 border-emerald-500 p-1"
            onError={() => setProfilePic("/placeholder.svg?height=100&width=100")}
          />
          {telegramInitialized && (
            <Badge className="absolute bottom-4 right-0 bg-emerald-500 text-white">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-1">
          {user ? `${user.first_name} ${user.last_name || ""}` : "Loading..."}
        </h1>

        <p className="text-gray-400 mb-4">{user?.username ? `@${user.username}` : "No username"}</p>

        {telegramInitialized && (
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Badge variant="outline" className="bg-gray-800 text-white border-gray-700">
              <User className="w-3 h-3 mr-1 text-emerald-500" />
              Telegram User
            </Badge>
            {isAdmin && (
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <UserCog className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            )}
          </div>
        )}

        <Card className="w-full max-w-md bg-gray-900 border-gray-800 shadow-lg mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-400">User ID</span>
                </div>
                <span className="font-mono text-sm">{user?.id || "Unknown"}</span>
              </div>

              <Separator className="bg-gray-800" />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-400">Telegram</span>
                </div>
                <span className="font-mono text-sm">{user?.username ? `@${user.username}` : "Not available"}</span>
              </div>

              <Separator className="bg-gray-800" />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Key className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-400">Security</span>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
                  {telegramInitialized ? "Verified" : "Pending"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="w-full max-w-md mb-4">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleOrdersClick}>
            <ShoppingBag className="w-4 h-4 mr-2" />
            My Orders
          </Button>
        </div>

        {isAdmin && (
          <Button
            className="w-full max-w-md bg-gray-800 border border-emerald-500/30 text-emerald-400 hover:bg-gray-700 mt-2"
            onClick={handleAdminClick}
          >
            <UserCog className="w-4 h-4 mr-2" />
            Admin Panel
          </Button>
        )}

        <div className="flex items-center justify-center mt-8 mb-4">
          <div className="flex items-center space-x-1 bg-gray-800 rounded-full px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-gray-300">Telegram Connection Active</span>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4">
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
      </div>

      <footer className="text-center mt-8 p-4 bg-gray-900 text-gray-400 text-xs border-t border-gray-800">
        <p>&copy; 2024 TELENONYM. All rights reserved.</p>
        <p className="mt-1">
          <span className="text-emerald-500">256-bit Encryption</span> •{" "}
          <span className="text-emerald-500">Secure Payments</span>
        </p>
        <p className="mt-2">
          Contact Support:
          <a href="https://t.me/telenonymsupport" className="text-emerald-400 hover:text-emerald-300 ml-1">
            @telenonymsupport
          </a>
        </p>
      </footer>
    </div>
  )
}
