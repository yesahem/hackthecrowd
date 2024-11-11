import { NextResponse } from 'next/server'
import prisma from '@/app/db'

export async function GET() {
  try {
    const projects = await prisma.project.findMany()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { title, description, fundingGoal, category } = await request.json()
  try {
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        fundingGoal,
        category,
        currentFunding: 0,
        status: ['UPCOMING'],
        isRefundable: false,
        targetedRaise: '0',
        tokenPrice: '0',
        type: 'OPEN',
        registerFrom: new Date().toISOString(),
        registerTo: new Date().toISOString(),
      },
    })
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error creating project' }, { status: 500 })
  }
}