import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Quote, Trash2, ImagePlus } from "lucide-react";
import { STORIES } from "@/data/places";
import { BackgroundVideo } from "@/components/BackgroundVideo";

export const Route = createFileRoute("/stories")({
  component: Stories,
});

function Stories() {
  const [userStories, setUserStories] = useState<any[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    author: "",
    image: "",
    city: "",
  });

  // IMAGE UPLOAD
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ADD STORY
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.excerpt || !form.image) return;

    const newStory = {
      id: Date.now().toString(),
      ...form,
      isUser: true,
    };

    setUserStories([newStory, ...userStories]);

    setForm({
      title: "",
      excerpt: "",
      author: "",
      image: "",
      city: "",
    });

    setPreview(null);
  };

  // DELETE STORY
  const handleDelete = (id: string) => {
    setUserStories(userStories.filter((s) => s.id !== id));
  };

  return (
    <div className="relative text-white">
      <BackgroundVideo variant="forest" intensity="strong" />

      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="font-display text-5xl sm:text-7xl leading-tight">
          Stories from quiet places.
        </h1>
        <p className="text-white/70 mt-5 text-lg">
          Real journeys shared by real travelers — no filters, just moments.
        </p>
      </section>

      {/* ===================== UPLOAD ===================== */}
      <section className="max-w-3xl mx-auto px-6 pb-14">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
          <h2 className="font-display text-3xl text-center mb-6">
            Share Your Experience
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="p-3 rounded-xl bg-white/10 border border-white/10 outline-none"
              />

              <input
                placeholder="City"
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
                className="p-3 rounded-xl bg-white/10 border border-white/10 outline-none"
              />
            </div>

            <textarea
              placeholder="Share your travel moment..."
              value={form.excerpt}
              onChange={(e) =>
                setForm({ ...form, excerpt: e.target.value })
              }
              rows={4}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 outline-none"
            />

            <input
              placeholder="Your name"
              value={form.author}
              onChange={(e) =>
                setForm({ ...form, author: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 outline-none"
            />

            {/* IMAGE UPLOAD */}
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition">
              <ImagePlus size={18} />
              <span className="text-sm text-white/70">
                Upload travel photo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* IMAGE PREVIEW */}
            {preview && (
              <img
                src={preview}
                className="w-full h-56 object-cover rounded-2xl border border-white/10"
              />
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
            >
              Publish Story
            </button>
          </form>
        </div>
      </section>

      {/* ===================== STORIES GRID ===================== */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">

          {[...userStories, ...STORIES].map((s) => (
            <article
              key={s.id}
              className="group relative break-inside-avoid mb-6 rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              {/* DELETE (HIDDEN UNTIL HOVER) */}
              {s.isUser && (
                <button
                  onClick={() => handleDelete(s.id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition bg-black/60 p-2 rounded-full hover:bg-red-500"
                >
                  <Trash2 size={16} />
                </button>
              )}

              <img
                src={s.image}
                className="w-full object-cover h-auto group-hover:scale-105 transition duration-500"
              />

              <div className="p-5">
                <div className="text-[11px] uppercase tracking-widest text-white/50">
                  {s.city}
                </div>

                <h2 className="font-display text-xl mt-1">
                  {s.title}
                </h2>

                <Quote className="h-3 w-3 text-white/40 my-3" />

                <p className="text-sm text-white/70 leading-relaxed">
                  {s.excerpt}
                </p>

                <div className="text-xs mt-4 text-white/60">
                  — {s.author}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}