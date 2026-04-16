import { useState } from "react";
import { useApp } from "../context/AppContext";

export function Habits() {
  const { habits, addHabit, completeHabit, deleteHabit } = useApp();
  const [text, setText] = useState("");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Habits</h1>

      {/* ADD */}
      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full"
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
          className="bg-black text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {habits.map((h) => (
          <div
            key={h.id}
            className="flex justify-between border p-3 rounded items-center"
          >
            <div>
              <p className="font-semibold">{h.title}</p>
              <p className="text-sm text-gray-500">
                🔥 Streak: {h.streak}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => completeHabit(h.id)}
                className={`px-3 py-1 rounded text-white ${
                  h.completedToday ? "bg-gray-400" : "bg-green-500"
                }`}
              >
                {h.completedToday ? "Done" : "Complete"}
              </button>

              <button
                onClick={() => deleteHabit(h.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}