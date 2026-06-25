import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const q = requestUrl.searchParams.get('q')
    if (!q) {
        return NextResponse.json({ error: 'Missing query param `q`' }, { status: 400 })
    }

    const apiUrl = `https://lexica.art/api/v1/search?q=${encodeURIComponent(q)}`
    try {
        const externalRes = await fetch(apiUrl)
        if (!externalRes.ok) {
            throw new Error(`Lexica responded with ${externalRes.status}`)
        }
        const data = await externalRes.json()
        return NextResponse.json(data)
    } catch (err: unknown) {
        console.error(err)
        return NextResponse.json({ error: 'Error fetching from Lexica' }, { status: 500 })
    }
}