import { useApp } from "../context/AppContext";
import {
  CheckCircle2,
  Clock,
  Star,
  ListTodo,
  Flame,
  Activity,
} from "lucide-react";

export function Dashboard() {
  const { tasks, habits, focusSessions } = useApp();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const favoriteTasks = tasks.filter((t) => t.favorite).length;

  const activeHabits = habits.length;
  const habitsDoneToday = habits.filter((h) => h.completedToday).length;

  const totalFocusSessions = focusSessions.length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold pb-2">Dashboard</h1>
        <p className="text-gray-600 text-lg">
          Welcome back! Here's your productivity overview.
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <Stat
          title="Total Tasks"
          value={totalTasks}
          icon={<ListTodo size={18} />}
          color="bg-blue-50 text-blue-600"
        />

        <Stat
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle2 size={18} />}
          color="bg-green-50 text-green-600"
        />

        <Stat
          title="Pending"
          value={pendingTasks}
          icon={<Clock size={18} />}
          color="bg-yellow-50 text-yellow-600"
        />

        <Stat
          title="Favorites"
          value={favoriteTasks}
          icon={<Star size={18} />}
          color="bg-pink-50 text-pink-600"
        />
      </div>

      {/* PROGRESS + SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* PROGRESS */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Activity size={18} />
            Progress
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Completion Rate
          </p>

          <div className="w-full bg-gray-200 h-3 rounded-full mt-3">
            <div
              className="bg-black h-3 rounded-full transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <p className="text-sm font-medium mt-2">
            {completionRate}% completed
          </p>
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-xl border space-y-2">
          <h2 className="font-semibold text-lg">
            Summary
          </h2>

          <p className="text-gray-600">
            Tasks Done: {completedTasks}
          </p>
          <p className="text-gray-600">
            Tasks Left: {pendingTasks}
          </p>
          <p className="text-gray-600">
            Focus Sessions: {totalFocusSessions}
          </p>
        </div>

      </div>

      {/* HABITS + EXTRA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Stat
          title="Active Habits"
          value={activeHabits}
          icon={<Flame size={18} />}
          color="bg-orange-50 text-orange-600"
        />

        <Stat
          title="Habits Today"
          value={habitsDoneToday}
          icon={<CheckCircle2 size={18} />}
          color="bg-green-50 text-green-600"
        />

        <Stat
          title="Focus Sessions"
          value={totalFocusSessions}
          icon={<Activity size={18} />}
          color="bg-purple-50 text-purple-600"
        />

      </div>

    </div>
  );
}

/* ===== STAT CARD ===== */

function Stat({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="bg-white p-10 rounded-2xl border hover:shadow-md transition">

      <div className="flex items-center gap-2 text-sm text-gray-500">
        {icon && (
          <span className={`p-1 rounded-md ${color}`}>
            {icon}
          </span>
        )}
        {title}
      </div>

      <p className="text-4xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}