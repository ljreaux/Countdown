import { useState, useEffect } from "react";

export default function Countdown({ setTimesUp }) {
  const [timeUntil, setTimeUntil] = useState({});

  function createCountdown() {
    const endDate = new Date("May 3, 2024 16:00:00").getTime();
    const now = new Date().getTime();
    const time = endDate - now;
    const until = {
      days: Math.floor(time / (1000 * 60 * 60 * 24)),
      hours: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((time % (1000 * 60)) / 1000),
    };
    if (time > 0) {
      setTimeUntil(until);
    } else {
      setTimeUntil({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      setTimesUp(true);
    }
  }
  useEffect(() => {
    setInterval(createCountdown, "1000");
    return () => {
      clearInterval(createCountdown);
    };
  }, []);
  const { days, hours, minutes, seconds } = timeUntil;
  return (
    <div>
      <h1>Countdown to Freedom</h1>
      <div className="countdown">
        <span>
          <p>Days:</p>
          {days}
        </span>
        <span>
          <p>Hours:</p>
          {hours}
        </span>
        <span>
          <p>Minutes:</p>
          {minutes}
        </span>
        <span>
          <p>Seconds:</p>
          {seconds}
        </span>
      </div>
    </div>
  );
}
