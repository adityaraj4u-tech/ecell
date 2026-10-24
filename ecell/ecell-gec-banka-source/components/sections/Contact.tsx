"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Mail, Phone } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validators";

export function Contact() {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" className="scroll-mt-20">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Questions about joining E-Cell, hosting an event, or partnering with us."
      />

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        {/* Form */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6 sm:p-8">
              {status === "success" ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent text-xl">
                    ✓
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Message sent
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    Thanks for reaching out. This is a mock handler — wire it to
                    email or Supabase when ready.
                  </p>
                  <Button
                    className="mt-6 min-h-[44px]"
                    variant="outline"
                    onClick={() => setStatus("idle")}
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="relative space-y-4"
                  noValidate
                >
                  {/* Honeypot */}
                  <div
                    className="absolute -left-[9999px] opacity-0"
                    aria-hidden="true"
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("website")}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="c-name"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Name
                      </label>
                      <Input
                        id="c-name"
                        placeholder="Your name"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="c-email"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Email
                      </label>
                      <Input
                        id="c-email"
                        type="email"
                        placeholder="you@example.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="c-subject"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Subject
                    </label>
                    <Input
                      id="c-subject"
                      placeholder="How can we help?"
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="c-message"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="c-message"
                      rows={5}
                      placeholder="Your message…"
                      className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-500" role="alert">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="min-h-[44px] w-full sm:w-auto"
                    loading={status === "loading"}
                  >
                    Send message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Address + map */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h3 className="font-heading text-base font-semibold text-foreground">
              Government Engineering College Banka
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  Government Engineering College Banka,
                  <br />
                  Banka, Bihar, India
                  <br />
                  <span className="text-xs">
                    (Replace with verified postal address)
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href="mailto:ecell@gecbanka.ac.in"
                  className="hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  ecell@gecbanka.ac.in
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-xs">Phone placeholder — verify before publishing</span>
              </li>
            </ul>
          </div>

          {/* Map embed placeholder */}
          <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-glow-sm">
            <div
              className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-accent/10 via-surface to-accent-indigo/10"
              role="img"
              aria-label="Map placeholder for GEC Banka location"
            >
              <div className="px-6 text-center">
                <MapPin className="mx-auto mb-2 h-8 w-8 text-accent" />
                <p className="text-sm font-medium text-foreground">
                  Map embed placeholder
                </p>
                <p className="mt-1 text-xs text-muted">
                  Replace with Google Maps iframe or Mapbox when the campus pin
                  is verified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
