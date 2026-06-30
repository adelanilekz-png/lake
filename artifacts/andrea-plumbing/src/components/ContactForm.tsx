import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z
    .string()
    .email("Valid email is required")
    .optional()
    .or(z.literal("")),
  serviceType: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactForm({
  className = "",
  inputClassName = "",
}: {
  className?: string;
  inputClassName?: string;
}) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      setSubmitted(true);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please call us directly at (587) 585-0023.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-400" />
        <h4 className="text-2xl font-bold text-white">Request Sent!</h4>
        <p className="text-slate-300">
          We've received your request and will call you back shortly. For urgent
          issues, call{" "}
          <a href="tel:5875850023" className="text-secondary font-bold">
            (587) 585-0023
          </a>
          .
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            form.reset();
          }}
          className="text-sm text-slate-400 underline mt-2"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const inputCls = `bg-white/90 border-white/20 focus:border-secondary focus:ring-secondary ${inputClassName}`;

  return (
    <Form {...form}>
      <form
        name="contact"
        data-netlify="true"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="contact" />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className={inputCls} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="(587) 585-0023"
                  type="tel"
                  {...field}
                  className={inputCls}
                  data-testid="input-phone"
                />
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
              <FormLabel>Email (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@email.com"
                  type="email"
                  {...field}
                  className={inputCls}
                  data-testid="input-email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Needed</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={inputCls}
                    data-testid="select-service"
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="emergency">Emergency Plumbing</SelectItem>
                  <SelectItem value="drain">Drain Cleaning</SelectItem>
                  <SelectItem value="heater">Water Heater</SelectItem>
                  <SelectItem value="leak">Leak Detection</SelectItem>
                  <SelectItem value="fixture">Fixture Installation</SelectItem>
                  <SelectItem value="pipe">Pipe Repair</SelectItem>
                  <SelectItem value="kitchen">Kitchen &amp; Bath</SelectItem>
                  <SelectItem value="backflow">Backflow Prevention</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us what's happening..."
                  className={`resize-none h-20 ${inputCls}`}
                  {...field}
                  data-testid="input-message"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg h-12 shadow-lg hover:shadow-xl transition-all"
          data-testid="button-submit"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" /> Sending...
            </>
          ) : (
            "Get Service Now"
          )}
        </Button>
      </form>
    </Form>
  );
}
