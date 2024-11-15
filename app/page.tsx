'use client'
import Link from 'next/link'
import { ProjectCard } from '@/components/ProjectCard'
import axios from 'axios'
import getApiUrl from '@/utils'
import { useEffect, useState } from 'react'




export default  function Home() {
  const [projects,setProjects] = useState([])
  useEffect(()=>{
    const apiURL = getApiUrl()
    const res = fetch(`/api/projects/`).then((res)=>{
      if (!res.ok) {
        throw new Error('Failed to fetch projects')
      }
      res.json().then((data)=>{
        setProjects(data)
      })
    })
    
    
  },[])

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