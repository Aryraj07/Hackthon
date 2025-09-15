import { useState } from 'react';
import { FileText, Download, MessageCircle, BookOpen, Plus, Heart, Share } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar } from './ui/avatar';

interface Resource {
  name: string;
  type: string;
  size: string;
}

interface VideoContent {
  title: string;
  overview: string;
  resources: Resource[];
}

interface ContentTabsProps {
  currentVideo?: VideoContent;
  videoId: number;
  userNotes: Record<number, string>;
  onNotesChange: (notes: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// Mock Q&A data
const mockQAData = [
  {
    id: 1,
    question: "What's the difference between supervised and unsupervised learning?",
    answer: "Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data. Supervised learning predicts outcomes, unsupervised learning discovers hidden structures.",
    author: "Dr. Sarah Johnson",
    timestamp: "2 hours ago",
    likes: 15,
    replies: 3
  },
  {
    id: 2,
    question: "Can you recommend some good datasets for practicing ML algorithms?",
    answer: "Great question! I recommend starting with UCI ML Repository, Kaggle datasets, and scikit-learn's built-in datasets. For beginners, try the Iris dataset, Boston Housing, or Titanic dataset.",
    author: "Teaching Assistant",
    timestamp: "1 day ago",
    likes: 8,
    replies: 1
  }
];

export function ContentTabs({ 
  currentVideo, 
  videoId, 
  userNotes, 
  onNotesChange, 
  activeTab, 
  onTabChange 
}: ContentTabsProps) {
  const [newQuestion, setNewQuestion] = useState('');
  const [likedQuestions, setLikedQuestions] = useState<Set<number>>(new Set());

  const handleLikeQuestion = (questionId: number) => {
    setLikedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleDownload = (resource: Resource) => {
    // In a real app, this would trigger the download
    console.log(`Downloading ${resource.name}`);
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'zip':
        return '📦';
      case 'jupyter':
        return '📓';
      case 'python':
        return '🐍';
      case 'txt':
        return '📝';
      default:
        return '📁';
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview" className="gap-2">
          <BookOpen className="w-4 h-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="notes" className="gap-2">
          <FileText className="w-4 h-4" />
          Notes
        </TabsTrigger>
        <TabsTrigger value="qa" className="gap-2">
          <MessageCircle className="w-4 h-4" />
          Q&A
        </TabsTrigger>
        <TabsTrigger value="resources" className="gap-2">
          <Download className="w-4 h-4" />
          Resources
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About this lesson</h3>
            <p className="text-muted-foreground leading-relaxed">
              {currentVideo?.overview || "No description available for this video."}
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Learning Objectives</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Understanding the fundamental concepts and terminology
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Practical application through hands-on examples
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Best practices and common pitfalls to avoid
              </li>
            </ul>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Personal Notes</h3>
              <Badge variant="secondary" className="text-xs">
                Auto-saved
              </Badge>
            </div>
            <Textarea
              placeholder="Take notes while watching this video... Your notes will be automatically saved and timestamped."
              value={userNotes[videoId] || ''}
              onChange={(e) => onNotesChange(e.target.value)}
              className="min-h-[300px] resize-none"
            />
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>Notes are private and only visible to you</span>
              <span>{(userNotes[videoId] || '').length} characters</span>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-medium mb-3">Quick Actions</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Timestamp
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Export Notes
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Q&A Tab */}
        <TabsContent value="qa" className="space-y-6">
          {/* Ask Question Section */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Ask a Question</h3>
            <div className="space-y-4">
              <Textarea
                placeholder="What would you like to know about this lesson? Be specific and detailed to get the best answer..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Questions will be reviewed by the instructor
                </span>
                <Button disabled={!newQuestion.trim()}>
                  Post Question
                </Button>
              </div>
            </div>
          </Card>

          {/* Questions List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                Recent Questions ({mockQAData.length})
              </h3>
              <Button variant="outline" size="sm">
                Sort by Latest
              </Button>
            </div>

            {mockQAData.map((qa) => (
              <Card key={qa.id} className="p-6">
                <div className="space-y-4">
                  {/* Question */}
                  <div>
                    <h4 className="font-medium text-card-foreground mb-2">
                      {qa.question}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{qa.timestamp}</span>
                      <span>•</span>
                      <span>{qa.replies} replies</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Answer */}
                  <div>
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                          {qa.author.charAt(0)}
                        </div>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">{qa.author}</span>
                          <Badge variant="secondary" className="text-xs">
                            Instructor
                          </Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {qa.answer}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-4 ml-11">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-1 ${likedQuestions.has(qa.id) ? 'text-red-500' : ''}`}
                        onClick={() => handleLikeQuestion(qa.id)}
                      >
                        <Heart className={`w-4 h-4 ${likedQuestions.has(qa.id) ? 'fill-current' : ''}`} />
                        {qa.likes + (likedQuestions.has(qa.id) ? 1 : 0)}
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Downloadable Resources</h3>
            
            {currentVideo?.resources && currentVideo.resources.length > 0 ? (
              <div className="space-y-3">
                {currentVideo.resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getFileIcon(resource.type)}</span>
                      <div>
                        <h4 className="font-medium text-card-foreground">{resource.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {resource.type.toUpperCase()}
                          </Badge>
                          <span>•</span>
                          <span>{resource.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(resource)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No resources available for this lesson</p>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h4 className="font-medium mb-3">Course Materials</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Additional course-wide resources and materials
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Course Syllabus
              </Button>
              <Button variant="outline" size="sm">
                All Code Examples
              </Button>
              <Button variant="outline" size="sm">
                Reference Guide
              </Button>
            </div>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
}