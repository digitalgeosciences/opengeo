import { AlertCircle, Mail, MessageSquareShare } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contactEmail = "info@digitalgeosciences.com";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MessageSquareShare className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Contact the OpenGeo Team</CardTitle>
                  <CardDescription>
                    Questions, data corrections, or partnership ideas? Email us directly and we'll get back within two
                    business days.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 text-sm leading-relaxed text-muted-foreground">
              <div className="flex items-center gap-3 rounded-md border border-border/70 bg-muted/40 px-4 py-3 text-base text-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <a href={`mailto:${contactEmail}`} className="font-medium text-primary underline-offset-2 hover:underline">
                  {contactEmail}
                </a>
              </div>

              <p>
                Include relevant links (tool page, dataset, screenshots) so we can investigate quickly. If you are
                reporting a sensitive issue, note that in the subject line and we will keep the thread private.
              </p>

              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={`mailto:${contactEmail}?subject=Open%20Geosciences%20Support`}>
                  Compose email
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">What to include</CardTitle>
              <CardDescription>Help us triage your note in one pass.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 text-foreground" />
                <p>Share the tool or dataset URL plus the context (broken link, outdated info, partnership idea).</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 text-foreground" />
                <p>Let us know how urgent the request is and the best way to follow up if email differs.</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 text-foreground" />
                <p>Attach data or screenshots when relevant so we can verify and respond faster.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
