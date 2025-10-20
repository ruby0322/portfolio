# Video Transcription Feature

This feature allows users to upload video files and get text transcriptions using OpenAI's Whisper API.

## Setup

1. **Install dependencies** (already done if you ran `npm install`):
   ```bash
   npm install openai
   ```

2. **Configure OpenAI API Key**:
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Add it to your `.env.local` file:
     ```
     OPENAI_API_KEY=your-openai-api-key
     ```

## Features

- Upload video or audio files (MP4, MP3, WAV, M4A, etc.)
- Maximum file size: 25MB (OpenAI Whisper API limitation)
- Automatic transcription using OpenAI Whisper-1 model
- Download transcription as a text file
- Clean, modern UI with loading states and error handling

## Usage

1. Navigate to `/transcribe` page
2. Click "Choose File" to select a video/audio file
3. Click "Transcribe" to start the transcription process
4. Once complete, view the transcription in the result card
5. Click "Download" to save the transcription as a `.txt` file

## API Endpoint

### POST `/api/transcribe`

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with 'file' field containing the video/audio file

**Response:**
```json
{
  "transcription": "Transcribed text...",
  "filename": "video.mp4",
  "success": true
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## File Size Limitations

The OpenAI Whisper API has a 25MB file size limit. For larger files, you would need to:
- Compress the video
- Split the video into smaller chunks
- Use a different transcription service
- Extract and compress the audio track separately

## Implementation Notes

This implementation is based on the Python script provided, adapted for a Next.js web application:

- **Audio Chunking**: The Python implementation splits audio into 60-second chunks. The web version relies on OpenAI's API to handle the entire file (up to 25MB).
- **File Handling**: Uses Next.js API routes with FormData to handle file uploads
- **Client-Side**: React component with state management for upload, loading, and download
- **Error Handling**: Comprehensive error handling for file size, API errors, and configuration issues

## Future Improvements

- Add support for larger files with client-side chunking
- Progress bar for long transcriptions
- Support for multiple file formats conversion
- Batch processing multiple files
- Translation options (Whisper supports translation to English)
- Custom prompt support for better context
