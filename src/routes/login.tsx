import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — QuietTrails" },
      { name: "description", content: "Sign in to QuietTrails to save hidden gems and access your travel journal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        setInfo("Check your inbox to confirm your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/discover", search: { city: "" } });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-5 py-24">
      <BackgroundVideo variant="mountain" intensity="strong" />

      <div className="w-full max-w-md relative animate-fade-up">
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-7">
          <div className="h-10 w-10 text-white">
            <img
              src={logo}
              alt="QuietTrails"
              className="h-10 w-10 text-white"
            />
          </div>
          <span className="font-display text-2xl tracking-tight">QuietTrails</span>
        </Link>

        <div className="glass-strong rounded-3xl p-8 shadow-glass">
          <div className="text-center mb-6">
            <h1 className="font-display text-4xl">
              {mode === "signin" ? "Welcome back." : "Travel quietly."}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {mode === "signin"
                ? "Sign in to your local insider account."
                : "Create an account. Save the world's quiet places."}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="grid grid-cols-2 p-1 rounded-full bg-secondary/60 mb-6 text-sm">
            <button
              type="button"
              onClick={() => { setMode("signin"); setError(null); setInfo(null); }}
              className={`py-2 rounded-full transition ${
                mode === "signin" ? "bg-card shadow-sm font-medium" : "text-muted-foreground"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => { setMode("signup"); setError(null); setInfo(null); }}
              className={`py-2 rounded-full transition ${
                mode === "signup" ? "bg-card shadow-sm font-medium" : "text-muted-foreground"
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            {mode === "signup" && (
              <Field icon={<User className="h-4 w-4" />}>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-transparent outline-none text-sm flex-1 py-3"
                />
              </Field>
            )}
            <Field icon={<Mail className="h-4 w-4" />}>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-transparent outline-none text-sm flex-1 py-3"
              />
            </Field>
            <Field icon={<Lock className="h-4 w-4" />}>
              <input
                required
                minLength={6}
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-transparent outline-none text-sm flex-1 py-3"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="text-muted-foreground hover:text-foreground p-1"
                aria-label="Toggle password visibility"
              >
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </Field>

            {error && (
              <div className="text-xs text-destructive bg-destructive/10 rounded-xl px-3 py-2 animate-fade-up">
                {error}
              </div>
            )}
            {info && (
              <div className="text-xs text-jade bg-accent/10 rounded-xl px-3 py-2 animate-fade-up" style={{ color: "var(--jade)" }}>
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-[1.02] transition shadow-glow disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {mode === "signin" ? "Sign in" : "Create account"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            {mode === "signin" ? "New to QuietTrails?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setInfo(null); }}
              className="text-foreground font-medium hover:text-accent transition"
            >
              {mode === "signin" ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing you agree to our quiet-travel manifesto.
        </p>
      </div>
    </div>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-3 px-4 bg-card/70 border border-border rounded-2xl focus-within:border-accent transition">
      <span className="text-muted-foreground">{icon}</span>
      {children}
    </label>
  );
}
