import { Star } from "lucide-react"
import React from "react"

function StarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  const [hovered, setHovered] = React.useState<number | null>(null)

  const labels: Record<number, string> = {
    1: "Terrible",
    2: "Poor",
    3: "Average",
    4: "Good",
    5: "Excellent",
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = hovered ? star <= hovered : star <= value

          return (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onChange(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-7 w-7 ${
                  active
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          )
        })}
      </div>

      <p className="text-sm text-muted-foreground">
        {labels[hovered ?? value] ?? "Select a rating"}
      </p>
    </div>
  )
}

export default StarRating