import { useState } from "react";
import { Layout } from "./components/Layout";

import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Habits } from "./pages/Habits";
import { FocusMode } from "./pages/FocusMode";
import { Stats } from "./pages/Stats";

type Tab = "dashboard" | "tasks" | "habits" | "focus" | "stats";

export function App() {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <Layout tab={tab} setTab={setTab}>
      {tab === "dashboard" && <Dashboard />}
      {tab === "tasks" && <Tasks />}
      {tab === "habits" && <Habits />}
      {tab === "focus" && <FocusMode />}
      {tab === "stats" && <Stats />}
    </Layout>
  );
}