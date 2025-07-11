import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, Building2, TrendingUp, Check, X, Eye } from 'lucide-react';

const AdminPanel = () => {
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

  const handleApproveJob = (jobId: number) => {
    console.log('Approving job:', jobId);
  };

  const handleRejectJob = (jobId: number) => {
    console.log('Rejecting job:', jobId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage users, jobs, and platform statistics</p>
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