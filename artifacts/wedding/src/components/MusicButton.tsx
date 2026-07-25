import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import song from '@assets/920547c449eeb9237a35045295fde8d9_20260723205315160_a01_1784853834443.mp3';

export function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(song);
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      onClick={toggle}
      className="fixed bottom-6 left-6 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      data-testid="button-music-toggle"
      title={isPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
    >
      <div className="flex gap-1 items-end h-6">
        <div
          className={`w-1 bg-white rounded-full ${isPlaying ? 'equalizer-bar' : 'h-3'}`}
          style={{ animationDelay: '0s' }}
        />
        <div
          className={`w-1 bg-white rounded-full ${isPlaying ? 'equalizer-bar' : 'h-4'}`}
          style={{ animationDelay: '0.2s' }}
        />
        <div
          className={`w-1 bg-white rounded-full ${isPlaying ? 'equalizer-bar' : 'h-2'}`}
          style={{ animationDelay: '0.4s' }}
        />
      </div>
    </motion.button>
  );
}
