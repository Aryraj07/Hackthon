import { useState } from 'react';
import { Button } from './ui/button';

const categories = [
  { id: 'all', label: 'All Courses' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'cyber', label: 'Cyber Security' },
  { id: 'data', label: 'Data Science' },
  { id: 'business', label: 'Business' },
  { id: 'mba', label: 'MBA' },
  { id: 'web', label: 'Web Dev' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'design', label: 'Design' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'project', label: 'Project Mgmt' },
  { id: 'finance', label: 'Finance' },
  { id: 'programming', label: 'Programming' },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto overflow-y-hidden scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "ghost"}
          onClick={() => onCategoryChange(category.id)}
          className={`whitespace-nowrap rounded-2xl px-6 transition-all duration-200 ${
            activeCategory === category.id
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-sm'
              : 'hover:bg-purple-50 text-gray-600'
          }`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}