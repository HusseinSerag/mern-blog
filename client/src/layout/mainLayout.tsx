import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { FooterComponent } from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-700 dark:bg-[rgb(16,23,42)] dark:text-gray-200">
      <Header />
      <main className="flex h-full flex-1 dark:bg-gray-900">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
}
