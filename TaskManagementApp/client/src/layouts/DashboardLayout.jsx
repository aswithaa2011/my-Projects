import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-brand-bg font-sans">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
        <main className="flex-1 p-8 sm:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
