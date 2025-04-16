"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Camera, Download, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JewelryTryOn } from "@/components/jewelry-try-on"
import { ProductGrid } from "@/components/product-grid"
import { brincos, colares, pulseiras } from "@/lib/jewelry-data"

export default function ExperimentarPage() {
  const [activeTab, setActiveTab] = useState("brincos")
  const [selectedItem, setSelectedItem] = useState(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [screenshot, setScreenshot] = useState(null)

  const handleSelectItem = (item) => {
    setSelectedItem(item)
  }

  const handleStartCamera = () => {
    // Request camera permission explicitly before showing the camera component
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(() => {
        setCameraActive(true)
      })
      .catch((err) => {
        console.error("Error requesting camera permission:", err)
        // Still set camera active so the component can show the proper error message
        setCameraActive(true)
      })
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
      link.download = `laluz-experimentar-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-[#f8f3ef]">
        <Link href="/" className="flex items-center justify-center">
          <ArrowLeft className="mr-2 h-4 w-4 text-[#6d5c4e]" />
          <span className="font-bold text-xl text-[#c9a77c]">La Luz Joias e Acessórios</span>
        </Link>
      </header>
      <main className="flex-1 grid md:grid-cols-[350px_1fr] lg:grid-cols-[400px_1fr]">
        <div className="border-r p-4 overflow-auto bg-[#f8f3ef]">
          <h2 className="text-xl font-bold mb-4 text-[#6d5c4e]">Selecione uma Joia</h2>
          <Tabs defaultValue="brincos" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4 bg-[#e9dfd3]">
              <TabsTrigger value="brincos" className="data-[state=active]:bg-[#c9a77c] data-[state=active]:text-white">
                Brincos
              </TabsTrigger>
              <TabsTrigger value="colares" className="data-[state=active]:bg-[#c9a77c] data-[state=active]:text-white">
                Colares
              </TabsTrigger>
              <TabsTrigger
                value="pulseiras"
                className="data-[state=active]:bg-[#c9a77c] data-[state=active]:text-white"
              >
                Pulseiras
              </TabsTrigger>
            </TabsList>
            <TabsContent value="brincos">
              <ProductGrid items={brincos} onSelect={handleSelectItem} activeItem={selectedItem} />
            </TabsContent>
            <TabsContent value="colares">
              <ProductGrid items={colares} onSelect={handleSelectItem} activeItem={selectedItem} />
            </TabsContent>
            <TabsContent value="pulseiras">
              <ProductGrid items={pulseiras} onSelect={handleSelectItem} activeItem={selectedItem} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="p-4 flex flex-col items-center justify-center relative">
          {!cameraActive ? (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-[#6d5c4e]">Experimente Virtualmente</h2>
              <p className="text-[#8a7a6d] max-w-md mx-auto">
                Para começar a experimentar as joias, precisamos de acesso à sua câmera. Sua privacidade é importante
                para nós - nenhuma imagem é armazenada ou compartilhada.
              </p>
              <div className="space-y-2">
                <Button onClick={handleStartCamera} className="bg-[#c9a77c] hover:bg-[#b89668] text-white">
                  <Camera className="mr-2 h-4 w-4" /> Habilitar Câmera
                </Button>
                <p className="text-xs text-[#8a7a6d]">
                  Ao clicar no botão acima, seu navegador solicitará permissão para acessar sua câmera.
                </p>
              </div>
            </div>
          ) : (
            <>
              <JewelryTryOn selectedItem={selectedItem} jewelryType={activeTab} />
              <div className="mt-4 flex gap-2">
                <Button onClick={handleTakeScreenshot} variant="outline" className="border-[#c9a77c] text-[#6d5c4e]">
                  Tirar Foto
                </Button>
                {screenshot && (
                  <Button onClick={handleDownloadScreenshot} className="bg-[#c9a77c] hover:bg-[#b89668] text-white">
                    <Download className="mr-2 h-4 w-4" /> Salvar Imagem
                  </Button>
                )}
                {selectedItem && (
                  <Button className="bg-[#6d5c4e] hover:bg-[#5a4c40] text-white">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Adicionar ao Carrinho
                  </Button>
                )}
              </div>
            </>
          )}
          {screenshot && (
            <div className="absolute bottom-4 right-4 w-32 h-32 border rounded-md overflow-hidden shadow-md">
              <img
                src={screenshot || "/placeholder.svg"}
                alt="Sua experimentação"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
