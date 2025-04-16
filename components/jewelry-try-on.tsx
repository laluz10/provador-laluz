"use client"

import { useEffect, useRef, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JewelryTryOn({ selectedItem, jewelryType }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [error, setError] = useState("")
  const [stream, setStream] = useState(null)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const animationRef = useRef(null)

  const setupCamera = async () => {
    try {
      // Clear any previous errors
      setError("")
      setPermissionDenied(false)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setStream(stream)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)

      // Handle specific error types
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setPermissionDenied(true)
        setError(
          "Permissão para acessar a câmera foi negada. Por favor, permita o acesso à câmera nas configurações do seu navegador.",
        )
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setError("Nenhuma câmera foi encontrada no seu dispositivo.")
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        setError("Sua câmera pode estar sendo usada por outro aplicativo.")
      } else {
        setError("Não foi possível acessar sua câmera. Por favor, verifique as permissões e tente novamente.")
      }
    }
  }

  useEffect(() => {
    setupCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || !stream) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const drawFrame = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // If jewelry is selected, overlay it
        if (selectedItem) {
          const jewelryImg = new Image()
          jewelryImg.crossOrigin = "anonymous"
          jewelryImg.src = selectedItem.image

          jewelryImg.onload = () => {
            // Position jewelry based on type
            if (jewelryType === "brincos") {
              // Position for left ear
              ctx.drawImage(
                jewelryImg,
                canvas.width * 0.3 - jewelryImg.width / 2,
                canvas.height * 0.5 - jewelryImg.height / 2,
                jewelryImg.width,
                jewelryImg.height,
              )

              // Position for right ear (mirror the image)
              ctx.save()
              ctx.scale(-1, 1)
              ctx.drawImage(
                jewelryImg,
                -canvas.width * 0.7 - jewelryImg.width / 2,
                canvas.height * 0.5 - jewelryImg.height / 2,
                jewelryImg.width,
                jewelryImg.height,
              )
              ctx.restore()
            } else if (jewelryType === "colares") {
              ctx.drawImage(
                jewelryImg,
                canvas.width / 2 - jewelryImg.width / 2,
                canvas.height * 0.65 - jewelryImg.height / 2,
                jewelryImg.width,
                jewelryImg.height,
              )
            } else if (jewelryType === "pulseiras") {
              ctx.drawImage(
                jewelryImg,
                canvas.width * 0.3 - jewelryImg.width / 2,
                canvas.height * 0.8 - jewelryImg.height / 2,
                jewelryImg.width,
                jewelryImg.height,
              )
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(drawFrame)
    }

    video.onloadedmetadata = () => {
      video.play().catch((err) => {
        console.error("Error playing video:", err)
        setError("Não foi possível iniciar o vídeo. Verifique se você permitiu o acesso à câmera.")
      })
      drawFrame()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [selectedItem, jewelryType, stream])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>

          {permissionDenied && (
            <div className="mt-4">
              <Button onClick={setupCamera} className="bg-[#c9a77c] hover:bg-[#b89668] text-white">
                Tentar Novamente
              </Button>
              <p className="text-sm mt-2">
                Se o problema persistir, verifique as configurações do seu navegador e certifique-se de que o acesso à
                câmera está permitido para este site.
              </p>
            </div>
          )}
        </Alert>
      )}

      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
        <video ref={videoRef} className="absolute w-full h-full object-cover hidden" playsInline muted />
        <canvas ref={canvasRef} className="w-full h-full object-cover" />

        {!selectedItem && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            <p>Selecione uma joia da barra lateral para experimentá-la</p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white p-4 text-center">
            <p>Não foi possível acessar a câmera. Por favor, verifique as permissões do seu navegador.</p>
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="mt-4 p-4 border rounded-lg bg-[#f8f3ef] shadow-md">
          <h3 className="font-bold text-[#6d5c4e]">{selectedItem.name}</h3>
          <p className="text-[#8a7a6d]">{selectedItem.description}</p>
          <p className="font-bold mt-2 text-[#c9a77c]">R$ {selectedItem.price.toFixed(2).replace(".", ",")}</p>
        </div>
      )}
    </div>
  )
}
