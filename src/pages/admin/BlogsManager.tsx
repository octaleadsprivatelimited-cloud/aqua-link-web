import { useMemo, useState } from "react";
import { Pencil, PlusCircle, Trash2, X } from "lucide-react";
import { useBlogStore } from "@/stores/blogStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const emptyForm = {
  title: "",
  slug: "",
  image: "",
  excerpt: "",
  content: "",
  category: "",
  readTime: "5 min",
};

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });

export default function BlogsManager() {
  const { posts, addPost, updatePost, deletePost } = useBlogStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageError, setImageError] = useState("");

  const submitText = useMemo(() => (editingId ? "Update Blog" : "Add Blog"), [editingId]);

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageError("");
    setIsDialogOpen(false);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim() || !form.image) return;
    if (editingId) {
      updatePost(editingId, form);
    } else {
      addPost(form);
    }
    resetForm();
  };

  const editPost = (id: string) => {
    const post = posts.find((item) => item.id === id);
    if (!post) return;
    setEditingId(id);
    setForm({
      title: post.title,
      slug: post.slug,
      image: post.image,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readTime: post.readTime,
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageError("");
    setIsDialogOpen(true);
  };

  const handleImageFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(selectedFile);
      setForm((prev) => ({ ...prev, image: dataUrl }));
      setImageError("");
    } catch {
      setImageError("Could not read image. Please try another file.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-2xl text-foreground">Blogs</h2>
        <Button type="button" onClick={openAddDialog}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Blog
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Blogs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-3 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <img src={post.image} alt={post.title} className="h-14 w-20 rounded object-cover bg-surface" />
                <div>
                <p className="font-medium text-foreground">{post.title}</p>
                <p className="text-xs text-muted-foreground">{post.slug}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button type="button" size="icon" variant="ghost" onClick={() => editPost(post.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button type="button" size="icon" variant="ghost" onClick={() => deletePost(post.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{submitText}</DialogTitle>
            <DialogDescription>Fill blog details and upload an image.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="blog-title">Title</Label>
              <Input
                id="blog-title"
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                    slug: generateSlug(event.target.value),
                  }))
                }
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="blog-slug">Slug</Label>
                <Input
                  id="blog-slug"
                  value={form.slug}
                  onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-time">Read Time</Label>
                <Input
                  id="blog-time"
                  value={form.readTime}
                  onChange={(event) => setForm((current) => ({ ...current, readTime: event.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-image">Blog Image</Label>
              <Input id="blog-image" type="file" accept="image/*" onChange={handleImageFileChange} />
              {imageError && <p className="text-sm text-destructive">{imageError}</p>}
              {form.image && (
                <img src={form.image} alt="Preview" className="h-28 w-full max-w-xs rounded object-cover bg-surface" />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-category">Category</Label>
              <Input
                id="blog-category"
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-excerpt">Excerpt</Label>
              <Textarea
                id="blog-excerpt"
                rows={2}
                value={form.excerpt}
                onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-content">Content</Label>
              <Textarea
                id="blog-content"
                rows={8}
                value={form.content}
                onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                <PlusCircle className="h-4 w-4 mr-2" />
                {submitText}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
