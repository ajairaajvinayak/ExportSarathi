"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Loader2, BookOpen, Mic, MicOff, Volume2, VolumeX, MessageSquare, X, StopCircle } from "lucide-react"
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
    const isConversationModeRef = useRef(false)

    const scrollRef = useRef<HTMLDivElement>(null)
    const recognitionRef = useRef<any>(null)
    const silenceTimerRef = useRef<NodeJS.Timeout | null>(null)
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, loading])

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

    // Cleanup
    useEffect(() => {
        return () => {
            if (recognitionRef.current) recognitionRef.current.stop()
            if ('speechSynthesis' in window) window.speechSynthesis.cancel()
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)
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

                recognitionRef.current.onstart = () => setIsListening(true)

                recognitionRef.current.onresult = (event: any) => {
                    const transcript = Array.from(event.results)
                        .map((result: any) => result[0])
                        .map((result) => result.transcript)
                        .join('')

                    if (!isConversationModeRef.current) {
                        setInput(transcript)
                    }

                    if (isConversationModeRef.current) {
                        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)

                        // Visual feedback for voice mode
                        setInput(transcript)

                        if (event.results[0].isFinal) {
                            handleVoiceSend(transcript)
                        } else {
                            silenceTimerRef.current = setTimeout(() => {
                                recognitionRef.current.stop()
                                handleVoiceSend(transcript)
                            }, 2000)
                        }
                    }
                }

                recognitionRef.current.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error)
                    setIsListening(false)
                    if (event.error === 'not-allowed') {
                        alert("Microphone access denied.")
                        setIsConversationMode(false)
                        isConversationModeRef.current = false
                    }
                }

                recognitionRef.current.onend = () => {
                    if (!isConversationModeRef.current) setIsListening(false)
                }
            }
        }
    }, [])

    const startListening = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start()
            } catch (e) {
                console.error("Error starting speech recognition:", e)
            }
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
            const cleanText = text.replace(/[*#_\[\]]/g, '').replace(/\n+/g, '. ')
            const utterance = new SpeechSynthesisUtterance(cleanText)

            const preferredVoice = voices.find(voice =>
                voice.name.includes('Google US English') ||
                voice.name.includes('Zira')
            ) || voices[0]

            if (preferredVoice) utterance.voice = preferredVoice

            utterance.onstart = () => setIsSpeaking(true)
            utterance.onend = () => {
                setIsSpeaking(false)
                if (isConversationModeRef.current) {
                    setTimeout(() => startListening(), 300)
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
        isConversationModeRef.current = newMode

        if (newMode) {
            startListening()
        } else {
            stopListening()
            stopSpeaking()
            setInput("")
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

        if (!isConversationModeRef.current) setInput("")

        setMessages(prev => [...prev, { role: "user", content: messageToSend }])
        setLoading(true)

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://exportsarathi-backend.onrender.com"
            const response = await fetch(`${API_URL}/api/chat/message`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: messageToSend, session_id: null }),
            })

            if (!response.ok) throw new Error("Failed to get response")

            const data = await response.json()
            const aiResponse = data.response

            setMessages(prev => [...prev, {
                role: "assistant",
                content: aiResponse,
                sources: data.sources || []
            }])

            if (isConversationModeRef.current) {
                speakText(aiResponse)
            }
        } catch (error) {
            console.error("Error:", error)
            setMessages(prev => [...prev, {
                role: "assistant",
                content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}. Please check if the backend is running and accessible.`,
            }])
        } finally {
            setLoading(false)
            if (isConversationModeRef.current) setInput("") // Clear transcript after sending
        }
    }

    return (
        <div className="h-[calc(100vh)] -m-8 relative flex flex-col bg-gray-50 dark:bg-gray-950/50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b bg-white dark:bg-gray-900/80 backdrop-blur-sm z-10">
                <div className="pl-20 md:pl-0"> {/* Increased padding for menu button on mobile */}
                    <h1 className="text-lg md:text-xl font-bold tracking-tight flex items-center gap-2">
                        <Bot className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                        ExportSarathi AI
                    </h1>
                    <p className="text-[10px] md:text-xs text-muted-foreground">Powered by Gemini 2.5 Flash</p>
                </div>
                <Button
                    variant={isConversationMode ? "destructive" : "default"}
                    onClick={toggleConversationMode}
                    size="sm"
                    className="rounded-full shadow-md transition-all hover:scale-105 h-8 md:h-10 px-3 md:px-4 text-xs md:text-sm"
                >
                    {isConversationMode ? <X className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" /> : <Mic className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />}
                    {isConversationMode ? "End" : "Voice"}
                </Button>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 px-4 py-6">
                <div className="max-w-5xl mx-auto space-y-6">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex gap-4",
                                msg.role === "user" ? "flex-row-reverse" : ""
                            )}
                        >
                            <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                msg.role === "user" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
                            )}>
                                {msg.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                            </div>
                            <div className={cn(
                                "group relative max-w-[90%] md:max-w-[85%] rounded-2xl px-4 py-3 md:px-5 md:py-3.5 shadow-sm text-sm leading-relaxed",
                                msg.role === "user"
                                    ? "bg-blue-600 text-white rounded-tr-none"
                                    : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-tl-none"
                            )}>
                                {msg.role === "assistant" ? (
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                table: ({ node, ...props }) => <div className="overflow-x-auto my-4"><table className="w-full border-collapse text-left" {...props} /></div>,
                                                thead: ({ node, ...props }) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
                                                th: ({ node, ...props }) => <th className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold" {...props} />,
                                                td: ({ node, ...props }) => <td className="border-b border-gray-100 dark:border-gray-800 px-4 py-2" {...props} />,
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    msg.content
                                )}

                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
                                        {msg.sources.map((source, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                                                <BookOpen className="h-3 w-3" />
                                                {source.source}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                                <Bot className="h-5 w-5" />
                            </div>
                            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-2">
                                <span className="flex gap-1">
                                    <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></span>
                                </span>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                <form onSubmit={(e) => handleSend(e)} className="max-w-5xl mx-auto relative flex items-center gap-2">
                    <Input
                        placeholder="Ask anything about export..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading || isConversationMode}
                        className="pr-10 md:pr-12 py-5 md:py-6 rounded-full border-gray-300 dark:border-gray-700 focus-visible:ring-purple-500 shadow-sm text-sm md:text-base"
                    />
                    <Button
                        type="submit"
                        disabled={loading || !input.trim()}
                        size="icon"
                        className="absolute right-1.5 md:right-2 rounded-full h-8 w-8 md:h-9 md:w-9 bg-purple-600 hover:bg-purple-700"
                    >
                        <Send className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                </form>
                <p className="text-center text-[10px] md:text-xs text-muted-foreground mt-2">
                    ExportSarathi can make mistakes. Verify important information.
                </p>
            </div>

            {/* Voice Mode Overlay */}
            {isConversationMode && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleConversationMode}
                        className="absolute top-6 right-6 text-white/50 hover:text-white hover:bg-white/10 rounded-full h-12 w-12"
                    >
                        <X className="h-6 w-6" />
                    </Button>

                    <div className="flex-1 flex flex-col items-center justify-center gap-12 w-full max-w-md px-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-semibold">Voice Mode</h2>
                            <p className="text-white/60">
                                {isSpeaking ? "ExportSarathi is speaking..." :
                                    isListening ? "Listening..." : "Processing..."}
                            </p>
                        </div>

                        {/* Visualizer */}
                        <div className="relative h-64 w-64 flex items-center justify-center">
                            {/* Core Orb */}
                            <div className={cn(
                                "absolute h-32 w-32 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-xl transition-all duration-500",
                                isSpeaking ? "scale-110 opacity-80" : "scale-100 opacity-50"
                            )} />

                            {/* Pulsing Rings */}
                            <div className={cn(
                                "absolute inset-0 border-2 border-white/20 rounded-full transition-all duration-1000",
                                isListening ? "scale-100 opacity-100 animate-ping" : "scale-50 opacity-0"
                            )} />
                            <div className={cn(
                                "absolute inset-0 border-2 border-white/10 rounded-full transition-all duration-1000 delay-150",
                                isListening ? "scale-110 opacity-100 animate-ping" : "scale-50 opacity-0"
                            )} />

                            {/* Center Icon */}
                            <div className="relative z-10 h-24 w-24 rounded-full bg-white text-black flex items-center justify-center shadow-2xl shadow-purple-500/50">
                                {isSpeaking ? (
                                    <Volume2 className="h-10 w-10 animate-pulse" />
                                ) : (
                                    <Mic className={cn("h-10 w-10", isListening ? "text-purple-600" : "text-gray-400")} />
                                )}
                            </div>
                        </div>

                        {/* Transcript Preview */}
                        <div className="h-24 w-full flex items-center justify-center">
                            <p className="text-center text-lg font-medium text-white/90 leading-relaxed max-w-sm transition-all">
                                {input || (isListening ? "..." : "")}
                            </p>
                        </div>
                    </div>

                    <div className="pb-12">
                        <Button
                            variant="outline"
                            className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-6 h-auto text-lg backdrop-blur-md"
                            onClick={toggleConversationMode}
                        >
                            <StopCircle className="mr-2 h-5 w-5 text-red-400" />
                            End Conversation
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
