import Countdown from "./components/Countdown";
import { useState } from "react";

export default function App() {
  const [timesUp, setTimesUp] = useState(false);
  return (
    <div className="App">
      <Countdown setTimesUp={setTimesUp} timesUp={timesUp}></Countdown>
    </div>
  );
}
