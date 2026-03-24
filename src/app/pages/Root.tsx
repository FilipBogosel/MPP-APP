import { Outlet } from 'react-router';
import { Navbar } from '../../components/layout/Navbar';

export function Root() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
