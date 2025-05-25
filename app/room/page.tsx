"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type Position = {
  x: number
  y: number
}

type GameObject = {
  id: string
  x: number
  y: number
  width: number
  height: number
  emoji: string
  name: string
  description: string
}

const GRID_SIZE = 32
const ROOM_WIDTH = 20
const ROOM_HEIGHT = 15

const gameObjects: GameObject[] = [
  {
    id: "computer",
    x: 16,
    y: 3,
    width: 2,
    height: 1,
    emoji: "💻",
    name: "Development Setup",
    description: "제가 매일 코딩하는 컴퓨터입니다. React, TypeScript, Next.js로 다양한 프로젝트를 개발하고 있어요.",
  },
  {
    id: "bookshelf",
    x: 2,
    y: 2,
    width: 3,
    height: 2,
    emoji: "📚",
    name: "Tech Books",
    description: "JavaScript, React, 알고리즘 관련 서적들이 꽂혀있습니다. 새로운 기술을 배우기 위해 꾸준히 독서하고 있어요.",
  },
  {
    id: "coffee",
    x: 8,
    y: 8,
    width: 1,
    height: 1,
    emoji: "☕",
    name: "Coffee",
    description: "코딩할 때 빠질 수 없는 커피입니다. 집중력을 높여주는 최고의 파트너예요.",
  },
  {
    id: "plant",
    x: 5,
    y: 12,
    width: 1,
    height: 1,
    emoji: "🌱",
    name: "Plant",
    description: "작업 공간에 생기를 불어넣어 주는 작은 화분입니다. 개발하면서 받는 스트레스를 달래고 있어요.",
  },
  {
    id: "microphone",
    x: 14,
    y: 11,
    width: 1,
    height: 2,
    emoji: "🎤",
    name: "Mic (Coin Karaoke)",
    description: "스트레스를 풀고 싶을 때 코인노래방에 가서 신나게 노래를 부릅니다. 노래는 제 힐링 수단이에요.",
  },
  {
    id: "billiards",
    x: 11,
    y: 6,
    width: 1,
    height: 1,
    emoji: "🎱",
    name: "Billiards",
    description: "취미 중 하나는 당구 치기입니다. 친구들과 즐겁게 시간을 보내며 머리를 식혀요.",
  },
  {
    id: "cake",
    x: 7,
    y: 5,
    width: 1,
    height: 1,
    emoji: "🍰",
    name: "Cake",
    description: "스트레스 받을 때 가장 먼저 생각나는 음식은 케이크! 단 걸 먹으며 기분을 전환하곤 해요.",
  },
]


export default function RoomPage() {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 10, y: 10 })
  const [selectedObject, setSelectedObject] = useState<GameObject | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const gameAreaRef = useRef<HTMLDivElement>(null)

  // 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // 충돌 감지
  const checkCollision = useCallback((newPos: Position) => {
    // 벽 충돌 체크
    if (newPos.x < 1 || newPos.x >= ROOM_WIDTH - 1 || newPos.y < 1 || newPos.y >= ROOM_HEIGHT - 1) {
      return true
    }

    // 오브젝트 충돌 체크
    for (const obj of gameObjects) {
      if (newPos.x >= obj.x && newPos.x < obj.x + obj.width && newPos.y >= obj.y && newPos.y < obj.y + obj.height) {
        return true
      }
    }

    return false
  }, [])

  // 오브젝트와의 상호작용 체크
  const checkInteraction = useCallback((pos: Position) => {
    for (const obj of gameObjects) {
      // 인접한 타일 체크 (상하좌우)
      const adjacent = [
        { x: pos.x, y: pos.y - 1 },
        { x: pos.x, y: pos.y + 1 },
        { x: pos.x - 1, y: pos.y },
        { x: pos.x + 1, y: pos.y },
      ]

      for (const adjPos of adjacent) {
        if (adjPos.x >= obj.x && adjPos.x < obj.x + obj.width && adjPos.y >= obj.y && adjPos.y < obj.y + obj.height) {
          return obj
        }
      }
    }
    return null
  }, [])

  // 키보드 입력 처리
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (selectedObject) return

      const newPos = { ...playerPos }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          newPos.y -= 1
          break
        case "ArrowDown":
        case "s":
        case "S":
          newPos.y += 1
          break
        case "ArrowLeft":
        case "a":
        case "A":
          newPos.x -= 1
          break
        case "ArrowRight":
        case "d":
        case "D":
          newPos.x += 1
          break
        case " ":
        case "Enter":
          const interactObj = checkInteraction(playerPos)
          if (interactObj) {
            setSelectedObject(interactObj)
          }
          return
        default:
          return
      }

      if (!checkCollision(newPos)) {
        setPlayerPos(newPos)

        const interactObj = checkInteraction(newPos)
        if (interactObj) {
          setSelectedObject(interactObj)
        }
      }
    },
    [playerPos, checkCollision, checkInteraction, selectedObject],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    if (gameAreaRef.current && !isLoading) {
      gameAreaRef.current.focus()
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-gray-700 mb-8 text-xl font-light">Entering Hong's Room...</div>
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gray-900"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
        <div className="text-gray-500 mt-4 text-sm">Use arrow keys to move, space to interact</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4 flex items-center justify-between border-b border-gray-100">
        <Button asChild variant="ghost" className="text-gray-600 hover:text-gray-900">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <div className="text-gray-700 font-medium">Minju's Room</div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div
          ref={gameAreaRef}
          className="relative bg-gray-50 border-2 border-gray-200 rounded-lg shadow-lg focus:outline-none"
          style={{
            width: ROOM_WIDTH * GRID_SIZE,
            height: ROOM_HEIGHT * GRID_SIZE,
          }}
          tabIndex={0}
        >
          {/* 바닥 타일 */}
          {Array.from({ length: ROOM_HEIGHT }, (_, y) =>
            Array.from({ length: ROOM_WIDTH }, (_, x) => (
              <div
                key={`${x}-${y}`}
                className={`absolute ${
                  x === 0 || x === ROOM_WIDTH - 1 || y === 0 || y === ROOM_HEIGHT - 1 ? "bg-gray-300" : "bg-gray-50"
                }`}
                style={{
                  left: x * GRID_SIZE,
                  top: y * GRID_SIZE,
                  width: GRID_SIZE,
                  height: GRID_SIZE,
                  backgroundImage:
                    x === 0 || x === ROOM_WIDTH - 1 || y === 0 || y === ROOM_HEIGHT - 1
                      ? "none"
                      : "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)",
                }}
              />
            )),
          )}

          {/* 게임 오브젝트들 */}
          {gameObjects.map((obj) => (
            <motion.div
              key={obj.id}
              className="absolute flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              style={{
                left: obj.x * GRID_SIZE,
                top: obj.y * GRID_SIZE,
                width: obj.width * GRID_SIZE,
                height: obj.height * GRID_SIZE,
              }}
              onClick={() => setSelectedObject(obj)}
            >
              <span className="text-2xl">{obj.emoji}</span>
            </motion.div>
          ))}

          {/* 플레이어 캐릭터 */}
          <motion.div
            className="absolute flex items-center justify-center z-10"
            style={{
              left: playerPos.x * GRID_SIZE,
              top: playerPos.y * GRID_SIZE,
              width: GRID_SIZE,
              height: GRID_SIZE,
            }}
            animate={{
              left: playerPos.x * GRID_SIZE,
              top: playerPos.y * GRID_SIZE,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <span className="text-2xl">🧑‍💻</span>
          </motion.div>
        </div>
      </main>

      <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-100">
        Use arrow keys or WASD to move • Space or Enter to interact • Click objects to interact
      </div>

      {/* 오브젝트 정보 모달 */}
      <AnimatePresence>
        {selectedObject && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedObject(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{selectedObject.emoji}</span>
                  <h3 className="text-xl font-medium text-gray-900">{selectedObject.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedObject(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="닫기"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed">{selectedObject.description}</p>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedObject(null)} className="bg-gray-900 hover:bg-gray-800">
                  확인
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
