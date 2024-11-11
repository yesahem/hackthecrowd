
import { NextResponse } from 'next/server'
import  prisma  from '@/app/db'


/*
export async function GET(request: Request, { params }: { params: { id: string } }) {
 
}*/


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log(id)
  try {
    
    const project = await prisma.project.findUnique({ where: { id } })
    if (project) {
      return NextResponse.json(project)
    } else {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error fetching project' }, { status: 500 })
  }
}