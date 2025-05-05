
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Mail, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'on leave' | 'remote';
  avatar?: string;
}

const employeesData: Employee[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    phone: '(555) 123-4567',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'active'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah.w@company.com',
    phone: '(555) 234-5678',
    department: 'Marketing',
    position: 'Marketing Manager',
    status: 'remote'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.b@company.com',
    phone: '(555) 345-6789',
    department: 'Sales',
    position: 'Sales Representative',
    status: 'active'
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.d@company.com',
    phone: '(555) 456-7890',
    department: 'Human Resources',
    position: 'HR Specialist',
    status: 'on leave'
  },
  {
    id: 5,
    name: 'James Wilson',
    email: 'james.w@company.com',
    phone: '(555) 567-8901',
    department: 'Finance',
    position: 'Financial Analyst',
    status: 'active'
  },
  {
    id: 6,
    name: 'Olivia Martin',
    email: 'olivia.m@company.com',
    phone: '(555) 678-9012',
    department: 'Design',
    position: 'UX Designer',
    status: 'remote'
  },
  {
    id: 7,
    name: 'William Lee',
    email: 'william.l@company.com',
    phone: '(555) 789-0123',
    department: 'Engineering',
    position: 'Frontend Developer',
    status: 'active'
  },
  {
    id: 8,
    name: 'Sophia Clark',
    email: 'sophia.c@company.com',
    phone: '(555) 890-1234',
    department: 'Product Management',
    position: 'Product Manager',
    status: 'active'
  }
];

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees] = useState<Employee[]>(employeesData);

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'on leave':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'remote':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground">Manage your company's employees</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(employee.status)} variant="outline">
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
