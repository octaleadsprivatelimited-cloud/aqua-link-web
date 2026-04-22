import { useState } from "react";
import { Save, Settings } from "lucide-react";
import { useSiteSettingsStore } from "@/stores/siteSettingsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPlaceholder() {
  const { settings, updateSettings } = useSiteSettingsStore();
  const [form, setForm] = useState(settings);

  const updateStat = (index: number, key: "label" | "value", value: string) => {
    setForm((current) => ({
      ...current,
      homeStats: current.homeStats.map((item, idx) =>
        idx === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    updateSettings(form);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage contact details and home-page stats.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Contact Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={(event) => setForm((c) => ({ ...c, phone: event.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number (country code)</Label>
                <Input id="whatsapp" value={form.whatsappNumber} onChange={(event) => setForm((c) => ({ ...c, whatsappNumber: event.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={form.email} onChange={(event) => setForm((c) => ({ ...c, email: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={form.address} onChange={(event) => setForm((c) => ({ ...c, address: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessHours">Business Hours</Label>
              <Input id="businessHours" value={form.businessHours} onChange={(event) => setForm((c) => ({ ...c, businessHours: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gstin">GSTIN</Label>
              <Input id="gstin" value={form.gstin} onChange={(event) => setForm((c) => ({ ...c, gstin: event.target.value }))} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Home Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {form.homeStats.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-3">
                <Input
                  value={item.label}
                  onChange={(event) => updateStat(index, "label", event.target.value)}
                  placeholder="Label"
                />
                <Input
                  value={item.value}
                  onChange={(event) => updateStat(index, "value", event.target.value)}
                  placeholder="Value"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </form>
    </div>
  );
}
