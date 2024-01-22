import { useState, useEffect } from "react";
import Confetti from "react-dom-confetti";

export default function Countdown({ setTimesUp, timesUp }) {
  const [timeUntil, setTimeUntil] = useState({});
  const [confetti, setConfetti] = useState(false);

  function launchConfetti() {
    setConfetti(true);
    setInterval(() => setConfetti(false), "2000");
  }
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
    timesUp && clearInterval(createCountdown);
    timesUp && setInterval(launchConfetti, "3000");
    return () => {
      clearInterval(createCountdown);
      clearInterval(launchConfetti);
    };
  }, [timesUp]);
  const { days, hours, minutes, seconds } = timeUntil;
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };
  return (
    <>
      <div>
        <Confetti active={confetti} config={config}></Confetti>
        {!timesUp ? <h1>Countdown to Freedom</h1> : <h1>YOU'RE FREE</h1>}
        <div className="countdown">
          <span className={`${timesUp && "celebrate"}`}>
            <p>Days:</p>
            {days}
          </span>
          <span className={`${timesUp && "celebrate"}`}>
            <p>Hours:</p>
            {hours}
          </span>
          <span className={`${timesUp && "celebrate"}`}>
            <p>Minutes:</p>
            {minutes}
          </span>
          <span className={`${timesUp && "celebrate"}`}>
            <p>Seconds:</p>
            {seconds}
          </span>
        </div>
      </div>
    </>
  );
}
