'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.name || !formData.email || !formData.service || !formData.budget || !formData.timeline) {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          budget: '',
          timeline: '',
          message: ''
        });
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

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-700 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold mb-4">{t.contact.form.success.title}</h2>
        <p className="text-xl text-slate-300 mb-6">
          {t.contact.form.success.message}
        </p>
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
            onChange={handleChange}
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
            onChange={handleChange}
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
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition"
          placeholder={t.contact.form.phone.placeholder}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="service" className="block text-sm font-semibold mb-2">
          {t.contact.form.service.label} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {t.contact.form.service.options.map((service) => (
            <label
              key={service}
              className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition ${
                formData.service === service
                  ? 'bg-red-500 border-red-500'
                  : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
              }`}
            >
              <input
                type="radio"
                name="service"
                value={service}
                checked={formData.service === service}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm font-medium">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="budget" className="block text-sm font-semibold mb-2">
          {t.contact.form.budget.label} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {t.contact.form.budget.options.map((budget) => (
            <label
              key={budget}
              className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition ${
                formData.budget === budget
                  ? 'bg-red-500 border-red-500'
                  : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
              }`}
            >
              <input
                type="radio"
                name="budget"
                value={budget}
                checked={formData.budget === budget}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm font-medium">{budget}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="timeline" className="block text-sm font-semibold mb-2">
          {t.contact.form.timeline.label} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {t.contact.form.timeline.options.map((timeline) => (
            <label
              key={timeline}
              className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition ${
                formData.timeline === timeline
                  ? 'bg-red-500 border-red-500'
                  : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
              }`}
            >
              <input
                type="radio"
                name="timeline"
                value={timeline}
                checked={formData.timeline === timeline}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm font-medium">{timeline}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="block text-sm font-semibold mb-2">
          {t.contact.form.message.label}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
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
