import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Flame, CheckCircle2, Plus } from "lucide-react";

export function Habits() {
  const { habits, addHabit, completeHabit } = useApp();
  const [text, setText] = useState("");

  const totalDays = 30;

  const completedTodayCount = habits.filter(
    (h) => h.completedToday
  ).length;

  const completionRate =
    habits.length === 0
      ? 0
      : Math.round((completedTodayCount / habits.length) * 100);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">Habits</h1>
        <p className="text-gray-600 text-lg">
          Build healthy routines and track your progress.
        </p>
      </div>

      {/* ADD */}
      <div className="bg-white p-6 rounded-2xl border flex gap-3">
        <input
          className="flex-1 border rounded-xl px-4 py-3"
          placeholder="New habit..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={() => {
            if (!text.trim()) return;
            addHabit(text);
            setText("");
          }}
          className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-gray-500 text-sm">Day Streak</p>
          <p className="text-3xl font-bold">
            {habits.reduce((acc, h) => acc + h.streak, 0)}
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-gray-500 text-sm">Total Days</p>
          <p className="text-3xl font-bold">{totalDays}</p>
        </div>

      </div>

      {/* PROGRESS */}
      <div className="bg-white border rounded-2xl p-6 space-y-3">

        <p className="text-sm text-gray-500">
          30-day completion rate
        </p>

        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-black h-3 rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          />
        </div>

        <p className="text-sm font-medium">
          {completionRate}%
        </p>

        {completedTodayCount === habits.length && habits.length > 0 ? (
          <p className="text-green-600 font-medium flex items-center gap-2">
            <CheckCircle2 size={18} />
            Completed today! Keep up the great work!
          </p>
        ) : (
          <p className="text-gray-500 text-sm">
            Keep going! You're building consistency.
          </p>
        )}

      </div>

      {/* LIST */}
      <div className="grid gap-3">

        {habits.map((h) => (
          <div
            key={h.id}
            className="bg-white border rounded-2xl p-5 flex justify-between items-center hover:shadow-sm transition"
          >

            <div className="flex items-center gap-3">

              <Flame className="text-orange-500" />

              <div>
                <p className="text-lg font-semibold">{h.title}</p>
                <p className="text-sm text-gray-500">
                  Streak: {h.streak}
                </p>
              </div>

            </div>

            {/* TOGGLE CHECKBOX */}
            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                checked={h.completedToday}
                onChange={() => completeHabit(h.id)}
                className="w-5 h-5 accent-black cursor-pointer"
              />

              <span className="text-sm text-gray-600">
                Done
              </span>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}