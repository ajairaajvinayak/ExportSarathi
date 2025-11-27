"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle, AlertTriangle, Globe, Building2, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function FeasibilityPage() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://exportsarathi-backend.onrender.com"
            const response = await fetch(`${API_URL}/api/feasibility/analyze`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_name: (e.target as any).product.value,
                    product_description: (e.target as any).description.value,
                    hs_code: (e.target as any)["hs-code"].value,
                    target_country: (e.target as any).target.value,
                    manufacturing_location: "India"
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to analyze feasibility")
            }

            const data = await response.json()
            setResult(data)
        } catch (error) {
            console.error("Error analyzing feasibility:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Export Feasibility Analysis</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Evaluate your product's potential in international markets with AI-driven insights.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Input Form */}
                <Card className="lg:col-span-1 h-fit border-gray-200 dark:border-gray-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Product Details</CardTitle>
                        <CardDescription>Enter product information for analysis.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="product">Product Name</Label>
                                <Input id="product" placeholder="e.g., Leather Wallets" required className="bg-gray-50 dark:bg-gray-900" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="hs-code">HS Code (Optional)</Label>
                                <Input id="hs-code" placeholder="e.g., 420231" className="bg-gray-50 dark:bg-gray-900" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="target">Target Country</Label>
                                <Input id="target" placeholder="e.g., Germany" required className="bg-gray-50 dark:bg-gray-900" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Material, quality, usage..."
                                    className="min-h-[100px] bg-gray-50 dark:bg-gray-900"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    "Check Feasibility"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="lg:col-span-2 space-y-6">
                    {result ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Score Card */}
                            <Card className="border-l-4 border-l-blue-500 shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center justify-between text-base font-medium text-gray-500">
                                        Feasibility Score
                                        <Badge variant={result.score > 70 ? "default" : "secondary"} className={result.score > 70 ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}>
                                            {result.viability_status} Potential
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">{result.score}</span>
                                        <span className="text-gray-400">/100</span>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {result.analysis_summary}
                                    </p>
                                </CardContent>
                            </Card>

                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Markets */}
                                <Card className="shadow-sm">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-blue-500" />
                                            Top Markets
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {result.suggested_markets.map((m: string) => (
                                                <Badge key={m} variant="secondary" className="px-3 py-1 font-normal">
                                                    {m}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Certifications */}
                                <Card className="shadow-sm">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            Requirements
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                            {result.required_certifications.map((c: string) => (
                                                <li key={c} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Top Exporters (Competitors) - NEW FEATURE */}
                            <Card className="shadow-sm border-blue-100 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-900">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2 text-blue-700 dark:text-blue-400">
                                        <Building2 className="h-4 w-4" />
                                        Top Indian Exporters (Competitors)
                                    </CardTitle>
                                    <CardDescription>
                                        Major players currently exporting similar products.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {result.top_exporters && result.top_exporters.length > 0 ? (
                                            result.top_exporters.map((exporter: string, i: number) => (
                                                <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                        {exporter.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-sm">{exporter}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No specific competitor data available.</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Risks */}
                            <Card className="shadow-sm border-amber-100 bg-amber-50/30 dark:bg-amber-900/10 dark:border-amber-900/50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2 text-amber-700 dark:text-amber-500">
                                        <AlertTriangle className="h-4 w-4" />
                                        Risk Factors
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        {result.risk_factors.map((r: string) => (
                                            <li key={r} className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-800 text-gray-400">
                            <div className="h-16 w-16 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-4">
                                <TrendingUp className="h-8 w-8 text-gray-300" />
                            </div>
                            <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">Ready to Analyze</h3>
                            <p className="max-w-xs mx-auto mt-2">
                                Fill in the product details to get a comprehensive export feasibility report.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
