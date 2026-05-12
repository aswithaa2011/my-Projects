import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import DashboardLayout from "../layouts/DashboardLayout";

// ── Legacy lab/day pages (unchanged) ──────────────────────────
import HomePage from "../pages/HomePage";
import TasksPage from "../pages/TasksPage";
import LabsPage from "../pages/LabsPage";
import NotFoundPage from "../pages/NotFoundPage";
import DayPage from "../pages/DayPage";

import Day1Task1 from "../pages/Day1/Task1";
import Day1Task2 from "../pages/Day1/Task2";
import Day2Timer from "../pages/Day2/Timer";
import Day2FetchApi from "../pages/Day2/FetchApi";
import Day2TodoList from "../pages/Day2/TodoList";
import Day4CounterApp from "../pages/Day4/CounterApp";
import Day4Formhandling from "../pages/Day4/Formhandling";
import Day6FeedbackForm from "../pages/Day6/FeedbackForm";
import Day6SearchForm from "../pages/Day6/SearchForm";
import Day7LoginForm from "../pages/Day7/LoginForm";
import Day7LoginRegister from "../pages/Day7/LoginRegister";
import Day7EnhancedComponent from "../pages/Day7/HOC/EnhancedComponent";
import Day8Calculationusememo from "../pages/Day8/Calculationusememo";
import Day8Arrayofnumbers from "../pages/Day8/Arrayofnumbers";
import Day8FilterSearch from "../pages/Day8/FilterSearch";
import Day9Showdata from "../pages/Day9/Showdata";
import Day10CRUD from "../pages/Day10/CRUD";
import Day11ChangeText from "../pages/Day11/ChangeText";

// ── New full-stack pages ───────────────────────────────────────
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import WorkspaceDashboard from "../pages/WorkspaceDashboard";
import WorkspacePage from "../pages/WorkspacePage";
import WorkspaceDayPage from "../pages/WorkspaceDayPage";

// ── Guards ────────────────────────────────────────────────────

/** Redirects to /login if the user is not authenticated */
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-pink/30 border-t-brand-pink rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
}

/** Redirects logged-in users away from auth pages */
function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      
      {/* ── Auth routes (redirect to dashboard if already logged in) ── */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

      {/* ── New full-stack workspace routes (protected, standalone layout) ── */}
      <Route
        path="/dashboard"
        element={<PrivateRoute><WorkspaceDashboard /></PrivateRoute>}
      />
      <Route
        path="/workspace/:workspaceId"
        element={<PrivateRoute><WorkspacePage /></PrivateRoute>}
      />
      <Route
        path="/workspace/:workspaceId/day/:dayId"
        element={<PrivateRoute><WorkspaceDayPage /></PrivateRoute>}
      />

      {/* ── Legacy dashboard routes (DashboardLayout with sidebar) ── */}
      <Route element={<DashboardLayout />}>
        {/* We keep old dashboard under /legacy-home if someone wants to access it directly */}
        <Route path="/legacy-home" element={<HomePage />} />
        <Route path="day/:id" element={<DayPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="labs" element={<LabsPage />} />

        {/* Lab sub-routes */}
        <Route path="labs/day1/task1" element={<Day1Task1 />} />
        <Route path="labs/day1/task2" element={<Day1Task2 />} />
        <Route path="labs/day2/timer" element={<Day2Timer />} />
        <Route path="labs/day2/recipes" element={<Day2FetchApi />} />
        <Route path="labs/day2/todo" element={<Day2TodoList />} />
        <Route path="labs/day4/counter" element={<Day4CounterApp />} />
        <Route path="labs/day4/form" element={<Day4Formhandling />} />
        <Route path="labs/day6/feedback" element={<Day6FeedbackForm />} />
        <Route path="labs/day6/search" element={<Day6SearchForm />} />
        <Route path="labs/day7/login-form" element={<Day7LoginForm />} />
        <Route path="labs/day7/login-register" element={<Day7LoginRegister />} />
        <Route path="labs/day7/alert" element={<Day7EnhancedComponent />} />
        <Route path="labs/day8/sum" element={<Day8Calculationusememo />} />
        <Route path="labs/day8/sorting" element={<Day8Arrayofnumbers />} />
        <Route path="labs/day8/filter-name" element={<Day8FilterSearch />} />
        <Route path="labs/day9/hooks" element={<Day9Showdata />} />
        <Route path="labs/day10/crud" element={<Day10CRUD />} />
        <Route path="labs/day11/text-change" element={<Day11ChangeText />} />
      </Route>

      {/* ── Backward-compatible redirects (old URL patterns) ── */}
      <Route path="day1task1" element={<Navigate to="/labs/day1/task1" replace />} />
      <Route path="day1task2" element={<Navigate to="/labs/day1/task2" replace />} />
      <Route path="day2task1" element={<Navigate to="/labs/day2/timer" replace />} />
      <Route path="day2task2" element={<Navigate to="/labs/day2/recipes" replace />} />
      <Route path="day2task3" element={<Navigate to="/labs/day2/todo" replace />} />
      <Route path="day4task1" element={<Navigate to="/labs/day4/counter" replace />} />
      <Route path="day4task2" element={<Navigate to="/labs/day4/form" replace />} />
      <Route path="day6task1" element={<Navigate to="/labs/day6/feedback" replace />} />
      <Route path="day6task2" element={<Navigate to="/labs/day6/search" replace />} />
      <Route path="day7task1" element={<Navigate to="/labs/day7/login-form" replace />} />
      <Route path="loginpage" element={<Navigate to="/labs/day7/login-register" replace />} />
      <Route path="day7task2" element={<Navigate to="/labs/day7/alert" replace />} />
      <Route path="day8task1" element={<Navigate to="/labs/day8/sum" replace />} />
      <Route path="day8task2" element={<Navigate to="/labs/day8/sorting" replace />} />
      <Route path="day8task3" element={<Navigate to="/labs/day8/filter-name" replace />} />
      <Route path="day9task1" element={<Navigate to="/labs/day9/hooks" replace />} />
      <Route path="day10task1" element={<Navigate to="/labs/day10/crud" replace />} />
      <Route path="day11task1" element={<Navigate to="/labs/day11/text-change" replace />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
