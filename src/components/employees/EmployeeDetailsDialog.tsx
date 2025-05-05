
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Award, Calendar, User, Briefcase } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'on leave' | 'remote';
  avatar?: string;
  location?: string;
  joinDate?: string;
  manager?: string;
  skills?: string[];
  projects?: Array<{ 
    name: string; 
    role: string;
    startDate: string;
    endDate?: string;
    status: 'active' | 'completed' | 'on hold';
  }>;
}

interface EmployeeDetailsDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmployeeDetailsDialog = ({ employee, open, onOpenChange }: EmployeeDetailsDialogProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!employee) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'on leave':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'remote':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'completed':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'on hold':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
          <DialogDescription>
            Detailed information about the employee.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mt-2">
          <div className="flex flex-col items-center sm:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={employee.avatar} />
              <AvatarFallback className="text-xl">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold mt-2">{employee.name}</h2>
            <Badge 
              className={`mt-1 ${getStatusColor(employee.status)}`} 
              variant="outline"
            >
              {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
            </Badge>
          </div>
          
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>{employee.position}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{employee.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${employee.email}`} className="text-blue-600 hover:underline">
                {employee.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${employee.phone}`} className="hover:underline">
                {employee.phone}
              </a>
            </div>
            {employee.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{employee.location}</span>
              </div>
            )}
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Employee Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Joined:</span>
                    <span className="text-sm">{employee.joinDate || 'Not available'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Reports to:</span>
                    <span className="text-sm">{employee.manager || 'Not assigned'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <a href={`mailto:${employee.email}`} className="text-sm text-blue-600 hover:underline">
                      {employee.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Phone:</span>
                    <a href={`tel:${employee.phone}`} className="text-sm hover:underline">
                      {employee.phone}
                    </a>
                  </div>
                  
                  {employee.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="text-sm">{employee.location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Professional Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Position:</span>
                    <span className="text-sm">{employee.position}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Department:</span>
                    <span className="text-sm">{employee.department}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Project Assignments</h3>
                {employee.projects && employee.projects.length > 0 ? (
                  <div className="space-y-4">
                    {employee.projects.map((project, index) => (
                      <div key={index} className="border rounded-md p-4 hover:bg-muted/50">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <div>
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">{project.role}</p>
                          </div>
                          <Badge 
                            className={getStatusColor(project.status)} 
                            variant="outline"
                          >
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Duration: </span>
                          <span>
                            {project.startDate} - {project.endDate || 'Ongoing'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No project assignments found for this employee.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Skills & Expertise</h3>
                {employee.skills && employee.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No skills information available.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsDialog;
