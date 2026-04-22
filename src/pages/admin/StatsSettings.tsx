import { useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { useSiteSettingsStore } from "@/stores/siteSettingsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsSettings() {
  const { settings, updateSettings } = useSiteSettingsStore();
  const [form, setForm] = useState(settings);

  const updateStat = (
    section: "homeStats" | "aboutStats",
    index: number,
    key: "label" | "value",
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [section]: current[section].map((item, idx) =>
        idx === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const addStat = (section: "homeStats" | "aboutStats") => {
    setForm((current) => ({
      ...current,
      [section]: [...current[section], { label: "", value: "" }],
    }));
  };

  const removeStat = (section: "homeStats" | "aboutStats", index: number) => {
    setForm((current) => ({
      ...current,
      [section]: current[section].filter((_, idx) => idx !== index),
    }));
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    updateSettings(form);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-foreground">Stats Settings</h2>
        <p className="text-sm text-muted-foreground">Add, edit, and delete website stat blocks.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Home Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {form.homeStats.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3">
              <Input
                value={item.label}
                onChange={(event) => updateStat("homeStats", index, "label", event.target.value)}
                placeholder="Label"
              />
              <Input
                value={item.value}
                onChange={(event) => updateStat("homeStats", index, "value", event.target.value)}
                placeholder="Value"
              />
              <Button type="button" variant="outline" size="icon" onClick={() => removeStat("homeStats", index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addStat("homeStats")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Home Stat
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Page Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {form.aboutStats.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3">
              <Input
                value={item.label}
                onChange={(event) => updateStat("aboutStats", index, "label", event.target.value)}
                placeholder="Label"
              />
              <Input
                value={item.value}
                onChange={(event) => updateStat("aboutStats", index, "value", event.target.value)}
                placeholder="Value"
              />
              <Button type="button" variant="outline" size="icon" onClick={() => removeStat("aboutStats", index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addStat("aboutStats")}>
            <Plus className="h-4 w-4 mr-2" />
            Add About Stat
          </Button>
        </CardContent>
      </Card>

      <Button type="submit">
        <Save className="h-4 w-4 mr-2" />
        Save Stats
      </Button>
    </form>
  );
}
