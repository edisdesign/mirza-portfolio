import { useEffect, useState } from 'react';

export function AnimatedStat({ value, suffix = "", label }: { value: number, suffix?: string, label: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let duration = 1200;
    let increment = end / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div className="flex flex-col items-center">
      <span className="text-[#c9a96e] font-['Outfit'] text-[32px] md:text-[40px] font-bold">
        {count}{suffix}
      </span>
      <span className="text-[#8a8580] font-['Outfit'] text-[14px] mt-2 text-center">
        {label}
      </span>
    </div>
  );
}
