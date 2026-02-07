'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { Plus, Minus, MessageCircle, HelpCircle, FileQuestion, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqCategories = [
    { icon: HelpCircle, color: 'from-violet-500 to-purple-500' },
    { icon: FileQuestion, color: 'from-blue-500 to-cyan-500' },
    { icon: MessageCircle, color: 'from-emerald-500 to-green-500' },
    { icon: Lightbulb, color: 'from-amber-500 to-orange-500' }
];

interface FAQItem {
    question: string;
    answer: string;
    category: number;
}

export default function FAQSection() {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<number>(0);
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenItems(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    // Get FAQs from translations or use defaults
    const faqItems: FAQItem[] = t.faq?.items || [
        { question: "How long does a typical project take?", answer: "Project timelines vary based on complexity...", category: 0 },
        { question: "What is your pricing structure?", answer: "We offer flexible pricing models...", category: 0 },
        { question: "Do you provide ongoing support?", answer: "Yes, we offer comprehensive support packages...", category: 1 },
        { question: "What technologies do you specialize in?", answer: "We work with modern technologies including...", category: 2 },
        { question: "Can you work with our existing team?", answer: "Absolutely! We collaborate seamlessly...", category: 2 },
        { question: "What makes your approach different?", answer: "Our unique methodology combines...", category: 3 }
    ];

    const filteredFAQs = faqItems.filter(item => item.category === activeCategory);

    return (
        <section id="faq" className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 mb-4">
                        <HelpCircle className="w-4 h-4 text-violet-400" />
                        <span className="text-sm font-semibold text-violet-300">FAQ</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {t.faq?.title || "Frequently Asked Questions"}
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        {t.faq?.subtitle || "Find answers to common questions about our services and process"}
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {faqCategories.map((category, index) => {
                        const Icon = category.icon;
                        const isActive = activeCategory === index;

                        return (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(index)}
                                className={`
                  flex items-center gap-3 px-6 py-3 rounded-full font-semibold
                  transition-all duration-300 border
                  ${isActive
                                        ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg`
                                        : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:border-slate-600'
                                    }
                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span>
                                    {t.faq?.categories?.[index] ||
                                        ['General', 'Services', 'Collaboration', 'Innovation'][index]}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredFAQs.map((item, index) => {
                            const isOpen = openItems.includes(index);

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`
                    rounded-2xl overflow-hidden border
                    ${isOpen
                                            ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-600'
                                            : 'bg-slate-900/30 border-slate-700 hover:border-slate-600'
                                        }
                    transition-all duration-300
                  `}
                                >
                                    <button
                                        onClick={() => toggleItem(index)}
                                        className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        ${faqCategories[item.category].color} bg-opacity-10
                        ${isOpen ? 'bg-opacity-20' : ''}
                      `}>
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${faqCategories[item.category].color}`}></div>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {item.question}
                                            </h3>
                                        </div>
                                        <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                      transition-transform duration-300
                      ${isOpen
                                                ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 rotate-180'
                                                : 'bg-slate-800'
                                            }
                    `}>
                                            {isOpen ? (
                                                <Minus className="w-5 h-5 text-violet-400" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-slate-400" />
                                            )}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-8 pb-6"
                                            >
                                                <div className="pl-12 border-l-2 border-gradient-to-b from-violet-500/30 to-blue-500/30">
                                                    <p className="text-slate-300 leading-relaxed">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>


            </div>
        </section>
    );
}