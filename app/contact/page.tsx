
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Spheratech to discuss your web development project and receive a tailored solution for your business.",
};
export default function ContactPage() {

  return (
    <>
     <ContactForm />
    </>
  );
}
