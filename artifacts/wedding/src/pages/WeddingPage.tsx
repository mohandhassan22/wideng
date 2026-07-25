import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroAnimation } from '@/components/IntroAnimation';
import { WaveDivider } from '@/components/WaveDivider';
import { CountdownTimer } from '@/components/CountdownTimer';
import { MusicButton } from '@/components/MusicButton';
import { MapPin, Calendar, Clock } from 'lucide-react';
import photo1 from '@assets/IMG-20260723-WA0005_1784823503983.jpg';
import photo2 from '@assets/IMG-20260721-WA0058_1784823504097.jpg';
import venuePhoto from '@assets/IMG-20260723-WA0009_1784824285369.jpg';

interface GuestbookEntry {
  id: string | number;
  name: string;
  message: string;
  createdAt?: string;
}

export default function WeddingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttending, setRsvpAttending] = useState<boolean | null>(null);
  const [rsvpGuests, setRsvpGuests] = useState(0);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [guestbookName, setGuestbookName] = useState('');
  const [guestbookMessage, setGuestbookMessage] = useState('');
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>([]);
  const [guestbookLoading, setGuestbookLoading] = useState(false);

  const targetDate = new Date('2026-11-08T19:00:00+02:00');

  // Load guestbook entries from DB on mount
  useEffect(() => {
    fetch('/api/guestbook')
      .then((r) => r.json())
      .then((data) => setGuestbookEntries(data))
      .catch(() => {});
  }, []);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || rsvpAttending === null) return;
    setRsvpLoading(true);
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rsvpName,
          attending: rsvpAttending,
          guests: rsvpAttending ? rsvpGuests : 0,
        }),
      });
      setRsvpSubmitted(true);
    } catch {
      alert('حدث خطأ، حاول مرة أخرى');
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleGuestbookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestbookName || !guestbookMessage) return;
    setGuestbookLoading(true);
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: guestbookName, message: guestbookMessage }),
      });
      const newEntry = await res.json();
      setGuestbookEntries((prev) => [newEntry, ...prev]);
      setGuestbookName('');
      setGuestbookMessage('');
    } catch {
      alert('حدث خطأ، حاول مرة أخرى');
    } finally {
      setGuestbookLoading(false);
    }
  };

  return (
    <div dir="rtl" lang="ar" className="min-h-screen">
      <AnimatePresence mode="wait">
        {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <>
          <MusicButton />

          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative z-10 text-center max-w-4xl mx-auto"
            >
              <p className="text-secondary text-sm md:text-base tracking-[0.3em] mb-8 font-semibold">
                بمشيئة الرب نُتم فرحنا
              </p>

              {/* Monogram */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring', damping: 12 }}
                className="mb-8"
              >
                <svg viewBox="0 0 200 200" className="w-32 h-32 md:w-40 md:h-40 mx-auto">
                  <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
                  <circle cx="100" cy="100" r="75" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
                  <text
                    x="100"
                    y="115"
                    textAnchor="middle"
                    className="font-display text-5xl fill-primary"
                  >
                    چ & ك
                  </text>
                </svg>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight"
              >
                چوليا سامي
                <span className="font-serif italic text-primary mx-4 md:mx-6">&</span>
                كيرلس چورچ
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-serif italic text-xl md:text-2xl text-muted-foreground mb-8"
              >
                Julia Sami & Kerlos George
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center gap-3 text-lg md:text-xl text-foreground/80 mb-12"
              >
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-semibold">الأحد، ٨ نوفمبر ٢٠٢٦</span>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary to-transparent" />
                <div className="text-sm">انزل للأسفل</div>
              </motion.div>
            </motion.div>
          </motion.section>

          <WaveDivider />

          {/* Countdown Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-20 px-4 bg-gradient-to-b from-background to-muted/50"
          >
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-primary text-sm md:text-base tracking-[0.2em] mb-4 font-semibold">
                العد التنازلي
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
                باقي على الفرح
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                من قلبنا لقلبكم، ننتظر أن تشاركونا أجمل لحظة في حياتنا
              </p>
              <CountdownTimer targetDate={targetDate} />
            </div>
          </motion.section>

          <WaveDivider />

          {/* Photo Gallery Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-20 px-4 bg-background"
          >
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-secondary text-sm md:text-base tracking-[0.2em] mb-4 font-semibold">
                لحظاتنا
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
                شاهدونا قبل الفرح
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-12">
                لمحات من طريقنا معًا
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
                {[
                  { src: photo1, alt: 'چوليا وكيرلس - لحظة سعيدة' },
                  { src: photo2, alt: 'چوليا وكيرلس معاً' },
                ].map((photo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.7, ease: 'easeOut' }}
                    className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20 group"
                    data-testid={`photo-couple-${i + 1}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ display: 'block' }}
                    />
                    {/* Gold shimmer overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Bottom label */}
                    <div className="absolute bottom-0 inset-x-0 px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white/90 font-display text-lg text-center tracking-wide">
                        چوليا &amp; كيرلس
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <WaveDivider />

          {/* Venue Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-20 px-4 bg-gradient-to-b from-background to-muted/50"
          >
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-accent text-sm md:text-base tracking-[0.2em] mb-4 font-semibold">
                المكان
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
                قاعة هيڤن، كورنيش النيل
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-12">
                بجوار نادي الري، أمام البنك الأهلي، شبرا
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl overflow-hidden shadow-xl border border-border"
              >
                {/* Venue image */}
                <div className="relative h-72 md:h-96 overflow-hidden">
                  <img
                    src={venuePhoto}
                    alt="قاعة هيڤن"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-white font-display text-3xl drop-shadow-lg tracking-wide">
                    قاعة هيڤن
                  </div>
                </div>

                <div className="p-8 md:p-10 text-center">
                  <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                    قاعة هيڤن
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    على ضفاف النيل مباشرة، في أجواء هادئة وراقية
                  </p>

                  {/* Map embed */}
                  <div className="rounded-xl overflow-hidden mb-6 h-64 md:h-80 border border-border">
                    <iframe
                      src="https://www.google.com/maps?q=%D9%82%D8%A7%D8%B9%D8%A9%20%D9%87%D9%8A%D9%81%D9%86%20%D9%83%D9%88%D8%B1%D9%86%D9%8A%D8%B4%20%D8%A7%D9%84%D9%86%D9%8A%D9%84%20%D8%B4%D8%A8%D8%B1%D8%A7&output=embed"
                      className="w-full h-full"
                      loading="lazy"
                      title="موقع قاعة هيڤن"
                    />
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=قاعة+هيفن+كورنيش+النيل+شبرا"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-l from-primary to-primary/90 text-primary-foreground rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all"
                    data-testid="link-venue-map"
                  >
                    <MapPin className="w-5 h-5" />
                    اضغط للذهاب إلى القاعة
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <WaveDivider />

          {/* RSVP Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-20 px-4 bg-background"
          >
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-primary text-sm md:text-base tracking-[0.2em] mb-4 font-semibold">
                تأكيد الحضور
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
                هل ستكونوا معنا؟
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed">
                من فضلكم أكدوا حضوركم حتى نرحب بكم على أكمل وجه
              </p>

              {!rsvpSubmitted ? (
                <motion.form
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onSubmit={handleRsvpSubmit}
                  className="bg-card rounded-2xl p-8 md:p-10 shadow-xl border border-border"
                >
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="الاسم بالكامل"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full px-6 py-4 rounded-xl border-2 border-border bg-background text-foreground text-lg focus:border-primary focus:outline-none transition-colors"
                      required
                      data-testid="input-rsvp-name"
                    />
                  </div>

                  <div className="flex gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending(true)}
                      className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all ${
                        rsvpAttending === true
                          ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                      data-testid="button-rsvp-yes"
                    >
                      نعم، بكل سرور
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending(false)}
                      className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all ${
                        rsvpAttending === false
                          ? 'bg-secondary text-secondary-foreground shadow-lg scale-105'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                      data-testid="button-rsvp-no"
                    >
                      للأسف، لن أستطيع
                    </button>
                  </div>

                  {rsvpAttending === true && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-6"
                    >
                      <label className="block text-right mb-2 text-muted-foreground text-sm">
                        عدد المرافقين (غيرك)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={rsvpGuests}
                        onChange={(e) => setRsvpGuests(Number(e.target.value))}
                        className="w-full px-6 py-4 rounded-xl border-2 border-border bg-background text-foreground text-lg focus:border-primary focus:outline-none transition-colors"
                        data-testid="input-rsvp-guests"
                      />
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={!rsvpName || rsvpAttending === null || rsvpLoading}
                    className="w-full py-4 bg-gradient-to-l from-primary via-primary to-primary/90 text-primary-foreground rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    data-testid="button-rsvp-submit"
                  >
                    {rsvpLoading ? 'جارٍ الإرسال...' : 'تأكيد الحضور'}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/10 rounded-2xl p-8 md:p-10 border-2 border-primary/30"
                >
                  <div className="text-6xl mb-4">✓</div>
                  <h3 className="font-display text-3xl text-primary mb-4">
                    شكرًا لتأكيد حضوركم!
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    نتطلع لرؤيتكم في يومنا السعيد
                  </p>
                </motion.div>
              )}
            </div>
          </motion.section>

          <WaveDivider />

          {/* Guestbook Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-20 px-4 bg-gradient-to-b from-background to-muted/50"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-secondary text-sm md:text-base tracking-[0.2em] mb-4 font-semibold">
                  دفتر الزوار
                </p>
                <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
                  كلمات التهنئة
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl">
                  اترك كلمة حب أو دعوة للعروسين
                </p>
              </div>

              <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleGuestbookSubmit}
                className="bg-card rounded-2xl p-8 md:p-10 shadow-xl border border-border mb-12"
              >
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="اسمك"
                    value={guestbookName}
                    onChange={(e) => setGuestbookName(e.target.value)}
                    className="w-full px-6 py-4 rounded-xl border-2 border-border bg-background text-foreground text-lg focus:border-primary focus:outline-none transition-colors"
                    required
                    data-testid="input-guestbook-name"
                  />
                </div>

                <div className="mb-6">
                  <textarea
                    placeholder="رسالتك للعروسين..."
                    value={guestbookMessage}
                    onChange={(e) => setGuestbookMessage(e.target.value)}
                    rows={4}
                    className="w-full px-6 py-4 rounded-xl border-2 border-border bg-background text-foreground text-lg focus:border-primary focus:outline-none transition-colors resize-none"
                    required
                    data-testid="input-guestbook-message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={guestbookLoading}
                  className="w-full py-4 border-2 border-primary text-primary rounded-xl font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-guestbook-submit"
                >
                  {guestbookLoading ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
                </button>
              </motion.form>

              {/* Guestbook entries */}
              <div className="space-y-4">
                {guestbookEntries.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground text-lg">
                    كن أول من يترك كلمة للعروسين
                  </div>
                ) : (
                  guestbookEntries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card rounded-xl p-6 shadow-md border border-border"
                      data-testid={`guestbook-entry-${entry.id}`}
                    >
                      <div className="font-display text-xl text-primary mb-2">
                        {entry.name}
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {entry.message}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <footer className="py-16 px-4 bg-gradient-to-t from-muted/50 to-background text-center">
            <div className="max-w-2xl mx-auto">
              <div className="font-display text-5xl md:text-6xl text-primary mb-6">
                چ & ك
              </div>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                بمحبة، ننتظركم لنحتفل سويًا بهذا اليوم المبارك
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
