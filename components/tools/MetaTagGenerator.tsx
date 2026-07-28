'use client';

import { useState } from 'react';
import { Copy, Check, Eye, Code, Search, Globe, Share } from 'lucide-react';

export default function MetaTagGenerator() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        keywords: '',
        author: '',
        url: '',
        image: '',
    });

    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const generateMetaTags = () => {
        return `<!-- Primary Meta Tags -->
<title>${formData.title || 'Your Title Here'}</title>
<meta name="title" content="${formData.title || 'Your Title Here'}">
<meta name="description" content="${formData.description || 'Your description here.'}">
<meta name="keywords" content="${formData.keywords}">
<meta name="author" content="${formData.author}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${formData.url || 'https://example.com/'}">
<meta property="og:title" content="${formData.title || 'Your Title Here'}">
<meta property="og:description" content="${formData.description || 'Your description here.'}">
<meta property="og:image" content="${formData.image || 'https://example.com/image.jpg'}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${formData.url || 'https://example.com/'}">
<meta property="twitter:title" content="${formData.title || 'Your Title Here'}">
<meta property="twitter:description" content="${formData.description || 'Your description here.'}">
<meta property="twitter:image" content="${formData.image || 'https://example.com/image.jpg'}">`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateMetaTags());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="space-y-6">
                <div>
                    <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2 text-ink">
                        <Code className="w-5 h-5 text-brand" />
                        Meta Information
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-body mb-2">Page Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter page title (Recommended: < 60 chars)"
                                className="w-full bg-surface-2 border border-edge rounded-lg px-4 py-3 text-ink placeholder:text-faint focus:outline-none focus:border-brand transition-colors"
                                maxLength={70}
                            />
                            <div className="flex justify-end mt-1">
                                <span className={`text-xs ${formData.title.length > 60 ? 'text-orange-400' : 'text-faint'}`}>
                                    {formData.title.length}/60
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-body mb-2">Meta Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Briefly describe your page (Recommended: < 160 chars)"
                                className="w-full h-32 bg-surface-2 border border-edge rounded-lg px-4 py-3 text-ink placeholder:text-faint focus:outline-none focus:border-brand transition-colors resize-none"
                                maxLength={200}
                            />
                            <div className="flex justify-end mt-1">
                                <span className={`text-xs ${formData.description.length > 160 ? 'text-orange-400' : 'text-faint'}`}>
                                    {formData.description.length}/160
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-body mb-2">Site URL</label>
                                <input
                                    type="url"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com"
                                    className="w-full bg-surface-2 border border-edge rounded-lg px-4 py-3 text-ink placeholder:text-faint focus:outline-none focus:border-brand transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-body mb-2">Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full bg-surface-2 border border-edge rounded-lg px-4 py-3 text-ink placeholder:text-faint focus:outline-none focus:border-brand transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-body mb-2">Keywords (Optional)</label>
                            <input
                                type="text"
                                name="keywords"
                                value={formData.keywords}
                                onChange={handleInputChange}
                                placeholder="keyword1, keyword2, keyword3"
                                className="w-full bg-surface-2 border border-edge rounded-lg px-4 py-3 text-ink placeholder:text-faint focus:outline-none focus:border-brand transition-colors"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview/Output Section */}
            <div className="space-y-6">
                <div className="flex bg-surface-2 p-1 rounded-lg w-fit">
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'preview' ? 'bg-brand text-ink' : 'text-body hover:text-ink'
                            }`}
                    >
                        <Eye className="w-4 h-4" />
                        Live Preview
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-brand text-ink' : 'text-body hover:text-ink'
                            }`}
                    >
                        <Code className="w-4 h-4" />
                        HTML Code
                    </button>
                </div>

                {activeTab === 'preview' ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Google Preview */}
                        <div className="bg-white rounded-xl p-6 shadow-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                                    <Globe className="w-3 h-3 text-slate-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-900 leading-none">Google</span>
                                    <span className="text-[10px] text-slate-500 leading-none">{formData.url || 'https://example.com'}</span>
                                </div>
                            </div>
                            <h4 className="text-[#1a0dab] text-xl font-medium mb-1 hover:underline cursor-pointer">
                                {formData.title || 'Your Website Title Goes Here'}
                            </h4>
                            <p className="text-sm text-[#4d5156] line-clamp-2">
                                {formData.description || 'Enter a meta description to see how your website will appear in Google search results. A good description increases click-through rate.'}
                            </p>
                        </div>

                        {/* Social Preview */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-slate-200">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <Share className="w-8 h-8 opacity-20" />
                                        <span className="text-xs">Image Preview Placeholder</span>
                                    </div>
                                </div>
                            )}
                            <div className="p-4 bg-slate-50">
                                <div className="text-[11px] text-slate-500 uppercase tracking-widest mb-1">
                                    {new URL(formData.url || 'http://example.com').hostname}
                                </div>
                                <h4 className="text-slate-900 font-bold text-lg mb-1 line-clamp-1">
                                    {formData.title || 'Your Website Title'}
                                </h4>
                                <p className="text-sm text-slate-600 line-clamp-2">
                                    {formData.description || 'Your meta description will appear here on social media platforms like X, Facebook, and LinkedIn.'}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative group animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <button
                            onClick={copyToClipboard}
                            className="absolute top-4 right-4 p-2 bg-surface-2 border border-edge hover:border-edge-strong text-body rounded-lg transition-colors z-10"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <pre className="bg-surface border border-edge rounded-xl p-6 pt-12 overflow-x-auto text-sm font-mono text-brand custom-scrollbar">
                            {generateMetaTags()}
                        </pre>
                    </div>
                )}

                <div className="bg-brand/10 border border-brand/20 rounded-xl p-6 flex items-start gap-4">
                    <div className="p-2 bg-brand/20 rounded-lg">
                        <Search className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-brand mb-1">SEO Tip</h4>
                        <p className="text-sm text-body leading-relaxed">
                            Keep your title under 60 characters and description under 160 characters for optimal visibility in Search Engine Results Pages (SERPs).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
