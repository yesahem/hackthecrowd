import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '@/app/db'


export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string)
    return NextResponse.json({ user, token })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error during login' }, { status: 400 })
  }
}