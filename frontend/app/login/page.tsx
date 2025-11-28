"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, ArrowRight, Mail, Lock } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate login (replace with actual API call)
        setTimeout(() => {
            // Check if user exists in localStorage
            const storedUser = localStorage.getItem("user")

            if (storedUser) {
                // Set logged in status
                localStorage.setItem("isLoggedIn", "true")
                setLoading(false)
                // Redirect to dashboard
                router.push("/dashboard")
            } else {
                setLoading(false)
                alert("Invalid credentials! Please register first.")
            }
        }, 1500)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-3 mb-8 hover:opacity-80 transition-opacity">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow-effect">
                        <Globe className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-3xl font-bold gradient-text">ExportSarathi</span>
                </Link>

                <Card className="clean-card border-white/10">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
                        <CardDescription className="text-gray-300">
                            Sign in to continue your export journey
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-100">Email Address</Label>
                                <div className="relative flex items-center">
                                    <div className="absolute left-0 top-0 h-full flex items-center justify-center w-12 border-r-2 border-gray-600 bg-gray-800/30 rounded-l-md">
                                        <Mail className="h-5 w-5 text-gray-300" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@company.com"
                                        className="pl-14"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-gray-100">Password</Label>
                                    <Link href="#" className="text-sm text-purple-400 hover:text-purple-300">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative flex items-center">
                                    <div className="absolute left-0 top-0 h-full flex items-center justify-center w-12 border-r-2 border-gray-600 bg-gray-800/30 rounded-l-md">
                                        <Lock className="h-5 w-5 text-gray-300" />
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-14"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full btn-primary h-12 text-base"
                                disabled={loading}
                            >
                                {loading ? "Signing In..." : "Sign In"}
                                {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-300">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-purple-400 hover:text-purple-300 font-semibold">
                                Create Account
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Secure login powered by ExportSarathi
                </p>
            </div>
        </div>
    )
}
