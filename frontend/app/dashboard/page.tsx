"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, FileCheck, AlertTriangle, TrendingUp, Trash2 } from "lucide-react"

import Link from "next/link"

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
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Welcome back, Ajai. Here&apos;s your export readiness overview.
                    </p>
                </div>
                <Link href="/dashboard/feasibility">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white hover:from-purple-700 hover:to-pink-700">
                        <Globe className="mr-2 h-4 w-4" />
                        New Export Query
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="clean-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Export Readiness</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">78%</div>
                        <p className="text-xs text-muted-foreground">
                            +5% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="clean-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Markets</CardTitle>
                        <Globe className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">3</div>
                        <p className="text-xs text-muted-foreground">
                            USA, UAE, Germany
                        </p>
                    </CardContent>
                </Card>
                <Card className="clean-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Documents Generated</CardTitle>
                        <FileCheck className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">12</div>
                        <p className="text-xs text-muted-foreground">
                            Last 30 days
                        </p>
                    </CardContent>
                </Card>
                <Card className="clean-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Compliance</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">2</div>
                        <p className="text-xs text-muted-foreground">
                            Action required
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 clean-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-foreground">Recent Feasibility Checks</CardTitle>
                        {history.length > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearHistory} className="text-muted-foreground hover:text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" /> Clear
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {history.length > 0 ? (
                                history.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-medium text-foreground">{item.product}</p>
                                            <p className="text-sm text-muted-foreground">Target: {item.country}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.score > 70
                                                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                                : item.score > 40
                                                    ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                                                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                                                }`}>
                                                {item.status} ({item.score})
                                            </span>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {new Date(item.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
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
