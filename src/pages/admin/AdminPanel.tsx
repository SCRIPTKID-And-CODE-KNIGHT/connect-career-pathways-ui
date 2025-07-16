import React, { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const AdminPanel = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalEmployers: 0,
    activeJobs: 0
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    salary_range: '',
    job_type: '',
    description: '',
    requirements: '',
    application_method: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch jobs
      const { data: jobsData } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (jobsData) setJobs(jobsData);

      // Fetch users and profiles
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (profilesData) setRecentUsers(profilesData);

      // Calculate stats
      const { count: totalUsersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: totalJobsCount } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true });

      const { count: activeJobsCount } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      const { count: employersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'employer');

      setStats({
        totalUsers: totalUsersCount || 0,
        totalJobs: totalJobsCount || 0,
        activeJobs: activeJobsCount || 0,
        totalEmployers: employersCount || 0
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

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

  const handleCreateJob = async () => {
    try {
      const { error } = await supabase
        .from('jobs')
        .insert([{
          ...jobForm,
          created_by: user?.id
        }]);

      if (error) throw error;

      toast({
        title: "Job Created",
        description: "New job posting has been created successfully.",
      });
      
      setJobForm({
        title: '',
        company: '',
        location: '',
        salary_range: '',
        job_type: '',
        description: '',
        requirements: '',
        application_method: ''
      });
      setIsJobDialogOpen(false);
      fetchDashboardData(); // Refresh data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job posting.",
        variant: "destructive",
      });
    }
  };

  const handleEditJob = (job: any) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      company: job.company,
      location: job.location,
      salary_range: job.salary_range || '',
      job_type: job.job_type || '',
      description: job.description,
      requirements: job.requirements,
      application_method: job.application_method || ''
    });
    setIsJobDialogOpen(true);
  };

  const handleUpdateJob = async () => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update(jobForm)
        .eq('id', editingJob.id);

      if (error) throw error;

      toast({
        title: "Job Updated",
        description: "Job posting has been updated successfully.",
      });
      
      setJobForm({
        title: '',
        company: '',
        location: '',
        salary_range: '',
        job_type: '',
        description: '',
        requirements: '',
        application_method: ''
      });
      setEditingJob(null);
      setIsJobDialogOpen(false);
      fetchDashboardData(); // Refresh data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job posting.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) throw error;

      toast({
        title: "Job Deleted",
        description: "Job posting has been removed.",
        variant: "destructive",
      });
      
      fetchDashboardData(); // Refresh data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job posting.",
        variant: "destructive",
      });
    }
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
                  salary_range: '',
                  job_type: '',
                  description: '',
                  requirements: '',
                  application_method: ''
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
                  <Input
                    placeholder="e.g., TZS 5,000,000 - 8,000,000"
                    value={jobForm.salary_range}
                    onChange={(e) => setJobForm({ ...jobForm, salary_range: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Type</Label>
                  <Select value={jobForm.job_type} onValueChange={(value) => setJobForm({ ...jobForm, job_type: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Application Method</Label>
                  <Input
                    placeholder="e.g., Send CV to hr@company.com"
                    value={jobForm.application_method}
                    onChange={(e) => setJobForm({ ...jobForm, application_method: e.target.value })}
                    className="col-span-3"
                  />
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
                {jobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{job.title}</h3>
                        <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                      <p className="text-sm text-gray-600">{job.job_type}</p>
                      <p className="text-xs text-gray-500">
                        {job.salary_range || 'Salary not specified'}
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
                {jobs.filter(job => job.status === 'inactive').length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No pending jobs to review</p>
                ) : (
                  jobs.filter(job => job.status === 'inactive').map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <p className="text-xs text-gray-500">Posted {new Date(job.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditJob(job)}
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
                  ))
                )}
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
                      <h3 className="font-semibold">{user.full_name || 'No name'}</h3>
                      <p className="text-sm text-gray-600">{user.user_id}</p>
                      <p className="text-xs text-gray-500">Joined {new Date(user.created_at).toLocaleDateString()}</p>
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