import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-[#f8f3ef]">
        <Link href="/" className="flex items-center justify-center">
          <span className="font-bold text-xl text-[#c9a77c]">La Luz Joias e Acessórios</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-[#6d5c4e]">
            Produtos
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-[#6d5c4e]">
            Coleções
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-[#6d5c4e]">
            Sobre
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-[#6d5c4e]">
            Contato
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f3ef]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#6d5c4e]">
                  Experimente Nossas Joias Virtualmente
                </h1>
                <p className="max-w-[600px] text-[#8a7a6d] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experimente nossa deslumbrante coleção de brincos, colares e pulseiras virtualmente antes de comprar.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/experimentar">
                  <Button className="bg-[#c9a77c] hover:bg-[#b89668] text-white">
                    Experimentar Agora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 items-center">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src="/placeholder.svg?height=400&width=300"
                  alt="Coleção de brincos"
                  className="aspect-[3/4] object-cover w-full"
                />
                <div className="p-4 bg-[#f8f3ef]">
                  <h3 className="text-xl font-bold text-[#6d5c4e]">Brincos</h3>
                  <p className="text-[#8a7a6d]">Encontre o par perfeito</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src="/placeholder.svg?height=400&width=300"
                  alt="Coleção de colares"
                  className="aspect-[3/4] object-cover w-full"
                />
                <div className="p-4 bg-[#f8f3ef]">
                  <h3 className="text-xl font-bold text-[#6d5c4e]">Colares</h3>
                  <p className="text-[#8a7a6d]">Peças elegantes para todas as ocasiões</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src="/placeholder.svg?height=400&width=300"
                  alt="Coleção de pulseiras"
                  className="aspect-[3/4] object-cover w-full"
                />
                <div className="p-4 bg-[#f8f3ef]">
                  <h3 className="text-xl font-bold text-[#6d5c4e]">Pulseiras</h3>
                  <p className="text-[#8a7a6d]">Complete seu visual</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f3ef]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#6d5c4e]">Como Funciona</h2>
                <p className="max-w-[600px] text-[#8a7a6d] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nossa experiência virtual de experimentação é simples e divertida de usar.
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-3 md:gap-12 lg:gap-16 w-full max-w-5xl">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9dfd3] text-[#c9a77c]">
                    <span className="font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#6d5c4e]">Permitir Acesso à Câmera</h3>
                  <p className="text-[#8a7a6d]">
                    Habilite a câmera do seu dispositivo para se ver em nosso espelho virtual.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9dfd3] text-[#c9a77c]">
                    <span className="font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#6d5c4e]">Selecionar Joia</h3>
                  <p className="text-[#8a7a6d]">
                    Navegue por nossa coleção e escolha as peças que deseja experimentar.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9dfd3] text-[#c9a77c]">
                    <span className="font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#6d5c4e]">Veja Como Fica</h3>
                  <p className="text-[#8a7a6d]">Veja instantaneamente como a joia fica em você e tome sua decisão.</p>
                </div>
              </div>
              <div className="space-x-4 pt-4">
                <Link href="/experimentar">
                  <Button className="bg-[#c9a77c] hover:bg-[#b89668] text-white">Iniciar Experiência</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#f8f3ef]">
        <p className="text-xs text-[#8a7a6d]">
          &copy; {new Date().getFullYear()} La Luz Joias e Acessórios. Todos os direitos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-[#8a7a6d]">
            Termos de Serviço
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-[#8a7a6d]">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  )
}
