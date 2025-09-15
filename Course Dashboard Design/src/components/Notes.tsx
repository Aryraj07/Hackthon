import { useState } from 'react';
import { Plus, Search, Edit3, Trash2, Calendar, BookOpen, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';

interface Note {
  id: string;
  title: string;
  content: string;
  course: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'Neural Networks Basics',
    content: 'Neural networks are computing systems inspired by biological neural networks. Key concepts include:\n\n• Neurons (nodes)\n• Weights and biases\n• Activation functions\n• Forward propagation\n• Backpropagation\n\nRemember: Start with simple architectures before moving to complex models.',
    course: 'Machine Learning Fundamentals',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    tags: ['AI', 'Deep Learning']
  },
  {
    id: '2',
    title: 'Data Preprocessing Steps',
    content: 'Important steps for data preprocessing:\n\n1. Data Cleaning\n   - Handle missing values\n   - Remove duplicates\n   - Fix inconsistent data\n\n2. Data Transformation\n   - Normalization\n   - Standardization\n   - Encoding categorical variables\n\n3. Feature Engineering\n   - Create new features\n   - Select relevant features',
    course: 'Data Science with Python',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    tags: ['Data Science', 'Python']
  },
  {
    id: '3',
    title: 'Cybersecurity Fundamentals',
    content: 'Core principles of cybersecurity:\n\n• Confidentiality - Information is accessible only to authorized users\n• Integrity - Information remains accurate and complete\n• Availability - Systems and data are accessible when needed\n\nCommon threats:\n- Malware\n- Phishing\n- Social engineering\n- DDoS attacks',
    course: 'Cybersecurity Fundamentals',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    tags: ['Security', 'Ethics']
  }
];

export function Notes() {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', course: '', tags: '' });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNote = () => {
    if (newNote.title && newNote.content) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        course: newNote.course || 'General',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', course: '', tags: '' });
      setIsCreating(false);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Notes 📝</h1>
        <p className="text-gray-600">
          Keep track of your learning with organized notes from all your courses.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Notes List */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                <Dialog open={isCreating} onOpenChange={setIsCreating}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Note</DialogTitle>
                      <DialogDescription>
                        Add a new note to organize your learning materials and important insights.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Note title..."
                        value={newNote.title}
                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        className="rounded-xl"
                      />
                      <Input
                        placeholder="Course name..."
                        value={newNote.course}
                        onChange={(e) => setNewNote({ ...newNote, course: e.target.value })}
                        className="rounded-xl"
                      />
                      <Input
                        placeholder="Tags (comma separated)..."
                        value={newNote.tags}
                        onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                        className="rounded-xl"
                      />
                      <Textarea
                        placeholder="Write your note content here..."
                        value={newNote.content}
                        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        rows={6}
                        className="rounded-xl"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" onClick={() => setIsCreating(false)} className="rounded-xl">
                          Cancel
                        </Button>
                        <Button onClick={handleCreateNote} className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500">
                          Create Note
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedNote?.id === note.id ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 truncate">{note.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 h-6 w-6"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {note.content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <BookOpen className="w-3 h-3" />
                    <span>{note.course}</span>
                    <Calendar className="w-3 h-3 ml-2" />
                    <span>{formatDate(note.createdAt)}</span>
                  </div>
                </div>
              ))}
              
              {filteredNotes.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No notes found</p>
                  <p className="text-sm">Create your first note to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Note Detail View */}
        <div className="col-span-12 lg:col-span-8">
          {selectedNote ? (
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{selectedNote.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{selectedNote.course}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Created {formatDate(selectedNote.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-xl">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
                {selectedNote.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedNote.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="rounded-lg">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none">
                  {selectedNote.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Select a note to view</h3>
              <p className="text-gray-600">
                Choose a note from the list on the left to view its full content, or create a new note to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}