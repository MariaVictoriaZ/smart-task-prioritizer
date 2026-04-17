import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { Play, Pause, Square, Brain, Coffee } from "lucide-react";


export function FocusMode() {
  const { addFocusSession } = useApp();

  const [minutes] = useState(25);
  const [seconds, setSeconds] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          addFocusSession(minutes);
          return minutes * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const reset = () => {
    setIsRunning(false);
    setSeconds(minutes * 60);
    clearInterval(intervalRef.current!);
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-[#030213]">
          Focus Mode
        </h1>
        <p className="text-gray-600 text-lg">
          Stay focused with the Pomodoro technique.
        </p>
      </div>

      {/* TIMER CARD */}
      <div className="bg-white border rounded-2xl p-10 flex flex-col items-center justify-center gap-6 shadow-sm">

        {/* TIMER */}
        <div className="text-6xl font-bold text-[#030213] tracking-wider">
          {formatTime(seconds)}
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full max-w-xs bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#030213] transition-all"
            style={{
              width: `${(seconds / (minutes * 60)) * 100}%`,
            }}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">

          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="bg-[#030213] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition"
            >
              <Play size={18} />
              Start
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="bg-gray-100 text-[#030213] px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition"
            >
              <Pause size={18} />
              Pause
            </button>
          )}

          <button
            onClick={reset}
            className="bg-gray-100 text-[#030213] px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition"
          >
            <Square size={18} />
            Reset
          </button>

        </div>
      </div>

      {/* INFO CARDS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-2 mb-2">
            <Brain className="text-[#030213]" size={18} />
            <h2 className="font-semibold text-lg text-[#030213]">
              Focus Session
            </h2>
          </div>

          <p className="text-gray-600">
            Work on a single task for 25 minutes without distractions.
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-2 mb-2">
            <Coffee className="text-[#030213]" size={18} />
            <h2 className="font-semibold text-lg text-[#030213]">
              Break Time
            </h2>
          </div>

          <p className="text-gray-600">
            Take a 5-minute break to recharge and refresh your mind.
          </p>
        </div>

      </div>
    </div>
  );
}