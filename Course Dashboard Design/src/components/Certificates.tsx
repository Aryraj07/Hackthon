import { useState } from 'react';
import { Award, Download, Eye, Calendar, User, Star, Share2, Mail, Linkedin, Facebook, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import { useTheme } from '../App';

interface Certificate {
  id: number;
  courseTitle: string;
  instructor: string;
  completionDate: string;
  certificateId: string;
  grade: string;
  percentage: number;
  skillsLearned: string[];
  duration: string;
  status: 'completed' | 'in-progress';
  thumbnail: string;
}

const mockCertificates: Certificate[] = [
  {
    id: 1,
    courseTitle: 'Introduction to Machine Learning',
    instructor: 'Dr. Rajesh Kumar',
    completionDate: 'December 15, 2024',
    certificateId: 'CERT-ML-2024-001',
    grade: 'A+',
    percentage: 95,
    skillsLearned: ['Python', 'Scikit-learn', 'Data Analysis', 'Neural Networks'],
    duration: '8 weeks',
    status: 'completed',
    thumbnail: '/api/placeholder/400/300'
  },
  {
    id: 2,
    courseTitle: 'Advanced Data Structures',
    instructor: 'Prof. Anjali Sharma',
    completionDate: 'November 22, 2024',
    certificateId: 'CERT-DS-2024-002',
    grade: 'A',
    percentage: 88,
    skillsLearned: ['Algorithms', 'Data Structures', 'Problem Solving', 'Optimization'],
    duration: '6 weeks',
    status: 'completed',
    thumbnail: '/api/placeholder/400/300'
  },
  {
    id: 3,
    courseTitle: 'Web Development Fundamentals',
    instructor: 'Mr. Arjun Patel',
    completionDate: 'October 10, 2024',
    certificateId: 'CERT-WD-2024-003',
    grade: 'A+',
    percentage: 92,
    skillsLearned: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    duration: '10 weeks',
    status: 'completed',
    thumbnail: '/api/placeholder/400/300'
  },
  {
    id: 4,
    courseTitle: 'Digital Marketing Strategy',
    instructor: 'Ms. Priya Singh',
    completionDate: 'September 5, 2024',
    certificateId: 'CERT-DM-2024-004',
    grade: 'B+',
    percentage: 85,
    skillsLearned: ['SEO', 'Social Media Marketing', 'Analytics', 'Content Strategy'],
    duration: '4 weeks',
    status: 'completed',
    thumbnail: '/api/placeholder/400/300'
  },
  {
    id: 5,
    courseTitle: 'Business Analytics',
    instructor: 'Dr. Vikram Gupta',
    completionDate: 'August 18, 2024',
    certificateId: 'CERT-BA-2024-005',
    grade: 'A',
    percentage: 90,
    skillsLearned: ['Excel', 'Power BI', 'Statistical Analysis', 'Business Intelligence'],
    duration: '7 weeks',
    status: 'completed',
    thumbnail: '/api/placeholder/400/300'
  }
];

export function Certificates() {
  const { actualTheme } = useTheme();
  const [certificates, setCertificates] = useState(mockCertificates);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'text-green-600 bg-green-100';
      case 'A':
        return 'text-blue-600 bg-blue-100';
      case 'B+':
        return 'text-purple-600 bg-purple-100';
      case 'B':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleDownload = (certificate: Certificate) => {
    // Simulate certificate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${certificate.courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (platform: string, certificate: Certificate) => {
    const url = `https://learnhub.com/certificate/${certificate.certificateId}`;
    const text = `I just earned a certificate in "${certificate.courseTitle}" with grade ${certificate.grade}! 🎉`;
    
    let shareUrl = '';
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('My Learning Achievement')}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const completedCount = certificates.filter(c => c.status === 'completed').length;
  const averageGrade = certificates.reduce((acc, cert) => acc + cert.percentage, 0) / certificates.length;
  const totalSkills = [...new Set(certificates.flatMap(c => c.skillsLearned))].length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          My Certificates
        </h1>
        <p className="text-muted-foreground">
          View and share your learning achievements
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Certificates</h3>
            <Award className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-semibold text-yellow-600 mb-1">
            {completedCount}
          </div>
          <p className="text-sm text-muted-foreground">Completed courses</p>
        </div>
        
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Average Grade</h3>
            <Star className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-semibold text-blue-600 mb-1">
            {averageGrade.toFixed(1)}%
          </div>
          <p className="text-sm text-muted-foreground">Overall performance</p>
        </div>
        
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Skills Learned</h3>
            <User className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-semibold text-green-600 mb-1">
            {totalSkills}
          </div>
          <p className="text-sm text-muted-foreground">Unique skills</p>
        </div>
        
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Study Time</h3>
            <Calendar className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-semibold text-purple-600 mb-1">
            89h
          </div>
          <p className="text-sm text-muted-foreground">Total learning hours</p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="bg-card rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            {/* Certificate Preview */}
            <div className="relative bg-gradient-to-br from-purple-500 to-blue-600 p-6 text-white">
              <div className="absolute top-4 right-4">
                <Badge className={`${getGradeColor(certificate.grade)} text-white`}>
                  {certificate.grade}
                </Badge>
              </div>
              <Award className="w-8 h-8 mb-4" />
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {certificate.courseTitle}
              </h3>
              <p className="text-purple-100 text-sm">
                by {certificate.instructor}
              </p>
            </div>

            {/* Certificate Info */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="w-4 h-4" />
                <span>Completed on {certificate.completionDate}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-muted-foreground">Score:</span>
                <span className="font-semibold text-foreground">{certificate.percentage}%</span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Skills learned:</p>
                <div className="flex flex-wrap gap-1">
                  {certificate.skillsLearned.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {certificate.skillsLearned.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{certificate.skillsLearned.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-purple-50"
                      onClick={() => setSelectedCertificate(certificate)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Certificate Details</DialogTitle>
                    </DialogHeader>
                    {selectedCertificate && (
                      <div className="space-y-6">
                        {/* Certificate Preview */}
                        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-8 text-white text-center">
                          <Award className="w-16 h-16 mx-auto mb-4" />
                          <h2 className="text-2xl font-bold mb-2">Certificate of Completion</h2>
                          <h3 className="text-xl mb-4">{selectedCertificate.courseTitle}</h3>
                          <p className="mb-2">This certifies that</p>
                          <h4 className="text-2xl font-bold mb-2">Priya Sharma</h4>
                          <p className="mb-4">has successfully completed the course</p>
                          <div className="flex justify-between items-center text-sm">
                            <span>Instructor: {selectedCertificate.instructor}</span>
                            <span>Grade: {selectedCertificate.grade}</span>
                          </div>
                          <div className="mt-4 text-center">
                            <p className="text-sm">Certificate ID: {selectedCertificate.certificateId}</p>
                            <p className="text-sm">Date: {selectedCertificate.completionDate}</p>
                          </div>
                        </div>

                        <Separator />

                        {/* Certificate Details */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Course Information</h4>
                            <p className="text-sm text-muted-foreground mb-1">Duration: {selectedCertificate.duration}</p>
                            <p className="text-sm text-muted-foreground mb-1">Score: {selectedCertificate.percentage}%</p>
                            <p className="text-sm text-muted-foreground">Grade: {selectedCertificate.grade}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Skills Acquired</h4>
                            <div className="flex flex-wrap gap-1">
                              {selectedCertificate.skillsLearned.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleDownload(selectedCertificate)}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShareDialogOpen(true)}
                            className="hover:bg-purple-50"
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button
                  size="sm"
                  onClick={() => handleDownload(certificate)}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Certificate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Share your achievement on social media or via email
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleShare('linkedin', selectedCertificate!)}
                className="flex items-center gap-2 hover:bg-blue-50"
              >
                <Linkedin className="w-4 h-4 text-blue-600" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                onClick={() => handleShare('facebook', selectedCertificate!)}
                className="flex items-center gap-2 hover:bg-blue-50"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={() => handleShare('twitter', selectedCertificate!)}
                className="flex items-center gap-2 hover:bg-blue-50"
              >
                <Twitter className="w-4 h-4 text-blue-400" />
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={() => handleShare('email', selectedCertificate!)}
                className="flex items-center gap-2 hover:bg-gray-50"
              >
                <Mail className="w-4 h-4 text-gray-600" />
                Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {certificates.length === 0 && (
        <div className="bg-card rounded-2xl shadow-sm border p-12 text-center">
          <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            No certificates yet
          </h3>
          <p className="text-muted-foreground">
            Complete courses to earn certificates and showcase your achievements!
          </p>
        </div>
      )}
    </div>
  );
}