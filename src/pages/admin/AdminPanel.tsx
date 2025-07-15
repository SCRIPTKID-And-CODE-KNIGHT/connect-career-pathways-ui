import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Briefcase, Building2, TrendingUp, Check, X, Eye, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const { toast } = useToast();
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    type: '',
    category: '',
    description: '',
    requirements: '',
    urgent: false
  });

  const stats = {
    totalUsers: 1248,
    totalJobs: 156,
    totalEmployers: 89,
    activeJobs: 134
  };

  const pendingJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      posted: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'StartupXYZ',
      posted: '5 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Design Studio',
      posted: '1 day ago',
      status: 'pending'
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'jobseeker',
      joined: '2 days ago'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@company.com',
      role: 'employer',
      joined: '3 days ago'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'jobseeker',
      joined: '5 days ago'
    }
  ];

  const allJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Vodacom Tanzania',
      location: 'Dar es Salaam, Tanzania',
      salaryMin: 12000000,
      salaryMax: 18000000,
      type: 'Full-time',
      category: 'Technology',
      description: 'Join our team of innovative engineers building the next generation of telecommunications products.',
      requirements: 'React, Node.js, TypeScript, 5+ years experience',
      urgent: true,
      status: 'active'
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'Tigo Tanzania',
      location: 'Dar es Salaam, Tanzania',
      salaryMin: 9000000,
      salaryMax: 13000000,
      type: 'Full-time',
      category: 'Design',
      description: 'Create beautiful and intuitive user experiences for our digital products.',
      requirements: 'Figma, Adobe Creative Suite, User Research, 3+ years experience',
      urgent: false,
      status: 'active'
    }
  ];

  const handleApproveJob = (jobId: number) => {
    toast({
      title: "Job Approved",
      description: "The job posting has been approved and is now live.",
    });
  };

  const handleRejectJob = (jobId: number) => {
    toast({
      title: "Job Rejected",
      description: "The job posting has been rejected.",
      variant: "destructive",
    });
  };

  const handleCreateJob = () => {
    console.log('Creating job:', jobForm);
    toast({
      title: "Job Created",
      description: "New job posting has been created successfully.",
    });
    setJobForm({
      title: '',
      company: '',
      location: '',
      salaryMin: '',
      salaryMax: '',
      type: '',
      category: '',
      description: '',
      requirements: '',
      urgent: false
    });
    setIsJobDialogOpen(false);
  };

  const handleEditJob = (job: any) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      company: job.company,
      location: job.location,
      salaryMin: job.salaryMin.toString(),
      salaryMax: job.salaryMax.toString(),
      type: job.type,
      category: job.category,
      description: job.description,
      requirements: job.requirements,
      urgent: job.urgent
    });
    setIsJobDialogOpen(true);
  };

  const handleUpdateJob = () => {
    console.log('Updating job:', editingJob.id, jobForm);
    toast({
      title: "Job Updated",
      description: "Job posting has been updated successfully.",
    });
    setJobForm({
      title: '',
      company: '',
      location: '',
      salaryMin: '',
      salaryMax: '',
      type: '',
      category: '',
      description: '',
      requirements: '',
      urgent: false
    });
    setEditingJob(null);
    setIsJobDialogOpen(false);
  };

  const handleDeleteJob = (jobId: number) => {
    console.log('Deleting job:', jobId);
    toast({
      title: "Job Deleted",
      description: "Job posting has been removed.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-2">Manage users, jobs, and platform statistics</p>
          </div>
          <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingJob(null);
                setJobForm({
                  title: '',
                  company: '',
                  location: '',
                  salaryMin: '',
                  salaryMax: '',
                  type: '',
                  category: '',
                  description: '',
                  requirements: '',
                  urgent: false
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingJob ? 'Edit Job' : 'Create New Job'}</DialogTitle>
                <DialogDescription>
                  {editingJob ? 'Update the job details below.' : 'Fill in the details to create a new job posting.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input
                    id="title"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">Company</Label>
                  <Input
                    id="company"
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input
                    id="location"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Salary Range</Label>
                  <div className="col-span-3 flex gap-2">
                    <Input
                      placeholder="Min (TZS)"
                      value={jobForm.salaryMin}
                      onChange={(e) => setJobForm({ ...jobForm, salaryMin: e.target.value })}
                    />
                    <Input
                      placeholder="Max (TZS)"
                      value={jobForm.salaryMax}
                      onChange={(e) => setJobForm({ ...jobForm, salaryMax: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Type</Label>
                  <Select value={jobForm.type} onValueChange={(value) => setJobForm({ ...jobForm, type: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Category</Label>
                  <Select value={jobForm.category} onValueChange={(value) => setJobForm({ ...jobForm, category: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Human Resources">Human Resources</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea
                    id="description"
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requirements" className="text-right">Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                    className="col-span-3"
                    rows={2}
                    placeholder="Comma-separated requirements"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={editingJob ? handleUpdateJob : handleCreateJob}
                >
                  {editingJob ? 'Update Job' : 'Create Job'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalJobs}</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employers</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEmployers}</div>
              <p className="text-xs text-muted-foreground">Active companies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+18%</div>
              <p className="text-xs text-muted-foreground">User growth this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Job Management</CardTitle>
              <CardDescription>
                Manage all job postings on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{job.title}</h3>
                        {job.urgent && (
                          <Badge className="bg-red-100 text-red-700">Urgent</Badge>
                        )}
                        <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                      <p className="text-sm text-gray-600">{job.category} • {job.type}</p>
                      <p className="text-xs text-gray-500">
                        TZS {(job.salaryMin / 1000000).toFixed(1)}M - {(job.salaryMax / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditJob(job)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Job Approvals</CardTitle>
              <CardDescription>
                Review and approve new job postings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <p className="text-xs text-gray-500">Posted {job.posted}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApproveJob(job.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApproveJob(job.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRejectJob(job.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>
                Latest user registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">Joined {user.joined}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={user.role === 'employer' ? 'default' : 'secondary'}
                      >
                        {user.role}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Center */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Send Notifications</CardTitle>
            <CardDescription>
              Send announcements to all users or specific groups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button>Send to All Users</Button>
              <Button variant="outline">Send to Job Seekers</Button>
              <Button variant="outline">Send to Employers</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;