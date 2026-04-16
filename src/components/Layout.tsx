import { ReactNode } from "react";

type Tab = "dashboard" | "tasks" | "habits" | "focus" | "stats";

export function Layout({
  children,
  tab,
  setTab,
}: {
  children: ReactNode;
  tab: Tab;
  setTab: (tab: Tab) => void;
}) {
  const tabs: Tab[] = ["dashboard", "tasks", "habits", "focus", "stats"];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-4 flex flex-col gap-2">
        <h1 className="text-xl font-bold mb-4">Smart Manager</h1>

        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-left px-3 py-2 rounded transition ${
              tab === t
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}