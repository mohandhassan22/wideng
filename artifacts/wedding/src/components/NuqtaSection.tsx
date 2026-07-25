import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Stage = 'idle' | 'joke' | 'real';

export function NuqtaSection() {
  const [stage, setStage] = useState<Stage>('idle');
  const [coins, setCoins] = useState<{ id: number; x: number; delay: number }[]>([]);

  const spawnCoins = () => {
    const newCoins = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      delay: Math.random() * 0.4,
    }));
    setCoins(newCoins);
    setTimeout(() => setCoins([]), 2200);
  };

  const handleMainClick = () => {
    spawnCoins();
    setStage('joke');
  };

  const handleClose = () => {
    setStage('real');
  };

  const handleInstaPay = () => {
    window.open('https://instapay.bh/', '_blank');
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" dir="rtl">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6e8] to-[#faf5ec] pointer-events-none" />

      {/* Floating coin particles */}
      <AnimatePresence>
        {coins.map((coin) => (
          <motion.div
            key={coin.id}
            className="absolute text-2xl pointer-events-none select-none"
            style={{ left: `${coin.x}%`, bottom: '20%' }}
            initial={{ y: 0, opacity: 1, scale: 0.6 }}
            animate={{ y: -320, opacity: 0, scale: 1.2, rotate: Math.random() > 0.5 ? 360 : -360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, delay: coin.delay, ease: 'easeOut' }}
          >
            💸
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-5xl mb-4">💸</div>
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-3">النقطة</h2>
          <p className="text-muted-foreground text-lg mb-10">
            عشان فرحتنا تبقى أحلى 😄
          </p>
        </motion.div>

        {/* Main button */}
        <AnimatePresence mode="wait">
          {stage === 'idle' && (
            <motion.div
              key="btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.button
                onClick={handleMainClick}
                className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-white text-2xl font-bold shadow-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #b3892f, #d4a843, #b3892f)', backgroundSize: '200% 200%' }}
                whileHover={{ scale: 1.07, boxShadow: '0 20px 50px rgba(179,137,47,0.5)' }}
                whileTap={{ scale: 0.95 }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ backgroundPosition: { repeat: Infinity, duration: 3, ease: 'linear' } }}
              >
                {/* shimmer */}
                <motion.div
                  className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full"
                  animate={{ translateX: ['−100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', repeatDelay: 1 }}
                />
                <span>💸</span>
                <span>ابعت النقطة</span>
                <span>💸</span>
              </motion.button>
              <p className="mt-4 text-sm text-muted-foreground">اضغط لو جاهز 😏</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── MODAL 1: Joke ── */}
      <AnimatePresence>
        {stage === 'joke' && (
          <motion.div
            key="modal-joke"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Card */}
            <motion.div
              className="relative bg-[#faf5ec] rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border-2 border-[#b3892f]/30"
              initial={{ scale: 0.5, rotate: -8, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              dir="rtl"
            >
              <motion.div
                className="text-7xl mb-4"
                animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                😂
              </motion.div>
              <h3 className="font-display text-3xl text-primary mb-4">أنت صدقت؟!</h3>
              <p className="text-xl text-[#3a332c] leading-relaxed mb-8 font-medium">
                أكيد بنهزر! 😂
                <br />
                <span className="text-muted-foreground text-base mt-2 block">مش بجد، دي دعوة مش فاتورة 😄</span>
              </p>
              <motion.button
                onClick={handleClose}
                className="px-8 py-3 rounded-full bg-[#b3892f] text-white font-bold text-lg shadow-lg w-full"
                whileHover={{ scale: 1.05, backgroundColor: '#c9a040' }}
                whileTap={{ scale: 0.97 }}
              >
                إغلاق
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL 2: Real ── */}
      <AnimatePresence>
        {stage === 'real' && (
          <motion.div
            key="modal-real"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Floating coins in modal too */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl pointer-events-none z-10"
                style={{ left: `${10 + i * 11}%`, top: '10%' }}
                animate={{ y: [0, -40, 0], rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              >
                💰
              </motion.div>
            ))}

            {/* Card */}
            <motion.div
              className="relative bg-[#faf5ec] rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border-2 border-[#b3892f]/40 z-20"
              initial={{ scale: 0.5, y: 60, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              dir="rtl"
            >
              {/* Gold confetti top */}
              <div className="flex justify-center gap-2 mb-3 text-2xl">
                {'✨🎊💛🎊✨'.split('').map((c, i) => (
                  <motion.span key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}>
                    {c}
                  </motion.span>
                ))}
              </div>

              <motion.div
                className="text-6xl mb-3"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.5 }}
              >
                😜
              </motion.div>

              <h3 className="font-display text-3xl text-primary mb-3">أنت صدقت؟</h3>
              <p className="text-xl text-[#3a332c] leading-relaxed mb-2 font-bold">
                لا ابعت النقطه حالاً! 😜
              </p>
              <p className="text-muted-foreground text-sm mb-8">
                عشان فرحتنا تكمل بشكلكم 💛
              </p>

              <motion.button
                onClick={handleInstaPay}
                className="relative w-full py-4 rounded-2xl text-white font-bold text-xl shadow-xl overflow-hidden mb-4"
                style={{ background: 'linear-gradient(135deg, #1a7f3c, #2da44e, #1a7f3c)' }}
                whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(26,127,60,0.45)' }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/15 skew-x-12 -translate-x-full"
                  animate={{ translateX: ['-100%', '220%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', repeatDelay: 0.8 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>💸</span>
                  <span>إرسال النقطة عبر InstaPay</span>
                  <span>💸</span>
                </span>
              </motion.button>

              <button
                onClick={() => setStage('idle')}
                className="text-sm text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors"
              >
                مش دلوقتي
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
