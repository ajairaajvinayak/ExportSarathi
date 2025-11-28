"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, FileCheck, AlertTriangle, TrendingUp, Trash2 } from "lucide-react"

export default function DashboardPage() {
    const [history, setHistory] = useState<any[]>([])

    useEffect(() => {
        const saved = localStorage.getItem("feasibilityHistory")
        if (saved) {
            setHistory(JSON.parse(saved))
        }
    }, [])

    const clearHistory = () => {
        if (confirm("Are you sure you want to clear your search history?")) {
            localStorage.removeItem("feasibilityHistory")
            setHistory([])
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                    <p className="text-gray-400 mt-1">
                        Welcome back, Ajai. Here&apos;s your export readiness overview.
                    </p>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 border-0">
                    <Globe className="mr-2 h-4 w-4" />
                    New Export Query
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="clean-card border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">Export Readiness</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">78%</div>
                        <p className="text-xs text-gray-400">
                            +5% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="clean-card border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">Active Markets</CardTitle>
                        <Globe className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">3</div>
                        <p className="text-xs text-gray-400">
                            USA, UAE, Germany
                        </p>
                    </CardContent>
                </Card>
                <Card className="clean-card border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">Documents Generated</CardTitle>
                        <FileCheck className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">12</div>
                        <p className="text-xs text-gray-400">
                            Last 30 days
                        </p>
                    </CardContent>
                </Card>
                <Card className="clean-card border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">Pending Compliance</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">2</div>
                        <p className="text-xs text-gray-400">
                            Action required
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 clean-card border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-white">Recent Feasibility Checks</CardTitle>
                        {history.length > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearHistory} className="text-gray-400 hover:text-red-400">
                                <Trash2 className="h-4 w-4 mr-2" /> Clear
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {history.length > 0 ? (
                                history.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-medium text-white">{item.product}</p>
                                            <p className="text-sm text-gray-400">Target: {item.country}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.score > 70
                                                    ? "bg-green-900/30 text-green-400 border border-green-900"
                                                    : item.score > 40
                                                        ? "bg-yellow-900/30 text-yellow-400 border border-yellow-900"
                                                        : "bg-red-900/30 text-red-400 border border-red-900"
                                                }`}>
                                                {item.status} ({item.score})
                                            </span>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(item.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No recent searches found.</p>
                                    <p className="text-xs mt-1">Your feasibility checks will appear here.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>AI Advisor Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="rounded-lg bg-muted p-4">
                                <p className="text-sm font-medium mb-1">New DGFT Notification</p>
                                <p className="text-xs text-muted-foreground">
                                    Updated export policy for organic products to EU. Check compliance module.
                                </p>
                            </div>
                            <div className="rounded-lg bg-muted p-4">
                                <p className="text-sm font-medium mb-1">Market Opportunity</p>
                                <p className="text-xs text-muted-foreground">
                                    Rising demand for Indian handicrafts in Australian market due to new trade pact.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
