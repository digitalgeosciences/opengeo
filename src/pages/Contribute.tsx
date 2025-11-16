import { GitPullRequest, Link as LinkIcon, ShieldCheck } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const discussionUrl = "https://github.com/digitalgeosciences/opengeo/discussions";
const addOpenGeoUrl =
  "https://github.com/orgs/digitalgeosciences/discussions/new?category=-addopengeo";

const Contribute = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GitPullRequest className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Share a Tool or Dataset</CardTitle>
                  <CardDescription>All contributions now happen in our public GitHub Discussions board.</CardDescription>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Use our public GitHub Discussions board to propose resources, ask questions, or coordinate on data improvements.
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
                <p className="font-semibold text-primary">How to contribute</p>
                <ol className="mt-2 list-decimal space-y-1 pl-4 text-muted-foreground">
                  <li>Open a new topic in GitHub Discussions describing the tool, dataset, or course.</li>
                  <li>Include key links (repo, docs, license), maintainer details, and suggested tags.</li>
                  <li>Our team reviews the thread, asks for clarifications in public, and merges the listing.</li>
                </ol>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary/90 via-primary/70 to-sky-500 text-white shadow-lg"
                >
                  <a href={addOpenGeoUrl} target="_blank" rel="noreferrer">
                    AddOpenGeo
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <a href={discussionUrl} target="_blank" rel="noreferrer">
                    Visit GitHub Discussions
                  </a>
                </Button>
              </div>
              <p className="text-sm font-semibold text-primary">
                AddOpenGeo is the featured channel for new listings; it gets priority review and a special badge.
              </p>

              <p className="text-xs text-muted-foreground">
                Need a private channel instead? Email us at{" "}
                <a href="mailto:info@digitalgeosciences.com" className="text-primary underline-offset-2 hover:underline">
                  info@digitalgeosciences.com
                </a>
                .
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>Checklist before posting</CardTitle>
                  <CardDescription>Sharing this up front keeps review quick and accurate.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <LinkIcon className="mt-0.5 h-4 w-4 text-foreground" />
                <p>Link to the canonical repo or docs plus any demo or datasets that ship with it.</p>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-foreground" />
                <p>Mention licenses, data-use restrictions, and the maintainer or sponsoring institution.</p>
              </div>
              <div className="flex items-start gap-2">
                <GitPullRequest className="mt-0.5 h-4 w-4 text-foreground" />
                <p>Suggest tags (e.g., "geology", "remote sensing", "python") so others can filter easily.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contribute;
