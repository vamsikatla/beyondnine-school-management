import React, { useState } from 'react';
import { X, Edit, Trash2, Calendar, Clock, Users, BookOpen, FileText, Download, Share2, Eye, GraduationCap } from 'lucide-react';
import { Modal } from "../Modal";
import { Button } from '../Button';
import { Card } from '../Card';
import { Badge } from '../Badge';

interface ExamData {
  id: string;
  title: string;
  subject: string;
  examType: 'midterm' | 'final' | 'quiz' | 'assignment' | 'practical' | 'viva' | 'other';
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  totalMarks: number;
  passingMarks: number;
  venue: string;
  supervisor: string;
  instructions: string[];
  syllabusTopics: string[];
  grade: string;
  section: string;
  academicYear: string;
  semester: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled' | 'postponed';
  studentsEnrolled: number;
  studentsAppeared?: number;
  averageScore?: number;
  highestScore?: number;
  lowestScore?: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  attachments?: string[];
}

interface ExamDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: ExamData;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewResults?: () => void;
  onDownloadReport?: () => void;
  onShareExam?: () => void;
}

const EXAM_TYPE_CONFIG = {
  midterm: { label: 'Midterm Exam', color: 'blue', icon: '📋' },
  final: { label: 'Final Exam', color: 'red', icon: '📊' },
  quiz: { label: 'Quiz', color: 'green', icon: '❓' },
  assignment: { label: 'Assignment', color: 'purple', icon: '📝' },
  practical: { label: 'Practical Exam', color: 'orange', icon: '⚗️' },
  viva: { label: 'Viva Voce', color: 'yellow', icon: '🎤' },
  other: { label: 'Other', color: 'gray', icon: '📄' }
};

const STATUS_CONFIG = {
  scheduled: { label: 'Scheduled', color: 'secondary', icon: '⏰' },
  ongoing: { label: 'Ongoing', color: 'warning', icon: '▶️' },
  completed: { label: 'Completed', color: 'success', icon: '✅' },
  cancelled: { label: 'Cancelled', color: 'destructive', icon: '❌' },
  postponed: { label: 'Postponed', color: 'warning', icon: '⏸️' }
};

export const ExamDetailModal: React.FC<ExamDetailModalProps> = ({
  isOpen,
  onClose,
  exam,
  onEdit,
  onDelete,
  onViewResults,
  onDownloadReport,
  onShareExam
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'syllabus' | 'statistics' | 'instructions'>('details');

  // Provide default values for exam data
  const examData = {
    id: '',
    title: 'Exam Details',
    subject: 'Unknown',
    examType: 'other' as const,
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '11:00',
    duration: 120,
    totalMarks: 100,
    passingMarks: 40,
    venue: 'TBD',
    supervisor: 'TBD',
    instructions: [],
    syllabusTopics: [],
    grade: 'N/A',
    section: 'N/A',
    academicYear: '2024-25',
    semester: 'N/A',
    status: 'scheduled' as const,
    studentsEnrolled: 0,
    createdBy: 'System',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...exam
  };

  const examTypeConfig = EXAM_TYPE_CONFIG[examData.examType] || EXAM_TYPE_CONFIG.other;
  const statusConfig = STATUS_CONFIG[examData.status] || STATUS_CONFIG.scheduled;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderDetailsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Exam Schedule
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Date</label>
              <p className="font-medium">{formatDate(examData.date)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Start Time</label>
                <p className="font-medium">{formatTime(examData.startTime)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">End Time</label>
                <p className="font-medium">{formatTime(examData.endTime)}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Duration</label>
              <p className="font-medium">{examData.duration} minutes ({Math.floor(examData.duration / 60)}h {examData.duration % 60}m)</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Venue</label>
              <p className="font-medium">{examData.venue}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-500" />
            Academic Details
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Subject</label>
              <p className="font-medium">{examData.subject}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Grade</label>
                <p className="font-medium">{examData.grade}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Section</label>
                <p className="font-medium">{examData.section}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Academic Year</label>
              <p className="font-medium">{examData.academicYear}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Semester</label>
              <p className="font-medium">{examData.semester}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Supervisor</label>
              <p className="font-medium">{examData.supervisor}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-500" />
            Marking Scheme
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Total Marks</label>
              <p className="font-medium text-lg">{examData.totalMarks}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Passing Marks</label>
              <p className="font-medium text-lg">{examData.passingMarks}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Pass Percentage</label>
              <p className="font-medium text-lg">{((examData.passingMarks / examData.totalMarks) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            Enrollment
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Students Enrolled</label>
              <p className="font-medium text-lg">{examData.studentsEnrolled}</p>
            </div>
            {examData.studentsAppeared !== undefined && (
              <div>
                <label className="text-sm font-medium text-gray-600">Students Appeared</label>
                <p className="font-medium text-lg">{examData.studentsAppeared}</p>
              </div>
            )}
            {examData.studentsAppeared !== undefined && (
              <div>
                <label className="text-sm font-medium text-gray-600">Attendance Rate</label>
                <p className="font-medium text-lg">{((examData.studentsAppeared / examData.studentsEnrolled) * 100).toFixed(1)}%</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {examData.description && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Description
          </h3>
          <p className="text-gray-700 leading-relaxed">{examData.description}</p>
        </Card>
      )}
    </div>
  );

  const renderSyllabusTab = () => (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Syllabus Topics</h3>
        {examData.syllabusTopics.length > 0 ? (
          <div className="space-y-2">
            {examData.syllabusTopics.map((topic, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                <div className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No syllabus topics specified for this exam.</p>
        )}
      </Card>

      {examData.attachments && examData.attachments.length > 0 && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Attachments</h3>
          <div className="space-y-2">
            {examData.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border border-gray-200 rounded">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="flex-1">{attachment}</span>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );

  const renderStatisticsTab = () => (
    <div className="space-y-6">
      {examData.status === 'completed' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{examData.averageScore}</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{examData.highestScore}</div>
              <div className="text-sm text-gray-600">Highest Score</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{examData.lowestScore}</div>
              <div className="text-sm text-gray-600">Lowest Score</div>
            </Card>
          </div>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pass Rate</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Above Average</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Excellent (90%+)</span>
                  <span>20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <Card className="p-8 text-center">
          <div className="text-gray-500 mb-2">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Statistics Available</h3>
          <p className="text-gray-500">
            Statistics will be available after the exam is completed and results are processed.
          </p>
        </Card>
      )}
    </div>
  );

  const renderInstructionsTab = () => (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Exam Instructions</h3>
        {examData.instructions.length > 0 ? (
          <div className="space-y-3">
            {examData.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 text-white text-sm rounded-full flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">{instruction}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No specific instructions provided for this exam.</p>
        )}
      </Card>

      <Card className="p-4 bg-yellow-50 border-yellow-200">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">General Guidelines</h3>
        <ul className="space-y-2 text-sm text-yellow-700">
          <li>• Report to the examination hall 15 minutes before the scheduled start time</li>
          <li>• Bring your student ID card and hall ticket</li>
          <li>• Mobile phones and electronic devices are not allowed</li>
          <li>• Use only blue or black ink pens</li>
          <li>• Maintain silence and follow supervisor instructions</li>
        </ul>
      </Card>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={examData.title}
      icon={<FileText className="w-6 h-6 text-blue-500" />}
    >
      <div className="space-y-6">
        {/* Header with badges and actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b">
          <div className="flex flex-wrap gap-2">
            <Badge variant={statusConfig.color as any} size="sm">
              {statusConfig.icon} {statusConfig.label}
            </Badge>
            <Badge variant="secondary" size="sm">
              {examTypeConfig.icon} {examTypeConfig.label}
            </Badge>
          </div>
          
          <div className="flex gap-2">
            {onViewResults && examData.status === 'completed' && (
              <Button variant="outline" size="sm" onClick={onViewResults}>
                <Eye className="w-4 h-4 mr-1" />
                Results
              </Button>
            )}
            {onDownloadReport && (
              <Button variant="outline" size="sm" onClick={onDownloadReport}>
                <Download className="w-4 h-4 mr-1" />
                Report
              </Button>
            )}
            {onShareExam && (
              <Button variant="outline" size="sm" onClick={onShareExam}>
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            )}
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="outline" size="sm" onClick={onDelete} className="text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'details', label: 'Details', icon: FileText },
            { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
            { id: 'statistics', label: 'Statistics', icon: FileText },
            { id: 'instructions', label: 'Instructions', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'details' && renderDetailsTab()}
          {activeTab === 'syllabus' && renderSyllabusTab()}
          {activeTab === 'statistics' && renderStatisticsTab()}
          {activeTab === 'instructions' && renderInstructionsTab()}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t text-sm text-gray-500">
          <div className="flex justify-between">
            <span>Created by {examData.createdBy} on {new Date(examData.createdAt).toLocaleDateString()}</span>
            <span>Last updated: {new Date(examData.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};