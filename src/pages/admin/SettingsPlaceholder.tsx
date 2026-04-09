import { Settings } from "lucide-react";

export default function SettingsPlaceholder() {
  return (
    <div className="text-center py-20">
      <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h2 className="font-heading font-bold text-xl text-foreground">Settings</h2>
      <p className="text-sm text-muted-foreground mt-2">Coming soon — configure business settings, WhatsApp, and more.</p>
    </div>
  );
}
