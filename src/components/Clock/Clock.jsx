import { useState, useEffect } from "react";
import "./Clock.css";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock-card">
      <h2>Current Time</h2>

      <h1 className="clock">
        {time.toLocaleTimeString()}
      </h1>

      <p>{time.toDateString()}</p>
    </div>
  );
}

export default Clock;