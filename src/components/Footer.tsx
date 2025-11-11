import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

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
    <footer className="border-t border-border/40 bg-muted/30 mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr,1fr,1fr]">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">About Open Geosciences</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A living index of open geoscience software, datasets, and courses that keeps researchers, educators, and
                students aligned on the latest collaborative tools.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-sm">
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

          <div className="border-t border-border/40 pt-6">
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
