// /pages/api/lexicaSearch.ts  (or /app/api/lexicaSearch/route.ts in /app directory)
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { q } = req.query
    if (!q || typeof q !== 'string') { return res.status(400).json({ error: 'Missing query param `q`' }) }

    const url = `https://lexica.art/api/v1/search?q=${encodeURIComponent(q)}`
    try {
        const externalRes = await fetch(url)
        if (!externalRes.ok) { throw new Error(`Lexica responded with ${externalRes.status}`) }
        const data = await externalRes.json()
        return res.status(200).json(data)
    } catch (err: unknown) {
        console.error(err)
        return res.status(500).json({ error: 'Error fetching from Lexica' })
    }
}