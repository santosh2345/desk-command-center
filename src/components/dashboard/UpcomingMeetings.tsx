
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Calendar, Clock, Users } from 'lucide-react';

interface Meeting {
  id: number;
  title: string;
  time: string;
  duration: string;
  room: string;
  attendees: number;
}

const meetings: Meeting[] = [
  {
    id: 1,
    title: "Product Development",
    time: "10:00 AM - 11:00 AM",
    duration: "1 hour",
    room: "Conference Room A",
    attendees: 8
  },
  {
    id: 2,
    title: "Marketing Strategy",
    time: "1:30 PM - 2:30 PM",
    duration: "1 hour",
    room: "Conference Room B",
    attendees: 5
  },
  {
    id: 3,
    title: "Client Presentation",
    time: "3:00 PM - 4:00 PM",
    duration: "1 hour",
    room: "Meeting Room 3",
    attendees: 4
  }
];

const UpcomingMeetings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Meetings</CardTitle>
        <CardDescription>Your schedule for today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="font-medium">{meeting.title}</h4>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{meeting.time}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{meeting.attendees} attendees</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{meeting.room}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingMeetings;
