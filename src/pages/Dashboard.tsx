
import { Users, Calendar, CheckSquare, Folder } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentAnnouncements from '@/components/dashboard/RecentAnnouncements';
import UpcomingMeetings from '@/components/dashboard/UpcomingMeetings';
import RecentTasks from '@/components/dashboard/RecentTasks';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to your office hub!</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Employees" 
          value="124" 
          icon={Users} 
          trend={{ value: 4, isPositive: true }} 
        />
        <StatCard 
          title="Room Bookings" 
          value="28" 
          icon={Calendar} 
          trend={{ value: 12, isPositive: true }} 
        />
        <StatCard 
          title="Active Tasks" 
          value="42" 
          icon={CheckSquare} 
          trend={{ value: 8, isPositive: false }} 
        />
        <StatCard 
          title="Documents" 
          value="357" 
          icon={Folder} 
          trend={{ value: 24, isPositive: true }} 
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
        <div className="lg:col-span-2">
          <RecentAnnouncements />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <UpcomingMeetings />
        <RecentTasks />
      </div>
    </div>
  );
};

export default Dashboard;
