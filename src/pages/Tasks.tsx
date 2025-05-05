
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckSquare, Clock, Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: {
    name: string;
    avatar?: string;
  };
  progress: number;
}

const tasksData: Task[] = [
  {
    id: 1,
    title: 'Update company handbook',
    description: 'Review and update the company handbook with new policies and procedures.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2025-05-25',
    assignee: {
      name: 'Alex Johnson'
    },
    progress: 60
  },
  {
    id: 2,
    title: 'Prepare quarterly report',
    description: 'Compile financial and operational data for Q2 report.',
    status: 'todo',
    priority: 'high',
    dueDate: '2025-06-10',
    assignee: {
      name: 'Sarah Williams'
    },
    progress: 0
  },
  {
    id: 3,
    title: 'Schedule employee reviews',
    description: 'Coordinate with department managers to schedule annual employee performance reviews.',
    status: 'completed',
    priority: 'medium',
    dueDate: '2025-05-15',
    assignee: {
      name: 'Emma Davis'
    },
    progress: 100
  },
  {
    id: 4,
    title: 'Organize team building event',
    description: 'Plan a team building activity for the engineering department.',
    status: 'in-progress',
    priority: 'low',
    dueDate: '2025-06-15',
    assignee: {
      name: 'Michael Brown'
    },
    progress: 30
  },
  {
    id: 5,
    title: 'Update website content',
    description: 'Review and refresh content on the company website.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-06-05',
    assignee: {
      name: 'Olivia Martin'
    },
    progress: 0
  }
];

const Tasks = () => {
  const [tasks] = useState<Task[]>(tasksData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    progress: 0,
    assignee: {
      name: ''
    }
  });

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-200">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'todo':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">To Do</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleCreateTask = () => {
    toast({
      title: "Task created",
      description: "Your task has been created successfully.",
    });
    setIsDialogOpen(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      progress: 0,
      assignee: {
        name: ''
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage and track your tasks</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
              <DialogDescription>
                Add a new task to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={newTask.title} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newTask.description} 
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={newTask.priority} 
                    onValueChange={(value: 'low' | 'medium' | 'high') => setNewTask({...newTask, priority: value})}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newTask.status} 
                    onValueChange={(value: 'todo' | 'in-progress' | 'completed') => setNewTask({...newTask, status: value})}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input 
                    id="dueDate" 
                    type="date" 
                    value={newTask.dueDate} 
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Input 
                    id="assignee" 
                    value={newTask.assignee?.name} 
                    onChange={(e) => setNewTask({...newTask, assignee: {name: e.target.value}})}
                    placeholder="Enter assignee name" 
                  />
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
                onClick={handleCreateTask}
                disabled={!newTask.title || !newTask.assignee?.name || !newTask.dueDate}
              >
                Create
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
              placeholder="Search tasks..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="todo">To Do</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            {['all', 'todo', 'in-progress', 'completed'].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                {filteredTasks
                  .filter(task => tab === 'all' || task.status === tab)
                  .map((task) => (
                    <Card key={task.id}>
                      <CardHeader className="py-4 px-5">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg">{task.title}</CardTitle>
                              {getPriorityBadge(task.priority)}
                              {getStatusBadge(task.status)}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={task.assignee.avatar} />
                                <AvatarFallback>
                                  {task.assignee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{task.assignee.name}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                Due {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 md:min-w-[200px]">
                            <Progress value={task.progress} className="h-2" />
                            <span className="text-sm font-medium w-10 text-right">{task.progress}%</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2 px-5">
                        <p className="text-sm">{task.description}</p>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
