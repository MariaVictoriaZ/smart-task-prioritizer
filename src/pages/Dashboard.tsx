import { useApp } from "../context/AppContext";

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
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">
        Welcome back! Here's your productivity overview.
      </h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat title="Total Tasks" value={totalTasks} />
        <Stat title="Completed" value={completedTasks} />
        <Stat title="Pending" value={pendingTasks} />
        <Stat title="Favorites" value={favoriteTasks} />
      </div>

      {/* PROGRESS */}
      <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <h2 className="font-semibold">Progress</h2>
        <p className="text-sm text-gray-500">Completion Rate</p>

        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-black h-3 rounded-full"
            style={{ width: `${completionRate}%` }}
          />
        </div>

        <p className="text-sm">{completionRate}%</p>
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat title="Active Habits" value={activeHabits} />
        <Stat title="Habits Done Today" value={habitsDoneToday} />
        <Stat title="Focus Sessions" value={totalFocusSessions} />
      </div>

      {/* BREAKDOWN */}
      <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <h2 className="font-semibold">Summary</h2>

        <p>Tasks Done: {completedTasks}</p>
        <p>Tasks Left: {pendingTasks}</p>
        <p>Habits Active: {activeHabits}</p>
        <p>Focus Sessions: {totalFocusSessions}</p>
      </div>
    </div>
  );
}

/* ===== SMALL COMPONENT ===== */

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}