import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import Topbar from './Topbar';

export default function StudentLayout() {
  return (
    <div className="flex min-h-screen bg-[rgb(var(--background))]">
      <StudentSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
