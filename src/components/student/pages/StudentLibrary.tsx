"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Clock, Download, Eye, Plus } from 'lucide-react';

const StudentLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const borrowedBooks = [
    {
      id: '1',
      title: 'Advanced Calculus',
      author: 'James Stewart',
      isbn: '978-1285740621',
      borrowedDate: '2024-09-10',
      dueDate: '2024-10-10',
      renewals: 1,
      status: 'borrowed'
    },
    {
      id: '2',
      title: 'Physics Fundamentals',
      author: 'David Halliday',
      isbn: '978-1118230718',
      borrowedDate: '2024-09-15',
      dueDate: '2024-10-15',
      renewals: 0,
      status: 'borrowed'
    }
  ];

  const availableBooks = [
    {
      id: '1',
      title: 'Organic Chemistry',
      author: 'Paula Bruice',
      isbn: '978-0134042282',
      category: 'Chemistry',
      availability: 'Available',
      location: 'Section B-2'
    },
    {
      id: '2',
      title: 'Data Structures',
      author: 'Robert Lafore',
      isbn: '978-0672324536',
      category: 'Computer Science',
      availability: 'Available',
      location: 'Section C-1'
    }
  ];

  const digitalResources = [
    {
      id: '1',
      title: 'Mathematics Study Guide',
      type: 'PDF',
      size: '2.5 MB',
      downloads: 245
    },
    {
      id: '2',
      title: 'Physics Lab Manual',
      type: 'PDF',
      size: '8.1 MB',
      downloads: 189
    }
  ];

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Library</h1>
          <p className="text-muted-foreground">Manage your books and resources</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{borrowedBooks.length}</div>
            <p className="text-sm text-muted-foreground">Borrowed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-sm text-muted-foreground">Max Limit</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">₹0</div>
            <p className="text-sm text-muted-foreground">Fine</p>
          </CardContent>
        </Card>
      </div>

      {/* Borrowed Books */}
      <Card>
        <CardHeader>
          <CardTitle>My Borrowed Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {borrowedBooks.map(book => {
              const daysLeft = getDaysUntilDue(book.dueDate);
              return (
                <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">{book.title}</h4>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={daysLeft <= 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                        {daysLeft > 0 ? `${daysLeft} days left` : `${Math.abs(daysLeft)} days overdue`}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Due: {new Date(book.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Renew</Button>
                      <Button variant="outline" size="sm">Return</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Available Books */}
      <Card>
        <CardHeader>
          <CardTitle>Available Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableBooks.map(book => (
              <div key={book.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{book.title}</h4>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <p className="text-xs text-muted-foreground">{book.category}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Available
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  <p>ISBN: {book.isbn}</p>
                  <p>Location: {book.location}</p>
                </div>
                <Button size="sm" className="w-full">
                  <Plus className="h-3 w-3 mr-1" />
                  Reserve Book
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Digital Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Digital Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {digitalResources.map(resource => (
              <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {resource.type} • {resource.size} • {resource.downloads} downloads
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentLibrary;