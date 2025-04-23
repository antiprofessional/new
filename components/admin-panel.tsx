"use client"

import { useState } from "react"
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  Package,
  Database,
  ShoppingBag,
  CreditCard,
  PenTool,
  UserCog,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/types/product"

interface User {
  id: number
  name: string
  username: string
  totalOrders: number
  status: "active" | "blocked"
}

export default function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("products")
  const [showProductDialog, setShowProductDialog] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const { toast } = useToast()

  // Sample products data
  const [products, setProducts] = useState<Product[]>([
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
      id: "spotify-checker",
      name: "SPOTIFY CHECKER",
      description: "SPOTIFY VALID EMAIL CHECKER, Fast validation for all countries, Secure API",
      price: 150,
      image: "",
      category: "tool",
      verified: true,
      rating: 4.7,
      reviews: 29,
    },
  ])

  // Sample users data
  const users: User[] = [
    { id: 123456789, name: "John Smith", username: "johnsmith", totalOrders: 5, status: "active" },
    { id: 987654321, name: "Alice Brown", username: "alice_b", totalOrders: 2, status: "active" },
    { id: 456789123, name: "Robert Jones", username: "robert", totalOrders: 0, status: "blocked" },
    { id: 789123456, name: "Emma Wilson", username: "emma", totalOrders: 3, status: "active" },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toString().includes(searchQuery),
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "email":
      case "sms":
        return <ShoppingBag className="w-4 h-4" />
      case "database":
        return <Database className="w-4 h-4" />
      case "account":
        return <CreditCard className="w-4 h-4" />
      case "tool":
        return <PenTool className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const handleAddProduct = () => {
    setCurrentProduct({
      id: "",
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "email",
      verified: true,
      rating: 5.0,
      reviews: 0,
    })
    setEditMode(false)
    setShowProductDialog(true)
  }

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product)
    setEditMode(true)
    setShowProductDialog(true)
  }

  const handleDeleteProduct = (product: Product) => {
    setCurrentProduct(product)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteProduct = () => {
    if (currentProduct) {
      setProducts(products.filter((p) => p.id !== currentProduct.id))
      toast({
        title: "Product Deleted",
        description: `${currentProduct.name} has been deleted successfully`,
        duration: 2000,
      })
    }
    setShowDeleteConfirm(false)
  }

  const saveProduct = () => {
    if (!currentProduct) return

    if (editMode) {
      setProducts(products.map((p) => (p.id === currentProduct.id ? currentProduct : p)))
      toast({
        title: "Product Updated",
        description: `${currentProduct.name} has been updated successfully`,
        duration: 2000,
      })
    } else {
      // Create a new ID for the product
      const newId = currentProduct.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-5)
      const newProduct = { ...currentProduct, id: newId }
      setProducts([...products, newProduct])
      toast({
        title: "Product Added",
        description: `${newProduct.name} has been added successfully`,
        duration: 2000,
      })
    }

    setShowProductDialog(false)
  }

  const handleUserAction = (user: User, action: string) => {
    toast({
      title: `User ${action}`,
      description: `Action performed on user ${user.username} (${user.id})`,
      duration: 2000,
    })
  }

  const updateCurrentProduct = (field: string, value: any) => {
    if (currentProduct) {
      setCurrentProduct({ ...currentProduct, [field]: value })
    }
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 text-center border-b border-gray-800 shadow-md">
        <div className="flex items-center justify-center">
          <UserCog className="w-5 h-5 mr-2 text-emerald-500" />
          <h2 className="font-serif text-xl tracking-widest">ADMIN PANEL</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">Manage Products and Users</p>
      </header>

      <div className="p-4">
        <Tabs className="w-full" defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-gray-800 border-gray-700">
            <TabsTrigger className="flex-1" value="products">
              Products
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="users">
              Users
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  className="pl-10 bg-gray-900 border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {activeTab === "products" && (
                <Button onClick={handleAddProduct} className="bg-emerald-600 hover:bg-emerald-700">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add
                </Button>
              )}
            </div>

            <TabsContent value="products" className="mt-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">{filteredProducts.length} products</p>
                <Badge className="bg-emerald-500/20 text-emerald-400">
                  <Package className="w-3 h-3 mr-1" />
                  Products
                </Badge>
              </div>

              <Separator className="mb-4 bg-gray-800" />

              {filteredProducts.length > 0 ? (
                <div className="space-y-3 mb-20">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="bg-gray-900 border-gray-800 shadow-md overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                              {getCategoryIcon(product.category)}
                            </div>
                            <div>
                              <h4 className="font-bold">{product.name}</h4>
                              <div className="flex items-center my-1">
                                <Badge
                                  variant="outline"
                                  className="text-[10px] bg-gray-800 border-gray-700 text-gray-300"
                                >
                                  {product.category.toUpperCase()}
                                </Badge>
                                {product.verified && (
                                  <Badge className="ml-2 bg-emerald-500/20 text-emerald-400 text-[10px]">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    VERIFIED
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-400 line-clamp-1">{product.description}</p>
                              <p className="text-emerald-400 font-bold mt-1">${product.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-gray-800"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <Package className="w-12 h-12 text-gray-600 mb-4" />
                  <h3 className="text-lg font-bold mb-1">No Products Found</h3>
                  <p className="text-sm text-gray-400 text-center">
                    No products match your search criteria or none have been added yet.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">{filteredUsers.length} users</p>
                <Badge className="bg-emerald-500/20 text-emerald-400">
                  <UserCog className="w-3 h-3 mr-1" />
                  Users
                </Badge>
              </div>

              <Separator className="mb-4 bg-gray-800" />

              {filteredUsers.length > 0 ? (
                <div className="space-y-3 mb-20">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="bg-gray-900 border-gray-800 shadow-md overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center mb-1">
                              <h4 className="font-bold">{user.name}</h4>
                              <span className="mx-1 text-gray-500">•</span>
                              <span className="text-gray-400">@{user.username}</span>
                            </div>
                            <p className="text-sm text-gray-400">ID: {user.id}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-sm">
                                <span className="text-gray-400">Orders:</span> {user.totalOrders}
                              </span>
                              {user.status === "active" ? (
                                <Badge className="ml-3 bg-emerald-500/20 text-emerald-400 text-[10px]">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  ACTIVE
                                </Badge>
                              ) : (
                                <Badge className="ml-3 bg-red-500/20 text-red-400 text-[10px]">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  BLOCKED
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-white hover:bg-gray-800"
                              onClick={() => handleUserAction(user, "details")}
                            >
                              View
                            </Button>
                            {user.status === "active" ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-red-500 hover:bg-gray-800"
                                onClick={() => handleUserAction(user, "block")}
                              >
                                Block
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-emerald-500 hover:bg-gray-800"
                                onClick={() => handleUserAction(user, "unblock")}
                              >
                                Unblock
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <UserCog className="w-12 h-12 text-gray-600 mb-4" />
                  <h3 className="text-lg font-bold mb-1">No Users Found</h3>
                  <p className="text-sm text-gray-400 text-center">No users match your search criteria.</p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Product Add/Edit Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>

          {currentProduct && (
            <div className="space-y-4 mt-2">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={currentProduct.name}
                  onChange={(e) => updateCurrentProduct("name", e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  placeholder="Product Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select
                  value={currentProduct.category}
                  onValueChange={(value) => updateCurrentProduct("category", value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="tool">Tool</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  value={currentProduct.description}
                  onChange={(e) => updateCurrentProduct("description", e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  placeholder="Product Description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <Input
                  type="number"
                  value={currentProduct.price}
                  onChange={(e) => updateCurrentProduct("price", Number.parseFloat(e.target.value))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="0.00"
                />
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Verified</label>
                <input
                  type="checkbox"
                  checked={currentProduct.verified}
                  onChange={(e) => updateCurrentProduct("verified", e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-500 bg-gray-800 border-gray-700"
                />
              </div>
            </div>
          )}

          <DialogFooter className="mt-2">
            <Button
              variant="outline"
              onClick={() => setShowProductDialog(false)}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button onClick={saveProduct} className="bg-emerald-600 hover:bg-emerald-700">
              <Save className="h-4 w-4 mr-1" />
              {editMode ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-500">Confirm Deletion</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p>Are you sure you want to delete "{currentProduct?.name}"?</p>
            <p className="text-sm text-gray-400 mt-2">This action cannot be undone.</p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={confirmDeleteProduct} className="bg-red-600 hover:bg-red-700">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
