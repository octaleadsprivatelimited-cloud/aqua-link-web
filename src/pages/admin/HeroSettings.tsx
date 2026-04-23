import { useMemo, useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { useSiteSettingsStore } from "@/stores/siteSettingsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import bgHero from "@/assets/bg-hero-dark.jpg";
import bgFooter from "@/assets/bg-footer.jpg";

export default function HeroSettings() {
  const { settings, updateSettings } = useSiteSettingsStore();
  const [form, setForm] = useState(settings);
  const heroImageFields = useMemo(
    () => [
      { key: "homeSlide1", label: "Home Hero Slide 1", fallback: heroSlide1 },
      { key: "homeSlide2", label: "Home Hero Slide 2", fallback: heroSlide2 },
      { key: "products", label: "Products Hero", fallback: bgHero },
      { key: "about", label: "About Hero", fallback: bgHero },
      { key: "contact", label: "Contact Hero", fallback: bgHero },
      { key: "blog", label: "Blog Hero", fallback: bgHero },
      { key: "faq", label: "FAQ Hero", fallback: bgHero },
      { key: "footer", label: "Footer background", fallback: bgFooter },
    ],
    []
  );

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });

  const handleHeroImageUpload = async (
    key: keyof typeof form.heroImages,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !selectedFile.type.startsWith("image/")) return;
    try {
      const dataUrl = await fileToDataUrl(selectedFile);
      setForm((current) => ({
        ...current,
        heroImages: { ...current.heroImages, [key]: dataUrl },
      }));
    } catch {
      // noop
    }
  };

  const clearHeroImage = (key: keyof typeof form.heroImages) => {
    setForm((current) => ({
      ...current,
      heroImages: { ...current.heroImages, [key]: "" },
    }));
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    updateSettings(form);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-foreground">Hero Images</h2>
        <p className="text-sm text-muted-foreground">Upload and manage hero images for each page.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Page Hero Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {heroImageFields.map(({ key, label, fallback }) => {
            const imageKey = key as keyof typeof form.heroImages;
            const preview = form.heroImages[imageKey] || fallback;
            return (
              <div key={key} className="space-y-2 border rounded-lg p-3">
                <Label htmlFor={`hero-${key}`}>{label}</Label>
                <Input
                  id={`hero-${key}`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleHeroImageUpload(imageKey, event)}
                />
                <div className="flex items-center gap-3">
                  <img src={preview} alt={`${label} preview`} className="h-24 w-full max-w-xs rounded border object-cover" />
                  <Button type="button" variant="outline" onClick={() => clearHeroImage(imageKey)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Uploaded
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
      <Button type="submit">
        <Save className="h-4 w-4 mr-2" />
        Save Hero Images
      </Button>
    </form>
  );
}
