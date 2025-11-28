"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Mobile Menu Button */}
            {/* Menu Button (Visible on all screens) */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-background/50 backdrop-blur-md border border-border hover:bg-accent transition-colors"
            >
                <Menu className="h-6 w-6 text-foreground" />
            </button>

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-4 lg:p-8 pt-20 lg:pt-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
