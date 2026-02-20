import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - SphaeraTech',
  description: 'Get in touch with us to discuss your project. We\'ll respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <>
      
      <main className="min-h-screen bg-slate-950 text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
            <div 
              className="absolute inset-0 opacity-30" 
              style={{
                backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            ></div>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Let's Build Something{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Amazing
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Tell us about your project and we'll get back to you within 24 hours with a tailored solution.
              </p>
            </div>

            {/* Contact Form Component */}
            <ContactForm />
          </div>
        </section>

       
      </main>

    </>
  );
}