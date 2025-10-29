import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
        }

        // Connect to the model (token will be auto-detected from env)
        const client = await Client.connect("black-forest-labs/FLUX.1-dev");

        const result = await client.predict("/infer", { prompt }) as { data: Array<{ url?: string; path?: string }> };

        console.log("Model result:", result);

        // Handle output (Gradio sometimes returns a list of image objects)
        const imageUrl = result.data?.[0]?.url || result.data?.[0]?.path;

        return NextResponse.json({ imageUrl });
    } catch (err: unknown) {
        console.error("❌ Error generating image:", err);
        return NextResponse.json({ err }, { status: 500 });
    }
}