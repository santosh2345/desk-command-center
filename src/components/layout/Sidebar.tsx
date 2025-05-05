
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  Calendar, 
  Inbox, 
  CheckSquare, 
  Settings,
  Folder,
  X
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: Calendar, label: 'Room Booking', path: '/room-booking' },
    { icon: Inbox, label: 'Announcements', path: '/announcements' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Folder, label: 'Documents', path: '/documents' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-30 h-screen bg-slate-800 text-white transition-all duration-300 pt-16",
        isOpen 
          ? isMobile 
            ? "w-60 translate-x-0" 
            : "w-60" 
          : isMobile 
            ? "-translate-x-full" 
            : "w-20",
      )}
    >
      {/* Mobile close button */}
      {isMobile && isOpen && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 text-white hover:bg-slate-700"
          onClick={toggleSidebar}
        >
          <X className="h-5 w-5" />
        </Button>
      )}
      
      <nav className="flex flex-col p-3 h-full">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex items-center rounded-md py-2 px-3 mb-1 transition-colors",
              location.pathname === item.path 
                ? "bg-slate-700 text-white" 
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            )}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {(isOpen || isMobile) && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
