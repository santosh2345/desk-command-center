
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { File, FileText, Folder, Plus, Search, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'ppt' | 'folder';
  size?: string;
  category: string;
  uploadedBy: {
    name: string;
    avatar?: string;
  };
  uploadedDate: string;
  lastModified: string;
  shared: boolean;
}

const documentsData: Document[] = [
  {
    id: 1,
    name: 'Company Policies',
    type: 'folder',
    category: 'HR',
    uploadedBy: {
      name: 'Emma Davis'
    },
    uploadedDate: '2025-04-15',
    lastModified: '2025-05-01',
    shared: true
  },
  {
    id: 2,
    name: 'Q1 Financial Report.pdf',
    type: 'pdf',
    size: '2.4 MB',
    category: 'Finance',
    uploadedBy: {
      name: 'James Wilson'
    },
    uploadedDate: '2025-04-10',
    lastModified: '2025-04-10',
    shared: true
  },
  {
    id: 3,
    name: 'Project Roadmap.ppt',
    type: 'ppt',
    size: '4.8 MB',
    category: 'Projects',
    uploadedBy: {
      name: 'Sophia Clark'
    },
    uploadedDate: '2025-05-05',
    lastModified: '2025-05-05',
    shared: false
  },
  {
    id: 4,
    name: 'Client Contacts.xls',
    type: 'xls',
    size: '1.2 MB',
    category: 'Sales',
    uploadedBy: {
      name: 'Michael Brown'
    },
    uploadedDate: '2025-04-20',
    lastModified: '2025-05-02',
    shared: true
  },
  {
    id: 5,
    name: 'Employee Handbook.doc',
    type: 'doc',
    size: '3.5 MB',
    category: 'HR',
    uploadedBy: {
      name: 'Sarah Williams'
    },
    uploadedDate: '2025-03-15',
    lastModified: '2025-04-28',
    shared: true
  },
  {
    id: 6,
    name: 'Marketing Materials',
    type: 'folder',
    category: 'Marketing',
    uploadedBy: {
      name: 'Olivia Martin'
    },
    uploadedDate: '2025-04-25',
    lastModified: '2025-05-03',
    shared: false
  }
];

const Documents = () => {
  const [documents] = useState<Document[]>(documentsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    name: '',
    type: 'pdf',
    category: 'General',
    shared: false
  });

  const filteredDocuments = documents.filter(document => 
    document.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    document.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    document.uploadedBy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return <Folder className="h-9 w-9 text-blue-500" />;
      case 'pdf':
        return <FileText className="h-9 w-9 text-red-500" />;
      case 'doc':
        return <FileText className="h-9 w-9 text-blue-600" />;
      case 'xls':
        return <FileText className="h-9 w-9 text-green-600" />;
      case 'ppt':
        return <FileText className="h-9 w-9 text-orange-500" />;
      default:
        return <File className="h-9 w-9 text-gray-500" />;
    }
  };

  const handleUploadDocument = () => {
    toast({
      title: "Document uploaded",
      description: "Your document has been uploaded successfully.",
    });
    setIsDialogOpen(false);
    setNewDocument({
      name: '',
      type: 'pdf',
      category: 'General',
      shared: false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground mt-1">Manage and access company documents</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Upload className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload a new document to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <Input id="file" type="file" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={newDocument.name} 
                  onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                  placeholder="Enter document name" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newDocument.category} 
                    onValueChange={(value) => setNewDocument({...newDocument, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Projects">Projects</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 items-center">
                  <Label htmlFor="shared">Sharing</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="shared"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/80"
                      checked={newDocument.shared}
                      onChange={(e) => setNewDocument({...newDocument, shared: e.target.checked})}
                    />
                    <label htmlFor="shared" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Share with everyone
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
                onClick={handleUploadDocument}
                disabled={!newDocument.name}
              >
                Upload
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
              placeholder="Search documents..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>
            
            {['all', 'folders', 'files'].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground border-b">
                    <div className="col-span-5 md:col-span-4">Name</div>
                    <div className="col-span-3 hidden md:block">Category</div>
                    <div className="col-span-3 hidden md:block">Uploaded By</div>
                    <div className="col-span-4 md:col-span-2">Last Modified</div>
                  </div>
                  <div>
                    {filteredDocuments
                      .filter(doc => {
                        if (tab === 'all') return true;
                        if (tab === 'folders') return doc.type === 'folder';
                        if (tab === 'files') return doc.type !== 'folder';
                        return true;
                      })
                      .map((doc) => (
                        <div 
                          key={doc.id} 
                          className="grid grid-cols-12 p-4 items-center text-sm border-b hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                            {getFileIcon(doc.type)}
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              {doc.size && <p className="text-xs text-muted-foreground">{doc.size}</p>}
                            </div>
                          </div>
                          <div className="col-span-3 hidden md:block">
                            <Badge variant="outline">{doc.category}</Badge>
                          </div>
                          <div className="col-span-3 hidden md:flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={doc.uploadedBy.avatar} />
                              <AvatarFallback>
                                {doc.uploadedBy.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span>{doc.uploadedBy.name}</span>
                          </div>
                          <div className="col-span-4 md:col-span-2 text-muted-foreground">
                            {new Date(doc.lastModified).toLocaleDateString()}
                          </div>
                          <div className="col-span-3 hidden md:block">
                            {doc.shared && <Badge variant="secondary">Shared</Badge>}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;
