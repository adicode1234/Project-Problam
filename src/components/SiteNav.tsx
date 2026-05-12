import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Moon, Sun, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTheme } from "@/hooks/useFavorites";

const LINKS = [
  { to: "/discover", label: "Discover" },
  { to: "/stories", label: "Stories" },
  { to: "/favorites", label: "Favorites" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
  scrolled ? "py-2.5 backdrop-blur-xl bg-background/70 border-b border-border/60" : "py-4 bg-transparent"
}`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
  src={logo}
  alt="QuietTrails"
  className="h-10 w-10 rounded-xl object-cover shadow-glow"
/>
          <span className="font-display text-2xl tracking-tight">QuietTrails</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-muted-foreground hover:text-foreground transition relative"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center px-3 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition"
          >
            Sign in
          </Link>
          <Link
            to="/discover"
            search={{ city: "" }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-[1.03] transition shadow-glow"
          >
            Start Exploring
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden h-9 w-9 grid place-items-center rounded-full hover:bg-secondary"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-2 mx-4 rounded-2xl glass-strong p-3 animate-fade-up">
          <div className="flex flex-col">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-xl hover:bg-secondary text-sm flex items-center gap-2"
                activeProps={{ className: "bg-secondary font-medium" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border/60 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <img
  src={logo}
  alt="QuietTrails"
  className="h-8 w-8 rounded-lg object-cover"
/>
            <span className="font-display text-xl">QuietTrails</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 max-w-xs leading-relaxed">
            The anti-tourist travel guide. AI-curated, locally loved, quietly recommended.
          </p>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3">Explore</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/discover" search={{ city: "" }} className="hover:text-foreground">Discover</Link></li>
            <li><Link to="/stories" className="hover:text-foreground">Stories</Link></li>
            <li><Link to="/favorites" className="hover:text-foreground">Favorites</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Heart className="h-3 w-3" /> Made for curious travelers.
          </span>
          <span>© {new Date().getFullYear()} QuietTrails</span>
        </div>
      </div>
    </footer>
  );
}
