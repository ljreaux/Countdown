import Countdown from "./components/Countdown";
import { useState } from "react";

export default function App() {
  const [timesUp, setTimesUp] = useState(false);
  return (
    <div className="App">
      {timesUp || <Countdown setTimesUp={setTimesUp}></Countdown>}
    </div>
  );
}
