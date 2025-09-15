import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Bug,
  Lightbulb,
  HelpCircle
} from 'lucide-react';

export function FeedbackAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Mock data for demonstration
  const feedbackByScreen = [
    { screen: 'Course Detail', count: 45, bugs: 12, features: 20, questions: 13 },
    { screen: 'Dashboard', count: 32, bugs: 8, features: 15, questions: 9 },
    { screen: 'Profile Settings', count: 28, bugs: 15, features: 5, questions: 8 },
    { screen: 'Payments', count: 22, bugs: 18, features: 2, questions: 2 },
    { screen: 'Video Player', count: 19, bugs: 14, features: 3, questions: 2 },
    { screen: 'Assignments', count: 16, bugs: 6, features: 8, questions: 2 },
  ];

  const feedbackTrends = [
    { date: '2024-01-01', bugs: 15, features: 8, questions: 12, general: 5 },
    { date: '2024-01-02', bugs: 12, features: 10, questions: 8, general: 7 },
    { date: '2024-01-03', bugs: 18, features: 6, questions: 15, general: 3 },
    { date: '2024-01-04', bugs: 10, features: 12, questions: 10, general: 8 },
    { date: '2024-01-05', bugs: 8, features: 15, questions: 6, general: 9 },
    { date: '2024-01-06', bugs: 14, features: 9, questions: 11, general: 6 },
    { date: '2024-01-07', bugs: 11, features: 13, questions: 9, general: 7 },
  ];

  const priorityData = [
    { name: 'High', value: 25, color: '#ef4444' },
    { name: 'Medium', value: 45, color: '#f59e0b' },
    { name: 'Low', value: 30, color: '#10b981' },
  ];

  const statusData = [
    { status: 'Open', count: 42, percentage: 35 },
    { status: 'In Progress', count: 38, percentage: 32 },
    { status: 'Resolved', count: 28, percentage: 23 },
    { status: 'Closed', count: 12, percentage: 10 },
  ];

  const commonIssues = [
    {
      issue: "Video playback issues on Course Detail page",
      screen: "Course Detail",
      count: 18,
      type: "bug",
      priority: "high"
    },
    {
      issue: "Payment gateway timeout during UPI transactions",
      screen: "Payments",
      count: 15,
      type: "bug",
      priority: "high"
    },
    {
      issue: "Profile picture upload not working",
      screen: "Profile Settings",
      count: 12,
      type: "bug",
      priority: "medium"
    },
    {
      issue: "Add dark mode toggle to settings",
      screen: "Profile Settings",
      count: 20,
      type: "feature",
      priority: "medium"
    },
    {
      issue: "Bulk download option for course materials",
      screen: "Course Materials",
      count: 16,
      type: "feature",
      priority: "low"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <Bug className="w-4 h-4 text-red-500" />;
      case 'feature': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'question': return <HelpCircle className="w-4 h-4 text-blue-500" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Feedback Analytics</h1>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                selectedTimeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
                <p className="text-2xl font-semibold">162</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last week
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bug Reports</p>
                <p className="text-2xl font-semibold">73</p>
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  25 high priority
                </p>
              </div>
              <Bug className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-semibold">89</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Avg 2.3 days
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-semibold">42</p>
                <p className="text-xs text-yellow-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Avg 1.8 days old
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="by-screen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="by-screen">By Screen</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="priority">Priority</TabsTrigger>
          <TabsTrigger value="common-issues">Common Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="by-screen" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback by Screen</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={feedbackByScreen}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="screen" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bugs" stackId="a" fill="#ef4444" name="Bugs" />
                  <Bar dataKey="features" stackId="a" fill="#f59e0b" name="Features" />
                  <Bar dataKey="questions" stackId="a" fill="#3b82f6" name="Questions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Trends (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={feedbackTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bugs" fill="#ef4444" name="Bugs" />
                  <Bar dataKey="features" fill="#f59e0b" name="Features" />
                  <Bar dataKey="questions" fill="#3b82f6" name="Questions" />
                  <Bar dataKey="general" fill="#6b7280" name="General" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="priority" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Priority Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {statusData.map((item) => (
                  <div key={item.status} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.status}</span>
                      <span className="text-sm text-muted-foreground">{item.count}</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="common-issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Common Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonIssues.map((issue, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(issue.type)}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{issue.issue}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{issue.screen}</Badge>
                            <Badge className={getPriorityColor(issue.priority)}>
                              {issue.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{issue.count} reports</span>
                          <span>•</span>
                          <span className="capitalize">{issue.type} report</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}