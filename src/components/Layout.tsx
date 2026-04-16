import { Outlet } from 'react-router'
import { NavLink } from 'react-router'

export function Layout() {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      
      {/* Sidebar */}
      <aside className="w-64 border-r p-4 space-y-4">
        <h1 className="text-xl font-bold">Smart Task Manager</h1>

        <nav className="flex flex-col gap-2 text-sm">
          <NavLink to="/" className="hover:underline">Dashboard</NavLink>
          <NavLink to="/tasks" className="hover:underline">Tasks</NavLink>
          <NavLink to="/habits" className="hover:underline">Habits</NavLink>
          <NavLink to="/focus" className="hover:underline">Focus</NavLink>
          <NavLink to="/stats" className="hover:underline">Stats</NavLink>
          <NavLink to="/settings" className="hover:underline">Settings</NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  )
}