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

    // Validate required fields
    if (!formData.name || !formData.email || !formData.service || !formData.budget || !formData.timeline) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form
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
      setError('Something went wrong. Please try again or email us directly at hello@sphaeratech.com');
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
        <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
        <p className="text-xl text-slate-300 mb-6">
          We've received your message and will get back to you within 24 hours.
        </p>
        <div className="space-y-4">
          <p className="text-slate-400">While you wait, check out:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/#services" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
              Our Services
            </a>
            <a href="/products" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
              Our Products
            </a>
            <a href="/#about" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
              About Us
            </a>
          </div>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-8 text-red-400 hover:text-red-300 transition"
        >
          Submit Another Request
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
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-semibold mb-2">
          Phone <span className="text-slate-500">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      {/* Service */}
      <div className="mb-6">
        <label htmlFor="service" className="block text-sm font-semibold mb-2">
          What service do you need? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Web Development', 'SEO', 'UI/UX', 'Mobile', 'SaaS', 'Other'].map((service) => (
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

      {/* Budget */}
      <div className="mb-6">
        <label htmlFor="budget" className="block text-sm font-semibold mb-2">
          What's your budget range? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Under $5K', '$5K-$15K', '$15K-$50K', '$50K+'].map((budget) => (
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

      {/* Timeline */}
      <div className="mb-6">
        <label htmlFor="timeline" className="block text-sm font-semibold mb-2">
          When do you need this? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['As soon as possible', '1-3 months', '3-6 months', 'Just browsing'].map((timeline) => (
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

      {/* Message */}
      <div className="mb-8">
        <label htmlFor="message" className="block text-sm font-semibold mb-2">
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition resize-none"
          placeholder="Describe your project, goals, and any specific requirements..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Let's Discuss Your Project
            <Send className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-slate-400 mt-4">
        We typically respond within 24 hours
      </p>
    </form>
  );
}