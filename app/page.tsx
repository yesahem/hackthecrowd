
import Link from 'next/link'
import { ProjectCard } from '@/components/ProjectCard'
import axios from 'axios'
import getApiUrl from '@/utils'

async function getProjects() {
  const apiURL = getApiUrl()
  const res = await fetch(`${apiURL}/api/projects`)
  if (!res.ok) {
    throw new Error('Failed to fetch projects')
  }
  return res.json()
}

export default async function Home() {
  const projects = await getProjects()

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-cyan-200">SolanaStarter</h1>
        <div>
          <Link href="/login" className="text-cyan-400 hover:underline mr-4">Log In</Link>
          <Link href="/signup" className="text-cyan-400 hover:underline">Sign Up</Link>
        </div>
      </nav>
      <h2 className="text-3xl font-bold mb-8 text-cyan-200">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}