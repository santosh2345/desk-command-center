
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Employee } from './EmployeeDetailsDialog';

interface AddEmployeeDialogProps {
  onEmployeeAdded: (employee: Employee) => void;
}

const AddEmployeeDialog = ({ onEmployeeAdded }: AddEmployeeDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    status: 'active',
    location: '',
    joinDate: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewEmployee({ ...newEmployee, [id]: value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setNewEmployee({ ...newEmployee, [field]: value });
  };

  const handleSubmit = () => {
    // Simple validation
    if (!newEmployee.name || !newEmployee.email || !newEmployee.department || !newEmployee.position) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create new employee with ID
    const employee = {
      ...newEmployee,
      id: Date.now(), // Use timestamp as a simple ID
    } as Employee;

    onEmployeeAdded(employee);
    
    toast({
      title: "Employee added",
      description: "The employee has been added successfully.",
    });

    // Reset form and close dialog
    setNewEmployee({
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      status: 'active',
      location: '',
      joinDate: new Date().toISOString().split('T')[0],
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            Enter the details of the new employee.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
            <Input 
              id="name" 
              value={newEmployee.name} 
              onChange={handleInputChange} 
              placeholder="Enter full name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input 
                id="email" 
                type="email"
                value={newEmployee.email} 
                onChange={handleInputChange} 
                placeholder="Enter email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={newEmployee.phone} 
                onChange={handleInputChange} 
                placeholder="Enter phone number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
              <Select 
                value={newEmployee.department} 
                onValueChange={(value) => handleSelectChange('department', value)}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Product Management">Product Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">Position <span className="text-red-500">*</span></Label>
              <Input 
                id="position" 
                value={newEmployee.position} 
                onChange={handleInputChange} 
                placeholder="Enter position"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newEmployee.status} 
                onValueChange={(value: 'active' | 'on leave' | 'remote') => handleSelectChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on leave">On Leave</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="joinDate">Join Date</Label>
              <Input 
                id="joinDate" 
                type="date"
                value={newEmployee.joinDate} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={newEmployee.location} 
              onChange={handleInputChange} 
              placeholder="Enter location"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Employee
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
