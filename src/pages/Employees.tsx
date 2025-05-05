
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mail, Phone } from 'lucide-react';
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
import AddEmployeeDialog from '@/components/employees/AddEmployeeDialog';
import EmployeeDetailsDialog, { Employee } from '@/components/employees/EmployeeDetailsDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialEmployeesData: Employee[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    phone: '(555) 123-4567',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'active',
    location: 'New York, NY',
    joinDate: '2022-04-15',
    manager: 'Sarah Williams',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'GraphQL'],
    projects: [
      {
        name: 'Customer Portal Redesign',
        role: 'Lead Developer',
        startDate: '2024-01-10',
        status: 'active'
      },
      {
        name: 'Data Analytics Dashboard',
        role: 'Frontend Developer',
        startDate: '2023-08-15',
        endDate: '2023-12-20',
        status: 'completed'
      }
    ]
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah.w@company.com',
    phone: '(555) 234-5678',
    department: 'Marketing',
    position: 'Marketing Manager',
    status: 'remote',
    location: 'Chicago, IL',
    joinDate: '2021-07-20',
    manager: 'James Wilson',
    skills: ['Marketing Strategy', 'Campaign Management', 'SEO', 'Content Creation'],
    projects: [
      {
        name: 'Q2 Marketing Campaign',
        role: 'Project Manager',
        startDate: '2025-04-01',
        status: 'active'
      }
    ]
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.b@company.com',
    phone: '(555) 345-6789',
    department: 'Sales',
    position: 'Sales Representative',
    status: 'active',
    location: 'Los Angeles, CA',
    joinDate: '2023-01-10',
    manager: 'Olivia Martin',
    skills: ['Negotiation', 'Client Relations', 'CRM Software', 'Sales Strategy'],
    projects: [
      {
        name: 'Enterprise Client Acquisition',
        role: 'Sales Lead',
        startDate: '2024-02-15',
        status: 'active'
      }
    ]
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.d@company.com',
    phone: '(555) 456-7890',
    department: 'Human Resources',
    position: 'HR Specialist',
    status: 'on leave',
    location: 'Seattle, WA',
    joinDate: '2022-09-05',
    manager: 'James Wilson',
    skills: ['Recruiting', 'Employee Relations', 'Benefits Administration', 'Onboarding'],
    projects: [
      {
        name: 'Employee Handbook Update',
        role: 'Project Owner',
        startDate: '2024-03-01',
        endDate: '2025-07-10',
        status: 'on hold'
      }
    ]
  },
  {
    id: 5,
    name: 'James Wilson',
    email: 'james.w@company.com',
    phone: '(555) 567-8901',
    department: 'Finance',
    position: 'Financial Analyst',
    status: 'active',
    location: 'Boston, MA',
    joinDate: '2021-03-15',
    manager: 'Sophia Clark',
    skills: ['Financial Modeling', 'Data Analysis', 'Forecasting', 'Excel'],
    projects: [
      {
        name: 'Annual Budget Planning',
        role: 'Finance Lead',
        startDate: '2024-10-01',
        status: 'active'
      }
    ]
  },
  {
    id: 6,
    name: 'Olivia Martin',
    email: 'olivia.m@company.com',
    phone: '(555) 678-9012',
    department: 'Design',
    position: 'UX Designer',
    status: 'remote',
    location: 'San Francisco, CA',
    joinDate: '2022-11-08',
    manager: 'Sarah Williams',
    skills: ['UI/UX Design', 'Wireframing', 'User Research', 'Figma', 'Adobe XD'],
    projects: [
      {
        name: 'Mobile App Redesign',
        role: 'Lead Designer',
        startDate: '2024-05-01',
        status: 'active'
      }
    ]
  },
  {
    id: 7,
    name: 'William Lee',
    email: 'william.l@company.com',
    phone: '(555) 789-0123',
    department: 'Engineering',
    position: 'Frontend Developer',
    status: 'active',
    location: 'Austin, TX',
    joinDate: '2023-02-20',
    manager: 'Alex Johnson',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Vue.js', 'Tailwind CSS'],
    projects: [
      {
        name: 'Customer Portal Redesign',
        role: 'Frontend Developer',
        startDate: '2024-01-10',
        status: 'active'
      }
    ]
  },
  {
    id: 8,
    name: 'Sophia Clark',
    email: 'sophia.c@company.com',
    phone: '(555) 890-1234',
    department: 'Product Management',
    position: 'Product Manager',
    status: 'active',
    location: 'Denver, CO',
    joinDate: '2021-10-12',
    manager: 'James Wilson',
    skills: ['Product Strategy', 'Agile Methodology', 'User Stories', 'Roadmap Planning'],
    projects: [
      {
        name: 'New Product Launch',
        role: 'Product Owner',
        startDate: '2024-03-15',
        status: 'active'
      }
    ]
  }
];

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [employees, setEmployees] = useState<Employee[]>(initialEmployeesData);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredEmployees = employees.filter(employee => {
    // Search filter
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Department filter
    const matchesDepartment = departmentFilter === 'all' || 
      employee.department === departmentFilter;
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || 
      employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

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

  const handleEmployeeAdded = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  const handleOpenDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailsOpen(true);
  };

  // Get unique departments for the filter
  const departments = ['all', ...new Set(employees.map(emp => emp.department))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground mt-1">Manage your company's employees</p>
        </div>
        <AddEmployeeDialog onEmployeeAdded={handleEmployeeAdded} />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-col sm:flex-row">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.filter(dept => dept !== 'all').map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on leave">On Leave</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow 
                    key={employee.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleOpenDetails(employee)}
                  >
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
                          <div className="text-sm text-muted-foreground hidden sm:block">{employee.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{employee.department}</TableCell>
                    <TableCell className="hidden md:table-cell">{employee.position}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(employee.status)} variant="outline">
                        {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${employee.email}`;
                        }}>
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `tel:${employee.phone}`;
                        }}>
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
      
      <EmployeeDetailsDialog 
        employee={selectedEmployee}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </div>
  );
};

export default Employees;
