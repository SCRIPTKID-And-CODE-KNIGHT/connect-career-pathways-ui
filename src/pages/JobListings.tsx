
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Filter, Grid, List, Clock, Briefcase, Building2, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const JobListings = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [salaryRange, setSalaryRange] = useState([0, 20000000]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl]);
    }
  }, [searchParams]);

  // Mock job data - Tanzania companies
  const allJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Vodacom Tanzania',
      location: 'Dar es Salaam, Tanzania',
      salary: { min: 12000000, max: 18000000 },
      type: 'Full-time',
      category: 'Technology',
      posted: new Date('2024-01-15'),
      logo: '📱',
      description: 'Join our team of innovative engineers building the next generation of telecommunications products.',
      requirements: ['React', 'Node.js', 'TypeScript', '5+ years experience'],
      urgent: true,
      remote: false,
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'Tigo Tanzania',
      location: 'Dar es Salaam, Tanzania',
      salary: { min: 9000000, max: 13000000 },
      type: 'Full-time',
      category: 'Design',
      posted: new Date('2024-01-14'),
      logo: '🎨',
      description: 'Create beautiful and intuitive user experiences for our digital products.',
      requirements: ['Figma', 'Adobe Creative Suite', 'User Research', '3+ years experience'],
      urgent: false,
      remote: true,
    },
    {
      id: 3,
      title: 'Marketing Manager',
      company: 'Azam Media',
      location: 'Dar es Salaam, Tanzania',
      salary: { min: 8000000, max: 11000000 },
      type: 'Full-time',
      category: 'Marketing',
      posted: new Date('2024-01-13'),
      logo: '📺',
      description: 'Lead our marketing efforts and drive growth across all channels.',
      requirements: ['Digital Marketing', 'Analytics', 'Campaign Management', '4+ years experience'],
      urgent: false,
      remote: false,
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'CRDB Bank',
      location: 'Dar es Salaam, Tanzania',
      salary: { min: 11000000, max: 16000000 },
      type: 'Full-time',
      category: 'Technology',
      posted: new Date('2024-01-12'),
      logo: '🏦',
      description: 'Analyze complex data sets to drive business insights and machine learning models for banking solutions.',
      requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics', '3+ years experience'],
      urgent: true,
      remote: false,
    },
    {
      id: 5,
      title: 'Frontend Developer',
      company: 'Selcom',
      location: 'Dar es Salaam, Tanzania',
      salary: { min: 7000000, max: 10000000 },
      type: 'Contract',
      category: 'Technology',
      posted: new Date('2024-01-11'),
      logo: '💳',
      description: 'Build responsive and interactive web applications for fintech solutions.',
      requirements: ['React', 'JavaScript', 'CSS', 'HTML', '2+ years experience'],
      urgent: false,
      remote: true,
    },
    {
      id: 6,
      title: 'HR Generalist',
      company: 'Twiga Foods Tanzania',
      location: 'Arusha, Tanzania',
      salary: { min: 6000000, max: 8000000 },
      type: 'Part-time',
      category: 'Human Resources',
      posted: new Date('2024-01-10'),
      logo: '🥬',
      description: 'Support all aspects of human resources including recruiting, onboarding, and employee relations.',
      requirements: ['HR Experience', 'Communication', 'Organization', '2+ years experience'],
      urgent: false,
      remote: false,
    },
  ];

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const categories = ['Technology', 'Design', 'Marketing', 'Human Resources', 'Sales', 'Finance'];

  const filteredJobs = useMemo(() => {
    let filtered = allJobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = location === '' || 
                             job.location.toLowerCase().includes(location.toLowerCase()) ||
                             (location.toLowerCase() === 'remote' && job.remote);
      
      const matchesSalary = job.salary.min >= salaryRange[0] && job.salary.max <= salaryRange[1];
      
      const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type);
      
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(job.category);

      return matchesSearch && matchesLocation && matchesSalary && matchesJobType && matchesCategory;
    });

    // Sort jobs
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => b.posted.getTime() - a.posted.getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => a.posted.getTime() - b.posted.getTime());
        break;
      case 'salary-high':
        filtered.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'salary-low':
        filtered.sort((a, b) => a.salary.min - b.salary.min);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, location, salaryRange, selectedJobTypes, selectedCategories, sortBy]);

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    if (checked) {
      setSelectedJobTypes([...selectedJobTypes, jobType]);
    } else {
      setSelectedJobTypes(selectedJobTypes.filter(type => type !== jobType));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    }
  };

  const formatSalary = (min: number, max: number) => {
    return `TZS ${(min / 1000000).toFixed(1)}M - ${(max / 1000000).toFixed(1)}M`;
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Job</h1>
          <p className="text-gray-600">Discover {filteredJobs.length} job opportunities that match your skills and interests.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Job title, keywords, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="City, region, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
            </div>
            <Button className="lg:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {filteredJobs.length} of {allJobs.length} jobs
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Salary Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Salary Range</h4>
                <div className="px-2">
                  <Slider
                    value={salaryRange}
                    onValueChange={setSalaryRange}
                    max={20000000}
                    min={0}
                    step={500000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>TZS {(salaryRange[0] / 1000000).toFixed(1)}M</span>
                    <span>TZS {(salaryRange[1] / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Job Type</h4>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={selectedJobTypes.includes(type)}
                        onCheckedChange={(checked) => handleJobTypeChange(type, checked as boolean)}
                      />
                      <label htmlFor={type} className="text-sm text-gray-700 cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <label htmlFor={category} className="text-sm text-gray-700 cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setSelectedJobTypes([]);
                  setSelectedCategories([]);
                  setSalaryRange([0, 20000000]);
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{job.logo}</div>
                          <div>
                            <CardTitle className="text-lg hover:text-blue-600 transition-colors">
                              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                            </CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <Building2 className="w-4 h-4" />
                              <span>{job.company}</span>
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
                        <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                          {job.requirements.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{job.requirements.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-1" />
                              {job.type}
                            </span>
                          </div>
                          <span className="flex items-center text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {getTimeAgo(job.posted)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-green-600 flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {formatSalary(job.salary.min, job.salary.max)}
                          </span>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
