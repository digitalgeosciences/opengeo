import { Link } from "react-router-dom";
import { Layers, UserCircle } from "lucide-react";

export const Footer = () => {
  const lastUpdatedISO = import.meta.env.VITE_LAST_UPDATED ?? __BUILD_DATE__ ?? "";
  const lastUpdated = lastUpdatedISO
    ? new Date(lastUpdatedISO).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Not specified";

  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr,1fr,1fr]">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Layers className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Open Geosciences</h3>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Explore open-source geoscience tools</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A living index of open geoscience software, datasets, and courses that keeps researchers, educators, and
                students aligned on the latest collaborative tools.
              </p>
            </div>

            <div className="space-y-2.5">
              <h3 className="font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contribute" className="text-muted-foreground hover:text-primary transition-colors">
                    Contribute
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Sponsors</h3>
              <div className="space-y-2 text-sm">
                <a
                  href="https://geoarabia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <UserCircle className="h-5 w-5" />
                  GeoArabia Community
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 pt-4">
            <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left">
              <p className="flex items-center justify-center gap-1">
                Built and maintained by{" "}
                <a
                  href="https://digitalgeosciences.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Digital Geosciences
                </a>
              </p>
              <p className="text-xs text-muted-foreground">Last updated {lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
