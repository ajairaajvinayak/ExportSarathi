import { Card } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground mt-1">
                    Track your export performance and market trends.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-full h-96 flex items-center justify-center bg-muted/20 border-dashed">
                    <div className="text-center text-muted-foreground">
                        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium">Advanced Analytics Coming Soon</h3>
                        <p>Detailed market insights and export metrics will be available in the Pro plan.</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
