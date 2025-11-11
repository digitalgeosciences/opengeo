import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, MessageSquare } from "lucide-react";

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
  name: z.string().min(2, "Please provide your name."),
  email: z.string().email("Enter a valid email so we can reply."),
  topic: z.enum(["discussion", "broken-link", "data-issue", "other"], {
    required_error: "Select a reason for reaching out.",
  }),
  link: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
  message: z.string().min(20, "Tell us more so we can help."),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "discussion",
      link: "",
      message: "",
    },
  });

  const scriptUrl = useMemo(() => import.meta.env.VITE_GOOGLE_SCRIPT_URL, []);

  const onSubmit = async (values: FormValues) => {
    if (!scriptUrl) {
      setStatus("error");
      setStatusMessage("The contact form is temporarily unavailable. Please email us directly or try again later.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const payload = {
        form: "contact",
        ...values,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const opaqueSuccess = res.type === "opaque";
      if (!res.ok && !opaqueSuccess) {
        const message = await res.text();
        throw new Error(message || "Apps Script rejected the submission.");
      }

      form.reset({ name: "", email: "", topic: "discussion", link: "", message: "" });
      setStatus("success");
      setStatusMessage("Thanks for reaching out — we received your message and will respond soon.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setStatus("error");
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
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Contact & Issue Reporting</CardTitle>
                  <CardDescription>
                    Start a discussion, report a broken link, or flag data and license issues.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our team monitors messages daily. Include clear context—screenshots, URLs, and timelines—so we can respond with actionable guidance.
              </p>

              {status === "success" && (
                <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">
                  <AlertTitle>Message sent</AlertTitle>
                  <AlertDescription>{statusMessage}</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <AlertTitle>Unable to submit</AlertTitle>
                  <AlertDescription>{statusMessage}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
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
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            {...field}
                          >
                            <option value="discussion">General discussion / question</option>
                            <option value="broken-link">Broken link</option>
                            <option value="data-issue">Data or license issue</option>
                            <option value="other">Other feedback</option>
                          </select>
                        </FormControl>
                        <FormDescription>Pick the category that best describes your message.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relevant URL (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/tool" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Describe the issue or start the discussion. Include details that help us reproduce or understand the context."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                    <AlertCircle className="h-4 w-4" />
                    We review every request and follow up via email if we need more detail.
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <span className="mr-2 h-4 w-4 animate-spin border-2 border-t-transparent rounded-full" />}
                      Submit message
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

export default Contact;
