import { useState } from 'react';
import { BarChart3, TrendingUp, Target, Clock, Award, Calendar, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { useTheme } from '../App';

interface TestRecord {
  id: number;
  courseTitle: string;
  testName: string;
  date: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  duration: number; // in minutes
  attempts: number;
  status: 'passed' | 'failed' | 'pending';
  category: string;
}

const mockTestRecords: TestRecord[] = [
  {
    id: 1,
    courseTitle: 'Introduction to Machine Learning',
    testName: 'Mid-term Exam',
    date: '2024-12-10',
    score: 85,
    totalMarks: 100,
    percentage: 85,
    grade: 'A',
    duration: 120,
    attempts: 1,
    status: 'passed',
    category: 'AI/ML'
  },
  {
    id: 2,
    courseTitle: 'Advanced Data Structures',
    testName: 'Final Assessment',
    date: '2024-12-05',
    score: 92,
    totalMarks: 100,
    percentage: 92,
    grade: 'A+',
    duration: 90,
    attempts: 1,
    status: 'passed',
    category: 'Programming'
  },
  {
    id: 3,
    courseTitle: 'Web Development Fundamentals',
    testName: 'Project Evaluation',
    date: '2024-11-28',
    score: 78,
    totalMarks: 100,
    percentage: 78,
    grade: 'B+',
    duration: 180,
    attempts: 2,
    status: 'passed',
    category: 'Web Development'
  },
  {
    id: 4,
    courseTitle: 'Digital Marketing Strategy',
    testName: 'Case Study Analysis',
    date: '2024-11-20',
    score: 88,
    totalMarks: 100,
    percentage: 88,
    grade: 'A',
    duration: 150,
    attempts: 1,
    status: 'passed',
    category: 'Marketing'
  },
  {
    id: 5,
    courseTitle: 'Business Analytics',
    testName: 'Data Analysis Project',
    date: '2024-11-15',
    score: 95,
    totalMarks: 100,
    percentage: 95,
    grade: 'A+',
    duration: 200,
    attempts: 1,
    status: 'passed',
    category: 'Analytics'
  },
  {
    id: 6,
    courseTitle: 'Cyber Security Basics',
    testName: 'Security Assessment',
    date: '2024-11-10',
    score: 72,
    totalMarks: 100,
    percentage: 72,
    grade: 'B',
    duration: 100,
    attempts: 2,
    status: 'passed',
    category: 'Cyber Security'
  },
  {
    id: 7,
    courseTitle: 'Python Programming',
    testName: 'Coding Challenge',
    date: '2024-11-05',
    score: 89,
    totalMarks: 100,
    percentage: 89,
    grade: 'A',
    duration: 120,
    attempts: 1,
    status: 'passed',
    category: 'Programming'
  }
];

export function TestRecords() {
  const { actualTheme } = useTheme();
  const [records, setRecords] = useState(mockTestRecords);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  // Filter and sort records
  const filteredRecords = records
    .filter(record => filterCategory === 'all' || record.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'score':
          return b.percentage - a.percentage;
        case 'course':
          return a.courseTitle.localeCompare(b.courseTitle);
        default:
          return 0;
      }
    });

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
      case 'C':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Chart data
  const gradeDistribution = [
    { name: 'A+', value: records.filter(r => r.grade === 'A+').length, color: '#22c55e' },
    { name: 'A', value: records.filter(r => r.grade === 'A').length, color: '#3b82f6' },
    { name: 'B+', value: records.filter(r => r.grade === 'B+').length, color: '#8b5cf6' },
    { name: 'B', value: records.filter(r => r.grade === 'B').length, color: '#f59e0b' },
    { name: 'C', value: records.filter(r => r.grade === 'C').length, color: '#ef4444' },
  ].filter(item => item.value > 0);

  const categoryPerformance = [...new Set(records.map(r => r.category))].map(category => ({
    category,
    averageScore: Math.round(
      records.filter(r => r.category === category)
        .reduce((acc, r) => acc + r.percentage, 0) / 
      records.filter(r => r.category === category).length
    ),
    testCount: records.filter(r => r.category === category).length
  }));

  const monthlyProgress = records
    .reduce((acc, record) => {
      const month = new Date(record.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      const existing = acc.find(item => item.month === month);
      if (existing) {
        existing.averageScore = Math.round((existing.averageScore + record.percentage) / 2);
        existing.testCount += 1;
      } else {
        acc.push({ month, averageScore: record.percentage, testCount: 1 });
      }
      return acc;
    }, [] as { month: string; averageScore: number; testCount: number }[])
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  // Statistics
  const totalTests = records.length;
  const averageScore = Math.round(records.reduce((acc, r) => acc + r.percentage, 0) / totalTests);
  const passedTests = records.filter(r => r.status === 'passed').length;
  const totalStudyHours = Math.round(records.reduce((acc, r) => acc + r.duration, 0) / 60);

  const categories = [...new Set(records.map(r => r.category))];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Test Records & Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your test performance and analyze learning progress
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="score">Score</SelectItem>
              <SelectItem value="course">Course</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Total Tests</h3>
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-semibold text-blue-600 mb-1">
            {totalTests}
          </div>
          <p className="text-sm text-muted-foreground">Completed assessments</p>
        </div>
        
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Average Score</h3>
            <Target className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-semibold text-green-600 mb-1">
            {averageScore}%
          </div>
          <p className="text-sm text-muted-foreground">Overall performance</p>
        </div>
        
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Pass Rate</h3>
            <Award className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-semibold text-purple-600 mb-1">
            {Math.round((passedTests / totalTests) * 100)}%
          </div>
          <p className="text-sm text-muted-foreground">{passedTests} of {totalTests} passed</p>
        </div>
        
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Study Hours</h3>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-semibold text-orange-600 mb-1">
            {totalStudyHours}h
          </div>
          <p className="text-sm text-muted-foreground">Total test time</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Grade Distribution Pie Chart */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <h3 className="font-semibold text-card-foreground mb-4">Grade Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} tests`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {gradeDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-muted-foreground">
                  Grade {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance Bar Chart */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <h3 className="font-semibold text-card-foreground mb-4">Performance by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke={actualTheme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="category" 
                  tick={{ fontSize: 12, fill: actualTheme === 'dark' ? '#9ca3af' : '#6b7280' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12, fill: actualTheme === 'dark' ? '#9ca3af' : '#6b7280' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: actualTheme === 'dark' ? '#1f2937' : '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="averageScore" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Progress Line Chart */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border mb-8">
        <h3 className="font-semibold text-card-foreground mb-4">Performance Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke={actualTheme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: actualTheme === 'dark' ? '#9ca3af' : '#6b7280' }}
              />
              <YAxis tick={{ fontSize: 12, fill: actualTheme === 'dark' ? '#9ca3af' : '#6b7280' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: actualTheme === 'dark' ? '#1f2937' : '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="averageScore" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Test Records Table */}
      <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-card-foreground">Recent Test Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Course & Test</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Score</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Grade</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Duration</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Attempts</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-card-foreground">{record.testName}</div>
                      <div className="text-sm text-muted-foreground">{record.courseTitle}</div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {record.category}
                      </Badge>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-card-foreground">
                      {record.score}/{record.totalMarks}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {record.percentage}%
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getGradeColor(record.grade)}>
                      {record.grade}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {record.duration} min
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={record.attempts > 1 ? 'destructive' : 'secondary'}>
                      {record.attempts}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge 
                      variant={record.status === 'passed' ? 'default' : 'destructive'}
                      className={record.status === 'passed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                      }
                    >
                      {record.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredRecords.length === 0 && (
        <div className="bg-card rounded-2xl shadow-sm border p-12 text-center mt-8">
          <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            No test records found
          </h3>
          <p className="text-muted-foreground">
            {filterCategory !== 'all' 
              ? `No tests found in ${filterCategory} category. Try changing the filter.`
              : "Take some tests to see your performance analytics here."
            }
          </p>
        </div>
      )}
    </div>
  );
}