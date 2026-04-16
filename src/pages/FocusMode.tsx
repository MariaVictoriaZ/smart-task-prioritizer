import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

export function FocusMode() {
  const { addFocusSession } = useApp();

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = window.setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsRunning(false);
            addFocusSession(25);
            setMinutes(25);
            setSeconds(0);
            return;
          }

          setMinutes((m) => m - 1);
          setSeconds(59);
        } else {
          setSeconds((s) => s - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  const format = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Focus Mode</h1>

      <div className="text-5xl font-bold">
        {format(minutes)}:{format(seconds)}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Start
        </button>

        <button
          onClick={() => setIsRunning(false)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Pause
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setMinutes(25);
            setSeconds(0);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <p className="text-gray-500">
        Focus 25 minutes → saves session automatically
      </p>
    </div>
  );
}