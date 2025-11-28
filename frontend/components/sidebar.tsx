"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Globe,
    FileText,
    MessageSquare,
    BarChart3,
    Settings,
    LogOut,
    ShieldCheck,
    Zap,
    X
} from "lucide-react"

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        title: "Feasibility Check",
        href: "/dashboard/feasibility",
        icon: Globe,
        gradient: "from-green-500 to-emerald-500"
    },
    {
        title: "Compliance Roadmap",
        href: "/dashboard/compliance",
        icon: ShieldCheck,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        title: "Document Gen",
        href: "/dashboard/documents",
        icon: FileText,
        gradient: "from-orange-500 to-red-500"
    },
    {
        title: "AI Advisor",
        href: "/dashboard/advisor",
        icon: MessageSquare,
        gradient: "from-yellow-500 to-orange-500"
    },
    {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
        gradient: "from-indigo-500 to-purple-500"
    },
    {
        title: "Subscription",
        href: "/dashboard/subscription",
        icon: Zap,
        gradient: "from-yellow-400 to-amber-600"
    },
]

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname()

    const handleLinkClick = () => {
        // Close sidebar on mobile when a link is clicked
        if (onClose) {
            onClose()
        }
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && onClose && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed lg:static inset-y-0 left-0 z-50 flex h-screen w-72 flex-col glass-panel border-r border-white/10 px-6 py-8 transition-transform duration-300 ease-in-out",
                !isOpen && onClose && "-translate-x-full lg:translate-x-0"
            )}>
                {/* Close button for mobile */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="h-6 w-6 text-white" />
                    </button>
                )}

                <div className="flex items-center gap-3 px-2 mb-10">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow-effect">
                        <Globe className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold gradient-text">ExportSarathi</span>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={handleLinkClick}
                                className={cn(
                                    "group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "glass-panel bg-white/10 text-white shadow-lg"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <div className={cn(
                                    "h-9 w-9 rounded-lg flex items-center justify-center transition-all duration-300",
                                    isActive
                                        ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                                        : "bg-white/5 group-hover:bg-white/10"
                                )}>
                                    <item.icon className="h-5 w-5 text-white" />
                                </div>
                                <span className="flex-1">{item.title}</span>
                                {isActive && (
                                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
                                )}
                            </Link>
                        )
                    })}
                </div>

                <div className="border-t border-white/10 pt-6 space-y-2">
                    <Link
                        href="/settings"
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                        <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center">
                            <Settings className="h-5 w-5" />
                        </div>
                        Settings
                    </Link>
                    <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300">
                        <div className="h-9 w-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <LogOut className="h-5 w-5" />
                        </div>
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}
