import { useApp } from "../context/AppContext";

export function Stats() {
  const { tasks, habits, focusSessions } = useApp();

  /* ===== TASK STATS ===== */

  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  const favoriteTasks = tasks.filter(t => t.favorite).length;

  const workTasks = tasks.filter(t => t.category === "Work").length;
  const studyTasks = tasks.filter(t => t.category === "Study").length;
  const personalTasks = tasks.filter(t => t.category === "Personal").length;

  /* ===== HABITS ===== */

  const habitsCompletedToday = habits.filter(h => h.completedToday).length;

  /* ===== FOCUS ===== */

  const totalFocusMinutes = focusSessions.reduce(
    (acc, s) => acc + s.duration,
    0
  );

  /* ===== UI ===== */

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Statistics</h1>
      <p className="text-gray-500">
        Track your productivity and progress.
      </p>

      {/* ===== TOP CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Completion Rate</p>
          <p className="text-2xl font-bold">{completionRate}%</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Tasks Completed</p>
          <p className="text-2xl font-bold">{completedTasks}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Active Habits</p>
          <p className="text-2xl font-bold">{habits.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Focus Time (min)</p>
          <p className="text-2xl font-bold">{totalFocusMinutes}</p>
        </div>

      </div>

      {/* ===== TASK BREAKDOWN ===== */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="font-semibold">Tasks by Category</h2>

        <p>Personal: {personalTasks}</p>
        <p>Work: {workTasks}</p>
        <p>Study: {studyTasks}</p>
      </div>

      {/* ===== EXTRA STATS ===== */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="font-semibold">Extra Stats</h2>

        <p>Pending Tasks: {pendingTasks}</p>
        <p>Favorite Tasks: {favoriteTasks}</p>
        <p>
          Habits Today: {habitsCompletedToday} / {habits.length}
        </p>
      </div>
    </div>
  );
}