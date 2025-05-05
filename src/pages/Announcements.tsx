
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Announcement {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  important: boolean;
}

const announcementsData: Announcement[] = [
  {
    id: 1,
    title: 'Quarterly Company Meeting',
    content: 'Our Q2 company-wide meeting will be held on June 15th at 10 AM in the main conference room. All employees are required to attend.',
    category: 'General',
    date: '2025-06-01',
    author: 'Sarah Williams',
    important: true
  },
  {
    id: 2,
    title: 'New Health Benefits Package',
    content: 'We\'re excited to announce updates to our health benefits package starting next month. Check your email for details.',
    category: 'HR',
    date: '2025-05-28',
    author: 'Emma Davis',
    important: true
  },
  {
    id: 3,
    title: 'Office Closure - Memorial Day',
    content: 'The office will be closed on Monday, May 26th in observance of Memorial Day. Regular hours will resume on Tuesday.',
    category: 'General',
    date: '2025-05-20',
    author: 'Alex Johnson',
    important: false
  },
  {
    id: 4,
    title: 'IT System Maintenance',
    content: 'The IT department will perform system maintenance this Saturday from 10 PM to 2 AM. Some systems may be temporarily unavailable.',
    category: 'IT',
    date: '2025-05-15',
    author: 'William Lee',
    important: false
  },
  {
    id: 5,
    title: 'New Project Management Software',
    content: 'We\'re transitioning to a new project management platform next month. Training sessions will be scheduled soon.',
    category: 'IT',
    date: '2025-05-10',
    author: 'Michael Brown',
    important: true
  }
];

const Announcements = () => {
  const [announcements] = useState<Announcement[]>(announcementsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    category: 'General',
    important: false
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredAnnouncements = announcements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateAnnouncement = () => {
    toast({
      title: "Announcement created",
      description: "Your announcement has been created successfully.",
    });
    setIsDialogOpen(false);
    setNewAnnouncement({
      title: '',
      content: '',
      category: 'General',
      important: false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground mt-1">Company-wide announcements and updates</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
              <DialogDescription>
                Add a new announcement to share with the company.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={newAnnouncement.title} 
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  placeholder="Enter announcement title" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  value={newAnnouncement.content} 
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  placeholder="Enter announcement content"
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newAnnouncement.category} 
                    onValueChange={(value) => setNewAnnouncement({...newAnnouncement, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 items-center">
                  <Label htmlFor="important">Mark as Important</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="important"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/80"
                      checked={newAnnouncement.important}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, important: e.target.checked})}
                    />
                    <label htmlFor="important" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Important
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateAnnouncement}
                disabled={!newAnnouncement.title || !newAnnouncement.content}
              >
                Publish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="important" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                Important
              </TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredAnnouncements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader className="py-4 px-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          {announcement.important && (
                            <Badge variant="destructive" className="ml-2">Important</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{announcement.author}</span>
                          <span>•</span>
                          <span>{new Date(announcement.date).toLocaleDateString()}</span>
                          <Badge variant="outline">{announcement.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2 px-5">
                    <p className="text-sm">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="important" className="space-y-4">
              {filteredAnnouncements
                .filter(announcement => announcement.important)
                .map((announcement) => (
                  <Card key={announcement.id}>
                    <CardHeader className="py-4 px-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{announcement.title}</CardTitle>
                            <Badge variant="destructive" className="ml-2">Important</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <span>{announcement.author}</span>
                            <span>•</span>
                            <span>{new Date(announcement.date).toLocaleDateString()}</span>
                            <Badge variant="outline">{announcement.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 px-5">
                      <p className="text-sm">{announcement.content}</p>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4">
              {filteredAnnouncements
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 3)
                .map((announcement) => (
                  <Card key={announcement.id}>
                    <CardHeader className="py-4 px-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{announcement.title}</CardTitle>
                            {announcement.important && (
                              <Badge variant="destructive" className="ml-2">Important</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <span>{announcement.author}</span>
                            <span>•</span>
                            <span>{new Date(announcement.date).toLocaleDateString()}</span>
                            <Badge variant="outline">{announcement.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 px-5">
                      <p className="text-sm">{announcement.content}</p>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Announcements;
