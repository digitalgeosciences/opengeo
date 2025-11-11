import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Github, Sparkles } from "lucide-react";

import contributors from "@/data/contributors.json";

type Contributor = {
  name: string;
  role: string;
  github: string;
  avatar?: string;
  from?: number;
  to?: number | null;
};

const contributorList = contributors as Contributor[];

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatTenure = (from?: number, to?: number | null) => {
  if (!from) return null;
  const end = typeof to === "number" ? to : "present";
  return `${from} \u2013 ${end}`;
};

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-10">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">About Open Geosciences</CardTitle>
                  <CardDescription>Connecting people, tools, and open knowledge</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                Geoscience research and education are in the middle of a transformational moment. Powerful new sensing
                technologies, cloud platforms, and unprecedented data access are reshaping how we explore the subsurface
                and understand Earth systems. Open Geosciences—also known as open-geo—was created to support that shift.
                It curates an evolving catalogue of open-source software, datasets, and learning materials so that
                anyone, from first-year students to senior researchers, can leverage modern workflows without licensing
                barriers.
              </p>
              <p>
                This initiative emphasizes open access, reproducibility, and community collaboration. The resources you
                browse on this site span interactive teaching notebooks, processing pipelines, numerical modeling
    tools, and entire curricula designed by educators who share their work openly. By highlighting these projects, we
                aim to empower people everywhere to experiment, learn, and contribute back to the broader geoscience
                commons.
              </p>
              <p>
                Open Geosciences is inspired by the seminal compilation from
                Gosses et&nbsp;al. (2023),{" "}
                <a
                  href="https://doi.org/10.5281/zenodo.8354180"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  softwareunderground/awesome-open-geoscience
                </a>
                . Their collaborative work laid the foundation for this directory, and the Digital Geoscience team now curates the catalogue to keep it updated as new open tools emerge.
                We extend gratitude to Justin Gosses, Jesper Dramsch, Evan Bianco, Dieter Werthmüller, Andrew Moodie,
                Bane Sullivan, Matteo Niccoli, Leonardo Uieda, and dozens of other contributors who champion openness in
                our field.
              </p>
              <p className="text-sm text-muted-foreground">
                More about this stewardship is captured by{" "}
                <a
                  href="https://qubalee.github.io/posts/2025/04/open-geosciences/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  Alqubalee (2025), Open Geosciences
                </a>
                , which outlines Digital Geoscience's commitment to maintaining and refreshing the list for the community.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Open Geosciences Team</CardTitle>
                  <CardDescription>Maintainers and advocates keeping open geoscience thriving</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {contributorList.map((person) => (
                  <div key={person.github} className="rounded-lg border border-border/60 p-4">
                    <div className="flex items-start gap-3">
                      {person.avatar ? (
                        <img
                          src={person.avatar}
                          alt={`${person.name} avatar`}
                          className="h-12 w-12 rounded-full border border-border/60 object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-muted text-sm font-semibold text-muted-foreground">
                          {getInitials(person.name)}
                        </div>
                      )}
                      <div className="flex flex-1 items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-foreground">{person.name}</p>
                          <p className="text-sm text-muted-foreground">{person.role}</p>
                          {formatTenure(person.from, person.to) && (
                            <p className="mt-1 inline-flex items-center rounded-full border border-border/60 px-2 py-0.5 text-xs uppercase tracking-wide text-muted-foreground">
                              {formatTenure(person.from, person.to)}
                            </p>
                          )}
                        </div>
                        <a
                          href={person.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition hover:text-primary hover:border-primary"
                          aria-label={`Visit ${person.name}'s GitHub profile`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
