import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configuration for handling large files
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const passkey = formData.get('passkey') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check passkey
    const validPasskey = process.env.TRANSCRIBE_PASSKEY;
    if (!validPasskey) {
      return NextResponse.json(
        { error: 'Transcribe service not configured' },
        { status: 500 }
      );
    }

    if (!passkey || passkey !== validPasskey) {
      return NextResponse.json(
        { error: 'Invalid passkey' },
        { status: 401 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    console.log(`Processing chunk: ${file.name}, size: ${file.size} bytes`);

    // Transcribe single chunk
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      response_format: 'text',
    });

    return NextResponse.json({
      transcription: transcription as string,
      success: true,
    });
  } catch (error: unknown) {
    console.error('Error processing transcription:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Failed to transcribe audio chunk',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
