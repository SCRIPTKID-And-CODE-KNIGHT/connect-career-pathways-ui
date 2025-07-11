
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, DollarSign, Clock, Building2, Share2, Bookmark, ExternalLink, Users, Award, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Mock job data - in a real app, this would come from an API
  const job = {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: { min: 120000, max: 180000 },
    type: 'Full-time',
    category: 'Technology',
    posted: new Date('2024-01-15'),
    deadline: new Date('2024-02-28'),
    logo: '🏢',
    description: `We are looking for a passionate Senior Software Engineer to join our growing team. You will be responsible for designing, developing, and maintaining high-quality software solutions that power our platform used by millions of users worldwide.

As a Senior Software Engineer, you will work closely with cross-functional teams to deliver features that have a direct impact on our users' experience. You'll have the opportunity to mentor junior developers, participate in architectural decisions, and contribute to our engineering culture.`,
    requirements: [
      '5+ years of professional software development experience',
      'Strong proficiency in React, Node.js, and TypeScript',
      'Experience with cloud platforms (AWS, GCP, or Azure)',
      'Knowledge of database design and optimization',
      'Experience with microservices architecture',
      'Strong problem-solving and communication skills',
      'Bachelor\'s degree in Computer Science or related field',
      'Experience with CI/CD pipelines and DevOps practices'
    ],
    responsibilities: [
      'Design and develop scalable web applications',
      'Collaborate with product managers and designers',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and technical discussions',
      'Mentor junior developers and share knowledge',
      'Contribute to system architecture and technical decisions',
      'Optimize application performance and scalability',
      'Stay up-to-date with latest technologies and best practices'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible working hours and remote work options',
      'Professional development budget ($2,000/year)',
      'Unlimited PTO policy',
      'State-of-the-art equipment and tools',
      'Team building events and company retreats',
      'Gym membership and wellness programs'
    ],
    companyInfo: {
      name: 'TechCorp Inc.',
      size: '500-1000 employees',
      industry: 'Technology',
      founded: '2015',
      website: 'https://techcorp.com',
      description: 'TechCorp is a leading technology company that builds innovative software solutions for businesses worldwide. Our mission is to empower organizations with cutting-edge tools that drive productivity and growth.'
    },
    applicationMethod: {
      type: 'internal', // 'internal', 'email', 'external'
      email: 'careers@techcorp.com',
      url: 'https://techcorp.com/careers/senior-software-engineer'
    },
    urgent: true,
    remote: false,
    views: 1247,
    applicants: 89
  };

  const handleApply = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (job.applicationMethod.type === 'internal') {
      setHasApplied(true);
      toast({
        title: "Application Submitted!",
        description: "Your application has been submitted successfully. You'll hear back from us soon.",
      });
    } else if (job.applicationMethod.type === 'email') {
      window.location.href = `mailto:${job.applicationMethod.email}?subject=Application for ${job.title}&body=Dear Hiring Manager,%0D%0A%0D%0AI am interested in applying for the ${job.title} position at ${job.company}.`;
    } else {
      window.open(job.applicationMethod.url, '_blank');
    }
  };

  const handleBookmark = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Job Bookmarked!",
      description: isBookmarked ? "Job removed from your bookmarks" : "Job saved to your bookmarks",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${job.title} at ${job.company}`,
        text: job.description.substring(0, 100) + '...',
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Job link has been copied to your clipboard",
      });
    }
  };

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const getDeadlineStatus = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Expired', color: 'text-red-600' };
    if (diffDays <= 7) return { text: `${diffDays} days left`, color: 'text-orange-600' };
    return { text: `${diffDays} days left`, color: 'text-green-600' };
  };

  const deadlineStatus = getDeadlineStatus(job.deadline);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>

        {/* Job Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{job.logo}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    {job.urgent && (
                      <Badge className="bg-red-100 text-red-700 border-red-200">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-lg flex items-center space-x-2">
                    <Building2 className="w-5 h-5" />
                    <span>{job.company}</span>
                  </CardDescription>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Posted {getTimeAgo(job.posted)}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {formatSalary(job.salary.min, job.salary.max)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className={deadlineStatus.color}>{deadlineStatus.text}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {job.applicants} applicants
                    </span>
                    <span>{job.views} views</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  onClick={handleBookmark}
                  variant="outline"
                  size="sm"
                  className={isBookmarked ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                <Button
                  onClick={handleApply}
                  disabled={hasApplied}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {hasApplied ? 'Applied' : 'Apply Now'}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {job.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Benefits & Perks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-center">Ready to Apply?</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-2xl font-bold text-green-600">
                  {formatSalary(job.salary.min, job.salary.max)}
                </div>
                <div className="text-sm text-gray-600">
                  <div className={`font-medium ${deadlineStatus.color}`}>
                    Application deadline: {deadlineStatus.text}
                  </div>
                </div>
                <Button
                  onClick={handleApply}
                  disabled={hasApplied}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {hasApplied ? (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Applied Successfully
                    </>
                  ) : (
                    'Apply for this Position'
                  )}
                </Button>
                {!user && (
                  <p className="text-xs text-gray-500">
                    <Link to="/login" className="text-blue-600 hover:underline">
                      Sign in
                    </Link> to apply for this job
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.companyInfo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {job.companyInfo.description}
                  </p>
                  
                  <Separator />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry:</span>
                      <span className="font-medium">{job.companyInfo.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company Size:</span>
                      <span className="font-medium">{job.companyInfo.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded:</span>
                      <span className="font-medium">{job.companyInfo.founded}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <a href={job.companyInfo.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Company Website
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Type:</span>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <Badge variant="outline">{job.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remote Work:</span>
                    <span className="font-medium">{job.remote ? 'Available' : 'Not Available'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-medium">{getTimeAgo(job.posted)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
