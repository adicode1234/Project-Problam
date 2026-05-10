import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Send, Twitter, Instagram } from "lucide-react";
import { BackgroundVideo } from "@/components/BackgroundVideo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — QuietTrails" },
      {
        name: "description",
        content: "Recommend a place. Pitch a story. Or just say hi.",
      },
      { property: "og:title", content: "Contact QuietTrails" },
      {
        property: "og:description",
        content: "We read every message.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative">
      <BackgroundVideo variant="sea" intensity="strong" />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="font-display text-5xl sm:text-7xl">
          Say hi.
        </h1>

        <p className="text-muted-foreground mt-4 text-lg">
          Recommend a place. Pitch a story. Tell us about your city.
          We read everything.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-[1fr_320px] gap-10">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            setLoading(true);

            const formData = new FormData(e.currentTarget);

            const body = {
              name: formData.get("name"),
              email: formData.get("email"),
              subject: formData.get("subject"),
              message: formData.get("message"),
            };

            try {
              const response = await fetch(
                "https://egmvzwdmybopadiawpzf.supabase.co/functions/v1/contact-email",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(body),
                }
              );

              if (response.ok) {
                setSent(true);
              } else {
                alert("Failed to send message");
              }
            } catch (error) {
              console.error(error);
              alert("Something went wrong");
            } finally {
              setLoading(false);
            }
          }}
          className="glass-strong rounded-3xl p-8 shadow-glass space-y-5"
        >
          {sent ? (
            <div className="text-center py-12 animate-fade-up">
              <div className="h-14 w-14 rounded-full bg-accent/20 grid place-items-center mx-auto">
                <Send className="h-6 w-6 text-accent" />
              </div>

              <h2 className="font-display text-3xl mt-5">
                Sent.
              </h2>

              <p className="text-muted-foreground mt-2">
                We'll write back within a few days.
              </p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  name="name"
                  label="Your name"
                  placeholder="Marco"
                />

                <Field
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                />
              </div>

              <Field
                name="subject"
                label="Subject"
                placeholder="A hidden cafe in Lisbon you should know"
              />

              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </label>

                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us about it…"
                  className="mt-2 w-full bg-card/60 rounded-2xl px-4 py-3 text-sm border border-border outline-none focus:border-accent transition resize-none"
                />
              </div>

              <button
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-[1.02] transition shadow-glow disabled:opacity-60"
              >
                <Send className="h-4 w-4" />

                {loading ? "Sending..." : "Send message"}
              </button>
            </>
          )}
        </form>

        <aside className="space-y-4">
          <Side
            icon={<Mail className="h-4 w-4" />}
            title="Email"
            body="anandaakash2005@gmail.com"
          />

          <Side
            icon={<MessageCircle className="h-4 w-4" />}
            title="Press"
            body="pressclubkolkata@gmail.com"
          />

          <div className="glass rounded-2xl p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Follow
            </div>

            <div className="mt-3 flex gap-2">
              <a
                href="https://x.com/AMahapatra9143"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 grid place-items-center rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition"
              >
                <Twitter className="h-4 w-4" />
              </a>

              <a
                href="https://www.instagram.com/mahapatra2166/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 grid place-items-center rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({
  label,
  ...rest
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>

      <input
        required
        {...rest}
        className="mt-2 w-full bg-card/60 rounded-2xl px-4 py-3 text-sm border border-border outline-none focus:border-accent transition"
      />
    </div>
  );
}

function Side({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        {icon}
        {title}
      </div>

      <div className="text-sm mt-1.5">
        {body}
      </div>
    </div>
  );
}