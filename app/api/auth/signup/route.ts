import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '@/app/db'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const hashedPassword = await bcrypt.hash(password, 5)

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    })
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string)
    return NextResponse.json({ user, token })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 400 })
  }
}