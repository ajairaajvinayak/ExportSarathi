import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-2xl mx-auto py-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your account and preferences.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal and company details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input defaultValue="Ajai Raaj R" />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input defaultValue="ajai@example.com" disabled />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input defaultValue="Impact Exports Ltd." />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    )
}
