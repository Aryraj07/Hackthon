import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Phone, Globe, Star, Filter, Search, Users, BookOpen, Wifi } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../App';
import { getTranslation } from './translations';
import { toast } from 'sonner@2.0.3';

interface LearningCenter {
  id: number;
  name: string;
  type: 'library' | 'coworking' | 'study_group' | 'tutor_center' | 'college';
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  isOpen: boolean;
  openingHours: string;
  phone?: string;
  website?: string;
  amenities: string[];
  subjects: string[];
  image: string;
  coordinates: { lat: number; lng: number };
  priceRange?: string;
}

const mockLearningCenters: LearningCenter[] = [
  {
    id: 1,
    name: "Central Public Library",
    type: "library",
    address: "Connaught Place, New Delhi, 110001",
    distance: "0.8 km",
    rating: 4.5,
    reviews: 324,
    isOpen: true,
    openingHours: "8:00 AM - 8:00 PM",
    phone: "+91 11 2334 5678",
    website: "delhi.gov.in/library",
    amenities: ["Free WiFi", "Study Rooms", "Computer Lab", "Printing"],
    subjects: ["Computer Science", "Business", "Literature", "Science"],
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    coordinates: { lat: 28.6315, lng: 77.2167 }
  },
  {
    id: 2,
    name: "TechHub Coworking Space",
    type: "coworking",
    address: "Sector 18, Gurugram, Haryana 122015",
    distance: "2.3 km",
    rating: 4.8,
    reviews: 156,
    isOpen: true,
    openingHours: "24/7 Access",
    phone: "+91 124 456 7890",
    website: "techhub.co.in",
    amenities: ["High-Speed WiFi", "Meeting Rooms", "Coffee Bar", "24/7 Access"],
    subjects: ["Programming", "Data Science", "AI/ML", "Startup Mentoring"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
    coordinates: { lat: 28.4595, lng: 77.0266 },
    priceRange: "₹500-1000/day"
  },
  {
    id: 3,
    name: "AI Study Group Delhi",
    type: "study_group",
    address: "Janpath, New Delhi, 110001",
    distance: "1.2 km",
    rating: 4.2,
    reviews: 89,
    isOpen: false,
    openingHours: "Weekends 10:00 AM - 6:00 PM",
    phone: "+91 98765 43210",
    amenities: ["Peer Learning", "Project Collaboration", "Expert Sessions"],
    subjects: ["Machine Learning", "Deep Learning", "Python", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    coordinates: { lat: 28.6219, lng: 77.2273 }
  },
  {
    id: 4,
    name: "Digital Skills Academy",
    type: "tutor_center",
    address: "Karol Bagh, New Delhi, 110005",
    distance: "3.1 km",
    rating: 4.6,
    reviews: 278,
    isOpen: true,
    openingHours: "9:00 AM - 9:00 PM",
    phone: "+91 11 4567 8901",
    website: "digitalskills.edu",
    amenities: ["Expert Tutors", "Hands-on Labs", "Certification Prep", "Career Guidance"],
    subjects: ["Web Development", "Mobile Apps", "Cloud Computing", "Cybersecurity"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400",
    coordinates: { lat: 28.6517, lng: 77.1909 },
    priceRange: "₹2000-5000/month"
  },
  {
    id: 5,
    name: "IIT Delhi Library",
    type: "college",
    address: "Hauz Khas, New Delhi, 110016",
    distance: "5.7 km",
    rating: 4.9,
    reviews: 567,
    isOpen: true,
    openingHours: "8:00 AM - 10:00 PM",
    phone: "+91 11 2659 1011",
    website: "iitd.ac.in",
    amenities: ["Research Resources", "Digital Library", "Study Halls", "Guest Access"],
    subjects: ["Engineering", "Computer Science", "Mathematics", "Physics"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    coordinates: { lat: 28.5458, lng: 77.1917 }
  }
];

export function NearbyLearningCenters() {
  const [centers, setCenters] = useState<LearningCenter[]>(mockLearningCenters);
  const [filteredCenters, setFilteredCenters] = useState<LearningCenter[]>(mockLearningCenters);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    filterCenters();
  }, [searchQuery, selectedType, selectedSubject, centers]);

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      if ('geolocation' in navigator) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          });
        });
        
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        
        toast.success('Location found!', {
          description: 'Showing nearby learning centers based on your location.',
        });
      } else {
        toast.error('Geolocation not supported', {
          description: 'Your browser does not support location services.',
        });
      }
    } catch (error) {
      toast.error('Location access denied', {
        description: 'Please enable location access to find nearby centers.',
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const filterCenters = () => {
    let filtered = centers;

    if (searchQuery) {
      filtered = filtered.filter(center =>
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.subjects.some(subject => 
          subject.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(center => center.type === selectedType);
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(center =>
        center.subjects.some(subject =>
          subject.toLowerCase().includes(selectedSubject.toLowerCase())
        )
      );
    }

    setFilteredCenters(filtered);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'library': return '📚';
      case 'coworking': return '💼';
      case 'study_group': return '👥';
      case 'tutor_center': return '🎓';
      case 'college': return '🏛️';
      default: return '📍';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'library': return getTranslation(language, 'libraries');
      case 'coworking': return getTranslation(language, 'coworkingSpaces');
      case 'study_group': return getTranslation(language, 'studyGroups');
      case 'tutor_center': return 'Tutor Centers';
      case 'college': return 'Colleges';
      default: return type;
    }
  };

  const handleGetDirections = (center: LearningCenter) => {
    const destination = `${center.coordinates.lat},${center.coordinates.lng}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          {getTranslation(language, 'nearbyCenters')}
        </h1>
        <p className="text-muted-foreground">
          Find study spaces, libraries, and learning communities near you
        </p>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, location, or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="library">📚 Libraries</SelectItem>
                <SelectItem value="coworking">💼 Co-working</SelectItem>
                <SelectItem value="study_group">👥 Study Groups</SelectItem>
                <SelectItem value="tutor_center">🎓 Tutor Centers</SelectItem>
                <SelectItem value="college">🏛️ Colleges</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="computer">Computer Science</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              variant="outline"
              className="rounded-xl"
            >
              <Navigation className="w-4 h-4 mr-2" />
              {isLoadingLocation ? 'Locating...' : 'My Location'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Interactive Map View</h3>
                <p className="text-muted-foreground">
                  {userLocation 
                    ? `Showing ${filteredCenters.length} learning centers near your location`
                    : 'Enable location access to see nearby centers on map'
                  }
                </p>
              </div>
            </div>
            
            {/* Mock map points */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-8 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-12 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCenters.map((center) => (
          <Card key={center.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-0">
              <div className="flex">
                <div className="w-32 h-32 relative">
                  <ImageWithFallback
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-xs">
                      {getTypeIcon(center.type)} {getTypeLabel(center.type)}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{center.name}</h3>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(center.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {center.rating} ({center.reviews})
                        </span>
                      </div>
                    </div>
                    <Badge 
                      variant={center.isOpen ? "default" : "secondary"}
                      className={center.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                    >
                      {center.isOpen ? getTranslation(language, 'open') : getTranslation(language, 'closed')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{center.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      <span>{center.distance} away</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{center.openingHours}</span>
                    </div>
                    {center.priceRange && (
                      <div className="flex items-center gap-1">
                        <span>💰</span>
                        <span>{center.priceRange}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {center.amenities.slice(0, 2).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {center.amenities.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{center.amenities.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => handleGetDirections(center)}
                      size="sm" 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg flex-1"
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      {getTranslation(language, 'getDirections')}
                    </Button>
                    {center.phone && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="rounded-lg"
                        onClick={() => window.open(`tel:${center.phone}`)}
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                    )}
                    {center.website && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="rounded-lg"
                        onClick={() => window.open(`https://${center.website}`, '_blank')}
                      >
                        <Globe className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCenters.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No learning centers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or location settings.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}