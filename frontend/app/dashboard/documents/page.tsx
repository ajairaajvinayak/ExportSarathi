"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Trash2, Loader2, Download } from "lucide-react"

export default function DocumentsPage() {
    const [generating, setGenerating] = useState(false)
    const [items, setItems] = useState([{ desc: "", qty: 1, price: 0 }])

    const addItem = () => {
        setItems([...items, { desc: "", qty: 1, price: 0 }])
    }

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index))
    }

    const handleGenerate = () => {
        setGenerating(true)
        // Simulate generation
        setTimeout(() => {
            setGenerating(false)
            // Trigger download simulation or show success
            alert("Document generated successfully! (Simulation)")
        }, 2000)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-100">Document Generator</h1>
                <p className="text-gray-300">
                    Auto-generate compliant export documentation in seconds.
                </p>
            </div>

            <Tabs defaultValue="invoice" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <TabsTrigger value="invoice" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Commercial Invoice</TabsTrigger>
                    <TabsTrigger value="packing" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Packing List</TabsTrigger>
                    <TabsTrigger value="origin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Certificate of Origin</TabsTrigger>
                </TabsList>

                <TabsContent value="invoice" className="mt-6">
                    <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                        <CardHeader>
                            <CardTitle>Commercial Invoice Details</CardTitle>
                            <CardDescription>
                                Fill in the details to generate a standard commercial invoice.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
                                    <h3 className="font-medium text-gray-100 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        Exporter Details
                                    </h3>
                                    <div className="space-y-2">
                                        <Label>Company Name</Label>
                                        <Input placeholder="Your Company Ltd." className="bg-white dark:bg-gray-900" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Address</Label>
                                        <Input placeholder="Street, City, Country" className="bg-white dark:bg-gray-900" />
                                    </div>
                                </div>
                                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
                                    <h3 className="font-medium text-gray-100 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        Importer Details
                                    </h3>
                                    <div className="space-y-2">
                                        <Label>Company Name</Label>
                                        <Input placeholder="Buyer Company Inc." className="bg-white dark:bg-gray-900" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Address</Label>
                                        <Input placeholder="Street, City, Country" className="bg-white dark:bg-gray-900" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-gray-100">Product Items</h3>
                                    <Button variant="outline" size="sm" onClick={addItem} className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                                        <Plus className="h-4 w-4 mr-2" /> Add Item
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-500 mb-2 px-2">
                                        <div className="col-span-6">Description</div>
                                        <div className="col-span-2">Qty</div>
                                        <div className="col-span-3">Unit Price ($)</div>
                                        <div className="col-span-1"></div>
                                    </div>

                                    {items.map((item, i) => (
                                        <div key={i} className="grid grid-cols-12 gap-2 items-center bg-gray-50 dark:bg-gray-900/50 p-2 rounded-md border border-transparent hover:border-gray-200 transition-colors">
                                            <div className="col-span-6">
                                                <Input placeholder="Product description" className="bg-white dark:bg-gray-900 h-9" />
                                            </div>
                                            <div className="col-span-2">
                                                <Input type="number" min="1" defaultValue={item.qty} className="bg-white dark:bg-gray-900 h-9" />
                                            </div>
                                            <div className="col-span-3">
                                                <Input type="number" min="0" step="0.01" defaultValue={item.price} className="bg-white dark:bg-gray-900 h-9" />
                                            </div>
                                            <div className="col-span-1 text-right">
                                                <Button variant="ghost" size="icon" onClick={() => removeItem(i)} disabled={items.length === 1} className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800 p-6">
                            <Button variant="outline" className="border-gray-200">Save Draft</Button>
                            <Button onClick={handleGenerate} disabled={generating} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                                {generating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating PDF...
                                    </>
                                ) : (
                                    <>
                                        <Download className="mr-2 h-4 w-4" />
                                        Generate Invoice
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="packing" className="mt-6">
                    <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                        <CardHeader>
                            <CardTitle>Packing List</CardTitle>
                            <CardDescription>Coming soon in MVP Phase 2.</CardDescription>
                        </CardHeader>
                    </Card>
                </TabsContent>

                <TabsContent value="origin" className="mt-6">
                    <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                        <CardHeader>
                            <CardTitle>Certificate of Origin</CardTitle>
                            <CardDescription>Coming soon in MVP Phase 2.</CardDescription>
                        </CardHeader>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
