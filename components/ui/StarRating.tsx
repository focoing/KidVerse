import { Star } from 'lucide-react'

interface StarRatingProps {
  stars: number
  maxStars?: number
  size?: number
}

const StarRating = ({ stars, maxStars = 3, size = 20 }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={index < stars ? 'text-kid-yellow fill-kid-yellow' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}

export { StarRating }
