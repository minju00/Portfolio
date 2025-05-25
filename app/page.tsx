"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, Terminal, Menu, X, ChevronRight, Mail, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import ProjectCard from "@/components/project-card"
import ReviewCard from "@/components/review-card"
import type { Project, Review } from "@/lib/types"

// 프로젝트 데이터
const projects: Project[] = [
  {
    id: 1,
    title: "오늘은 해설왕",
    description: "프로야구 AI 해설 시스템",
    tags: ["AI", "NLP", "Baseball"],
    image: "/placeholder.svg?height=300&width=300",
    color: "#f5f5f5",
    role: "AI 개발",
    date: "2024.04",
    demoUrl: "#",
    githubUrl: "#",
    details: "프로야구 영상을 실시간 분석하고, 장면에 맞는 AI 해설 자막을 생성해주는 시스템입니다.",
  },
  {
    id: 2,
    title: "KISA CCTV 인증",
    description: "침입/배회 탐지를 위한 모델 알고리즘 개선",
    tags: ["YOLO", "BYTETrack", "Computer Vision"],
    image: "/placeholder.svg?height=300&width=300",
    color: "#e5e5e5",
    role: "AI 모델 튜닝",
    date: "2024.01",
    demoUrl: "#",
    githubUrl: "#",
    details: "CCTV 침입/배회 탐지 알고리즘을 KISA 기준에 맞춰 개선한 프로젝트입니다.",
  },
  {
    id: 3,
    title: "Timi",
    description: "가장 편리한 그룹 시간 조율 서비스",
    tags: ["UX Design", "Mobile Web"],
    image: "/placeholder.svg?height=300&width=300",
    color: "#f5f5f5",
    role: "기획 / 프론트엔드 개발",
    date: "2023.11",
    demoUrl: "#",
    githubUrl: "#",
    details: "기존 when2meet의 단점을 보완한 시간 조율 플랫폼입니다. UI/UX 최적화와 모바일 접근성을 개선했습니다.",
  },
]

// 리뷰 데이터
const reviews: Review[] = [
  {
    id: 1,
    text: "새로운 기술에도 적극적으로 배우려는 자세가 인상 깊었습니다.",
    author: "멘토님",
    position: "",
  },
  {
    id: 2,
    text: "협업 능력과 커뮤니케이션 스킬이 뛰어나고, 항상 팀의 분위기를 밝게 만들어주는 분이셨어요.",
    author: "멘토님",
    position: "",
  },
  
]

// 스킬 데이터
const skills = [
  "Python",
  "컴퓨터비전",
  "React",
  "C",
  "Git",
  "Machine Learning",
  "UI/UX Design",
  "TypeScript",
  "Data Analysis",
  "딥러닝"
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1])

  // 스크롤 위치에 따라 활성 섹션 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // 헤더 표시 여부
      if (scrollPosition > 100) {
        setIsHeaderVisible(true)
      } else {
        setIsHeaderVisible(false)
      }

      // 활성 섹션 결정
      const sections = ["home", "about", "projects", "reviews", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Fixed Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/#home" className="text-xl font-bold tracking-tight">
            홍길동
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/#home"
              className={`text-sm font-medium transition-colors ${
                activeSection === "home" ? "text-black" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className={`text-sm font-medium transition-colors ${
                activeSection === "about" ? "text-black" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              About
            </Link>
            <Link
              href="/#projects"
              className={`text-sm font-medium transition-colors ${
                activeSection === "projects" ? "text-black" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/#reviews"
              className={`text-sm font-medium transition-colors ${
                activeSection === "reviews" ? "text-black" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Reviews
            </Link>
            <Link
              href="/#contact"
              className={`text-sm font-medium transition-colors ${
                activeSection === "contact" ? "text-black" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/terminal"
              className="hidden md:flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Terminal className="h-4 w-4 mr-1" />
              Terminal
            </Link>
            <Link
              href="/room"
              className="hidden md:flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ChevronRight className="h-4 w-4 mr-1" />
              Room
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/#home"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/#projects"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  href="/#reviews"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reviews
                </Link>
                <Link
                  href="/#contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/terminal"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Terminal
                </Link>
                <Link
                  href="/room"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Room
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Large Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-gray-50 select-none leading-none">
                HONG
              </h1>
            </div>

            {/* Content */}
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
                    Frontend
                    <br />
                    <span className="font-bold">Developer</span>
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
                  오늘보다 더 나은 내일이 되기 위해 노력하는 이민주입니다. 사용자와 기술의 연결을 고민합니다.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default" className="bg-gray-900 hover:bg-gray-800">
                      <Download className="mr-2 h-4 w-4" />
                      Resume
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/terminal">
                        <Terminal className="mr-2 h-4 w-4" />
                        Terminal
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="w-80 h-80 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src="/이민주이미지.jpg?height=320&width=320"
                      alt="이민주"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-light mb-12">About Me</h3>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  안녕하세요, 오늘보다 더 나은 내일을 위해 꾸준히 배우고 도전하는 이민주입니다.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  AI와 웹 프론트엔드 개발에 관심이 많고, 사용자 중심의 서비스 개발을 중요하게 생각합니다.
                  Computer Vision, 데이터 분석, 딥러닝 분야에 대한 깊은 관심을 바탕으로 다양한 프로젝트를 수행했습니다.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  실험과 개선을 반복하며 성장을 추구하고, 팀워크 속에서도 스스로 역할을 책임 있게 수행할 줄 압니다.
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  특히 KISA CCTV 인증 프로젝트와 AI 야구 해설 시스템 개발을 통해 문제 해결과 모델 개선에 주도적으로 참여한 경험이 있습니다.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  개발 외에도 사용자의 관점을 고려한 기획과 인터페이스 설계에 흥미를 가지고 있으며, 서비스가 사용자에게 실질적인 가치를 줄 수 있도록 고민합니다.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-light mb-8">Selected Projects</h3>
            <p className="text-gray-600 max-w-2xl">
              다양한 프로젝트를 통해 쌓은 경험과 기술을 소개합니다. 각 프로젝트는 고유한 도전과 해결책을 담고 있습니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h3 className="text-3xl font-light mb-4">Testimonials</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">함께 일했던 동료들의 리뷰입니다.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-light mb-4">Let's Work Together</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으시다면 언제든 연락주세요.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-colors"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-colors"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">Send Message</Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-light mb-4">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <a href="mailto:hello@example.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                      hello@example.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Github className="h-5 w-5 text-gray-400 mr-3" />
                    <a
                      href="https://github.com/username"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      github.com/username
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="h-5 w-5 text-gray-400 mr-3" />
                    <a
                      href="https://linkedin.com/in/username"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      linkedin.com/in/username
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-light mb-4">Location</h4>
                <p className="text-gray-600">Seoul, South Korea</p>
              </div>

              <div>
                <h4 className="text-xl font-light mb-4">Working Hours</h4>
                <p className="text-gray-600">Monday - Friday: 9am - 6pm KST</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">© 2024 홍길동. All rights reserved.</div>
          <div className="flex space-x-6">
            <a href="mailto:hello@example.com" className="text-gray-500 hover:text-gray-900 transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
