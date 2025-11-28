"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { Send, Bot, User, Loader2, BookOpen, Mic, MicOff, Volume2, VolumeX, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
    role: "user" | "assistant"
    content: string
    sources?: { source: string; page?: number }[]
}

export default function AdvisorPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Namaste! I am ExportSarathi, your AI guide to global trade. I know everything about export - from regulations and compliance to market trends. Ask me anything!"
        }
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isConversationMode, setIsConversationMode] = useState(false)
    const isConversationModeRef = useRef(false) // Ref to track mode in callbacks

    const scrollRef = useRef<HTMLDivElement>(null)
    const recognitionRef = useRef<any>(null)
    const silenceTimerRef = useRef<NodeJS.Timeout | null>(null)
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    // Load voices
    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices()
                setVoices(availableVoices)
            }

            loadVoices()
            window.speechSynthesis.onvoiceschanged = loadVoices
        }
    }, [])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel()
            }
            if (silenceTimerRef.current) {
                clearTimeout(silenceTimerRef.current)
            }
        }
    }, [])

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition()
                recognitionRef.current.continuous = false
                recognitionRef.current.interimResults = true
                recognitionRef.current.lang = 'en-US'

                recognitionRef.current.onstart = () => {
                    setIsListening(true)
                }

                recognitionRef.current.onresult = (event: any) => {
                    const transcript = Array.from(event.results)
                        .map((result: any) => result[0])
                        .map((result) => result.transcript)
                        .join('')

                    setInput(transcript)

                    if (isConversationModeRef.current) {
                        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)

                        if (event.results[0].isFinal) {
                            handleVoiceSend(transcript)
                        } else {
                            silenceTimerRef.current = setTimeout(() => {
                                recognitionRef.current.stop()
                                handleVoiceSend(transcript)
                            }, 3000)
                        }
                    }
                }

                recognitionRef.current.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error)
                    setIsListening(false)
                    if (event.error === 'not-allowed') {
                        alert("Microphone access denied. Please enable microphone permissions.")
                        setIsConversationMode(false)
                        isConversationModeRef.current = false
                    } else if (event.error === 'no-speech') {
                        if (isConversationModeRef.current) {
                            try {
                                recognitionRef.current.start()
                            } catch (e) { }
                        }
                    }
                }

                recognitionRef.current.onend = () => {
                    if (!isConversationModeRef.current) {
                        setIsListening(false)
                    }
                }
            }
        }
    }, []) // Removed isConversationMode dependency to avoid re-init

    const startListening = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start()
            } catch (e) {
                console.error("Error starting speech recognition:", e)
            }
        } else {
            alert("Speech recognition is not supported in this browser.")
        }
    }

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop()
            setIsListening(false)
        }
    }

    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()

            const cleanText = text
                .replace(/\|/g, ' ')
                .replace(/\*/g, '')
                .replace(/#/g, '')
                .replace(/\n+/g, '. ')
                .replace(/\[.*?\]/g, '') // Remove citations like [Source]

            const utterance = new SpeechSynthesisUtterance(cleanText)

            // Select voice (prefer female/Google US)
            const preferredVoice = voices.find(voice =>
                voice.name.includes('Google US English') ||
                voice.name.includes('Zira') ||
                voice.name.includes('Female')
            ) || voices[0]

            if (preferredVoice) {
                utterance.voice = preferredVoice
            }

            utterance.rate = 1.0
            utterance.pitch = 1.0

            utterance.onstart = () => setIsSpeaking(true)
            utterance.onend = () => {
                setIsSpeaking(false)
                // Check ref to see if we should continue conversation
                if (isConversationModeRef.current) {
                    setTimeout(() => startListening(), 500)
                }
            }
            utterance.onerror = () => setIsSpeaking(false)

            window.speechSynthesis.speak(utterance)
        }
    }

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
            setIsSpeaking(false)
        }
    }

    const toggleConversationMode = () => {
        const newMode = !isConversationMode
        setIsConversationMode(newMode)
        isConversationModeRef.current = newMode // Update ref

        if (newMode) {
            startListening()
        } else {
            stopListening()
            stopSpeaking()
        }
    }

    const handleVoiceSend = (text: string) => {
        if (!text.trim()) return
        const fakeEvent = { preventDefault: () => { } } as React.FormEvent
        handleSend(fakeEvent, text)
    }

    const handleSend = async (e: React.FormEvent, overrideInput?: string) => {
        e.preventDefault()
        const messageToSend = overrideInput || input
        if (!messageToSend.trim()) return

        setInput("")
        setMessages(prev => [...prev, { role: "user", content: messageToSend }])
        setLoading(true)

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://exportsarathi-backend.onrender.com"
            const response = await fetch(`${API_URL}/api/chat/message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageToSend,
                    session_id: null
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to get response from AI")
            }

            const data = await response.json()

            setMessages(prev => [...prev, {
                role: "assistant",
                content: data.response,
                sources: data.sources || []
            }])

            // Auto-speak the response
            speakText(data.response)
        } catch (error) {
            console.error("Error calling AI:", error)
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again later.",
                sources: []
            }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">ExportSarathi AI</h1>
                    <p className="text-muted-foreground mt-1">
                        Know everything about export. Instant, source-backed answers.
                    </p>
                </div>
                <Button
                    variant={isConversationMode ? "default" : "outline"}
                    onClick={toggleConversationMode}
                    className={cn(
                        "gap-2 transition-all duration-500",
                        isConversationMode && "bg-green-500 hover:bg-green-600 text-white animate-pulse"
                    )}
                >
                    {isConversationMode ? <Mic className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                    {isConversationMode ? "Conversation Mode ON" : "Start Conversation"}
                </Button>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
                <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex gap-3 max-w-[80%]",
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                        msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                    )}>
                                        {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                    </div>
                                    <div className="space-y-2">
                                        <div className={cn(
                                            "rounded-lg p-3 text-sm prose prose-invert max-w-none",
                                            msg.role === "user"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-foreground"
                                        )}>
                                            {msg.role === "assistant" ? (
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        table: ({ node, ...props }) => (
                                                            <table className="border-collapse border border-gray-600 my-4 w-full" {...props} />
                                                        ),
                                                        thead: ({ node, ...props }) => (
                                                            <thead className="bg-purple-900/30" {...props} />
                                                        ),
                                                        th: ({ node, ...props }) => (
                                                            <th className="border border-gray-600 px-4 py-2 text-left font-semibold" {...props} />
                                                        ),
                                                        td: ({ node, ...props }) => (
                                                            <td className="border border-gray-600 px-4 py-2" {...props} />
                                                        ),
                                                        tr: ({ node, ...props }) => (
                                                            <tr className="hover:bg-white/5" {...props} />
                                                        ),
                                                        p: ({ node, ...props }) => (
                                                            <p className="mb-2" {...props} />
                                                        ),
                                                        ul: ({ node, ...props }) => (
                                                            <ul className="list-disc list-inside mb-2" {...props} />
                                                        ),
                                                        ol: ({ node, ...props }) => (
                                                            <ol className="list-decimal list-inside mb-2" {...props} />
                                                        ),
                                                        strong: ({ node, ...props }) => (
                                                            <strong className="font-bold text-purple-300" {...props} />
                                                        ),
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            ) : (
                                                msg.content
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between gap-4 mt-2">
                                            {msg.sources && (
                                                <div className="flex flex-wrap gap-2">
                                                    {msg.sources.map((source, idx) => (
                                                        <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                                                            <BookOpen className="h-3 w-3" />
                                                            {source.source}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {msg.role === "assistant" && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 shrink-0 text-muted-foreground hover:text-primary"
                                                    onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.content)}
                                                    title={isSpeaking ? "Stop speaking" : "Read aloud"}
                                                >
                                                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex gap-3 max-w-[80%]">
                                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                    <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="text-sm text-muted-foreground">Analyzing regulations...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    <div className="p-4 border-t bg-background">
                        <form onSubmit={(e) => handleSend(e)} className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={isListening ? stopListening : startListening}
                                disabled={loading || isConversationMode}
                                className={cn(
                                    "shrink-0",
                                    isListening && "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                                )}
                            >
                                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                            </Button>
                            <Input
                                placeholder={isListening ? "Listening..." : "Ask about export rules, HS codes, or compliance..."}
                                value={input}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                                disabled={loading}
                                className="flex-1"
                            />
                            <Button type="submit" disabled={loading || !input.trim()} size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                            {isConversationMode ?
                                "🟢 Conversation Mode Active: Speak freely, I'm listening..." :
                                "🎤 Click the microphone to use voice input • AI can make mistakes."
                            }
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
