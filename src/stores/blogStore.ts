import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultBlogPosts, type BlogPost } from "@/data/blogPosts";

interface BlogStore {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, "id" | "date">) => void;
  updatePost: (id: string, data: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set) => ({
      posts: defaultBlogPosts,
      addPost: (post) =>
        set((state) => ({
          posts: [
            { ...post, id: Date.now().toString(), date: new Date().toISOString().slice(0, 10) },
            ...state.posts,
          ],
        })),
      updatePost: (id, data) =>
        set((state) => ({
          posts: state.posts.map((post) => (post.id === id ? { ...post, ...data } : post)),
        })),
      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),
    }),
    { name: "aquasafe-blogs" }
  )
);
