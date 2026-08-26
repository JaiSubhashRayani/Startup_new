"use client";

import { useState } from "react";
import { Save, CreditCard, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brandColor, setBrandColor] = useState("#7c3aed");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // TODO: Update user profile in Supabase
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account and branding preferences
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Creator"
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Branding
            </CardTitle>
            <CardDescription>Customize how your delivery pages look</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Brand Color</label>
              <div className="flex items-center gap-3 mt-1.5">
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="h-10 w-10 rounded-lg border border-border cursor-pointer"
                />
                <Input
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="flex-1 max-w-[200px]"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Brand Logo</label>
              <p className="text-xs text-muted-foreground mt-1">
                Upload your logo (PNG/SVG, recommended 200x200px)
              </p>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-xs">
                  Logo
                </div>
                <Button variant="outline" size="sm" type="button">
                  Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payments
            </CardTitle>
            <CardDescription>Connect your bank account to receive payouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Connect your Stripe account to start receiving payments directly.
              </p>
              <Button variant="outline" type="button">
                Connect with Stripe
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" loading={saving}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
