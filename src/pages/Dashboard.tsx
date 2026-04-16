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
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here's your productivity overview.
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat title="Total Tasks" value={totalTasks} />
        <Stat title="Completed" value={completedTasks} />
        <Stat title="Pending" value={pendingTasks} />
        <Stat title="Favorites" value={favoriteTasks} />
      </div>

      {/* PROGRESS + SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* PROGRESS */}
        <div className="bg-white p-6 rounded-xl shadow space-y-3">
          <h2 className="font-semibold text-lg">Progress</h2>

          <p className="text-sm text-gray-500">Completion Rate</p>

          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className="bg-black h-3 rounded-full transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <p className="text-sm font-medium">{completionRate}% completed</p>
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow space-y-2">
          <h2 className="font-semibold text-lg">Summary</h2>

          <p className="text-gray-600">Tasks Done: {completedTasks}</p>
          <p className="text-gray-600">Tasks Left: {pendingTasks}</p>
          <p className="text-gray-600">Focus Sessions: {totalFocusSessions}</p>
        </div>

      </div>

      {/* HABITS + EXTRA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Stat title="Active Habits" value={activeHabits} />
        <Stat title="Habits Today" value={habitsDoneToday} />
        <Stat title="Focus Sessions" value={totalFocusSessions} />

      </div>

    </div>
  );
}

/* ===== STAT CARD ===== */

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}