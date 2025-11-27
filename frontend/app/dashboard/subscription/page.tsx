"use client"

import { Check, Zap, Star, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SubscriptionPage() {
    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-10">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Upgrade to ExportSarathi Pro</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Unlock the full potential of AI for your export business. Get unlimited access to advanced features and priority support.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-8">
                {/* Free Plan */}
                <Card className="relative border-muted">
                    <CardHeader>
                        <CardTitle className="text-2xl">Starter</CardTitle>
                        <CardDescription>For new exporters exploring markets</CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">Free</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                5 Feasibility Checks/mo
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                Basic Compliance Roadmap
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                Limited AI Advisor Queries
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                Standard Document Templates
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Current Plan</Button>
                    </CardFooter>
                </Card>

                {/* Pro Plan - Highlighted */}
                <Card className="relative border-purple-500 shadow-2xl scale-105 z-10 bg-gradient-to-b from-background to-purple-900/10">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-1">
                            Most Popular
                        </Badge>
                    </div>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl gradient-text">Pro</CardTitle>
                            <Zap className="h-5 w-5 text-purple-500 fill-purple-500" />
                        </div>
                        <CardDescription>For growing exporters needing power</CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">$20</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3 text-sm font-medium">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-purple-500" />
                                Unlimited Feasibility Checks
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-purple-500" />
                                Advanced AI Market Analysis
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-purple-500" />
                                Priority AI Advisor (GPT-4 Class)
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-purple-500" />
                                Auto-Generate All Documents
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-purple-500" />
                                Voice Assistant Pro Voice
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25">
                            Upgrade to Pro
                        </Button>
                    </CardFooter>
                </Card>

                {/* Enterprise Plan */}
                <Card className="relative border-muted">
                    <CardHeader>
                        <CardTitle className="text-2xl">Enterprise</CardTitle>
                        <CardDescription>For large organizations</CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">Custom</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-500" />
                                Everything in Pro
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-500" />
                                Dedicated Account Manager
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-500" />
                                Custom API Integration
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-500" />
                                SLA & Priority Support
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Contact Sales</Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                    <div className="mx-auto h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold">Super Fast AI</h3>
                    <p className="text-sm text-muted-foreground">Get answers in milliseconds with our optimized infrastructure.</p>
                </div>
                <div className="space-y-2">
                    <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold">Secure & Private</h3>
                    <p className="text-sm text-muted-foreground">Your trade secrets are safe with enterprise-grade encryption.</p>
                </div>
                <div className="space-y-2">
                    <div className="mx-auto h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Star className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold">Expert Accuracy</h3>
                    <p className="text-sm text-muted-foreground">Trained on millions of trade documents and regulations.</p>
                </div>
            </div>
        </div>
    )
}
