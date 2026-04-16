import { createContext, useContext, useState, ReactNode } from "react";

/* ================= TYPES ================= */

type Task = {
  id: number;
  title: string;
  completed: boolean;
  favorite: boolean;
  category: "Personal" | "Work" | "Study";
};

type Habit = {
  id: number;
  title: string;
  streak: number;
  completedToday: boolean;
};

type FocusSession = {
  id: number;
  duration: number;
  date: string;
};

type AppContextType = {
  tasks: Task[];
  habits: Habit[];
  focusSessions: FocusSession[];

  addTask: (title: string, category: Task["category"]) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  toggleFavorite: (id: number) => void;
  updateTask: (id: number, title: string) => void;

  addHabit: (title: string) => void;
  completeHabit: (id: number) => void;
  deleteHabit: (id: number) => void;

  addFocusSession: (duration: number) => void;
};

/* ================= CONTEXT ================= */

const AppContext = createContext<AppContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export function AppProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([]);

/* -------- TASKS -------- */

  const addTask = (title: string, category: Task["category"]) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        completed: false,
        favorite: false,
        category,
      },
    ]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, favorite: !t.favorite } : t
      )
    );
  };

  const updateTask = (id: number, title: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title } : t
      )
    );
  };

/* -------- HABITS -------- */

  const addHabit = (title: string) => {
    setHabits([
      ...habits,
      {
        id: Date.now(),
        title,
        streak: 0,
        completedToday: false,
      },
    ]);
  };

  const completeHabit = (id: number) => {
    setHabits(
      habits.map((h) =>
        h.id === id
          ? {
              ...h,
              streak: h.streak + 1,
              completedToday: true,
            }
          : h
      )
    );
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

/* -------- FOCUS -------- */

  const addFocusSession = (duration: number) => {
    setFocusSessions([
      ...focusSessions,
      {
        id: Date.now(),
        duration,
        date: new Date().toISOString(),
      },
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        habits,
        focusSessions,

        addTask,
        toggleTask,
        deleteTask,
        toggleFavorite,
        updateTask,

        addHabit,
        completeHabit,
        deleteHabit,

        addFocusSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}