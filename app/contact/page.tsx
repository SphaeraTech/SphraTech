'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';
import { useLanguage } from '../contexts/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
     <ContactForm />
    </>
  );
}
