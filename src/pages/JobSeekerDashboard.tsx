import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, FileText, Heart, Bell, Download, Edit } from 'lucide-react';

const JobSeekerDashboard = () => {
  const profile = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    title: 'Software Engineer'
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                </div>

                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
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