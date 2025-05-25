"use client"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Project = {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl: string
  githubUrl: string
  details: string
  color: string
  role?: string
  date?: string
}

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-64 overflow-hidden rounded-t-2xl">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            <button
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-700 hover:bg-white transition-colors"
              onClick={onClose}
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-light mb-2">{project.title}</h2>
                {project.role && <p className="text-gray-600">{project.role}</p>}
              </div>
              {project.date && (
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{project.date}</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">{project.details}</p>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-gray-900 hover:bg-gray-800">
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Demo
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
