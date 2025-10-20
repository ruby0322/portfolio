'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Download, FileVideo, Loader2, Square, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function TranscribePage() {
  const t = useTranslations('transcribe');
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const [newChunk, setNewChunk] = useState<string>('');
  const [chunkErrors, setChunkErrors] = useState<{index: number, error: string}[]>([]);
  const [copied, setCopied] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [passkey, setPasskey] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const transcriptionRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new content arrives
  useEffect(() => {
    if (transcriptionRef.current && loading) {
      transcriptionRef.current.scrollTop = transcriptionRef.current.scrollHeight;
    }
  }, [transcription, loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setTranscription('');
      setError('');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];

      // Check if file is video or audio
      if (droppedFile.type.startsWith('video/') || droppedFile.type.startsWith('audio/')) {
        setFile(droppedFile);
        setTranscription('');
        setError('');
      } else {
        setError(t('invalidFile'));
      }
    }
  };

  // Split file into very small chunks (400KB per chunk for maximum real-time feel)
  const splitFileIntoChunks = (file: File, chunkSize: number = 400 * 1024): File[] => {
    const chunks: File[] = [];
    const totalSize = file.size;
    const numChunks = Math.ceil(totalSize / chunkSize);

    for (let i = 0; i < numChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, totalSize);
      const blob = file.slice(start, end);
      
      // Create a new File object for each chunk
      const chunkFile = new File(
        [blob],
        `${file.name}_chunk_${i}.${file.name.split('.').pop()}`,
        { type: file.type }
      );
      
      chunks.push(chunkFile);
    }

    return chunks;
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setLoading(false);
    setProgress('');
    
    // Abort any ongoing fetch requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  const handleTranscribe = async () => {
    if (!file) {
      setError(t('fileTooLarge'));
      return;
    }

    if (!passkey.trim()) {
      setError(t('passkeyRequired'));
      return;
    }

    setLoading(true);
    setError('');
    setTranscription('');
    setChunkErrors([]);
    setIsCancelled(false);
    setProgress('Preparing file...');

    // Create new AbortController for this transcription session
    abortControllerRef.current = new AbortController();

    try {
      // Split file into very small chunks
      const chunkSize = 400 * 1024; // 400KB chunks (80% reduction from 2MB) for maximum real-time feel
      const chunks = splitFileIntoChunks(file, chunkSize);
      
      console.log(`Split file into ${chunks.length} chunks of ~${chunkSize / (1024 * 1024)}MB each`);
      setProgress(`Processing ${chunks.length} chunks...`);

      let accumulatedTranscription = '';
      const errors: {index: number, error: string}[] = [];
      let successfulChunks = 0;

      // Process each chunk sequentially
      for (let i = 0; i < chunks.length; i++) {
        // Check if cancelled before processing each chunk
        if (isCancelled) {
          console.log('Transcription cancelled by user');
          break;
        }
        
        setProgress(`Transcribing chunk ${i + 1}/${chunks.length}...`);
        
        try {
          const formData = new FormData();
          formData.append('file', chunks[i]);
          formData.append('passkey', passkey);

          const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
            signal: abortControllerRef.current?.signal, // Add abort signal
          });

          if (!response.ok) {
            const data = await response.json();
            const errorMsg = data.details || data.error || 'Unknown error';
            
            // If it's an authentication error, stop all processing
            if (response.status === 401) {
              throw new Error(errorMsg);
            }
            
            throw new Error(errorMsg);
          }

          const data = await response.json();
          
          // Append transcription result immediately (real-time display with animation)
          if (data.transcription) {
            // Set the new chunk for animation
            setNewChunk(data.transcription);
            
            // Wait a bit for animation to start
            await new Promise(resolve => setTimeout(resolve, 50));
            
            accumulatedTranscription += data.transcription;
            // Add space between chunks for better readability
            if (i < chunks.length - 1) {
              accumulatedTranscription += ' ';
            }
            setTranscription(accumulatedTranscription);
            
            // Clear new chunk after animation
            setTimeout(() => setNewChunk(''), 500);
            
            successfulChunks++;
          }
        } catch (chunkError) {
          // Check if the error is due to cancellation
          if (chunkError instanceof Error && chunkError.name === 'AbortError') {
            console.log('Chunk request was aborted');
            break; // Exit the loop immediately
          }
          
          // Log error and check if it's an authentication error
          const errorMessage = chunkError instanceof Error ? chunkError.message : 'Unknown error';
          console.error(`Error transcribing chunk ${i + 1}:`, errorMessage);
          
          // If it's an authentication error (401), stop all processing immediately
          if (errorMessage.includes('Invalid passkey') || errorMessage.includes('passkey')) {
            setError(errorMessage);
            setProgress('');
            setLoading(false);
            return; // Exit the entire function
          }
          
          errors.push({
            index: i + 1,
            error: errorMessage
          });
          
          setChunkErrors([...errors]);
          
          // Skip this chunk silently - don't add error message to transcription
          // Continue with next chunk
          continue;
        }
      }

      setProgress('');
      
      // Set final summary message if there were errors or cancellation
      if (isCancelled) {
        setError(`Transcription cancelled. Successfully transcribed ${successfulChunks} chunks before cancellation.`);
      } else if (errors.length > 0) {
        setError(`Transcription completed with ${errors.length} chunk(s) failed out of ${chunks.length}. Successfully transcribed ${successfulChunks} chunks.`);
      }
    } catch (err) {
      // Check if the error is due to cancellation
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Transcription was aborted');
        setError('Transcription cancelled by user');
      } else {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred during transcription';
        setError(errorMessage);
        console.error('Transcription error:', err);
      }
      setProgress('');
    } finally {
      setLoading(false);
      // Clean up abort controller
      abortControllerRef.current = null;
    }
  };

  const handleDownload = () => {
    if (!transcription) return;

    const blob = new Blob([transcription], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace(/\.[^/.]+$/, '')}_transcription.txt` || 'transcription.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    if (!transcription) return;

    try {
      await navigator.clipboard.writeText(transcription);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3">{t('title')}</h1>
        <p className="text-muted-foreground text-lg">
          {t('subtitle')}
        </p>
      </div>

        <Card
          className={`mb-6 transition-colors ${
            isDragging ? 'border-primary border-2 bg-primary/5' : ''
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CardHeader>
            <CardTitle>{t('uploadTitle')}</CardTitle>
            <CardDescription>
              {isDragging
                ? t('uploadDescriptionDragging')
                : t('uploadDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*,audio/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleUploadClick}
                variant="outline"
                className="flex-1"
                disabled={loading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {t('chooseFile')}
              </Button>

              <Button
                onClick={handleTranscribe}
                disabled={!file || loading || !passkey.trim()}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('transcribing')}
                  </>
                ) : (
                  <>
                    <FileVideo className="mr-2 h-4 w-4" />
                    {t('transcribe')}
                  </>
                )}
              </Button>

              {loading && (
                <Button
                  onClick={handleCancel}
                  variant="destructive"
                  className="flex-1"
                >
                  <Square className="mr-2 h-4 w-4" />
                  {t('cancel')}
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passkey">{t('passkeyLabel')}</Label>
              <Input
                id="passkey"
                type="password"
                placeholder={t('passkeyPlaceholder')}
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                disabled={loading}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                {t('passkeyDescription')}
              </p>
            </div>

            {file && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <FileVideo className="h-5 w-5 mt-0.5 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {chunkErrors.length > 0 && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-2">
                  ⚠️ {t('chunkErrors')}
                </p>
                <ul className="text-xs text-yellow-600 dark:text-yellow-500 space-y-1 list-disc list-inside">
                  {chunkErrors.map((err) => (
                    <li key={err.index}>
                      {t('chunkError', { index: err.index, error: err.error })}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <AnimatePresence>
          {(transcription || loading) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {t('resultTitle')}
                      {loading && (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      )}
                    </CardTitle>
                    <CardDescription>
                      <AnimatePresence mode="wait">
                        {progress ? (
                          <motion.span
                            key={progress}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {progress}
                          </motion.span>
                        ) : loading ? (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {t('processing')}
                          </motion.span>
                        ) : (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {t('resultDescription')}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCopy} size="sm" disabled={!transcription} variant="outline">
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          {t('copied')}
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          {t('copy')}
                        </>
                      )}
                    </Button>
                    <Button onClick={handleDownload} size="sm" disabled={loading || !transcription}>
                      <Download className="mr-2 h-4 w-4" />
                      {t('download')}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {transcription ? (
                    <div 
                      ref={transcriptionRef}
                      className="p-4 bg-muted rounded-lg max-h-96 overflow-y-auto scroll-smooth"
                    >
                      <div className="whitespace-pre-wrap font-mono text-sm">
                        {transcription}
                        {newChunk && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="inline-block bg-primary/10 px-1 rounded"
                          >
                            {newChunk}
                          </motion.span>
                        )}
                        {loading && (
                          <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="inline-block ml-1 w-2 h-4 bg-primary rounded"
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                      <Loader2 className="h-8 w-8 animate-spin mb-3" />
                      <p className="text-sm">{t('waiting')}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
