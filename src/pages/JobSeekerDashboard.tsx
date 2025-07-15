import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, FileText, Heart, Bell, Download, Edit, Briefcase, Code, Palette, Users, DollarSign, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+255 627 696 523',
    location: 'Dar es Salaam, Tanzania',
    title: 'Software Engineer',
    bio: 'Passionate software engineer with 5+ years of experience in web development.',
    skills: 'React, Node.js, TypeScript, Python'
  });

  const [editForm, setEditForm] = useState({ ...profile });

  const appliedJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'New York, NY',
      appliedDate: '2 days ago',
      status: 'under-review'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      appliedDate: '1 week ago',
      status: 'shortlisted'
    },
    {
      id: 3,
      title: 'React Developer',
      company: 'Digital Agency',
      location: 'Remote',
      appliedDate: '2 weeks ago',
      status: 'rejected'
    }
  ];

  const savedJobs = [
    {
      id: 4,
      title: 'Backend Developer',
      company: 'CloudTech',
      location: 'Austin, TX',
      salary: '$80,000 - $100,000'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'InfraCorp',
      location: 'Seattle, WA',
      salary: '$90,000 - $120,000'
    }
  ];

  const jobCategories = [
    { name: 'Technology', icon: Code, count: 45, color: 'bg-blue-100 text-blue-800' },
    { name: 'Design', icon: Palette, count: 23, color: 'bg-purple-100 text-purple-800' },
    { name: 'Marketing', icon: TrendingUp, count: 31, color: 'bg-green-100 text-green-800' },
    { name: 'Human Resources', icon: Users, count: 18, color: 'bg-orange-100 text-orange-800' },
    { name: 'Finance', icon: DollarSign, count: 15, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Sales', icon: Briefcase, count: 27, color: 'bg-pink-100 text-pink-800' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditProfile = () => {
    setProfile({ ...editForm });
    setIsEditDialogOpen(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleViewJobsByCategory = (categoryName: string) => {
    navigate(`/jobs?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Seeker Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your profile and track applications</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-gray-600">{profile.title}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Email:</span> {profile.email}</p>
                  <p><span className="font-medium">Phone:</span> {profile.phone}</p>
                  <p><span className="font-medium">Location:</span> {profile.location}</p>
                  {profile.bio && <p><span className="font-medium">Bio:</span> {profile.bio}</p>}
                  {profile.skills && <p><span className="font-medium">Skills:</span> {profile.skills}</p>}
                </div>

                <div className="space-y-2">
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="text-right">
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            id="title"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="bio" className="text-right">
                            Bio
                          </Label>
                          <Input
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="skills" className="text-right">
                            Skills
                          </Label>
                          <Input
                            id="skills"
                            value={editForm.skills}
                            onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleEditProfile}>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button className="w-full" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload CV
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Alerts */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Job Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get notified about new jobs matching your preferences
                </p>
                <Button className="w-full">
                  Manage Alerts
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Browse Jobs by Category</CardTitle>
                <CardDescription>
                  Explore job opportunities in different fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <div
                        key={category.name}
                        onClick={() => handleViewJobsByCategory(category.name)}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <IconComponent className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                          <Badge className={category.color}>
                            {category.count} jobs
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Click to view available positions
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Applied Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Applied Jobs</CardTitle>
                <CardDescription>
                  Track the status of your job applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appliedJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                          <p className="text-sm text-gray-500">{job.location}</p>
                          <p className="text-sm text-gray-500 mt-2">Applied {job.appliedDate}</p>
                        </div>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Saved Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Saved Jobs
                </CardTitle>
                <CardDescription>
                  Jobs you've bookmarked for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                          <p className="text-sm text-gray-500">{job.location}</p>
                          <p className="text-sm font-medium text-blue-600 mt-2">{job.salary}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button size="sm">
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;