import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export async function GET(req: NextRequest, { params }: { params: { locale: string } }) {
  const { locale } = params
  const filePath = path.join(process.cwd(), `data/cvs/${locale}/main.mdx`)
  const source = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(source)
  const mdxSource = await serialize(content)

  return NextResponse.json({ mdxSource, frontMatter: data })
}
