"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

type Command = {
  command: string
  response: string | React.JSX.Element
}

export default function TerminalPage() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([])
  const [commandIndex, setCommandIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const commands = {
    help: (
      <div className="space-y-2">
        <p>Available commands:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-mono text-emerald-400">about</span> - About me
          </li>
          <li>
            <span className="font-mono text-emerald-400">skills</span> - Technical skills
          </li>
          <li>
            <span className="font-mono text-emerald-400">projects</span> - My projects
          </li>
          <li>
            <span className="font-mono text-emerald-400">contact</span> - Contact information
          </li>
          <li>
            <span className="font-mono text-emerald-400">home</span> - Go to homepage
          </li>
          <li>
            <span className="font-mono text-emerald-400">clear</span> - Clear terminal
          </li>
        </ul>
      </div>
    ),
    about: {
      response: (
        <div className="space-y-2">
          <p>👋 안녕하세요!</p>
          <p>사용자 경험을 중요시하는 프론트엔드 개발자 홍길동입니다.</p>
          <p>깔끔하고 직관적인 인터페이스를 만드는 것을 좋아합니다.</p>
          <p className="mt-2 text-emerald-400">Go to about section? (y/n)</p>
        </div>
      ),
      action: () => router.push("/#about"),
    },
    skills: {
      response: (
        <div className="space-y-2">
          <p>🛠 Technical Skills</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>JavaScript / TypeScript</li>
            <li>React / Next.js</li>
            <li>Node.js / Python</li>
            <li>Git / Figma</li>
          </ul>
          <p className="mt-2 text-emerald-400">Go to skills section? (y/n)</p>
        </div>
      ),
      action: () => router.push("/#about"),
    },
    projects: {
      response: (
        <div className="space-y-2">
          <p>🚀 Recent Projects</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>React-Epub-Viewer - React, JavaScript</li>
            <li>QOJ - Next.js, PostgreSQL</li>
            <li>SIGNUS - React Native, Firebase</li>
            <li>trAIner - React, Python, TensorFlow</li>
          </ul>
          <p className="mt-2 text-emerald-400">Go to projects section? (y/n)</p>
        </div>
      ),
      action: () => router.push("/#projects"),
    },
    contact: {
      response: (
        <div className="space-y-2">
          <p>📬 Contact Information</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Email: hello@example.com</li>
            <li>GitHub: github.com/username</li>
            <li>LinkedIn: linkedin.com/in/username</li>
          </ul>
          <p className="mt-2 text-emerald-400">Go to contact section? (y/n)</p>
        </div>
      ),
      action: () => router.push("/#contact"),
    },
    home: {
      response: "Redirecting to homepage...",
      action: () => router.push("/"),
    },
    clear: "CLEAR",
    whoami: "홍길동 - Frontend Developer",
    pwd: "/terminal",
    ls: "about.txt  skills.md  projects/  contact.json",
    date: new Date().toLocaleString("ko-KR"),
    y: "Executing command...",
    n: "Command cancelled.",
  }

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (trimmedCmd === "") {
      return { command: cmd, response: "" }
    }

    if (trimmedCmd === "clear") {
      return { command: cmd, response: "CLEAR" }
    }

    // y/n 응답 처리
    if (trimmedCmd === "y") {
      const lastCommand = history[history.length - 1]?.command.toLowerCase()
      if (
        lastCommand &&
        commands[lastCommand as keyof typeof commands] &&
        typeof commands[lastCommand as keyof typeof commands] === "object"
      ) {
        const commandObj = commands[lastCommand as keyof typeof commands] as { response: any; action: () => void }
        if (commandObj.action) {
          setTimeout(() => {
            commandObj.action()
          }, 500)
          return { command: cmd, response: commands.y }
        }
      }
    }

    if (trimmedCmd === "n") {
      return { command: cmd, response: commands.n }
    }

    const commandKey = Object.keys(commands).find((key) => key === trimmedCmd)

    if (commandKey) {
      const command = commands[commandKey as keyof typeof commands]
      if (typeof command === "object" && "response" in command) {
        return { command: cmd, response: command.response }
      }
      return { command: cmd, response: command }
    }

    return {
      command: cmd,
      response: `Command not found: ${cmd}. Type 'help' for available commands.`,
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (input.trim() === "") return

    const result = handleCommand(input)

    if (result.response === "CLEAR") {
      setHistory([])
    } else {
      setHistory((prev) => [...prev, result])
    }

    setInput("")
    setCommandIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0 && commandIndex < history.length - 1) {
        const newIndex = commandIndex + 1
        setCommandIndex(newIndex)
        setInput(history[history.length - 1 - newIndex].command)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1
        setCommandIndex(newIndex)
        setInput(history[history.length - 1 - newIndex].command)
      } else if (commandIndex === 0) {
        setCommandIndex(-1)
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const availableCommands = Object.keys(commands)
      const matchingCommands = availableCommands.filter((cmd) => cmd.startsWith(input.toLowerCase()))

      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0])
      }
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // 초기 환영 메시지 설정
  useEffect(() => {
    setHistory([
      {
        command: "",
        response: (
          <div className="space-y-2">
            <p className="text-emerald-400 font-bold">Welcome to Hong's Portfolio Terminal</p>
            <p>Type 'help' to see available commands.</p>
          </div>
        ),
      },
    ])
  }, [])

  return (
    <div className="min-h-screen bg-[#0d1117] text-emerald-400 flex flex-col">
      <header className="p-4 flex items-center border-b border-gray-800">
        <Button asChild variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-gray-800">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#161b22] border border-gray-700 rounded-lg shadow-2xl w-full max-w-4xl h-[70vh] overflow-auto font-mono"
          ref={terminalRef}
        >
          <div className="flex items-center p-4 border-b border-gray-700 bg-[#0d1117]">
            <div className="flex space-x-2 mr-4">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <p className="text-gray-400 text-sm">hong@portfolio ~ </p>
          </div>

          <div className="p-4">
            {history.map((item, index) => (
              <div key={index} className="mb-4">
                {item.command && (
                  <div className="flex">
                    <span className="text-emerald-400 mr-2">hong@portfolio:~$</span>
                    <span className="text-white">{item.command}</span>
                  </div>
                )}
                <div className="pl-4 mt-1 text-emerald-300">{item.response}</div>
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="text-emerald-400 mr-2">hong@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none border-none text-white"
                autoFocus
                aria-label="터미널 명령어 입력"
              />
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
