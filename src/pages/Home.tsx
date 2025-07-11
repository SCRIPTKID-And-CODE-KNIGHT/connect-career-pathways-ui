
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Users, TrendingUp, ChevronRight, Star, Building2, Code, Palette, Heart, Wrench, GraduationCap, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const jobCategories = [
    { name: 'Technology', count: 1250, icon: Code, color: 'bg-blue-500' },
    { name: 'Design', count: 890, icon: Palette, color: 'bg-purple-500' },
    { name: 'Healthcare', count: 670, icon: Stethoscope, color: 'bg-green-500' },
    { name: 'Education', count: 540, icon: GraduationCap, color: 'bg-yellow-500' },
    { name: 'Engineering', count: 820, icon: Wrench, color: 'bg-red-500' },
    { name: 'Non-Profit', count: 340, icon: Heart, color: 'bg-pink-500' },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Vodacom Tanzania',
      location: 'Dar es Salaam, Tanzania',
      salary: 'TZS 12M - 18M',
      type: 'Full-time',
      posted: '2 days ago',
      logo: '📱',
      urgent: true,
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'Tigo Tanzania',
      location: 'Dar es Salaam, Tanzania',
      salary: 'TZS 9M - 13M',
      type: 'Full-time',
      posted: '1 day ago',
      logo: '🎨',
      urgent: false,
    },
    {
      id: 3,
      title: 'Marketing Manager',
      company: 'Azam Media',
      location: 'Dar es Salaam, Tanzania',
      salary: 'TZS 8M - 11M',
      type: 'Full-time',
      posted: '3 days ago',
      logo: '📺',
      urgent: false,
    },
  ];

  const stats = [
    { label: 'Active Jobs', value: '15,247', icon: Briefcase },
    { label: 'Companies', value: '2,847', icon: Building2 },
    { label: 'Job Seekers', value: '98,542', icon: Users },
    { label: 'Success Rate', value: '94%', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Dream Job
              <span className="block text-blue-200">Connect Your Future</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
              Discover thousands of job opportunities with all the information you need. 
              Your next career move starts here.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Job title, keywords, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-gray-900 border-gray-200"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="City, region, or remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 text-gray-900 border-gray-200"
                  />
                </div>
                <Button size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                  <Search className="w-5 h-5 mr-2" />
                  Search Jobs
                </Button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="text-blue-200">Popular searches:</span>
              {['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer'].map((term) => (
                <Badge key={term} variant="secondary" className="bg-blue-500 hover:bg-blue-400 text-white cursor-pointer">
                  {term}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore job opportunities across various industries and find the perfect match for your skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600">{category.count} jobs available</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Jobs
              </h2>
              <p className="text-xl text-gray-600">
                Hand-picked job opportunities from top companies
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/jobs">
                View All Jobs
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{job.logo}</div>
                      <div>
                        <CardTitle className="text-lg hover:text-blue-600 transition-colors">
                          {job.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {job.company}
                        </CardDescription>
                      </div>
                    </div>
                    {job.urgent && (
                      <Badge className="bg-red-100 text-red-700 border-red-200">
                        Urgent
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-green-600">{job.salary}</span>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{job.posted}</span>
                      <Button size="sm" asChild>
                        <Link to={`/jobs/${job.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through FEA CONNECT
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">
                Create Your Profile
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <Link to="/post-job">
                Post a Job
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
