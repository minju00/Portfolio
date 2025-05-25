export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  color: string
  role: string
  date: string
  demoUrl: string
  githubUrl: string
  details: string
}

export interface Review {
  id: number
  text: string
  author: string
  position: string
}
