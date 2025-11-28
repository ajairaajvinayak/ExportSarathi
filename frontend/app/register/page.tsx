"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, ArrowRight, User, Mail, Lock, Building } from "lucide-react"

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        company: "",
        password: "",
        confirmPassword: ""
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!")
            return
        }

        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long!")
            return
        }

        setLoading(true)

        // Simulate registration (replace with actual API call)
        setTimeout(() => {
            // Store user data in localStorage (temporary solution)
            localStorage.setItem("user", JSON.stringify({
                fullName: formData.fullName,
                email: formData.email,
                company: formData.company
            }))

            setLoading(false)
            // Redirect to login
            router.push("/login")
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
                        <CardTitle className="text-2xl font-bold text-white">Create Your Account</CardTitle>
                        <CardDescription className="text-gray-300">
                            Start your export journey with AI-powered guidance
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-gray-100">Full Name</Label>
                                <div className="relative flex items-center">
                                    <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-14 bg-slate-800 rounded-l-md">
                                        <User className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <div className="absolute left-14 top-0 bottom-0 w-1 bg-purple-500"></div>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        className="pl-24"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-100">Email Address</Label>
                                <div className="relative flex items-center">
                                    <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-14 bg-slate-800 rounded-l-md">
                                        <Mail className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <div className="absolute left-14 top-0 bottom-0 w-1 bg-purple-500"></div>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@company.com"
                                        className="pl-24"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-gray-100">Company Name</Label>
                                <div className="relative flex items-center">
                                    <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-14 bg-slate-800 rounded-l-md">
                                        <Building className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <div className="absolute left-14 top-0 bottom-0 w-1 bg-purple-500"></div>
                                    <Input
                                        id="company"
                                        type="text"
                                        placeholder="Your Company Ltd."
                                        className="pl-24"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-100">Password</Label>
                                <div className="relative flex items-center">
                                    <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-14 bg-slate-800 rounded-l-md">
                                        <Lock className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <div className="absolute left-14 top-0 bottom-0 w-1 bg-purple-500"></div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-24"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-gray-100">Confirm Password</Label>
                                <div className="relative flex items-center">
                                    <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-14 bg-slate-800 rounded-l-md">
                                        <Lock className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <div className="absolute left-14 top-0 bottom-0 w-1 bg-purple-500"></div>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-24"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full btn-primary h-12 text-base"
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                                {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-300">
                            Already have an account?{" "}
                            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
                                Sign In
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                <p className="text-center text-sm text-gray-500 mt-6">
                    By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    )
}
