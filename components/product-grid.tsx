"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

export function ProductGrid({ items, onSelect, activeItem }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "border rounded-lg overflow-hidden cursor-pointer transition-all bg-white shadow-sm",
            activeItem?.id === item.id ? "ring-2 ring-[#c9a77c]" : "hover:border-[#e9dfd3]",
          )}
          onClick={() => onSelect(item)}
        >
          <div className="aspect-square relative bg-white">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-2" />
          </div>
          <div className="p-2">
            <h3 className="font-medium text-sm truncate text-[#6d5c4e]">{item.name}</h3>
            <p className="text-sm text-[#c9a77c]">R$ {item.price.toFixed(2).replace(".", ",")}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
