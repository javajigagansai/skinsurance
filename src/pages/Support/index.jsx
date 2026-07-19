import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { Button } from '../../components/ui/Button';
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { saveTicket } from '../../services/api';

export const Support = () => {
  const { t } = useTranslation();
  const [contactSuccess, setContactSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const success = await saveTicket(form);
    if (success) {
      setContactSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setContactSuccess(false);
      }, 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center">
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full">
          {t('support_badge')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-950 dark:text-white mt-2">
          {t('support_title')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto text-sm">
          {t('support_subtitle')}
        </p>
      </div>

      {/* Main Grid: Info Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact info list */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass-panel dark:glass-panel-gold rounded-3xl p-6 text-left space-y-6">
            <h3 className="text-lg font-bold text-navy-950 dark:text-white border-l-2 border-gold-400 pl-2">
              {t('corp_office')}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-xs">
                <div className="p-2.5 bg-slate-100 dark:bg-navy-900 rounded-xl text-gold-500 mt-0.5 shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="font-semibold text-navy-950 dark:text-white">Corporate Office</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                    # 104, MD Plaza, 1st Floor, West Raja Street, Kanchipuram - 631502.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <div className="p-2.5 bg-slate-100 dark:bg-navy-900 rounded-xl text-gold-500 mt-0.5 shrink-0">
                  <FaClock />
                </div>
                <div>
                  <p className="font-semibold text-navy-950 dark:text-white">{t('office_hours')}</p>
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
                  <p className="font-semibold text-navy-950 dark:text-white">{t('email_comms')}</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                    skinvestments2025@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <span className="p-2.5 bg-slate-100 dark:bg-navy-900 rounded-xl text-gold-500 mt-0.5 shrink-0">📞</span>
                <div>
                  <p className="font-semibold text-navy-950 dark:text-white">Phone Hotline</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5 font-sans">
                    +91 98407 23956
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <div className="p-2.5 bg-pink-500/10 text-pink-500 rounded-xl mt-0.5 shrink-0">
                  <FaInstagram className="text-base" />
                </div>
                <div>
                  <p className="font-semibold text-navy-950 dark:text-white">Instagram Portal</p>
                  <a 
                    href="https://www.instagram.com/sk_smartinvestments/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-pink-500 hover:underline font-bold mt-0.5 block"
                  >
                    @sk_smartinvestments
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl mt-0.5 shrink-0">
                  <FaWhatsapp className="text-base" />
                </div>
                <div>
                  <p className="font-semibold text-navy-950 dark:text-white">WhatsApp Support</p>
                  <a 
                    href="https://wa.me/919840723956?text=Hi%20SK%20Smart%20Investments%2C%20I%20have%20a%20query%20about%20your%20services." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-emerald-500 hover:underline font-bold mt-0.5 block"
                  >
                    Chat Now on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <span className="p-2.5 bg-slate-100 dark:bg-navy-900 rounded-xl text-gold-500 mt-0.5 shrink-0">💼</span>
                <div>
                  <p className="font-semibold text-navy-950 dark:text-white">Managing Director</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                    Prakash Gajendiran
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
                    placeholder="Your Name"
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
                    placeholder="Enter Email"
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
                  placeholder="Subject"
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
                  placeholder="Your Message"
                  className="w-full px-4 py-2.5 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-400"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="gold" className="px-6 py-2.5">
                  {t('submit_ticket')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  );
};
export default Support;
