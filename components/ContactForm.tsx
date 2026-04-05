'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, Clock, Monitor, Users, Lock } from 'lucide-react';
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
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
        active
          ? 'bg-red-600/20 border-red-500 text-white'
          : 'bg-white/[0.03] border-white/10 text-white/50 hover:border-white/25 hover:text-white/80'
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
    <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-red-500/30 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0 text-red-400">
        {icon}
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-widest text-white/30 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-white/75">{value}</p>
      </div>
    </div>
  );
}

// ── Success state ───────────────────────────────────────────────────────────
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-4">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-6">
        <CheckCircle className="w-7 h-7 text-emerald-400" />
      </div>
      <h2 className="font-syne font-extrabold text-2xl tracking-tight mb-3">Message sent!</h2>
      <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-8">
        We've received your request and will get back to you within 24 hours with a tailored proposal.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {['Our Services', 'Products', 'About us'].map((link) => (
          <a
            key={link}
            href={`/${link.toLowerCase().replace(' ', '')}`}
            className="px-5 py-2.5 rounded-full border border-white/10 text-sm text-white/55 hover:border-white/30 hover:text-white transition-colors"
          >
            {link}
          </a>
        ))}
      </div>
      <button
        onClick={onReset}
        className="text-sm text-red-400 hover:text-red-300 transition-colors"
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
    'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-sm outline-none focus:border-red-500/60 focus:bg-red-500/[0.03] transition-all duration-200';

  return (
    <section className="relative min-h-screen bg-[#080810] text-white overflow-hidden px-6 pt-32 pb-20">

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute -top-32 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(232,48,42,0.13) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(60,60,200,0.07) 0%, transparent 65%)' }}
        />
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap- items-start">

          {/* ── LEFT ── */}
          <div className="lg:sticky lg:top-32">
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[1.5px] text-red-500 font-medium mb-6">
              <span className="inline-block w-6 h-px bg-red-500" />
              Get in touch
            </p>
            <h1 className="font-syne font-extrabold text-5xl md:text-6xl leading-[1.07] tracking-[-2.5px] mb-5">
              Let&apos;s build<br />
              something{' '}
              <span className="text-red-500">great</span><br />
              together.
            </h1>
            <p className="text-white/40 text-base leading-relaxed max-w-sm mb-12">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored proposal.
            </p>
          </div>

          {/* ── RIGHT ── */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-10 backdrop-blur-sm">
            {isSubmitted ? (
              <SuccessState onReset={() => setIsSubmitted(false)} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>

                {error && (
                  <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.8px] text-white/35 mb-2.5">
                      {t.contact.form.name.label} <span className="text-red-500">*</span>
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
                    <label className="block text-[11px] uppercase tracking-[0.8px] text-white/35 mb-2.5">
                      {t.contact.form.email.label} <span className="text-red-500">*</span>
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
                  <label className="block text-[11px] uppercase tracking-[0.8px] text-white/35 mb-2.5">
                    {t.contact.form.phone.label}{' '}
                    <span className="normal-case tracking-normal text-white/20 text-[11px]">
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

                <div className="h-px bg-white/[0.06] mb-6" />

                {/* Services */}
                <div className="mb-5">
                  <label className="block text-[11px] uppercase tracking-[0.8px] text-white/35 mb-3">
                    {t.contact.form.service.label} <span className="text-red-500">*</span>
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
                  <label className="block text-[11px] uppercase tracking-[0.8px] text-white/35 mb-3">
                    {t.contact.form.budget.label} <span className="text-red-500">*</span>
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
                  <label className="block text-[11px] uppercase tracking-[0.8px] text-white/35 mb-3">
                    {t.contact.form.timeline.label} <span className="text-red-500">*</span>
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

                <div className="h-px bg-white/[0.06] mb-6" />

                {/* Message */}
                <div className="mb-8">
                  <label className="block text-[11px] uppercase tracking-[0.8px] text-white/35 mb-2.5">
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
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-syne font-bold text-base tracking-tight transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
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

                <p className="flex items-center justify-center gap-1.5 text-white/25 text-xs mt-4">
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