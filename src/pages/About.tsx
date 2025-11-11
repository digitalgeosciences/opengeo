import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles } from "lucide-react";

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

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
