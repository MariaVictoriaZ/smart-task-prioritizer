import { useApp } from "../context/AppContext";
import {
  CheckCircle2,
  Flame,
  ListTodo,
  Star,
  Activity,
} from "lucide-react";

export function Stats() {
  const { tasks, habits, focusSessions } = useApp();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const favoriteTasks = tasks.filter((t) => t.favorite).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const activeHabits = habits.length;
  const habitsToday = habits.filter((h) => h.completedToday).length;

  const totalFocus = focusSessions.length;

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">Statistics</h1>
        <p className="text-gray-600 text-lg">
          Track your productivity and progress.
        </p>
      </div>

      {/* TOP METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <Card
          title="Tasks Completed"
          value={completedTasks}
          icon={<CheckCircle2 size={22} className="text-green-500" />}
        />

        <Card
          title="Active Habits"
          value={activeHabits}
          icon={<Flame size={22} className="text-orange-500" />}
        />

        <Card
          title="Focus Sessions"
          value={totalFocus}
          icon={<Activity size={22} className="text-purple-500" />}
        />

        <Card
          title="Favorites"
          value={favoriteTasks}
          icon={<Star size={22} className="text-yellow-500 fill-yellow-500" />}
        />

      </div>

      {/* PROGRESS SECTION */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* TASK PROGRESS */}
        <div className="bg-white border rounded-2xl p-8 space-y-4 shadow-sm">

          <h2 className="font-semibold text-lg flex items-center gap-2">
            <ListTodo size={18} className="text-[#030213]" />
            Task Completion
          </h2>

          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-black h-3 rounded-full transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <p className="text-gray-600">
            {completedTasks} / {totalTasks} completed
          </p>

        </div>

        {/* HABITS PROGRESS */}
        <div className="bg-white border rounded-2xl p-8 space-y-4 shadow-sm">

          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Flame size={18} className="text-orange-500" />
            Habits Today
          </h2>

          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-black h-3 rounded-full transition-all"
              style={{
                width:
                  activeHabits === 0
                    ? "0%"
                    : `${(habitsToday / activeHabits) * 100}%`,
              }}
            />
          </div>

          <p className="text-gray-600">
            {habitsToday} / {activeHabits} completed today
          </p>

        </div>

      </div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6">

        <Box title="Average Daily Tasks" value={completedTasks} />
        <Box title="Total Habit Days" value={habits.reduce((a, h) => a + h.streak, 0)} />
        <Box title="Focus Sessions" value={totalFocus} />

      </div>

    </div>
  );
}

/* ===== CARD ===== */

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-2xl p-8 hover:shadow-md transition">

      <div className="flex items-center gap-3 text-gray-500 text-sm">
        {icon}
        {title}
      </div>

      <p className="text-4xl font-bold mt-3">{value}</p>

    </div>
  );
}

/* ===== BOX ===== */

function Box({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white border rounded-2xl p-6 hover:shadow-sm transition">

      <p className="text-gray-500 text-sm">{title}</p>

      <p className="text-3xl font-bold mt-2">{value}</p>

    </div>
  );
}