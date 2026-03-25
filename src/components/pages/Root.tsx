import { Outlet } from 'react-router';
import { Navbar } from '../layout/Navbar';

export function Root() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f8] font-sans">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
