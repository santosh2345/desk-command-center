
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, CheckSquare, Users, Folder } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const QuickActions = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `Action: ${action}`,
      description: "This feature will be implemented soon.",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Button 
          variant="outline" 
          className="flex flex-col h-24 items-center justify-center space-y-2"
          onClick={() => handleAction("Book Room")}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs">Book Room</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col h-24 items-center justify-center space-y-2"
          onClick={() => handleAction("Create Task")}
        >
          <CheckSquare className="h-5 w-5" />
          <span className="text-xs">Create Task</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col h-24 items-center justify-center space-y-2"
          onClick={() => handleAction("Add Employee")}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs">Add Employee</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col h-24 items-center justify-center space-y-2"
          onClick={() => handleAction("Upload Document")}
        >
          <Folder className="h-5 w-5" />
          <span className="text-xs">Upload Document</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
