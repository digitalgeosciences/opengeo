import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GitPullRequest, Loader2, ShieldCheck } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  contributorName: z.string().min(2, "Please share your name."),
  email: z.string().email("Enter a valid email so we can follow up."),
  organization: z.string().optional(),
  toolName: z.string().min(2, "Tool name is required."),
  toolUrl: z.string().url("Provide a valid URL (https://...)."),
  tags: z.string().optional(),
  description: z.string().min(20, "Give us at least 20 characters about the tool."),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Contribute = () => {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contributorName: "",
      email: "",
      organization: "",
      toolName: "",
      toolUrl: "",
      tags: "",
      description: "",
      notes: "",
    },
  });

  const scriptUrl = useMemo(() => import.meta.env.VITE_GOOGLE_SCRIPT_URL, []);

  const onSubmit = async (values: FormValues) => {
    if (!scriptUrl) {
      setSubmitState("error");
      setStatusMessage("The submission form is temporarily unavailable. Please try again in a few minutes.");
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");
    setStatusMessage("");

    try {
      const payload = {
        ...values,
        tags: values.tags
          ? values.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const opaqueSuccess = response.type === "opaque";
      if (!response.ok && !opaqueSuccess) {
        const message = await response.text();
        throw new Error(message || "Apps Script rejected the submission.");
      }

      form.reset();
      setSubmitState("success");
      setStatusMessage("Thank you for contributing! We'll review your submission shortly.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setSubmitState("error");
      setStatusMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GitPullRequest className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Submit a Tool</CardTitle>
                  <CardDescription>Share an open geoscience resource and we will add it to the catalogue.</CardDescription>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Provide as much context as you can—active links, licensing details, and primary maintainers—so our team can verify and publish the listing quickly.
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              {submitState === "success" && (
                <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">
                  <ShieldCheck className="h-4 w-4" />
                  <AlertTitle>Submission received</AlertTitle>
                  <AlertDescription>{statusMessage}</AlertDescription>
                </Alert>
              )}

              {submitState === "error" && (
                <Alert variant="destructive">
                  <AlertTitle>There was a problem</AlertTitle>
                  <AlertDescription>{statusMessage}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="contributorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="University / Company / Community" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="toolName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tool name</FormLabel>
                        <FormControl>
                          <Input placeholder="Open Geo Toolkit" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="toolUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tool URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/your/project" {...field} />
                        </FormControl>
                        <FormDescription>Link to the primary repository, docs site, or landing page.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What does it do?</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Briefly describe the tool, audience, and license."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <Input placeholder="geology, mapping, python" {...field} />
                          </FormControl>
                          <FormDescription>Comma-separated keywords help others discover it.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional notes</FormLabel>
                          <FormControl>
                            <Input placeholder="License, maintainer, data requirements..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contribute;
