"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useId, useRef, useState } from "react";

import { Reveal, SplitText } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { contact, enquiry } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  phone: string;
  email: string;
  className: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", phone: "", email: "", className: enquiry.classes[0] };

/** Deliberately permissive: 10–15 digits, optional spaces, dashes and a plus. */
const PHONE_PATTERN = /^[+]?[\d\s()-]{10,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!PHONE_PATTERN.test(fields.phone.trim())) errors.phone = "Enter a valid phone number.";
  if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "Enter a valid email address.";
  return errors;
}

export function Admissions() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const reduceMotion = useReducedMotion();

  const update = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSent(true);
      return;
    }
    // Move focus to the first problem so keyboard users are not stranded.
    const firstKey = (Object.keys(nextErrors) as (keyof Fields)[])[0];
    formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
  };

  return (
    <section id="enquire" className="scroll-mt-24 border-t border-line bg-bg">
      {/* --- Virtual tour band -------------------------------------- */}
      <div className="shell pt-20 md:pt-28">
        <Reveal className="group relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl border border-line bg-bg-soft p-8 md:flex-row md:items-center md:p-12">
          <Image
            src="/images/ui/virtual-tour.webp"
            alt=""
            width={512}
            height={512}
            sizes="320px"
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-16 size-64 opacity-15 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3 group-hover:rotate-6 md:size-80"
          />
          <div className="relative">
            <p className="eyebrow">360° Virtual Tour</p>
            <h2 className="mt-4 max-w-lg font-display text-[clamp(1.8rem,4.4vw,3rem)] leading-[1.05] tracking-[-0.03em] text-balance">
              Dive into our campus without leaving your sofa
            </h2>
          </div>
          <ActionLink href={contact.virtualTourUrl} className="relative shrink-0">
            Open the virtual tour
          </ActionLink>
        </Reveal>
      </div>

      {/* --- Enquiry ------------------------------------------------- */}
      <div className="shell py-20 md:py-28">
        <div className="grain relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0e0c0a] px-6 py-12 text-[#f7f2e8] md:px-14 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_60%_at_80%_0%,rgba(220,180,92,0.22),transparent_65%)]"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                <p className="eyebrow text-[#a49d90]">{enquiry.eyebrow}</p>
              </div>

              <h2 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.04] tracking-[-0.03em] text-balance">
                <SplitText text={enquiry.title} />
              </h2>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-[#a49d90]">{enquiry.body}</p>

              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                <ContactItem
                  label="Admission helpline"
                  value={contact.helplineDisplay}
                  href={`tel:${contact.helpline}`}
                />
                <ContactItem label="Email" value={contact.email} href={`mailto:${contact.email}`} />
                <ContactItem label="Landline" value={contact.landlines.join(", ")} href={`tel:${contact.landlines[0]}`} />
                <ContactItem
                  label="Campus"
                  value={`${contact.addressLines[1]}, ${contact.addressLines[2]}`}
                  href={contact.mapUrl}
                />
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <ActionLink href={contact.applyUrl} size="lg">
                  Apply online
                </ActionLink>
                <ActionLink
                  href={contact.brochureUrl}
                  variant="outline"
                  size="lg"
                  magnetic={false}
                  className="border-white/30 text-[#f7f2e8] hover:border-gold hover:text-gold"
                >
                  Download brochure
                </ActionLink>
              </div>
            </div>

            <EnquiryForm
              ref={formRef}
              fields={fields}
              errors={errors}
              sent={sent}
              reduceMotion={reduceMotion}
              onUpdate={update}
              onSubmit={onSubmit}
              onReset={() => {
                setFields(EMPTY);
                setSent(false);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  Form
 * ------------------------------------------------------------------ */

type EnquiryFormProps = {
  ref: React.RefObject<HTMLFormElement | null>;
  fields: Fields;
  errors: Errors;
  sent: boolean;
  reduceMotion: boolean | null;
  onUpdate: (key: keyof Fields) => (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
};

function EnquiryForm({
  ref,
  fields,
  errors,
  sent,
  reduceMotion,
  onUpdate,
  onSubmit,
  onReset,
}: EnquiryFormProps) {
  const uid = useId();

  if (sent) {
    return (
      <motion.div
        role="status"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="flex flex-col justify-center rounded-2xl border border-gold/40 bg-white/5 p-8"
      >
        <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-gold text-[#14110e]">
          <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10.5 8.2 15 16 5.5" />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-2xl tracking-tight">Thank you, {fields.name.split(" ")[0]}.</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#a49d90]">
          This is a front-end demo, so nothing was sent. For a live admission, call the helpline on{" "}
          <a href={`tel:${contact.helpline}`} className="text-gold underline underline-offset-4">
            {contact.helplineDisplay}
          </a>{" "}
          or apply at{" "}
          <a
            href={contact.applyUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-gold underline underline-offset-4"
          >
            admission.tis.edu.in
          </a>
          .
        </p>
        <button
          type="button"
          onClick={onReset}
          data-cursor="link"
          className="mt-8 w-fit rounded-full border border-white/25 px-5 py-2.5 text-sm text-[#f7f2e8] transition-colors hover:border-gold hover:text-gold"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={`${uid}-legend`}
      className="rounded-2xl border border-white/12 bg-white/5 p-6 backdrop-blur-sm md:p-8"
    >
      <h3 id={`${uid}-legend`} className="font-display text-xl tracking-tight">
        Send an enquiry
      </h3>
      <p className="mt-2 text-[0.78rem] leading-relaxed text-[#a49d90]">
        Fields marked with an asterisk are required.
      </p>

      <div className="mt-6 space-y-4">
        <Field
          id={`${uid}-name`}
          name="name"
          label="Full name"
          required
          value={fields.name}
          error={errors.name}
          autoComplete="name"
          onChange={onUpdate("name")}
        />
        <Field
          id={`${uid}-phone`}
          name="phone"
          label="Phone number"
          required
          type="tel"
          value={fields.phone}
          error={errors.phone}
          autoComplete="tel"
          onChange={onUpdate("phone")}
        />
        <Field
          id={`${uid}-email`}
          name="email"
          label="Email address"
          required
          type="email"
          value={fields.email}
          error={errors.email}
          autoComplete="email"
          onChange={onUpdate("email")}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-class`} className="text-[0.78rem] text-[#c9c3b8]">
            Class applying for
          </label>
          <select
            id={`${uid}-class`}
            name="className"
            value={fields.className}
            onChange={(event) => onUpdate("className")(event.target.value)}
            className="h-11 w-full appearance-none rounded-lg border border-white/15 bg-transparent px-4 text-sm text-[#f7f2e8] outline-none transition-colors focus:border-gold"
          >
            {enquiry.classes.map((option) => (
              <option key={option} value={option} className="bg-[#14110d]">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        data-cursor="link"
        className="group mt-7 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-gold text-sm font-medium text-[#14110e] transition-transform duration-300 hover:scale-[1.015]"
      >
        Request a callback
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
        </svg>
      </button>

      <p className="mt-4 text-[0.7rem] leading-relaxed text-[#8b8478]">
        By submitting you agree to be contacted by TIS about admissions. This demo form does not transmit any data.
      </p>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
};

function Field({ id, name, label, value, onChange, error, required, type = "text", autoComplete }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.78rem] text-[#c9c3b8]">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-11 w-full rounded-lg border bg-transparent px-4 text-sm text-[#f7f2e8] outline-none transition-colors placeholder:text-[#6d675e] focus:border-gold",
          error ? "border-brand" : "border-white/15",
        )}
      />
      <AnimatePresence>
        {error ? (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[0.72rem] text-brand"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ContactItem({ label, value, href }: { label: string; value: string; href: string }) {
  const external = !href.startsWith("tel:") && !href.startsWith("mailto:");

  return (
    <div>
      <dt className="eyebrow text-[#8b8478]">{label}</dt>
      <dd className="mt-2">
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          data-cursor="link"
          className="text-sm leading-relaxed text-[#f7f2e8] transition-colors hover:text-gold"
        >
          {value}
        </a>
      </dd>
    </div>
  );
}
