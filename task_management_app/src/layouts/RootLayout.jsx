import { Outlet } from "react-router-dom";
import SiteNavbar from "../components/site/SiteNavbar";
import SiteFooter from "../components/site/SiteFooter";

export default function RootLayout() {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

