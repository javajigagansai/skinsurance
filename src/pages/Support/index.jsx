import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { FAQS } from '../../services/mockData';
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaChevronDown, FaCheckCircle } from 'react-icons/fa';

export const Support = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => {
      setContactSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center">
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full">
          Customer Service
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-950 dark:text-white mt-2">
          How Can We Support You Today?
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto text-sm">
          Browse our frequently asked questions, log a support ticket, or connect with our support underwriting agents directly.
        </p>
      </div>

      {/* Main Grid: Info Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact info list */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass-panel dark:glass-panel-gold rounded-3xl p-6 text-left space-y-6">
            <h3 className="text-lg font-bold text-navy-950 dark:text-white border-l-2 border-gold-400 pl-2">
              SK Smart Corporate Office
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-xs">
                <div className="p-2.5 bg-slate-100 dark:bg-navy-900 rounded-xl text-gold-500 mt-0.5 shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="font-semibold text-navy-950 dark:text-white">Headquarters Coordinates</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                    1st Floor, M D Plaza, No : 104, W Raja St, Kanchipuram, Tamil Nadu 631502
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <div className="p-2.5 bg-slate-100 dark:bg-navy-900 rounded-xl text-gold-500 mt-0.5 shrink-0">
                  <FaClock />
                </div>
                <div>
                  <p className="font-semibold text-navy-950 dark:text-white">Office Operating Hours</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                    Open · Closes 6:30 pm (Mon-Sat)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <div className="p-2.5 bg-slate-100 dark:bg-navy-900 rounded-xl text-gold-500 mt-0.5 shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="font-semibold text-navy-950 dark:text-white">Email Communications</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                    skinvestments2025@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel dark:glass-panel-gold rounded-3xl p-6 sm:p-8 text-left space-y-6">
            <h3 className="text-lg font-bold text-navy-950 dark:text-white border-l-2 border-gold-400 pl-2">
              Send Online Inquiry
            </h3>

            {contactSuccess && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-500/30 rounded-2xl flex items-center space-x-3 text-emerald-600 dark:text-emerald-400 text-xs">
                <FaCheckCircle className="text-lg shrink-0" />
                <span>Thank you! Your ticket query has been registered. An agent will contact you shortly.</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Your Full Name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-navy-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-navy-950 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Inquiry Subject</label>
                <input
                  required
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g., Claim Settlement Status AP-8329"
                  className="w-full px-4 py-2.5 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-navy-950 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Message Description</label>
                <textarea
                  required
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Provide any details about your policy, claim, or calculation inquiry..."
                  className="w-full px-4 py-2.5 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-400"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="gold" className="px-6 py-2.5">
                  Submit Support Ticket
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-6 text-left">
        <h2 className="text-2xl font-bold text-navy-950 dark:text-white text-center">
          Frequently Answered Inquiries
        </h2>
        <div className="max-w-4xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel dark:glass-panel-gold rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/5 transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm text-navy-950 dark:text-white hover:bg-slate-50 dark:hover:bg-navy-900/40 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <FaChevronDown className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold-500' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/20 dark:border-white/5 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Support;
