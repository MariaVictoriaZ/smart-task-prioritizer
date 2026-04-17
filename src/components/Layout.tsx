import { ReactNode } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Flame,
  Timer,
  BarChart3,
} from "lucide-react";

type Tab =
  | "dashboard"
  | "tasks"
  | "habits"
  | "focus"
  | "stats";

type Props = {
  tab: Tab;
  setTab: (tab: Tab) => void;
  children: ReactNode;
};

export function Layout({ tab, setTab, children }: Props) {
  const menu: {
    key: Tab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      key: "tasks",
      label: "Tasks",
      icon: <CheckSquare size={20} />,
    },
    {
      key: "habits",
      label: "Habits",
      icon: <Flame size={20} />,
    },
    {
      key: "focus",
      label: "Focus",
      icon: <Timer size={20} />,
    },
    {
      key: "stats",
      label: "Stats",
      icon: <BarChart3 size={20} />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-white">

      {/* SIDEBAR */}
      <aside className="w-72 border-r bg-white p-5">
        <h1 className="text-3xl font-bold mb-8">
          FocusFlow
        </h1>

        <nav className="space-y-2">
          {menu.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center gap-3 px-5 py-4 text-base rounded-xl transition text-left ${
                tab === item.key
                  ? "bg-black text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}
              <span className="capitalize">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto p-6 lg:p-10">
          {children}
        </div>
      </main>

    </div>
  );
}