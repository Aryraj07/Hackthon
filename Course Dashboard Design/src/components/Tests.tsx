import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Calendar, Clock, TrendingUp, Award, FileText } from 'lucide-react';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';

// Mock data for past exams
const examResults = [
  { name: 'Passed', value: 12, color: '#10B981' },
  { name: 'Failed', value: 3, color: '#EF4444' },
  { name: 'Pending', value: 2, color: '#F59E0B' },
];

const recentExams = [
  {
    id: 1,
    name: 'Machine Learning Fundamentals',
    date: '2024-12-15',
    score: 85,
    status: 'passed',
    duration: '2h 30m',
  },
  {
    id: 2,
    name: 'Data Structures & Algorithms',
    date: '2024-12-10',
    score: 92,
    status: 'passed',
    duration: '3h 00m',
  },
  {
    id: 3,
    name: 'Cybersecurity Basics',
    date: '2024-12-05',
    score: 78,
    status: 'passed',
    duration: '2h 15m',
  },
  {
    id: 4,
    name: 'Business Analytics',
    date: '2024-11-28',
    score: 65,
    status: 'failed',
    duration: '2h 45m',
  },
  {
    id: 5,
    name: 'Python Programming',
    date: '2024-11-20',
    score: 88,
    status: 'passed',
    duration: '2h 20m',
  },
];

const monthlyPerformance = [
  { month: 'Sep', tests: 3, avgScore: 82 },
  { month: 'Oct', tests: 5, avgScore: 78 },
  { month: 'Nov', tests: 4, avgScore: 85 },
  { month: 'Dec', tests: 5, avgScore: 89 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover p-3 rounded-xl shadow-lg border border-border">
        <p className="font-medium text-foreground">{`${payload[0].name}: ${payload[0].value}`}</p>
        <p className="text-sm text-muted-foreground">{`${((payload[0].value / 17) * 100).toFixed(1)}% of total`}</p>
      </div>
    );
  }
  return null;
};

export function Tests() {
  const totalExams = examResults.reduce((sum, item) => sum + item.value, 0);
  const passRate = ((examResults.find(item => item.name === 'Passed')?.value || 0) / totalExams * 100).toFixed(1);
  const avgScore = recentExams.reduce((sum, exam) => sum + exam.score, 0) / recentExams.length;

  // Click handlers for interactive elements
  const handleStatCardClick = (type: string, value: any) => {
    switch(type) {
      case 'totalExams':
        toast.info(`You have completed ${value} exams this semester. View detailed breakdown?`);
        break;
      case 'passRate':
        toast.info(`Your pass rate is ${value}% - Above the class average of 65%!`);
        break;
      case 'avgScore':
        toast.info(`Your average score is ${value}/100. Keep up the great work!`);
        break;
      case 'studyTime':
        toast.info(`You've studied 42 hours this month. That's 8 hours more than last month!`);
        break;
    }
  };

  const handleExamClick = (exam: any) => {
    toast.info(`Opening detailed results for "${exam.name}"`);
  };

  const handleChartClick = (data: any, chartType: string) => {
    if (chartType === 'pie') {
      toast.info(`${data.name}: ${data.value} exams (${((data.value / totalExams) * 100).toFixed(1)}%)`);
    } else {
      toast.info(`${data.month}: ${data.tests} tests with ${data.avgScore}% average score`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Test Performance Analytics</h1>
        <p className="text-muted-foreground">
          Track your exam history, performance trends, and identify areas for improvement.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStatCardClick('totalExams', totalExams)}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Total Exams</h3>
            <FileText className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-semibold text-purple-600 mb-1">{totalExams}</div>
          <p className="text-sm text-muted-foreground">This semester</p>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStatCardClick('passRate', passRate)}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Pass Rate</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-semibold text-green-600 mb-1">{passRate}%</div>
          <p className="text-sm text-muted-foreground">Above average</p>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStatCardClick('avgScore', avgScore.toFixed(1))}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Average Score</h3>
            <Award className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-semibold text-blue-600 mb-1">{avgScore.toFixed(1)}</div>
          <p className="text-sm text-muted-foreground">Out of 100</p>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStatCardClick('studyTime', '42h')}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Study Time</h3>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-semibold text-orange-600 mb-1">42h</div>
          <p className="text-sm text-muted-foreground">This month</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <Card className="p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-semibold text-foreground mb-6">Exam Results Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={examResults}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {examResults.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bar Chart */}
        <Card className="p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-semibold text-foreground mb-6">Monthly Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Bar dataKey="avgScore" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.9}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Exams Table */}
      <Card className="p-6 rounded-2xl shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-6">Recent Exams</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Exam Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Score</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Duration</th>
              </tr>
            </thead>
            <tbody>
              {recentExams.map((exam) => (
                <tr key={exam.id} className="border-b border-border hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => handleExamClick(exam)}>
                  <td className="py-4 px-4">
                    <div className="font-medium text-foreground hover:text-primary">{exam.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(exam.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`font-semibold ${
                      exam.score >= 80 ? 'text-green-600' : 
                      exam.score >= 70 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {exam.score}%
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      exam.status === 'passed' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {exam.duration}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}