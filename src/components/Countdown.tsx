import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Data fixa de lançamento (altere aqui: AAAA, MÊS(0-11), DIA, HORA, MIN)
    const targetDate = new Date(2026, 5, 6, 0, 0, 0); // 06 Jun 2026 00:00

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="interactive flex flex-col items-center group"
        >
          <div className="gradient-border rounded-xl sm:rounded-2xl p-[1px] transition-all duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center transition-all duration-300 group-hover:bg-card/90">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text transition-transform duration-300 group-hover:scale-110">
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground mt-2 uppercase tracking-wider transition-all duration-300 group-hover:text-foreground/80">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
