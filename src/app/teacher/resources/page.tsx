"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  FolderOpen, Plus, Search, Filter, Download, Upload, ArrowLeft,
  File, FileText, Image, Video, Link, Trash2, Eye, Edit, Share2,
  BookOpen, Star, Clock, Users, Grid3X3, List, MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const initialResources = [
  {
    id: 1,
    name: "Calculus Integration Guide",
    type: "pdf",
    size: "2.5 MB",
    subject: "Mathematics",
    class: "Class 12-A",
    uploadDate: "2024-01-10",
    description: "Comprehensive guide covering all integration techniques",
    downloads: 45,
    shared: true,
    favorite: true,
    tags: ["calculus", "integration", "advanced"]
  },
  {
    id: 2,
    name: "Physics Lab Videos",
    type: "video",
    size: "125 MB",
    subject: "Physics",
    class: "Class 11-B",
    uploadDate: "2024-01-12",
    description: "Collection of physics experiment demonstration videos",
    downloads: 23,
    shared: false,
    favorite: false,
    tags: ["physics", "lab", "experiments"]
  },
  {
    id: 3,
    name: "Chemistry Periodic Table",
    type: "image",
    size: "1.2 MB",
    subject: "Chemistry",
    class: "Class 10-C",
    uploadDate: "2024-01-08",
    description: "High-resolution periodic table with element properties",
    downloads: 67,
    shared: true,
    favorite: true,
    tags: ["chemistry", "periodic-table", "elements"]
  },
  {
    id: 4,
    name: "English Literature Analysis",
    type: "document",
    size: "890 KB",
    subject: "English",
    class: "Class 12-A",
    uploadDate: "2024-01-14",
    description: "Character analysis and themes in Shakespeare works",
    downloads: 31,
    shared: true,
    favorite: false,
    tags: ["english", "literature", "shakespeare"]
  },
  {
    id: 5,
    name: "Biology Cell Structure",
    type: "presentation",
    size: "3.1 MB",
    subject: "Biology",
    class: "Class 11-A",
    uploadDate: "2024-01-06",
    description: "Interactive presentation on cell organelles and functions",
    downloads: 52,
    shared: false,
    favorite: true,
    tags: ["biology", "cells", "organelles"]
  }
];

const ResourcesPage = () => {
  const router = useRouter();
  const [resources, setResources] = React.useState(initialResources);
  const [viewMode, setViewMode] = React.useState('grid'); // grid, list
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterType, setFilterType] = React.useState("all");
  const [filterSubject, setFilterSubject] = React.useState("all");
  const [showUpload, setShowUpload] = React.useState(false);

  const [newResource, setNewResource] = React.useState({
    name: '',
    type: 'pdf',
    subject: 'Mathematics',
    class: 'Class 12-A',
    description: '',
    tags: ''
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'video': return <Video className="h-5 w-5 text-blue-500" />;
      case 'image': return <Image className="h-5 w-5 text-green-500" />;
      case 'document': return <File className="h-5 w-5 text-blue-600" />;
      case 'presentation': return <BookOpen className="h-5 w-5 text-orange-500" />;
      default: return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const formatFileSize = (size) => {
    return size;
  };

  const handleUploadResource = () => {
    if (newResource.name && newResource.description) {
      const resource = {
        id: resources.length + 1,
        ...newResource,
        size: "1.0 MB",
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0,
        shared: false,
        favorite: false,
        tags: newResource.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };
      setResources([resource, ...resources]);
      setNewResource({
        name: '',
        type: 'pdf',
        subject: 'Mathematics',
        class: 'Class 12-A',
        description: '',
        tags: ''
      });
      setShowUpload(false);
      alert('Resource uploaded successfully!');
    }
  };

  const toggleFavorite = (id) => {
    setResources(resources.map(resource =>
      resource.id === id ? { ...resource, favorite: !resource.favorite } : resource
    ));
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || resource.type === filterType;
    const matchesSubject = filterSubject === "all" || resource.subject === filterSubject;
    return matchesSearch && matchesType && matchesSubject;
  });

  const resourceStats = {
    total: resources.length,
    favorites: resources.filter(r => r.favorite).length,
    shared: resources.filter(r => r.shared).length,
    totalDownloads: resources.reduce((sum, r) => sum + r.downloads, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/teacher/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  Resources
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Manage your teaching materials and resources
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none border-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none border-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="gradient" onClick={() => setShowUpload(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Resource
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Resources</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{resourceStats.total}</p>
                </div>
                <FolderOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Favorites</p>
                  <p className="text-2xl font-bold text-yellow-600">{resourceStats.favorites}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Shared</p>
                  <p className="text-2xl font-bold text-green-600">{resourceStats.shared}</p>
                </div>
                <Share2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Downloads</p>
                  <p className="text-2xl font-bold text-purple-600">{resourceStats.totalDownloads}</p>
                </div>
                <Download className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search resources, descriptions, tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="pdf">PDF Documents</option>
                <option value="video">Videos</option>
                <option value="image">Images</option>
                <option value="document">Documents</option>
                <option value="presentation">Presentations</option>
              </Select>
              <Select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                <option value="all">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Upload Modal */}
        {showUpload && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload New Resource
                </CardTitle>
                <Button variant="ghost" onClick={() => setShowUpload(false)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Resource Name *
                  </label>
                  <Input
                    value={newResource.name}
                    onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                    placeholder="Enter resource name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Type
                  </label>
                  <Select
                    value={newResource.type}
                    onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                    <option value="document">Document</option>
                    <option value="presentation">Presentation</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <Select
                    value={newResource.subject}
                    onChange={(e) => setNewResource({...newResource, subject: e.target.value})}
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Class
                  </label>
                  <Select
                    value={newResource.class}
                    onChange={(e) => setNewResource({...newResource, class: e.target.value})}
                  >
                    <option value="Class 12-A">Class 12-A</option>
                    <option value="Class 11-B">Class 11-B</option>
                    <option value="Class 10-C">Class 10-C</option>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    className="w-full p-3 border border-slate-300 rounded-lg resize-none"
                    rows={3}
                    value={newResource.description}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                    placeholder="Describe the resource and its contents..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <Input
                    value={newResource.tags}
                    onChange={(e) => setNewResource({...newResource, tags: e.target.value})}
                    placeholder="e.g., calculus, integration, advanced"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowUpload(false)}>
                  Cancel
                </Button>
                <Button variant="gradient" onClick={handleUploadResource}>
                  Upload Resource
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resources Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover-lift group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(resource.type)}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">{resource.name}</CardTitle>
                        <CardDescription className="truncate">
                          {resource.subject} • {resource.class}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(resource.id)}
                        className={resource.favorite ? 'text-yellow-500' : ''}
                      >
                        <Star className={`h-4 w-4 ${resource.favorite ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {resource.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{resource.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <div>Size: {formatFileSize(resource.size)}</div>
                      <div>Downloads: {resource.downloads}</div>
                      <div>Uploaded: {formatDate(resource.uploadDate)}</div>
                      <div className="flex items-center space-x-1">
                        {resource.shared && <Share2 className="h-3 w-3" />}
                        {resource.favorite && <Star className="h-3 w-3 fill-current text-yellow-500" />}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Name</th>
                      <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Type</th>
                      <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Subject</th>
                      <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Size</th>
                      <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Downloads</th>
                      <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Date</th>
                      <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((resource, index) => (
                      <tr key={resource.id} className={`border-b border-slate-200 dark:border-slate-700 ${index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(resource.type)}
                            <div>
                              <div className="font-medium text-slate-900 dark:text-white">{resource.name}</div>
                              <div className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
                                {resource.description}
                              </div>
                            </div>
                            {resource.favorite && <Star className="h-4 w-4 fill-current text-yellow-500" />}
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400 capitalize">
                          {resource.type}
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                          {resource.subject}
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                          {formatFileSize(resource.size)}
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                          {resource.downloads}
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                          {formatDate(resource.uploadDate)}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredResources.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FolderOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No resources found matching your search criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;