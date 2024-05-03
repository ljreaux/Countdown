import { useEffect, useState } from "react";

export default function useCountdown(date = Date.now()) {
  const [countdown, setCountdown] = useState({});
  const [timesUp, setTimesUp] = useState(false);
  useEffect(() => {
    function createCountdown() {
      const endDate = new Date(date).getTime();
      const now = Date.now();
      const time = endDate - now;
      const until = {
        days: Math.floor(time / (1000 * 60 * 60 * 24)),
        hours: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((time % (1000 * 60)) / 1000),
      };
      if (time > 0) {
        setCountdown(until);
      } else {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        setTimesUp(true);
      }
    }

    setInterval(createCountdown, "1000");

    return () => {
      clearInterval(createCountdown);
    };
  }, []);
  return { timesUp, countdown };
}
