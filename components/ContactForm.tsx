'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, Lock } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string[];
  budget: string;
  timeline: string;
  message: string;
  meta: {
    location?: string;
    timezone?: string;
    userAgent?: string;
    language?: string;
  };
}

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  service: [],
  budget: '',
  timeline: '',
  message: '',
  meta: {},
};

// ── Chip (pill select) ──────────────────────────────────────────────────────
function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors duration-150 ${
        active
          ? 'bg-brand/10 border-brand text-ink'
          : 'bg-surface-2 border-edge text-body hover:border-edge-strong hover:text-ink'
      }`}
    >
      {label}
    </button>
  );
}

// ── Info card (left column) ─────────────────────────────────────────────────
function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-xl bg-surface border border-edge hover:border-brand/40 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/30 flex items-center justify-center flex-shrink-0 text-brand">
        {icon}
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-faint mb-0.5">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}

// ── Success state ───────────────────────────────────────────────────────────
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-4">
      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center mb-6">
        <CheckCircle className="w-7 h-7 text-green-500" />
      </div>
      <h2 className="font-display font-bold text-2xl tracking-tight text-ink mb-3">Message sent!</h2>
      <p className="text-body text-sm leading-relaxed max-w-xs mb-8">
        We&apos;ve received your request and will get back to you within 24 hours with a tailored proposal.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {['Our Services', 'Products', 'About us'].map((link) => (
          <a
            key={link}
            href={`/${link.toLowerCase().replace(' ', '')}`}
            className="px-5 py-2.5 rounded-lg border border-edge text-sm text-body hover:border-brand hover:text-ink transition-colors"
          >
            {link}
          </a>
        ))}
      </div>
      <button
        onClick={onReset}
        className="text-sm text-brand hover:text-ink transition-colors"
      >
        Send another message
      </button>
    </div>
  );
}

// ── Main form ───────────────────────────────────────────────────────────────
export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleService = (s: string) =>
    setFormData((prev) => ({
      ...prev,
      service: prev.service.includes(s)
        ? prev.service.filter((x) => x !== s)
        : [...prev.service, s],
    }));

  const setSingle = (field: 'budget' | 'timeline', value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (
      !formData.name ||
      !formData.email ||
      formData.service.length === 0 ||
      !formData.budget ||
      !formData.timeline
    ) {
      setError(t.contact.form.errors.required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError(t.contact.form.errors.email);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/sendemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          meta: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            userAgent: navigator.userAgent,
            language: navigator.language,
          },
        }),
      });
      if (!response.ok) throw new Error('Failed');
      setIsSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
    } catch {
      setError(t.contact.form.errors.submit);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    'w-full px-4 py-3 rounded-lg bg-surface-2 border border-edge text-ink placeholder:text-faint text-sm outline-none focus:border-brand transition-colors duration-200';

  return (
    <section className="relative min-h-screen px-6 pt-32 pb-20">

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT ── */}
          <div className="lg:sticky lg:top-32">
            <p className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-6">
              {'// '}Get in touch
            </p>
            <h1 className="font-display font-bold text-5xl md:text-6xl leading-[1.07] tracking-tight text-ink mb-5">
              Let&apos;s build<br />
              something{' '}
              <span className="text-brand">great</span><br />
              together.
            </h1>
            <p className="text-body text-base leading-relaxed max-w-sm mb-12">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored proposal.
            </p>
          </div>

          {/* ── RIGHT ── */}
          <div className="bg-surface border border-edge rounded-xl p-8 md:p-10">
            {isSubmitted ? (
              <SuccessState onReset={() => setIsSubmitted(false)} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>

                {error && (
                  <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-faint mb-2.5">
                      {t.contact.form.name.label} <span className="text-brand">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleTextChange}
                      placeholder={t.contact.form.name.placeholder}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-faint mb-2.5">
                      {t.contact.form.email.label} <span className="text-brand">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleTextChange}
                      placeholder={t.contact.form.email.placeholder}
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-faint mb-2.5">
                    {t.contact.form.phone.label}{' '}
                    <span className="normal-case tracking-normal text-faint text-[11px]">
                      ({t.contact.form.phone.optional})
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleTextChange}
                    placeholder={t.contact.form.phone.placeholder}
                    className={inputBase}
                  />
                </div>

                <div className="h-px bg-edge mb-6" />

                {/* Services */}
                <div className="mb-5">
                  <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-faint mb-3">
                    {t.contact.form.service.label} <span className="text-brand">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.contact.form.service.options.map((opt: string) => (
                      <Chip
                        key={opt}
                        label={opt}
                        active={formData.service.includes(opt)}
                        onClick={() => toggleService(opt)}
                      />
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="mb-5">
                  <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-faint mb-3">
                    {t.contact.form.budget.label} <span className="text-brand">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.contact.form.budget.options.map((opt: string) => (
                      <Chip
                        key={opt}
                        label={opt}
                        active={formData.budget === opt}
                        onClick={() => setSingle('budget', opt)}
                      />
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-6">
                  <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-faint mb-3">
                    {t.contact.form.timeline.label} <span className="text-brand">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.contact.form.timeline.options.map((opt: string) => (
                      <Chip
                        key={opt}
                        label={opt}
                        active={formData.timeline === opt}
                        onClick={() => setSingle('timeline', opt)}
                      />
                    ))}
                  </div>
                </div>

                <div className="h-px bg-edge mb-6" />

                {/* Message */}
                <div className="mb-8">
                  <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-faint mb-2.5">
                    {t.contact.form.message.label}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleTextChange}
                    rows={5}
                    placeholder={t.contact.form.message.placeholder}
                    className={`${inputBase} resize-none leading-relaxed`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-brand hover:bg-brand-strong text-ink disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.contact.form.submit.sending}
                    </>
                  ) : (
                    <>
                      {t.contact.form.submit.button}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-faint text-xs mt-4">
                  <Lock className="w-3 h-3" />
                  {t.contact.form.footer}
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
