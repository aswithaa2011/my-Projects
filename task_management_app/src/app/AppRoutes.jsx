import { Navigate, Route, Routes } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import TasksPage from "../pages/TasksPage";
import LabsPage from "../pages/LabsPage";
import NotFoundPage from "../pages/NotFoundPage";

// Existing lab pages (kept, but routed under /labs/*)
import Day10Task1 from "../pages/Day10/Task1";
import Day10Task2 from "../pages/Day10/Task2";

import Day11Timer from "../pages/Day11/Timer";
import Day11FetchApi from "../pages/Day11/FetchApi";
import Day11TodoList from "../pages/Day11/TodoList";

import Day13CounterApp from "../pages/Day13/CounterApp";
import Day13Formhandling from "../pages/Day13/Formhandling";

import Day15FeedbackForm from "../pages/Day15/FeedbackForm";
import Day15SearchForm from "../pages/Day15/SearchForm";

import Day16LoginForm from "../pages/Day16/LoginForm";
import Day16LoginRegister from "../pages/Day16/LoginRegister";
import Day16EnhancedComponent from "../pages/Day16/HOC/EnhancedComponent";

import Day17Calculationusememo from "../pages/Day17/Calculationusememo";
import Day17Arrayofnumbers from "../pages/Day17/Arrayofnumbers";
import Day17FilterSearch from "../pages/Day17/FilterSearch";

import Day18Showdata from "../pages/Day18/Showdata";
import Day19CRUD from "../pages/Day19/CRUD";
import Day20ChangeText from "../pages/Day20/ChangeText";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="labs" element={<LabsPage />} />

        {/* Labs (new URL structure) */}
        <Route path="labs/day10/task1" element={<Day10Task1 />} />
        <Route path="labs/day10/task2" element={<Day10Task2 />} />

        <Route path="labs/day11/timer" element={<Day11Timer />} />
        <Route path="labs/day11/recipes" element={<Day11FetchApi />} />
        <Route path="labs/day11/todo" element={<Day11TodoList />} />

        <Route path="labs/day13/counter" element={<Day13CounterApp />} />
        <Route path="labs/day13/form" element={<Day13Formhandling />} />

        <Route path="labs/day15/feedback" element={<Day15FeedbackForm />} />
        <Route path="labs/day15/search" element={<Day15SearchForm />} />

        <Route path="labs/day16/login-form" element={<Day16LoginForm />} />
        <Route path="labs/day16/login-register" element={<Day16LoginRegister />} />
        <Route path="labs/day16/alert" element={<Day16EnhancedComponent />} />

        <Route path="labs/day17/sum" element={<Day17Calculationusememo />} />
        <Route path="labs/day17/sorting" element={<Day17Arrayofnumbers />} />
        <Route path="labs/day17/filter-name" element={<Day17FilterSearch />} />

        <Route path="labs/day18/hooks" element={<Day18Showdata />} />
        <Route path="labs/day19/crud" element={<Day19CRUD />} />
        <Route path="labs/day20/text-change" element={<Day20ChangeText />} />
      </Route>

      {/* Backward compatible redirects (old URLs) */}
      <Route path="day10task1" element={<Navigate to="/labs/day10/task1" replace />} />
      <Route path="day10task2" element={<Navigate to="/labs/day10/task2" replace />} />

      <Route path="day11task1" element={<Navigate to="/labs/day11/timer" replace />} />
      <Route path="day11task2" element={<Navigate to="/labs/day11/recipes" replace />} />
      <Route path="day11task3" element={<Navigate to="/labs/day11/todo" replace />} />

      <Route path="day13task1" element={<Navigate to="/labs/day13/counter" replace />} />
      <Route path="day13task2" element={<Navigate to="/labs/day13/form" replace />} />

      <Route path="day15task1" element={<Navigate to="/labs/day15/feedback" replace />} />
      <Route path="day15task2" element={<Navigate to="/labs/day15/search" replace />} />

      <Route path="day16task1" element={<Navigate to="/labs/day16/login-form" replace />} />
      <Route path="loginpage" element={<Navigate to="/labs/day16/login-register" replace />} />
      <Route path="day16task2" element={<Navigate to="/labs/day16/alert" replace />} />

      <Route path="day17task1" element={<Navigate to="/labs/day17/sum" replace />} />
      <Route path="day17task2" element={<Navigate to="/labs/day17/sorting" replace />} />
      <Route path="day17task3" element={<Navigate to="/labs/day17/filter-name" replace />} />

      <Route path="day18task1" element={<Navigate to="/labs/day18/hooks" replace />} />
      <Route path="day19task1" element={<Navigate to="/labs/day19/crud" replace />} />
      <Route path="day20task1" element={<Navigate to="/labs/day20/text-change" replace />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

