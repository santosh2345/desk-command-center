
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Room {
  id: number;
  name: string;
  capacity: number;
  equipment: string[];
  image?: string;
}

interface Booking {
  id: number;
  roomId: number;
  title: string;
  startTime: string;
  endTime: string;
  bookedBy: string;
  attendees: number;
  date: Date;
}

const rooms: Room[] = [
  {
    id: 1,
    name: 'Conference Room A',
    capacity: 12,
    equipment: ['Projector', 'Whiteboard', 'Video conferencing'],
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Meeting Room 1',
    capacity: 6,
    equipment: ['TV Screen', 'Whiteboard'],
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Board Room',
    capacity: 20,
    equipment: ['Projector', 'Whiteboard', 'Video conferencing', 'Audio system'],
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Huddle Space 1',
    capacity: 4,
    equipment: ['TV Screen'],
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Huddle Space 2',
    capacity: 4,
    equipment: ['TV Screen'],
    image: '/placeholder.svg'
  },
];

const initialBookings: Booking[] = [
  {
    id: 1,
    roomId: 1,
    title: 'Weekly Team Sync',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    bookedBy: 'Alex Johnson',
    attendees: 8,
    date: new Date(2025, 4, 5)
  },
  {
    id: 2,
    roomId: 3,
    title: 'Quarterly Planning',
    startTime: '01:00 PM',
    endTime: '03:00 PM',
    bookedBy: 'Sarah Williams',
    attendees: 15,
    date: new Date(2025, 4, 5)
  },
  {
    id: 3,
    roomId: 2,
    title: 'Client Meeting',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    bookedBy: 'Michael Brown',
    attendees: 5,
    date: new Date(2025, 4, 6)
  }
];

const RoomBooking = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [bookings] = useState<Booking[]>(initialBookings);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredBookings = bookings.filter(
    booking => booking.date.toDateString() === date.toDateString()
  );

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleNewBooking = () => {
    setDialogOpen(false);
    // In a real app, this would save the booking data
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Room Booking</h1>
          <p className="text-muted-foreground">Schedule and manage meeting rooms</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Book a Room</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Book a Meeting Room</DialogTitle>
              <DialogDescription>
                Fill in the details to reserve a meeting room.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">
                  Room
                </Label>
                <Select 
                  value={selectedRoom} 
                  onValueChange={setSelectedRoom}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {room.name} (Capacity: {room.capacity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Meeting Title
                </Label>
                <Input id="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input 
                  id="date" 
                  type="date" 
                  className="col-span-3" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-time" className="text-right">
                  Start Time
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end-time" className="text-right">
                  End Time
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="attendees" className="text-right">
                  Attendees
                </Label>
                <Input 
                  id="attendees" 
                  type="number" 
                  min="1" 
                  defaultValue="2" 
                  className="col-span-3" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleNewBooking}>Book Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border"
            />

            <div className="mt-6">
              <h3 className="font-medium mb-2">Available Rooms:</h3>
              <div className="space-y-2">
                {rooms.map((room) => (
                  <div 
                    key={room.id} 
                    className="p-3 border rounded-md hover:bg-secondary cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{room.name}</div>
                      <div className="text-sm text-muted-foreground">Capacity: {room.capacity}</div>
                    </div>
                    <Badge variant="outline">{room.equipment.length} items</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="list">
              <TabsList className="mb-4">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="room">Room View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Bookings for {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
                
                {filteredBookings.length === 0 ? (
                  <p className="text-muted-foreground py-8 text-center">
                    No bookings for this date.
                  </p>
                ) : (
                  filteredBookings.map((booking) => {
                    const room = rooms.find(r => r.id === booking.roomId)!;
                    return (
                      <div key={booking.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{booking.title}</h3>
                            <p className="text-sm text-muted-foreground">{room.name}</p>
                          </div>
                          <Badge>{booking.startTime} - {booking.endTime}</Badge>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{booking.bookedBy.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{booking.bookedBy}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {booking.attendees} attendees
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </TabsContent>
              
              <TabsContent value="room">
                <div className="grid grid-cols-1 gap-4">
                  {rooms.map((room) => {
                    const roomBookings = filteredBookings.filter(b => b.roomId === room.id);
                    return (
                      <div key={room.id} className="border rounded-md p-4">
                        <h3 className="font-semibold mb-2">{room.name}</h3>
                        <div className="space-y-2">
                          {roomBookings.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Available all day</p>
                          ) : (
                            roomBookings.map((booking) => (
                              <div key={booking.id} className="bg-secondary p-2 rounded-md">
                                <div className="flex justify-between">
                                  <span className="font-medium">{booking.title}</span>
                                  <span className="text-sm">{booking.startTime} - {booking.endTime}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Booked by: {booking.bookedBy}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoomBooking;
