import { NextResponse } from "next/server";
import OpenAI from "openai";

interface SYSTEM_MESSAGE_Props {
  role: "system";
  content: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System message to define chatbot behavior
const SYSTEM_MESSAGE : SYSTEM_MESSAGE_Props = {
  role: "system",
  content:
    "You are CaffBot, a helpful AI assistant specialized in brain tumor detection and medical imaging. You can provide information about brain tumors, MRI scans, and the detection process. Keep responses concise and medical-focused. If the user need please hesitate give answer to contact medical professional, but before that you can ask user location and give the best nearest hospital or medical professional ",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Combine system message with user messages
    const messages = [SYSTEM_MESSAGE, ...body.messages];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
