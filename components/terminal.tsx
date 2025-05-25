"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

type Command = {
  command: string
  response: string | JSX.Element
}

export default function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([])
  const [commandIndex, setCommandIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: (
      <div>
        <p>사용 가능한 명령어:</p>
        <ul className="list-disc pl-5">
          <li>about - 개발자 소개</li>
          <li>skills - 기술 스택 보기</li>
          <li>projects - 프로젝트 목록</li>
          <li>contact - 연락처 정보</li>
          <li>clear - 터미널 내용 지우기</li>
          <li>exit - 터미널 닫기</li>
        </ul>
      </div>
    ),
    about:
      "안녕하세요! 저는 사용자 경험을 중요시하는 프론트엔드 개발자 홍길동입니다. 아름다운 인터페이스와 직관적인 사용성을 구현하는 것을 좋아합니다.",
    skills: (
      <div>
        <p>기술 스택:</p>
        <ul className="list-disc pl-5">
          <li>HTML/CSS 🎨</li>
          <li>JavaScript ✨</li>
          <li>React ⚛️</li>
          <li>TypeScript 📘</li>
          <li>Next.js 🔄</li>
          <li>Tailwind CSS 🌬️</li>
        </ul>
      </div>
    ),
    projects: "프로젝트 목록을 보려면 웹사이트의 '프로젝트' 섹션을 확인하세요.",
    contact: (
      <div>
        <p>연락처:</p>
        <ul className="list-disc pl-5">
          <li>이메일: example@email.com</li>
          <li>GitHub: github.com/username</li>
          <li>LinkedIn: linkedin.com/in/username</li>
        </ul>
      </div>
    ),
    clear: "CLEAR",
    exit: "EXIT",
    whoami: "홍길동 - 프론트엔드 개발자",
    pwd: "/home/portfolio",
    ls: (
      <div>
        <p>about.txt skills.md projects/ contact.json</p>
      </div>
    ),
    date: new Date().toLocaleString("ko-KR"),
  }

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (trimmedCmd === "") {
      return { command: cmd, response: "" }
    }

    if (trimmedCmd === "clear") {
      return { command: cmd, response: "CLEAR" }
    }

    if (trimmedCmd === "exit") {
      return { command: cmd, response: "EXIT" }
    }

    const commandKey = Object.keys(commands).find((key) => key === trimmedCmd)

    if (commandKey) {
      return { command: cmd, response: commands[commandKey as keyof typeof commands] }
    }

    return {
      command: cmd,
      response: `명령어를 찾을 수 없습니다: ${cmd}. 'help'를 입력하여 사용 가능한 명령어를 확인하세요.`,
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (input.trim() === "") return

    const result = handleCommand(input)

    if (result.response === "CLEAR") {
      setHistory([])
    } else if (result.response === "EXIT") {
      // 터미널 닫기 로직은 부모 컴포넌트에서 처리
      window.dispatchEvent(new CustomEvent("closeTerminal"))
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-black/90 backdrop-blur-md text-mint-200 p-4 rounded-lg shadow-lg w-full max-w-2xl max-h-[70vh] overflow-auto font-mono"
      ref={terminalRef}
    >
      <div className="mb-4">
        <p className="text-peach-300">환영합니다! 포트폴리오 터미널입니다.</p>
        <p className="text-lavender-300">명령어를 입력하세요. 도움말은 'help'를 입력하세요.</p>
        <div className="border-b border-gray-700 my-2"></div>
      </div>

      {history.map((item, index) => (
        <div key={index} className="mb-2">
          <div className="flex">
            <span className="text-peach-300 mr-2">guest@portfolio:~$</span>
            <span>{item.command}</span>
          </div>
          <div className="pl-4 text-lavender-100">{item.response}</div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-peach-300 mr-2">guest@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none text-mint-100"
          autoFocus
          aria-label="터미널 명령어 입력"
        />
      </form>
    </motion.div>
  )
}
