"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  type: z.enum(["member", "startup"], {
    required_error: "Please select an option",
  }),
  message: z.string().optional(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { type: "member" },
  });

  const onSubmit = async (_data: RegisterFormValues) => {
    // PLACEHOLDER: wire to API / Supabase later
    await new Promise((r) => setTimeout(r, 600));
    reset();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="reg-name"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Full Name
        </label>
        <Input id="reg-name" placeholder="Your name" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="reg-email"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <Input
          id="reg-email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          I want to
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 has-[:checked]:border-accent has-[:checked]:bg-accent/10">
            <input
              type="radio"
              value="member"
              className="accent-[var(--accent)]"
              {...register("type")}
            />
            <span className="text-sm">Join as Member</span>
          </label>
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 has-[:checked]:border-accent has-[:checked]:bg-accent/10">
            <input
              type="radio"
              value="startup"
              className="accent-[var(--accent)]"
              {...register("type")}
            />
            <span className="text-sm">Register Startup</span>
          </label>
        </div>
        {errors.type && (
          <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="reg-message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Message <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="reg-message"
          rows={3}
          placeholder="Tell us briefly about yourself or your idea…"
          className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          {...register("message")}
        />
      </div>
      <Button type="submit" className="w-full" loading={isSubmitting}>
        Submit
      </Button>
      <p className="text-center text-xs text-muted">
        Placeholder form — submissions are not stored yet.
      </p>
    </form>
  );
}
