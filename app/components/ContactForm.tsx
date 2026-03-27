'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// 1. Define strict types for our form data
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string[]; // Changed to array for multi-select
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
  meta: {}
};

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Handle standard text/input changes
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle multi-select for services
  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const isSelected = prev.service.includes(service);
      return {
        ...prev,
        service: isSelected
          ? prev.service.filter((s) => s !== service) // Remove if already selected
          : [...prev.service, service]                // Add if not selected
      };
    });
  };

  // Handle single-select for budget and timeline
  const handleSingleSelect = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validation: Check if service array is empty instead of falsy
    if (
      !formData.name ||
      !formData.email ||
      formData.service.length === 0 ||
      !formData.budget ||
      !formData.timeline
    ) {
      setError(t.contact.form.errors.required);
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t.contact.form.errors.email);
      setIsSubmitting(false);
      return;
    }

    try {
      // Updated endpoint to /api/sendemail
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const userAgent = navigator.userAgent;
      const language = navigator.language;

      let locationString = 'Unknown';

      const finalPayload = {
        ...formData,
        meta: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          userAgent: navigator.userAgent,
          language: navigator.language,
        }
      };
      const response = await fetch('/api/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalPayload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData(INITIAL_FORM_DATA);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (err) {
      setError(t.contact.form.errors.submit);
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Reusable component to clean up the repetitive selection grids
  const OptionGrid = ({
    options,
    selected,
    onChange,
    type = 'radio',
  }: {
    options: string[];
    selected: string | string[];
    onChange: (val: string) => void;
    type?: 'radio' | 'checkbox';
  }) => (
    <div className={`grid gap-3 ${options.length > 4 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
      {options.map((option) => {
        const isSelected = Array.isArray(selected) ? selected.includes(option) : selected === option;
        return (
          <label
            key={option}
            className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition text-center ${isSelected
              ? 'bg-red-500 border-red-500 text-white'
              : 'bg-slate-900/50 border-slate-700 hover:border-slate-600 text-slate-300'
              }`}
          >
            <input
              type={type}
              value={option}
              checked={isSelected}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <span className="text-sm font-medium">{option}</span>
          </label>
        );
      })}
    </div>
  );

  // Success State View
  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-700 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold mb-4">{t.contact.form.success.title}</h2>
        <p className="text-xl text-slate-300 mb-6">{t.contact.form.success.message}</p>
        <div className="space-y-4">
          <p className="text-slate-400">{t.contact.form.success.checkout}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/#services" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
              {t.contact.form.success.services}
            </a>
            <a href="/products" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
              {t.contact.form.success.products}
            </a>
            <a href="/#about" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
              {t.contact.form.success.about}
            </a>
          </div>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-8 text-red-400 hover:text-red-300 transition"
        >
          {t.contact.form.success.another}
        </button>
      </div>
    );
  }

  // Form View
  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700">
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            {t.contact.form.name.label} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleTextChange}
            required
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition"
            placeholder={t.contact.form.name.placeholder}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            {t.contact.form.email.label} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleTextChange}
            required
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition"
            placeholder={t.contact.form.email.placeholder}
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-semibold mb-2">
          {t.contact.form.phone.label} <span className="text-slate-500">({t.contact.form.phone.optional})</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleTextChange}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition"
          placeholder={t.contact.form.phone.placeholder}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">
          {t.contact.form.service.label} <span className="text-red-500">*</span>
        </label>
        <OptionGrid
          options={t.contact.form.service.options}
          selected={formData.service}
          onChange={handleServiceToggle}
          type="checkbox"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">
          {t.contact.form.budget.label} <span className="text-red-500">*</span>
        </label>
        <OptionGrid
          options={t.contact.form.budget.options}
          selected={formData.budget}
          onChange={(val) => handleSingleSelect('budget', val)}
          type="radio"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">
          {t.contact.form.timeline.label} <span className="text-red-500">*</span>
        </label>
        <OptionGrid
          options={t.contact.form.timeline.options}
          selected={formData.timeline}
          onChange={(val) => handleSingleSelect('timeline', val)}
          type="radio"
        />
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="block text-sm font-semibold mb-2">
          {t.contact.form.message.label}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleTextChange}
          rows={6}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition resize-none"
          placeholder={t.contact.form.message.placeholder}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t.contact.form.submit.sending}
          </>
        ) : (
          <>
            {t.contact.form.submit.button}
            <Send className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-slate-400 mt-4">
        {t.contact.form.footer}
      </p>
    </form>
  );
}