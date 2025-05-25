"use client"

import { useState } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // CD 회전 애니메이션을 위한 값
  const rotation = useMotionValue(0)
  const scale = useMotionValue(1)

  // 마우스 hover 시 CD 회전 애니메이션
  const handleMouseEnter = () => {
    setIsHovered(true)
    // CD가 계속 회전하는 애니메이션
    animate(rotation, 360, {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    })
    // CD가 살짝 커지는 효과
    animate(scale, 1.05, {
      duration: 0.3,
      ease: "easeOut",
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // 회전 애니메이션 중지 및 원래 크기로 복귀
    animate(rotation, rotation.get(), { duration: 0.5 })
    animate(scale, 1, {
      duration: 0.3,
      ease: "easeOut",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
        onClick={() => setShowDetails(true)}
        style={{ backgroundColor: project.color }}
      >
        {/* CD 디자인 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* CD 외부 원 */}
          <motion.div
            className="w-[90%] h-[90%] rounded-full bg-white flex items-center justify-center shadow-xl"
            style={{ rotate: rotation, scale }}
          >
            {/* CD 레이블 */}
            <div 
              className="w-[70%] h-[70%] rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`
              }}
            >
              <div className="w-full h-full flex items-center justify-center relative p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <div className="relative z-10 text-center">
                  <h3 className="text-white text-2xl font-light mb-2 truncate">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm truncate">
                    {project.role}
                  </p>
                </div>
              </div>
            </div>

            {/* CD 중앙 홀 */}
            <div className="absolute w-[12%] h-[12%] rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ring-8 ring-white/90">
              <div className="w-[40%] h-[40%] rounded-full bg-gray-400"></div>
            </div>

            {/* CD 표면 디테일 - 홈 효과 */}
            <div className="absolute inset-0 rounded-full">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border-t border-white/5"
                  style={{
                    transform: `scale(${0.2 + i * 0.02})`,
                  }}
                />
              ))}
            </div>

            {/* CD 표면 디테일 - 빛 반사 효과 */}
            <div className="absolute inset-0 rounded-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-black/20" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent transform rotate-45" />
            </div>
            
            {/* CD 표면 디테일 - 홀로그램 효과 */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-shine" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-shine-delayed" />
            </div>
          </motion.div>
        </div>

        {/* 프로젝트 정보 오버레이 */}
        <motion.div
          className="absolute inset-0 p-6 flex flex-col justify-between z-10 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <div className="text-xs font-mono text-gray-400">{project.role}</div>
            <h3 className="text-2xl font-light text-white mt-1">{project.title}</h3>
          </div>
          <div>
            <p className="text-sm text-gray-300 mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/90">
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-xs font-mono text-gray-400 mt-4">{project.date}</div>
          </div>
        </motion.div>
      </div>

      {/* 프로젝트 상세 모달 */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowDetails(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-light">{project.title}</h2>
                  <p className="text-gray-600">{project.role}</p>
                </div>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{project.date}</span>
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
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
