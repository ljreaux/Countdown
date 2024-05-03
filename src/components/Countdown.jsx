import { useState, useEffect } from "react";
import useCountdown from "./useCountdown";
import Confetti from "react-dom-confetti";

export default function Countdown() {
  const { countdown, timesUp } = useCountdown("2024-05-03T16:00:00-05:00");

  const [confetti, setConfetti] = useState(false);
  useEffect(() => {
    function launchConfetti() {
      setConfetti(true);
      setInterval(() => setConfetti(false), "2000");
    }
    timesUp && setInterval(launchConfetti, "3000");
    return () => {
      clearInterval(launchConfetti);
    };
  }, [timesUp]);

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

  const display = Object.keys(countdown).map((key) => {
    const firstLetter = key.charAt(0).toUpperCase();
    const rest = key.substring(1);
    return (
      <span key={key} className={`${timesUp && "celebrate"}`}>
        <p>{`${firstLetter + rest}:`}</p>
        {countdown[key]}
      </span>
    );
  });

  return (
    <>
      <div>
        <Confetti active={confetti} config={config}></Confetti>
        {!timesUp ? <h1>Countdown to Freedom</h1> : <h1>{`YOU'RE FREE`}</h1>}
        <div className="countdown">{display}</div>
      </div>
    </>
  );
}
