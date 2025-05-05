
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete Q2 financial report",
    assignee: "You",
    dueDate: "May 7",
    priority: "high",
    completed: false
  },
  {
    id: 2,
    title: "Review marketing materials",
    assignee: "You",
    dueDate: "May 8",
    priority: "medium",
    completed: false
  },
  {
    id: 3,
    title: "Update employee handbook",
    assignee: "Mark Wilson",
    dueDate: "May 12",
    priority: "low",
    completed: false
  },
  {
    id: 4,
    title: "Schedule team building event",
    assignee: "You",
    dueDate: "May 15",
    priority: "medium",
    completed: false
  }
];

const RecentTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Your recent tasks and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className={cn(task.completed && "opacity-60")}>
                <TableCell>
                  <Checkbox 
                    checked={task.completed} 
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                  />
                </TableCell>
                <TableCell className={cn("font-medium", task.completed && "line-through")}>
                  {task.title}
                </TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(task.priority)} variant="outline">
                    {task.priority}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTasks;
