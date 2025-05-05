
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface Announcement {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Company All-Hands Meeting",
    author: "Sarah Thompson",
    date: "May 3, 2025",
    content: "Our quarterly all-hands meeting will be held next Friday at 3:00 PM in the main conference room. All employees are required to attend."
  },
  {
    id: 2,
    title: "New Health Benefits Package",
    author: "HR Department",
    date: "April 28, 2025",
    content: "We're excited to announce our enhanced health benefits package. Details have been sent to your email."
  },
  {
    id: 3,
    title: "Office Closure - Memorial Day",
    author: "Office Management",
    date: "April 25, 2025",
    content: "The office will be closed on Monday, May 26 in observance of Memorial Day. Normal operations will resume on Tuesday."
  }
];

const RecentAnnouncements = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Announcements</CardTitle>
        <CardDescription>Latest updates from the organization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="border-b pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-sm">{announcement.title}</h4>
              <span className="text-xs text-muted-foreground">{announcement.date}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{announcement.content}</p>
            <p className="text-xs font-medium">Posted by: {announcement.author}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentAnnouncements;
