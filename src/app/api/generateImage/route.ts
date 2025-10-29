import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, });

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        if (!prompt || prompt.trim().length === 0) {
            return NextResponse.json(
                { error: "Prompt cannot be empty" },
                { status: 400 }
            );
        }

        try {
            const response = await openai.images.generate({ model: "gpt-image-1", prompt, size: "1024x1024", });
            return NextResponse.json({ imageUrl: response.data?.[0].url });
        } catch (error) {
            console.error("OpenAI Image Error:", error);
            // Fallback to a free random image source
            const fallbackUrl = `https://source.unsplash.com/1024x1024/?${encodeURIComponent(prompt)}`;
            return NextResponse.json({ imageUrl: fallbackUrl });
        }

    } catch (error) {
        console.error("OpenAI Image Error:", error);
        return NextResponse.json(
            { error: "Failed to generate image" },
            { status: 500 }
        );
    }
}
