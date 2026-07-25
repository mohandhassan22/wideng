import { motion, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import photo1 from '@assets/IMG-20260723-WA0005_1784823503983.jpg';

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [petals] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 3,
    }))
  );

  const [carScope, animateCar] = useAnimate();

  // Total: 1.5s drive-in + 5s pause + 2s drive-out = 8.5s → dismiss at 9s
  useEffect(() => {
    const timer = setTimeout(onComplete, 9000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    async function runCar() {
      // 1. Drive down from top to center
      await animateCar(carScope.current, { y: 'calc(50vh - 150px)' }, { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] });
      // 2. Pause in center for 5 seconds
      await new Promise<void>((res) => setTimeout(res, 5000));
      // 3. Drive out to bottom
      await animateCar(carScope.current, { y: '120vh' }, { duration: 2, ease: [0.4, 0, 1, 1] });
    }
    runCar();
  }, [animateCar, carScope]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #f5e6e8 0%, #faf5ec 50%, #f1e8d8 100%)',
      }}
    >
      {/* Floating petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal w-2 h-2 bg-white/60 rounded-full"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        />
      ))}

      {/* Left floral arch */}
      <div className="absolute left-0 top-0 h-full w-32 md:w-48">
        <svg
          viewBox="0 0 200 800"
          className="w-full h-full"
          preserveAspectRatio="xMinYMid meet"
        >
          {/* Branches */}
          <path
            d="M 160 0 Q 140 200 150 400 T 160 800"
            fill="none"
            stroke="#d4c5b0"
            strokeWidth="3"
          />
          <path
            d="M 180 0 Q 165 150 170 350 T 175 800"
            fill="none"
            stroke="#d4c5b0"
            strokeWidth="2"
          />
          
          {/* White roses - large blooms */}
          {[80, 200, 320, 440, 560, 680].map((y, i) => (
            <g key={`rose-${i}`}>
              <circle cx="150" cy={y} r="18" fill="#ffffff" opacity="0.95" />
              <circle cx="150" cy={y} r="12" fill="#fdfbf7" opacity="0.9" />
              <circle cx="150" cy={y} r="6" fill="#f5f0e8" opacity="0.85" />
            </g>
          ))}
          
          {/* Gypsophila clusters - small white dots */}
          {[50, 120, 180, 250, 290, 360, 410, 490, 530, 600, 650, 720, 760].map((y, i) => (
            <g key={`gyp-${i}`}>
              <circle cx={140 + (i % 3) * 10} cy={y} r="4" fill="#ffffff" opacity="0.9" />
              <circle cx={145 + (i % 2) * 8} cy={y + 8} r="3" fill="#ffffff" opacity="0.85" />
              <circle cx={150 + (i % 3) * 6} cy={y + 4} r="3.5" fill="#fefefe" opacity="0.8" />
              <circle cx={138 + (i % 2) * 12} cy={y + 12} r="3" fill="#fafafa" opacity="0.9" />
            </g>
          ))}
          
          {/* Green leaves */}
          {[100, 220, 340, 460, 580, 700].map((y, i) => (
            <ellipse
              key={`leaf-${i}`}
              cx="165"
              cy={y + 10}
              rx="8"
              ry="15"
              fill="#8a9a8e"
              opacity="0.6"
              transform={`rotate(${30 + i * 10} 165 ${y + 10})`}
            />
          ))}
        </svg>
      </div>

      {/* Right floral arch - mirrored */}
      <div className="absolute right-0 top-0 h-full w-32 md:w-48">
        <svg
          viewBox="0 0 200 800"
          className="w-full h-full"
          preserveAspectRatio="xMaxYMid meet"
        >
          <path
            d="M 40 0 Q 60 200 50 400 T 40 800"
            fill="none"
            stroke="#d4c5b0"
            strokeWidth="3"
          />
          <path
            d="M 20 0 Q 35 150 30 350 T 25 800"
            fill="none"
            stroke="#d4c5b0"
            strokeWidth="2"
          />
          
          {[80, 200, 320, 440, 560, 680].map((y, i) => (
            <g key={`rose-r-${i}`}>
              <circle cx="50" cy={y} r="18" fill="#ffffff" opacity="0.95" />
              <circle cx="50" cy={y} r="12" fill="#fdfbf7" opacity="0.9" />
              <circle cx="50" cy={y} r="6" fill="#f5f0e8" opacity="0.85" />
            </g>
          ))}
          
          {[50, 120, 180, 250, 290, 360, 410, 490, 530, 600, 650, 720, 760].map((y, i) => (
            <g key={`gyp-r-${i}`}>
              <circle cx={60 - (i % 3) * 10} cy={y} r="4" fill="#ffffff" opacity="0.9" />
              <circle cx={55 - (i % 2) * 8} cy={y + 8} r="3" fill="#ffffff" opacity="0.85" />
              <circle cx={50 - (i % 3) * 6} cy={y + 4} r="3.5" fill="#fefefe" opacity="0.8" />
              <circle cx={62 - (i % 2) * 12} cy={y + 12} r="3" fill="#fafafa" opacity="0.9" />
            </g>
          ))}
          
          {[100, 220, 340, 460, 580, 700].map((y, i) => (
            <ellipse
              key={`leaf-r-${i}`}
              cx="35"
              cy={y + 10}
              rx="8"
              ry="15"
              fill="#8a9a8e"
              opacity="0.6"
              transform={`rotate(${-30 - i * 10} 35 ${y + 10})`}
            />
          ))}
        </svg>
      </div>

      {/* Vintage car driving down */}
      <motion.div
        ref={carScope}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ width: 180, height: 300, y: -320 }}
      >
        <svg viewBox="0 0 180 300" className="w-full h-full drop-shadow-2xl">
          <defs>
            {/* Clip path shaped like the car cabin */}
            <clipPath id="car-photo-clip">
              <path d="M65,198 L65,142 Q65,82 90,79 Q115,82 115,142 L115,198 Q115,206 90,208 Q65,206 65,198 Z" />
            </clipPath>
            {/* Soft vignette overlay on photo */}
            <radialGradient id="photo-vignette" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
            </radialGradient>
          </defs>

          {/* Road shadow under car */}
          <ellipse cx="90" cy="270" rx="50" ry="12" fill="rgba(0,0,0,0.08)" />

          {/* === REAR BUMPER === */}
          <rect x="52" y="258" width="76" height="10" rx="5" fill="#c8b87a" />

          {/* === CAR BODY (outer shell) === */}
          <path
            d="M52,255 L52,90 Q52,55 90,50 Q128,55 128,90 L128,255 Q128,265 90,268 Q52,265 52,255 Z"
            fill="#e8e0c8"
            stroke="#c8b87a"
            strokeWidth="1.5"
          />
          {/* body highlight */}
          <path
            d="M60,240 L60,100 Q60,68 90,64 Q120,68 120,100 L120,240"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
          />

          {/* === CABIN FRAME (border around photo) === */}
          <path
            d="M65,198 L65,142 Q65,82 90,79 Q115,82 115,142 L115,198 Q115,206 90,208 Q65,206 65,198 Z"
            fill="#b3892f"
            stroke="#d8bd7f"
            strokeWidth="1.5"
          />

          {/* === COUPLE PHOTO on car body === */}
          <image
            href={photo1}
            x="65"
            y="79"
            width="50"
            height="129"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#car-photo-clip)"
          />
          {/* Vignette on top of photo */}
          <path
            d="M65,198 L65,142 Q65,82 90,79 Q115,82 115,142 L115,198 Q115,206 90,208 Q65,206 65,198 Z"
            fill="url(#photo-vignette)"
          />
          {/* Gold frame border */}
          <path
            d="M65,198 L65,142 Q65,82 90,79 Q115,82 115,142 L115,198 Q115,206 90,208 Q65,206 65,198 Z"
            fill="none"
            stroke="#d8bd7f"
            strokeWidth="2"
          />

          {/* === WINDSHIELD (top glass) — keep as glass over photo top === */}
          <path
            d="M68,140 L68,105 Q68,84 90,82 Q112,84 112,105 L112,140 Z"
            fill="#2a3a4a"
            opacity="0.2"
          />
          {/* windshield glare */}
          <path
            d="M72,100 Q84,85 90,84"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* === REAR WINDOW (bottom glass) === */}
          <path
            d="M68,195 L68,170 L112,170 L112,195 Q112,205 90,207 Q68,205 68,195 Z"
            fill="#2a3a4a"
            opacity="0.15"
          />

          {/* === HOOD (front) === */}
          <path
            d="M65,88 Q65,55 90,50 Q115,55 115,88"
            fill="#d4cca8"
            stroke="#c8b87a"
            strokeWidth="1"
          />
          {/* Hood center line */}
          <line x1="90" y1="52" x2="90" y2="88" stroke="#c0b080" strokeWidth="1" opacity="0.6" />

          {/* === FRONT BUMPER === */}
          <rect x="60" y="48" width="60" height="9" rx="4" fill="#c8b87a" />
          {/* Headlights */}
          <ellipse cx="70" cy="52" rx="7" ry="4" fill="#fef3c7" opacity="0.9" />
          <ellipse cx="110" cy="52" rx="7" ry="4" fill="#fef3c7" opacity="0.9" />

          {/* === SIDE MIRRORS === */}
          <path d="M52,115 L42,110 L42,125 L52,122 Z" fill="#d4cca8" stroke="#c8b87a" strokeWidth="1" />
          <path d="M128,115 L138,110 L138,125 L128,122 Z" fill="#d4cca8" stroke="#c8b87a" strokeWidth="1" />

          {/* === WHEELS (4) === */}
          {/* Front-left */}
          <ellipse cx="52" cy="100" rx="14" ry="10" fill="#2d2926" />
          <ellipse cx="52" cy="100" rx="9" ry="6" fill="#4a4035" />
          <ellipse cx="52" cy="100" rx="4" ry="3" fill="#b3892f" />
          {/* Front-right */}
          <ellipse cx="128" cy="100" rx="14" ry="10" fill="#2d2926" />
          <ellipse cx="128" cy="100" rx="9" ry="6" fill="#4a4035" />
          <ellipse cx="128" cy="100" rx="4" ry="3" fill="#b3892f" />
          {/* Rear-left */}
          <ellipse cx="52" cy="225" rx="14" ry="10" fill="#2d2926" />
          <ellipse cx="52" cy="225" rx="9" ry="6" fill="#4a4035" />
          <ellipse cx="52" cy="225" rx="4" ry="3" fill="#b3892f" />
          {/* Rear-right */}
          <ellipse cx="128" cy="225" rx="14" ry="10" fill="#2d2926" />
          <ellipse cx="128" cy="225" rx="9" ry="6" fill="#4a4035" />
          <ellipse cx="128" cy="225" rx="4" ry="3" fill="#b3892f" />

          {/* === ROSE BOUQUET ON TRUNK === */}
          <g transform="translate(90, 238)">
            {/* leaves */}
            <ellipse cx="-18" cy="4" rx="8" ry="4" fill="#4a7c59" transform="rotate(-30 -18 4)" opacity="0.85" />
            <ellipse cx="18" cy="4" rx="8" ry="4" fill="#4a7c59" transform="rotate(30 18 4)" opacity="0.85" />
            <ellipse cx="0" cy="-2" rx="5" ry="9" fill="#3d6b4a" transform="rotate(0 0 -2)" opacity="0.8" />

            {/* roses cluster */}
            <circle cx="-10" cy="-2" r="9" fill="#8b2635" />
            <circle cx="10" cy="-2" r="9" fill="#9b3040" />
            <circle cx="0" cy="-8" r="9" fill="#a83848" />
            <circle cx="-5" cy="4" r="7" fill="#8b2635" opacity="0.9" />
            <circle cx="5" cy="4" r="7" fill="#9b3040" opacity="0.9" />

            {/* petal details */}
            <circle cx="-10" cy="-2" r="5" fill="#c04060" opacity="0.5" />
            <circle cx="10" cy="-2" r="5" fill="#c04060" opacity="0.5" />
            <circle cx="0" cy="-8" r="5" fill="#c04060" opacity="0.5" />

            {/* White ribbon bow */}
            <path d="M-14,8 Q-7,14 0,12 Q7,14 14,8" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="-10" cy="9" rx="5" ry="4" fill="white" opacity="0.9" transform="rotate(-20 -10 9)" />
            <ellipse cx="10" cy="9" rx="5" ry="4" fill="white" opacity="0.9" transform="rotate(20 10 9)" />
            <circle cx="0" cy="12" r="3" fill="white" />
            {/* ribbon tails */}
            <path d="M-3,12 Q-8,18 -12,22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3,12 Q8,18 12,22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* === CHROME DETAILS === */}
          {/* Grille lines */}
          <line x1="72" y1="51" x2="82" y2="51" stroke="#e0d080" strokeWidth="1.5" opacity="0.8" />
          <line x1="86" y1="51" x2="94" y2="51" stroke="#e0d080" strokeWidth="1.5" opacity="0.8" />
          <line x1="98" y1="51" x2="108" y2="51" stroke="#e0d080" strokeWidth="1.5" opacity="0.8" />
          {/* Hood ornament */}
          <circle cx="90" cy="49" r="3" fill="#b3892f" />
          <circle cx="90" cy="49" r="1.5" fill="#ffd700" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
