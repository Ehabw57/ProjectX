import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-gray-300 min-h-screen">
      <Outlet />
    </div>
  );
}
