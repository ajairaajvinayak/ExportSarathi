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
    X,
    UserCircle,
    ChevronRight,
    Menu
} from "lucide-react"

// Grouped Menu Items
const menuSections = [
    {
        title: "Analytics & Insights",
        items: [
            { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        ]
    },
    {
        title: "Tools & Services",
        items: [
            { title: "Feasibility Check", href: "/dashboard/feasibility", icon: Globe },
            { title: "AI Advisor", href: "/dashboard/advisor", icon: MessageSquare },
            { title: "Compliance Roadmap", href: "/dashboard/compliance", icon: ShieldCheck },
            { title: "Document Gen", href: "/dashboard/documents", icon: FileText },
        ]
    },
    {
        title: "Account & Settings",
        items: [
            { title: "Subscription", href: "/dashboard/subscription", icon: Zap },
            { title: "Settings", href: "/settings", icon: Settings },
        ]
    }
]

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()

    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/80 z-40 transition-opacity duration-300 backdrop-blur-sm",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar Drawer */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-80 bg-[#1a1a2e] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col border-r border-white/10",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Header - Amazon Style */}
                <div className="bg-[#131921] px-6 py-5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <UserCircle className="h-8 w-8 text-white" />
                        <h2 className="text-xl font-bold text-white">Hello, Ajai</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X className="h-6 w-6 text-white" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto py-4">
                    {menuSections.map((section, idx) => (
                        <div key={idx} className="mb-6">
                            <h3 className="px-6 mb-2 text-sm font-bold text-white uppercase tracking-wider">
                                {section.title}
                            </h3>
                            <ul>
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={onClose}
                                                className={cn(
                                                    "flex items-center justify-between px-6 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-colors group",
                                                    isActive && "bg-white/10 text-white border-l-4 border-purple-500 pl-5"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <item.icon className={cn("h-5 w-5", isActive ? "text-purple-400" : "text-gray-400 group-hover:text-white")} />
                                                    <span className="font-medium">{item.title}</span>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-white" />
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                            {idx < menuSections.length - 1 && (
                                <div className="my-4 border-t border-white/10 mx-6" />
                            )}
                        </div>
                    ))}

                    {/* Logout Section */}
                    <div className="border-t border-white/10 pt-4 mt-2">
                        <button className="w-full flex items-center justify-between px-6 py-3 text-red-400 hover:bg-red-500/10 transition-colors group">
                            <div className="flex items-center gap-3">
                                <LogOut className="h-5 w-5" />
                                <span className="font-medium">Sign Out</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
