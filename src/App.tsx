import { useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Habits } from "./pages/Habits";
import { FocusMode } from "./pages/FocusMode";

type Tab = "dashboard" | "tasks" | "habits" | "focus";

export function App() {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAV */}
      <div className="flex gap-2 p-4 border-b bg-white flex-wrap">
        {["dashboard", "tasks", "habits", "focus"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as Tab)}
            className={`px-4 py-2 rounded ${
              tab === t ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {tab === "dashboard" && <Dashboard />}
        {tab === "tasks" && <Tasks />}
        {tab === "habits" && <Habits />}
        {tab === "focus" && <FocusMode />}
      </div>
    </div>
  );
}