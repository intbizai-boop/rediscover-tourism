import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

const FACILITIES = [
  { value: '3star', label: '3-Star Hotels' },
  { value: '4star', label: '4-Star Hotels' },
  { value: 'luxury', label: 'Luxury / 5-Star Resorts' },
];

const inputClass =
  'w-full rounded-xl border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal/40 outline-none transition-[border-color,background-color,box-shadow] duration-200 focus:border-forest/60 focus:bg-white focus:ring-1 focus:ring-forest/30';

const labelClass = 'block text-[11px] font-mono tracking-widest uppercase text-forest font-semibold mb-1.5';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    adults: '',
    children: '',
    childrenAges: '',
    rooms: '',
    travelDates: '',
    duration: '',
    facilities: '',
    specialRequests: '',
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '79714c94-d222-41c0-8b5c-ffa6bc0abfdd',
          subject: `New Travel Enquiry from ${form.name}`,
          from_name: 'My Wellbeing Healthcare & Tourism Contact Form',
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        destination: '',
        adults: '',
        children: '',
        childrenAges: '',
        rooms: '',
        travelDates: '',
        duration: '',
        facilities: '',
        specialRequests: '',
      });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 scroll-mt-16 md:scroll-mt-20">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -translate-y-1/2 flex justify-center"
        aria-hidden="true"
      >
        <div className="h-72 w-[600px] rounded-full bg-forest/5 blur-[100px]" />
      </div>

      <div className="section-shell relative">
        {/* Stamp Link */}
        <motion.a
          href="#/contact"
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          whileHover={{ scale: 1.08, rotate: 0 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          className="absolute -top-4 right-4 z-20 w-32 h-32 xs:w-[136px] xs:h-[136px] sm:w-36 sm:h-36 sm:right-6 md:-top-6 md:right-10 lg:right-16 md:w-36 md:h-36 lg:w-44 lg:h-44 cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:rounded-full"
        >
          <img
            src="/stamp.webp"
            alt="10% Discount Stamp"
            width="160"
            height="160"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </motion.a>

        <SectionHeading
          label={null}
          title="Live Your Journey"
          align="items-start text-left md:items-center md:text-center md:mx-auto"
          className="mb-20 pr-[110px] xs:pr-[130px] sm:pr-[145px] md:pr-0"
        >
          Tell us your dream, we&apos;ll craft every detail. Fill in your travel requirements
          below; our dedicated specialists will respond with a bespoke itinerary within 24 hours.
        </SectionHeading>

        <motion.form
          onSubmit={handleSubmit}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-charcoal/10 bg-sand shadow-sm"
          noValidate
        >
          {/* Card glow corners */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-forest/5 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-forest/5 blur-3xl" aria-hidden="true" />

          <div className="relative grid grid-cols-1 gap-x-8 gap-y-6 p-8 md:p-10 md:grid-cols-2">

            {/* ── Section: Traveller Details ── */}
            <motion.div variants={fadeUp} className="md:col-span-2">
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-charcoal/40 border-b border-charcoal/10 pb-3 mb-1">
                Traveller Details
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="ct-name" className={labelClass}>Full Name *</label>
              <input
                id="ct-name"
                name="name"
                type="text"
                required
                autocomplete="name"
                placeholder="e.g. Sarah Mitchell…"
                value={form.name}
                onChange={set('name')}
                className={inputClass}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="ct-email" className={labelClass}>Email Address *</label>
              <input
                id="ct-email"
                name="email"
                type="email"
                required
                autocomplete="email"
                spellCheck={false}
                placeholder="e.g. you@example.com…"
                value={form.email}
                onChange={set('email')}
                className={inputClass}
              />
            </motion.div>

            <motion.div variants={fadeUp} className="md:col-span-2 md:max-w-sm">
              <label htmlFor="ct-phone" className={labelClass}>Phone / WhatsApp</label>
              <input
                id="ct-phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                placeholder="e.g. +44 7700 900000…"
                value={form.phone}
                onChange={set('phone')}
                className={inputClass}
              />
            </motion.div>

            {/* ── Section: Trip Details ── */}
            <motion.div variants={fadeUp} className="md:col-span-2 mt-4">
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-charcoal/40 border-b border-charcoal/10 pb-3 mb-1">
                Trip Details
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="md:col-span-2">
              <label htmlFor="ct-destination" className={labelClass}>Destinations Desired *</label>
              <input
                id="ct-destination"
                name="destination"
                type="text"
                required
                autocomplete="off"
                placeholder="e.g. Bali, Thailand, Sri Lanka…"
                value={form.destination}
                onChange={set('destination')}
                className={inputClass}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="ct-travel-dates" className={labelClass}>Travel Dates</label>
              <input
                id="ct-travel-dates"
                name="travelDates"
                type="text"
                autocomplete="off"
                placeholder="e.g. 10 Oct – 20 Oct 2025…"
                value={form.travelDates}
                onChange={set('travelDates')}
                className={inputClass}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="ct-duration" className={labelClass}>Duration of Tour</label>
              <input
                id="ct-duration"
                name="duration"
                type="text"
                autocomplete="off"
                placeholder="e.g. 10 nights…"
                value={form.duration}
                onChange={set('duration')}
                className={inputClass}
              />
            </motion.div>

            {/* ── Section: Group Size ── */}
            <motion.div variants={fadeUp} className="md:col-span-2 mt-4">
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-charcoal/40 border-b border-charcoal/10 pb-3 mb-1">
                Group Size &amp; Rooms
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="ct-adults" className={labelClass}>No. of Adults</label>
              <input
                id="ct-adults"
                name="adults"
                type="number"
                min="1"
                autocomplete="off"
                placeholder="e.g. 2…"
                value={form.adults}
                onChange={set('adults')}
                className={inputClass}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="ct-rooms" className={labelClass}>No. of Rooms</label>
              <input
                id="ct-rooms"
                name="rooms"
                type="number"
                min="1"
                autocomplete="off"
                placeholder="e.g. 1…"
                value={form.rooms}
                onChange={set('rooms')}
                className={inputClass}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="ct-children" className={labelClass}>No. of Children</label>
              <input
                id="ct-children"
                name="children"
                type="number"
                min="0"
                autocomplete="off"
                placeholder="e.g. 0…"
                value={form.children}
                onChange={set('children')}
                className={inputClass}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="ct-children-ages" className={labelClass}>Children's Ages</label>
              <input
                id="ct-children-ages"
                name="childrenAges"
                type="text"
                autocomplete="off"
                placeholder="e.g. 4, 8, 12…"
                value={form.childrenAges}
                onChange={set('childrenAges')}
                className={inputClass}
              />
            </motion.div>

            {/* ── Section: Accommodation ── */}
            <motion.div variants={fadeUp} className="md:col-span-2 mt-4">
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-charcoal/40 border-b border-charcoal/10 pb-3 mb-1">
                Accommodation Preference
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="md:col-span-2">
              <label className={labelClass}>Facilities</label>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Accommodation type">
                {FACILITIES.map(({ value, label }) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-medium transition-[border-color,background-color,color,box-shadow] duration-200 select-none ${
                      form.facilities === value
                        ? 'border-forest bg-forest/10 text-forest shadow-[0_0_0_1px_rgba(58,95,64,0.4)]'
                        : 'border-charcoal/20 text-charcoal/60 hover:border-charcoal/40 hover:text-charcoal/90'
                    }`}
                  >
                    <input
                      type="radio"
                      name="facilities"
                      value={value}
                      checked={form.facilities === value}
                      onChange={set('facilities')}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </motion.div>

            {/* ── Section: Special Requests ── */}
            <motion.div variants={fadeUp} className="md:col-span-2 mt-4">
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-charcoal/40 border-b border-charcoal/10 pb-3 mb-1">
                Special Requests
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="md:col-span-2">
              <label htmlFor="ct-requests" className={labelClass}>
                Dietary requirements, allergies, accessibility needs, special occasions or any other requests
              </label>
              <textarea
                id="ct-requests"
                name="specialRequests"
                rows={4}
                autocomplete="off"
                placeholder="e.g. Vegetarian meals, food allergies, anniversary surprise, wheelchair access…"
                value={form.specialRequests}
                onChange={set('specialRequests')}
                className={`${inputClass} resize-none leading-relaxed`}
              />
            </motion.div>

            {/* ── Submit + Status ── */}
            <motion.div variants={fadeUp} className="md:col-span-2 flex flex-col items-start gap-4 pt-2">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex w-full items-center gap-3 rounded-2xl border border-emerald-600/20 bg-emerald-50 px-6 py-4 text-emerald-800"
                    aria-live="polite"
                  >
                    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-sm">Enquiry sent successfully!</p>
                      <p className="text-xs opacity-75 mt-0.5">Vinnie will be in touch within 24 hours.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    key="submit"
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 text-sm font-semibold text-sand shadow-md transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                    whileTap={{ scale: 0.97 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>

              {status !== 'success' && (
                <p className="text-xs text-charcoal/50">
                  * We answer all travel requests within 24 hours.
                </p>
              )}

              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-400"
                  role="alert"
                  aria-live="polite"
                >
                  ⚠ {errorMsg || 'Something went wrong. Please try again or contact us directly.'}
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
