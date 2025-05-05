
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    phone: '(555) 123-4567',
    jobTitle: 'Senior Developer',
    department: 'Engineering',
    notifications: {
      email: true,
      browser: true,
      mobileApp: false,
      weeklyDigest: true,
      mentions: true,
      directMessages: true,
      taskAssignments: true,
      announcements: false
    },
    appearance: {
      theme: 'light',
      sidebarCollapsed: true,
      compactView: false,
      fontSize: 'medium'
    }
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium">Profile Photo</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Upload</Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={userData.name} 
                    onChange={(e) => setUserData({...userData, name: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={userData.email} 
                    onChange={(e) => setUserData({...userData, email: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    value={userData.phone} 
                    onChange={(e) => setUserData({...userData, phone: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input 
                    id="jobTitle" 
                    value={userData.jobTitle} 
                    onChange={(e) => setUserData({...userData, jobTitle: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input 
                    id="department" 
                    value={userData.department} 
                    onChange={(e) => setUserData({...userData, department: e.target.value})} 
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Password</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notification Channels</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotif" className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      id="emailNotif" 
                      checked={userData.notifications.email}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, email: checked}
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="browserNotif" className="font-medium">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                    </div>
                    <Switch 
                      id="browserNotif" 
                      checked={userData.notifications.browser}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, browser: checked}
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mobileNotif" className="font-medium">Mobile App Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on your mobile device</p>
                    </div>
                    <Switch 
                      id="mobileNotif" 
                      checked={userData.notifications.mobileApp}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, mobileApp: checked}
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Notification Types</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                    <Switch 
                      id="weeklyDigest" 
                      checked={userData.notifications.weeklyDigest}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, weeklyDigest: checked}
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mentions">Mentions</Label>
                    <Switch 
                      id="mentions" 
                      checked={userData.notifications.mentions}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, mentions: checked}
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="directMessages">Direct Messages</Label>
                    <Switch 
                      id="directMessages" 
                      checked={userData.notifications.directMessages}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, directMessages: checked}
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="taskAssignments">Task Assignments</Label>
                    <Switch 
                      id="taskAssignments" 
                      checked={userData.notifications.taskAssignments}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, taskAssignments: checked}
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="announcements">Announcements</Label>
                    <Switch 
                      id="announcements" 
                      checked={userData.notifications.announcements}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, announcements: checked}
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveNotifications}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the appearance of the application to your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-md p-4 cursor-pointer flex flex-col items-center ${
                      userData.appearance.theme === 'light' ? 'border-primary bg-secondary/50' : ''
                    }`}
                    onClick={() => setUserData({
                      ...userData, 
                      appearance: {...userData.appearance, theme: 'light'}
                    })}
                  >
                    <div className="h-12 w-full bg-white border rounded-md mb-2"></div>
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  
                  <div 
                    className={`border rounded-md p-4 cursor-pointer flex flex-col items-center ${
                      userData.appearance.theme === 'dark' ? 'border-primary bg-secondary/50' : ''
                    }`}
                    onClick={() => setUserData({
                      ...userData, 
                      appearance: {...userData.appearance, theme: 'dark'}
                    })}
                  >
                    <div className="h-12 w-full bg-gray-800 border rounded-md mb-2"></div>
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                  
                  <div 
                    className={`border rounded-md p-4 cursor-pointer flex flex-col items-center ${
                      userData.appearance.theme === 'system' ? 'border-primary bg-secondary/50' : ''
                    }`}
                    onClick={() => setUserData({
                      ...userData, 
                      appearance: {...userData.appearance, theme: 'system'}
                    })}
                  >
                    <div className="h-12 w-full bg-gradient-to-r from-white to-gray-800 border rounded-md mb-2"></div>
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Layout</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sidebarCollapsed" className="font-medium">Collapsed Sidebar</Label>
                      <p className="text-sm text-muted-foreground">Keep the sidebar collapsed by default</p>
                    </div>
                    <Switch 
                      id="sidebarCollapsed" 
                      checked={userData.appearance.sidebarCollapsed}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          appearance: {...userData.appearance, sidebarCollapsed: checked}
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compactView" className="font-medium">Compact View</Label>
                      <p className="text-sm text-muted-foreground">Use a more compact layout with less spacing</p>
                    </div>
                    <Switch 
                      id="compactView" 
                      checked={userData.appearance.compactView}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          appearance: {...userData.appearance, compactView: checked}
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Text Size</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Small</span>
                      <span>Medium</span>
                      <span>Large</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant={userData.appearance.fontSize === 'small' ? 'default' : 'outline'} 
                        size="sm"
                        className="flex-1"
                        onClick={() => setUserData({
                          ...userData, 
                          appearance: {...userData.appearance, fontSize: 'small'}
                        })}
                      >
                        A
                      </Button>
                      <Button 
                        variant={userData.appearance.fontSize === 'medium' ? 'default' : 'outline'} 
                        size="sm"
                        className="flex-1"
                        onClick={() => setUserData({
                          ...userData, 
                          appearance: {...userData.appearance, fontSize: 'medium'}
                        })}
                      >
                        A
                      </Button>
                      <Button 
                        variant={userData.appearance.fontSize === 'large' ? 'default' : 'outline'} 
                        size="sm"
                        className="flex-1"
                        onClick={() => setUserData({
                          ...userData, 
                          appearance: {...userData.appearance, fontSize: 'large'}
                        })}
                      >
                        A
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveAppearance}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
