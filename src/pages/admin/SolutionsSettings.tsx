import { useMemo, useState } from "react";
import { Pencil, PlusCircle, Save, Search, Trash2, X } from "lucide-react";
import { useSiteSettingsStore } from "@/stores/siteSettingsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export default function SolutionsSettings() {
  const { settings, updateSettings } = useSiteSettingsStore();
  const [form, setForm] = useState(settings);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: "", desc: "", link: "", image: "" });
  const { toast } = useToast();

  const persistForm = (nextForm: typeof form) => {
    const syncedProductSolutions = nextForm.homepageSolutions
      .map((item) => item.title.trim())
      .filter(Boolean);
    updateSettings({
      ...nextForm,
      productSolutions: syncedProductSolutions,
    });
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });

  const updateHomepageSolution = (
    index: number,
    key: "title" | "desc" | "link" | "image",
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      homepageSolutions: current.homepageSolutions.map((item, idx) =>
        idx === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const handleHomepageImageUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !selectedFile.type.startsWith("image/")) return;
    try {
      const dataUrl = await fileToDataUrl(selectedFile);
      updateHomepageSolution(index, "image", dataUrl);
    } catch {
      // noop
    }
  };

  const handleEditImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !selectedFile.type.startsWith("image/")) return;
    try {
      const dataUrl = await fileToDataUrl(selectedFile);
      setEditForm((current) => ({ ...current, image: dataUrl }));
    } catch {
      // noop
    }
  };

  const addHomepageSolution = () =>
    setForm((current) => {
      const next = {
        ...current,
        homepageSolutions: [
          ...current.homepageSolutions,
          { title: "", desc: "", link: "/products", image: "" },
        ],
      };
      persistForm(next);
      return next;
    });

  const removeHomepageSolution = (index: number) =>
    setForm((current) => {
      const next = {
        ...current,
        homepageSolutions: current.homepageSolutions.filter((_, idx) => idx !== index),
      };
      persistForm(next);
      return next;
    });

  const openAdd = () => {
    setEditingIndex(null);
    setEditForm({ title: "", desc: "", link: "/products", image: "" });
  };

  const openEdit = (index: number) => {
    const solution = form.homepageSolutions[index];
    if (!solution) return;
    setEditingIndex(index);
    setEditForm({
      title: solution.title,
      desc: solution.desc,
      link: solution.link,
      image: solution.image,
    });
  };

  const saveEditor = () => {
    if (!editForm.title.trim()) {
      toast({ title: "Error", description: "Title is required.", variant: "destructive" });
      return;
    }
    if (editingIndex === null) {
      setForm((current) => {
        const next = {
          ...current,
          homepageSolutions: [...current.homepageSolutions, editForm],
        };
        persistForm(next);
        return next;
      });
      toast({ title: "Solution added", description: `"${editForm.title}" has been created.` });
    } else {
      setForm((current) => {
        const next = {
          ...current,
          homepageSolutions: current.homepageSolutions.map((item, idx) =>
            idx === editingIndex ? editForm : item
          ),
        };
        persistForm(next);
        return next;
      });
      toast({ title: "Solution updated", description: `"${editForm.title}" has been updated.` });
    }
    setEditingIndex(null);
    setEditForm({ title: "", desc: "", link: "", image: "" });
  };

  const filteredSolutions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return form.homepageSolutions;
    return form.homepageSolutions.filter(
      (solution) =>
        solution.title.toLowerCase().includes(query) ||
        solution.link.toLowerCase().includes(query) ||
        solution.desc.toLowerCase().includes(query)
    );
  }, [form.homepageSolutions, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading font-bold text-2xl text-foreground">Solutions</h2>
          <p className="text-sm text-muted-foreground">{form.homepageSolutions.length} total solutions</p>
        </div>
        <Button type="button" onClick={openAdd}>
          <PlusCircle className="h-4 w-4 mr-2" /> Add Solution
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or link..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Solution</TableHead>
              <TableHead className="hidden md:table-cell">Link</TableHead>
              <TableHead className="hidden sm:table-cell">Image</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSolutions.map((solution) => {
              const originalIndex = form.homepageSolutions.findIndex(
                (item) =>
                  item.title === solution.title &&
                  item.link === solution.link &&
                  item.desc === solution.desc &&
                  item.image === solution.image
              );
              return (
                <TableRow key={`${solution.title}-${solution.link}`}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm text-foreground">{solution.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{solution.desc}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{solution.link}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {solution.image ? (
                      <img src={solution.image} alt={solution.title} className="h-10 w-16 rounded object-cover border" />
                    ) : (
                      <span className="text-xs text-muted-foreground">No image</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button type="button" variant="ghost" size="icon" onClick={() => openEdit(originalIndex)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeHomepageSolution(originalIndex)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredSolutions.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No solutions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {(editingIndex !== null || editForm.title || editForm.desc || editForm.link || editForm.image) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingIndex === null ? "Add Solution" : "Edit Solution"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={editForm.title} onChange={(event) => setEditForm((c) => ({ ...c, title: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea rows={3} value={editForm.desc} onChange={(event) => setEditForm((c) => ({ ...c, desc: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <Input value={editForm.link} onChange={(event) => setEditForm((c) => ({ ...c, link: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <Input type="file" accept="image/*" onChange={handleEditImageUpload} />
              {editForm.image && <img src={editForm.image} alt={editForm.title || "Solution"} className="h-24 w-40 rounded border object-cover" />}
            </div>
            <div className="flex gap-2">
              <Button type="button" onClick={saveEditor}>
                <Save className="h-4 w-4 mr-2" />
                {editingIndex === null ? "Add Solution" : "Update Solution"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingIndex(null);
                  setEditForm({ title: "", desc: "", link: "", image: "" });
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
