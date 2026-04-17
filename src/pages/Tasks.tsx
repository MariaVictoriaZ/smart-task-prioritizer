import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Star,
  Trash2,
  CheckCircle2,
  Circle,
  Plus,
} from "lucide-react";

type Filter = "all" | "active" | "completed" | "favorites";
type Category = "Personal" | "Work" | "Study";

export function Tasks() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    toggleFavorite,
  } = useApp();

  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [category, setCategory] = useState<Category>("Personal");

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      if (filter === "favorites") return t.favorite;
      return true;
    });
  }, [tasks, filter]);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">Tasks</h1>
        <p className="text-gray-600 text-lg">
          Manage your tasks and stay organized.
        </p>
      </div>

      {/* ADD TASK */}
      <div className="bg-white p-6 rounded-2xl border flex flex-col md:flex-row gap-3">

        <input
          className="flex-1 border rounded-xl px-4 py-3"
          placeholder="Enter task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          className="border rounded-xl px-3 py-3"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as Category)
          }
        >
          <option>Personal</option>
          <option>Work</option>
          <option>Study</option>
        </select>

        <button
          onClick={() => {
            if (!text.trim()) return;
            addTask(text, category);
            setText("");
          }}
          className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2">

        {(["all", "active", "completed", "favorites"] as Filter[]).map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl border text-sm capitalize ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          )
        )}

      </div>

      {/* TASK LIST */}
      <div className="grid gap-3">

        {filteredTasks.map((t) => (
          <div
            key={t.id}
            className="bg-white p-5 rounded-2xl border flex justify-between items-center hover:shadow-sm transition"
          >

            {/* LEFT */}
            <div className="flex items-center gap-3">

              <button onClick={() => toggleTask(t.id)}>
                {t.completed ? (
                  <CheckCircle2 className="text-green-500" />
                ) : (
                  <Circle className="text-gray-400" />
                )}
              </button>

              <div>
                <p className={`text-lg ${
                  t.completed ? "line-through text-gray-400" : ""
                }`}>
                  {t.title}
                </p>

                {/* CATEGORY BADGE */}
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium
                    ${
                      t.category === "Personal"
                        ? "bg-blue-100 text-blue-700"
                        : t.category === "Work"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }
                  `}
                >
                  {t.category}
                </span>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">

              <button onClick={() => toggleFavorite(t.id)}>
                <Star
                  size={20}
                  className={
                    t.favorite
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-400"
                  }
                />
              </button>

              <button onClick={() => deleteTask(t.id)}>
                <Trash2 size={18} className="text-red-500" />
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}