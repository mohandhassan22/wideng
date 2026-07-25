import { useState, useEffect, useRef } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    intervalRef.current = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [targetDate]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
      <TimeCard value={timeLeft.days} label="يوم" />
      <TimeCard value={timeLeft.hours} label="ساعة" />
      <TimeCard value={timeLeft.minutes} label="دقيقة" />
      <TimeCard value={timeLeft.seconds} label="ثانية" />
    </div>
  );
}

function TimeCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 text-center shadow-lg border border-primary/10">
      <div className="text-4xl md:text-6xl font-bold text-primary font-display mb-2">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-semibold tracking-wide">
        {label}
      </div>
    </div>
  );
}
