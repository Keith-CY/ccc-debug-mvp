import { NextResponse } from 'next/server'
import { debug } from './run'

export const POST = async () => {
  const result = await debug()
  return new NextResponse(JSON.stringify(result), { status: 200 })
}

export const OPTIONS = () => {
  return new NextResponse(null, { status: 204 })
}
