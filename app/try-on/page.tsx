"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Camera, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JewelryTryOn } from "@/components/jewelry-try-on"
import { ProductGrid } from "@/components/product-grid"
import { earrings, necklaces, bracelets } from "@/lib/jewelry-data"

export default function TryOnPage() {
  const [activeTab, setActiveTab] = useState("earrings")
  const [selectedItem, setSelectedItem] = useState(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [screenshot, setScreenshot] = useState(null)

  const handleSelectItem = (item) => {
    setSelectedItem(item)
  }

  const handleStartCamera = () => {
    setCameraActive(true)
  }

  const handleTakeScreenshot = () => {
    const canvas = document.querySelector("canvas")
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png")
      setScreenshot(dataUrl)
    }
  }

  const handleDownloadScreenshot = () => {
    if (screenshot) {
      const link = document.createElement("a")
      link.href = screenshot
      link.download = `jewelry-try-on-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="font-bold text-xl">LuxJewels</span>
        </Link>
      </header>
      <main className="flex-1 grid md:grid-cols-[350px_1fr] lg:grid-cols-[400px_1fr]">
        <div className="border-r p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-4">Select Jewelry</h2>
          <Tabs defaultValue="earrings" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="earrings">Earrings</TabsTrigger>
              <TabsTrigger value="necklaces">Necklaces</TabsTrigger>
              <TabsTrigger value="bracelets">Bracelets</TabsTrigger>
            </TabsList>
            <TabsContent value="earrings">
              <ProductGrid items={earrings} onSelect={handleSelectItem} activeItem={selectedItem} />
            </TabsContent>
            <TabsContent value="necklaces">
              <ProductGrid items={necklaces} onSelect={handleSelectItem} activeItem={selectedItem} />
            </TabsContent>
            <TabsContent value="bracelets">
              <ProductGrid items={bracelets} onSelect={handleSelectItem} activeItem={selectedItem} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="p-4 flex flex-col items-center justify-center relative">
          {!cameraActive ? (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Virtual Try-On Experience</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                To start trying on jewelry, we need access to your camera. Your privacy is important to us - no images
                are stored or shared.
              </p>
              <Button onClick={handleStartCamera} className="bg-rose-500 hover:bg-rose-600">
                <Camera className="mr-2 h-4 w-4" /> Enable Camera
              </Button>
            </div>
          ) : (
            <>
              <JewelryTryOn selectedItem={selectedItem} jewelryType={activeTab} />
              <div className="mt-4 flex gap-2">
                <Button onClick={handleTakeScreenshot} variant="outline">
                  Take Photo
                </Button>
                {screenshot && (
                  <Button onClick={handleDownloadScreenshot} className="bg-rose-500 hover:bg-rose-600">
                    <Download className="mr-2 h-4 w-4" /> Save Image
                  </Button>
                )}
              </div>
            </>
          )}
          {screenshot && (
            <div className="absolute bottom-4 right-4 w-32 h-32 border rounded-md overflow-hidden">
              <img src={screenshot || "/placeholder.svg"} alt="Your try-on" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
