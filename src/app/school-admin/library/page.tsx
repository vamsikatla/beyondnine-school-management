"use client";

import React, { useState } from 'react';
import { 
  BookOpen, Search, Plus, Eye, Edit, Download, Upload, Users, 
  RefreshCw, CheckCircle, AlertCircle, Star, Settings, FileText,
  Library, QrCode, Clock, Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';

const LibraryManagementPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const books = [
    {
      id: '1', isbn: '978-0-13-468599-1', title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen', category: 'Computer Science', totalCopies: 10,
      availableCopies: 6, status: 'AVAILABLE', price: 899, rating: 4.8, reviews: 156,
      location: { section: 'CS', shelf: 'A-1', row: '3' }
    },
    {
      id: '2', isbn: '978-0-07-352428-9', title: 'Concepts of Physics',
      author: 'H.C. Verma', category: 'Physics', totalCopies: 25,
      availableCopies: 18, status: 'AVAILABLE', price: 599, rating: 4.9, reviews: 283,
      location: { section: 'PHY', shelf: 'B-2', row: '1' }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'OUT_OF_STOCK': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Library },
    { id: 'catalog', label: 'Book Catalog', icon: BookOpen },
    { id: 'issues', label: 'Issue/Return', icon: RefreshCw },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Books</p>
                <p className="text-3xl font-bold">15,248</p>
                <p className="text-blue-100 text-sm">↑ 145 this month</p>
              </div>
              <BookOpen className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Members</p>
                <p className="text-3xl font-bold">1,387</p>
                <p className="text-green-100 text-sm">↑ 23 new members</p>
              </div>
              <Users className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Books Issued</p>
                <p className="text-3xl font-bold">342</p>
                <p className="text-purple-100 text-sm">Today: 28 issues</p>
              </div>
              <RefreshCw className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Overdue Books</p>
                <p className="text-3xl font-bold">47</p>
                <p className="text-orange-100 text-sm">↓ 8 from yesterday</p>
              </div>
              <AlertCircle className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Plus className="h-6 w-6" />
              <span>Add Book</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <RefreshCw className="h-6 w-6" />
              <span>Issue Book</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <CheckCircle className="h-6 w-6" />
              <span>Return Book</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Add Member</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CatalogTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Book Catalog</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your library's book collection</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Book</span>
        </Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search books by title, author, ISBN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select>
          <option value="all">All Categories</option>
          <option value="computer-science">Computer Science</option>
          <option value="physics">Physics</option>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{book.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{book.author}</p>
                  <Badge variant="secondary" className="text-xs mt-2">{book.category}</Badge>
                </div>
                <Badge className={getStatusColor(book.status)}>Available</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Available:</span>
                  <span className="font-medium">{book.availableCopies}/{book.totalCopies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Location:</span>
                  <span className="font-medium">{book.location.section}-{book.location.shelf}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Price:</span>
                  <span className="font-medium">₹{book.price}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-slate-300")} />
                ))}
                <span className="text-sm text-slate-600 ml-1">({book.reviews})</span>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />View
                </Button>
                <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm"><QrCode className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Library Management</h1>
              <p className="text-slate-600 dark:text-slate-400">Digital catalog, book tracking, and member management</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
              <Button><Plus className="h-4 w-4 mr-2" />Add Book</Button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex space-x-1 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                    activeTab === tab.id ? "bg-blue-500 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'catalog' && <CatalogTab />}
          {activeTab === 'issues' && (
            <div className="text-center py-20">
              <RefreshCw className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">Issue/Return Management</h3>
              <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
            </div>
          )}
          {['members', 'reports', 'settings'].map(tab => (
            activeTab === tab && (
              <div key={tab} className="text-center py-20">
                <Settings className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">{tab.charAt(0).toUpperCase() + tab.slice(1)}</h3>
                <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryManagementPage;