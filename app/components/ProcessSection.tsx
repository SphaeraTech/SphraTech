'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle2, Target, Users, Zap, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const processSteps = [
  { 
    icon: Target, 
    color: 'from-violet-500 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-violet-500/10 to-indigo-500/10'
  },
  { 
    icon: Users, 
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-gradient-to-br from-indigo-500/10 to-blue-500/10'
  },
  { 
    icon: Zap, 
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
  },
  { 
    icon: TrendingUp, 
    color: 'from-cyan-500 to-emerald-500',
    bgColor: 'bg-gradient-to-br from-cyan-500/10 to-emerald-500/10'
  },
  { 
    icon: Shield, 
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-gradient-to-br from-emerald-500/10 to-green-500/10'
  },
  { 
    icon: CheckCircle2, 
    color: 'from-green-500 to-teal-500',
    bgColor: 'bg-gradient-to-br from-green-500/10 to-teal-500/10'
  }
];

export default function ProcessSection() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.process?.title || "Our Process"}
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            {t.process?.subtitle || "A transparent, step-by-step approach to delivering exceptional results"}
          </p>
        </div>

        {/* Process Steps - Timeline Layout */}
        <div className="relative">
          {/* Vertical Timeline Line - Desktop */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/30 via-blue-500/30 to-emerald-500/30 hidden md:block"></div>

          {/* Mobile Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/30 via-blue-500/30 to-emerald-500/30 md:hidden"></div>

          <div className="space-y-12 md:space-y-0">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden flex gap-6">
                    {/* Timeline Dot - Mobile */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 border-4 border-slate-700 flex items-center justify-center z-10">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.color}`}></div>
                      </div>
                    </div>

                    {/* Content - Mobile */}
                    <div className="flex-1 pl-4">
                      <div className={`
                        ${step.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-slate-700
                        transition-all duration-300 hover:border-slate-600
                      `}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`
                            w-12 h-12 rounded-full ${step.bgColor} border border-slate-700
                            flex items-center justify-center flex-shrink-0
                          `}>
                            <Icon className={`w-6 h-6 text-transparent bg-gradient-to-r ${step.color} bg-clip-text`} />
                          </div>
                          <div>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                              Step {index + 1}
                            </span>
                            <h3 className="text-xl font-bold text-white mt-2">
                              {t.process?.steps?.[index]?.title || `Step ${index + 1}`}
                            </h3>
                          </div>
                        </div>
                        <p className="text-slate-300 mb-4">
                          {t.process?.steps?.[index]?.description || 
                           'Detailed description of this step in our process'}
                        </p>
                        
                        {/* Sub-steps */}
                        {t.process?.steps?.[index]?.subSteps && (
                          <ul className="space-y-2">
                            {t.process.steps[index].subSteps.map((subStep: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 mt-1.5 flex-shrink-0"></div>
                                <span>{subStep}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex">
                    {/* Left side (Even steps) */}
                    {isEven ? (
                      <div className="w-1/2 pr-12 flex justify-end">
                        <div className="max-w-md">
                          <div className={`
                            ${step.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-slate-700
                            transition-all duration-300 hover:border-slate-600 text-right
                          `}>
                            <div className="flex items-center justify-end gap-3 mb-4">
                              <div>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                                  Step {index + 1}
                                </span>
                                <h3 className="text-xl font-bold text-white mt-2">
                                  {t.process?.steps?.[index]?.title || `Step ${index + 1}`}
                                </h3>
                              </div>
                              <div className={`
                                w-12 h-12 rounded-full ${step.bgColor} border border-slate-700
                                flex items-center justify-center flex-shrink-0
                              `}>
                                <Icon className={`w-6 h-6 text-transparent bg-gradient-to-r ${step.color} bg-clip-text`} />
                              </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                              {t.process?.steps?.[index]?.description || 
                               'Detailed description of this step in our process'}
                            </p>
                            
                            {/* Sub-steps */}
                            {t.process?.steps?.[index]?.subSteps && (
                              <ul className="space-y-2">
                                {t.process.steps[index].subSteps.map((subStep: string, i: number) => (
                                  <li key={i} className="flex items-start justify-end gap-2 text-sm text-slate-300">
                                    <span>{subStep}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 mt-1.5 flex-shrink-0"></div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-1/2 pr-12"></div>
                    )}

                    {/* Timeline Dot - Desktop */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 border-4 border-slate-700 flex items-center justify-center z-10">
                      <div className={`
                        w-3 h-3 rounded-full bg-gradient-to-r ${step.color}
                        transition-all duration-300
                        ${activeStep === index ? 'scale-150' : ''}
                      `}></div>
                    </div>

                    {/* Right side (Odd steps) */}
                    {!isEven ? (
                      <div className="w-1/2 pl-12">
                        <div className="max-w-md">
                          <div className={`
                            ${step.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-slate-700
                            transition-all duration-300 hover:border-slate-600
                          `}>
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`
                                w-12 h-12 rounded-full ${step.bgColor} border border-slate-700
                                flex items-center justify-center flex-shrink-0
                              `}>
                                <Icon className={`w-6 h-6 text-transparent bg-gradient-to-r ${step.color} bg-clip-text`} />
                              </div>
                              <div>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                                  Step {index + 1}
                                </span>
                                <h3 className="text-xl font-bold text-white mt-2">
                                  {t.process?.steps?.[index]?.title || `Step ${index + 1}`}
                                </h3>
                              </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                              {t.process?.steps?.[index]?.description || 
                               'Detailed description of this step in our process'}
                            </p>
                            
                            {/* Sub-steps */}
                            {t.process?.steps?.[index]?.subSteps && (
                              <ul className="space-y-2">
                                {t.process.steps[index].subSteps.map((subStep: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 mt-1.5 flex-shrink-0"></div>
                                    <span>{subStep}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-1/2 pl-12"></div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Key Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Success Rate", value: "99%", color: "from-emerald-500 to-green-500" },
            { label: "Client Satisfaction", value: "4.9/5", color: "from-blue-500 to-cyan-500" },
            { label: "Projects Delivered", value: "500+", color: "from-violet-500 to-purple-500" }
          ].map((metric, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                {metric.value}
              </div>
              <div className="text-slate-300">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}