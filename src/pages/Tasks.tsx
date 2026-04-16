import { useState } from "react";
import { useApp } from "../context/AppContext";

type Filter = "all" | "active" | "completed" | "favorites";

export function Tasks() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    toggleFavorite,
    updateTask,
  } = useApp();

  const [text, setText] = useState("");
  const [category, setCategory] = useState<"Personal" | "Work" | "Study">(
    "Personal"
  );

  const [filter, setFilter] = useState<Filter>("all");

  const handleAdd = () => {
    if (!text.trim()) return;
    addTask(text, category);
    setText("");
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    if (filter === "favorites") return t.favorite;
    return true;
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Tasks</h1>

      {/* ADD TASK */}
      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task..."
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
        </select>

        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 flex-wrap">
        {["all", "active", "completed", "favorites"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as Filter)}
            className={`px-3 py-1 rounded border ${
              filter === f ? "bg-black text-white" : "bg-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {filteredTasks.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            toggleFavorite={toggleFavorite}
            updateTask={updateTask}
          />
        ))}
      </div>
    </div>
  );
}

/* ===== TASK ITEM ===== */

function TaskItem({
  task,
  toggleTask,
  deleteTask,
  toggleFavorite,
  updateTask,
}: any) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  return (
    <div className="flex justify-between border p-3 rounded items-center">
      <div className="flex gap-2 items-center w-full">
        <span
          onClick={() => toggleTask(task.id)}
          className="cursor-pointer"
        >
          {task.completed ? "✅" : "⬜"}
        </span>

        {editing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              updateTask(task.id, value);
              setEditing(false);
            }}
            className="border p-1 rounded w-full"
          />
        ) : (
          <span
            onDoubleClick={() => setEditing(true)}
            className={`flex-1 ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </span>
        )}

        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {task.category}
        </span>
      </div>

      <div className="flex gap-2">
        <button onClick={() => toggleFavorite(task.id)}>
          {task.favorite ? "⭐" : "☆"}
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}