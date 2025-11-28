"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2, Circle, FileText, Clock, AlertTriangle } from "lucide-react"

export default function CompliancePage() {
    const steps = [
        {
            title: "Business Registration",
            desc: "Ensure your entity is registered (Proprietorship/LLP/Pvt Ltd).",
            status: "completed",
            docs: ["PAN Card", "Incorporation Certificate"]
        },
        {
            title: "IEC Code Application",
            desc: "Apply for Import Export Code (IEC) from DGFT portal.",
            status: "completed",
            docs: ["Bank Certificate", "Digital Signature"]
        },
        {
            title: "RCMC Registration",
            desc: "Register with relevant Export Promotion Council (e.g., APEDA, EEPC).",
            status: "current",
            docs: ["IEC Code", "Membership Fee"]
        },
        {
            title: "Product Certification",
            desc: "Obtain necessary product-specific certifications (e.g., FDA, CE).",
            status: "pending",
            docs: ["Lab Test Reports", "Quality Manual"]
        },
        {
            title: "Customs & Port Registration",
            desc: "Register with Indian Customs (ICEGATE) and AD Code registration.",
            status: "pending",
            docs: ["AD Code Letter", "Bank Statement"]
        }
    ]

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Compliance Roadmap</h1>
                <p className="text-gray-300">
                    Step-by-step guide to becoming fully export compliant.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 shadow-sm border-gray-200 dark:border-gray-800">
                    <CardHeader>
                        <CardTitle>Your Journey</CardTitle>
                        <CardDescription>You are 40% export ready.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gray-200 dark:before:bg-gray-800">
                            {steps.map((step, i) => (
                                <div key={i} className="relative flex gap-6 pb-2">
                                    <div className="absolute left-0 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 z-10">
                                        {step.status === "completed" ? (
                                            <CheckCircle2 className="h-6 w-6 text-green-600 fill-green-50" />
                                        ) : step.status === "current" ? (
                                            <div className="h-4 w-4 rounded-full bg-blue-600 animate-pulse" />
                                        ) : (
                                            <Circle className="h-4 w-4 text-gray-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 pl-8">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className={`font-semibold text-lg ${step.status === "pending" ? "text-gray-400" : "text-gray-900 dark:text-gray-100"}`}>
                                                {step.title}
                                            </h3>
                                            {step.status === "current" && (
                                                <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-100">
                                                    In Progress
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-500 mb-3 text-sm">{step.desc}</p>

                                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-sm border border-gray-100 dark:border-gray-800">
                                            <div className="font-medium mb-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                <FileText className="h-4 w-4" /> Required Documents:
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {step.docs.map((doc, idx) => (
                                                    <span key={idx} className="bg-white dark:bg-gray-800 border px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-400">
                                                        {doc}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-lg">Estimated Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">4-6 Weeks</p>
                                    <p className="text-sm text-gray-500">To full readiness</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">
                                Based on current processing times for RCMC and Customs registration.
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-900/50 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2 text-amber-700 dark:text-amber-500">
                                <AlertTriangle className="h-5 w-5" />
                                Critical Alert
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-amber-800 dark:text-amber-400">
                                Your IEC code needs to be linked with your Aadhaar for the new DGFT portal update by next week.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
