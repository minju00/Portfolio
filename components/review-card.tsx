"use client"

import { motion } from "framer-motion"
import type { Review } from "@/lib/types"

interface ReviewCardProps {
  review: Review
  index: number
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-800 p-6 rounded-lg"
    >
      <div className="text-2xl text-gray-500 mb-4">"</div>
      <p className="text-gray-300 mb-6 line-clamp-6">{review.text}</p>
      <div className="flex items-center">
        <div>
          <div className="text-sm font-medium text-white">{review.author}</div>
          <div className="text-xs text-gray-400">{review.position}</div>
        </div>
      </div>
    </motion.div>
  )
}
