import * as React from "react";
import { Modal, ModalFooter } from "./Modal";
import { Button } from "./Button";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";
import { User, UserRole } from "@/types";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  BookOpen,
  GraduationCap,
  FileText,
  Download,
  Edit,
  Eye,
  Star,
  Clock,
  Building,
  Users,
  Activity,
  BarChart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Copy,
  ExternalLink,
  Print,
  Share2,
  Archive
} from "lucide-react";

// Base Detail Modal Interface
interface BaseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onEdit?: () => void;
  onDelete?: () => void;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "destructive" | "secondary";
    icon?: React.ReactNode;
  }>;
}

// User Detail Modal
interface UserDetailModalProps extends BaseDetailModalProps {
  user: User & {
    classInfo?: { name: string; grade: string; section: string };
    subjects?: Array<{ name: string; code: string }>;
    stats?: {
      attendance?: number;
      assignments?: number;
      grades?: { average: number; total: number };
    };
    recentActivity?: Array<{
      type: string;
      description: string;
      timestamp: Date;
    }>;
  };
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  user,
  onEdit,
  onDelete,
  actions = []
}) => {
  const getRoleColor = (role: UserRole) => {
    const colors = {
      [UserRole.SUPER_ADMIN]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200',
      [UserRole.SCHOOL_ADMIN]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
      [UserRole.TEACHER]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
      [UserRole.STUDENT]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
      [UserRole.PARENT]: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200',
      [UserRole.ACCOUNTANT]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200',
      [UserRole.LIBRARIAN]: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200',
      [UserRole.TRANSPORT_MANAGER]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200',
      [UserRole.NURSE]: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
      [UserRole.FACILITY_MANAGER]: 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200',
      [UserRole.SECURITY_MANAGER]: 'bg-slate-100 text-slate-800 dark:bg-slate-900/50 dark:text-slate-200'
    };
    return colors[role] || colors[UserRole.STUDENT];
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="xl"
      className="max-h-[90vh] overflow-y-auto"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4 p-6 bg-muted/50 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={`${user.firstName} ${user.lastName}`} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <UserIcon className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-muted-foreground">@{user.username}</p>
            
            <div className="flex items-center gap-2 mt-2">
              <Badge className={cn("text-xs", getRoleColor(user.role))}>
                {user.role.replace('_', ' ')}
              </Badge>
              <Badge className={cn("text-xs", getStatusColor(user.isActive))}>
                {user.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Joined</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {user.lastLogin && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Last Login</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">School ID</p>
                <p className="text-sm text-muted-foreground">{user.schoolId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role-specific Information */}
        {user.role === UserRole.STUDENT && user.classInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Class</p>
                  <p className="text-sm text-muted-foreground">
                    {user.classInfo.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Grade</p>
                  <p className="text-sm text-muted-foreground">
                    {user.classInfo.grade}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Section</p>
                  <p className="text-sm text-muted-foreground">
                    {user.classInfo.section}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {user.role === UserRole.TEACHER && user.subjects && (
          <Card>
            <CardHeader>
              <CardTitle>Teaching Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.subjects.map((subject, index) => (
                  <Badge key={index} variant="secondary">
                    {subject.name} ({subject.code})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics */}
        {user.stats && (
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {user.stats.attendance !== undefined && (
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {user.stats.attendance}%
                    </p>
                    <p className="text-sm text-muted-foreground">Attendance</p>
                  </div>
                )}
                
                {user.stats.assignments !== undefined && (
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {user.stats.assignments}
                    </p>
                    <p className="text-sm text-muted-foreground">Assignments</p>
                  </div>
                )}
                
                {user.stats.grades && (
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {user.stats.grades.average}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Avg Grade ({user.stats.grades.total} total)
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        {user.recentActivity && user.recentActivity.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.recentActivity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <ModalFooter>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          {onEdit && (
            <Button variant="default" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
          
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "outline"}
              onClick={action.onClick}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Button>
          ))}
          
          {onDelete && (
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

// Report Detail Modal
interface ReportDetailModalProps extends BaseDetailModalProps {
  report: {
    id: string;
    name: string;
    type: string;
    generatedBy: string;
    generatedAt: Date;
    description?: string;
    data: any;
    charts?: Array<{
      type: 'bar' | 'line' | 'pie' | 'donut';
      title: string;
      data: any[];
    }>;
    summary?: {
      totalRecords: number;
      keyMetrics?: Array<{ label: string; value: string | number; trend?: 'up' | 'down' | 'stable' }>;
    };
  };
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  report,
  onEdit,
  actions = []
}) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      case 'stable':
        return <BarChart className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="2xl"
      className="max-h-[90vh] overflow-y-auto"
    >
      <div className="space-y-6">
        {/* Report Header */}
        <div className="p-6 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold">{report.name}</h3>
              <p className="text-muted-foreground capitalize">{report.type} Report</p>
            </div>
            <Badge variant="secondary">{report.id}</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Generated By</p>
              <p className="text-muted-foreground">{report.generatedBy}</p>
            </div>
            <div>
              <p className="font-medium">Generated On</p>
              <p className="text-muted-foreground">
                {new Date(report.generatedAt).toLocaleString()}
              </p>
            </div>
          </div>
          
          {report.description && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{report.description}</p>
            </div>
          )}
        </div>

        {/* Summary Section */}
        {report.summary && (
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Total Records: <span className="font-semibold">{report.summary.totalRecords.toLocaleString()}</span>
                </p>
              </div>
              
              {report.summary.keyMetrics && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {report.summary.keyMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{metric.label}</p>
                          <p className="text-lg font-semibold">{metric.value}</p>
                        </div>
                        {metric.trend && getTrendIcon(metric.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Charts Section */}
        {report.charts && report.charts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Visual Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {report.charts.map((chart, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-4">{chart.title}</h4>
                    <div className="h-40 bg-muted/30 rounded flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        {chart.type.toUpperCase()} Chart Placeholder
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Data Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-60 overflow-y-auto">
              <pre className="text-xs bg-muted/50 p-4 rounded-lg overflow-x-auto">
                {JSON.stringify(report.data, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      <ModalFooter>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          
          <Button variant="outline">
            <Print className="w-4 h-4 mr-2" />
            Print
          </Button>
          
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "outline"}
              onClick={action.onClick}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Button>
          ))}
          
          {onEdit && (
            <Button variant="default" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Report
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

// Exam Detail Modal
interface ExamDetailModalProps extends BaseDetailModalProps {
  exam: {
    id: string;
    name: string;
    type: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    totalMarks: number;
    passingMarks: number;
    instructions: string;
    subjects: Array<{ name: string; marks: number; passingMarks: number }>;
    classes: Array<{ name: string; enrolled: number; completed: number }>;
    statistics?: {
      totalStudents: number;
      completed: number;
      pending: number;
      averageScore: number;
      passRate: number;
    };
  };
}

export const ExamDetailModal: React.FC<ExamDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  exam,
  onEdit,
  actions = []
}) => {
  const getExamStatus = () => {
    const now = new Date();
    if (now < exam.startDate) return { status: 'Upcoming', color: 'text-blue-600' };
    if (now > exam.endDate) return { status: 'Completed', color: 'text-green-600' };
    return { status: 'Ongoing', color: 'text-yellow-600' };
  };

  const examStatus = getExamStatus();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="xl"
      className="max-h-[90vh] overflow-y-auto"
    >
      <div className="space-y-6">
        {/* Exam Header */}
        <div className="p-6 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold">{exam.name}</h3>
              <p className="text-muted-foreground capitalize">{exam.type}</p>
            </div>
            <Badge className={examStatus.color}>
              {examStatus.status}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">Start Date</p>
              <p className="text-muted-foreground">
                {exam.startDate.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="font-medium">End Date</p>
              <p className="text-muted-foreground">
                {exam.endDate.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="font-medium">Duration</p>
              <p className="text-muted-foreground">{exam.duration} minutes</p>
            </div>
            <div>
              <p className="font-medium">Total Marks</p>
              <p className="text-muted-foreground">{exam.totalMarks}</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {exam.statistics && (
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {exam.statistics.totalStudents}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {exam.statistics.completed}
                  </p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {exam.statistics.pending}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {exam.statistics.averageScore}%
                  </p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
                
                <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg">
                  <p className="text-2xl font-bold text-indigo-600">
                    {exam.statistics.passRate}%
                  </p>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subjects */}
        <Card>
          <CardHeader>
            <CardTitle>Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exam.subjects.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{subject.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Total: {subject.marks}</span>
                    <span>Pass: {subject.passingMarks}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exam.classes.map((cls, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{cls.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600">
                      {cls.completed} completed
                    </span>
                    <span className="text-muted-foreground">
                      / {cls.enrolled} total
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {exam.instructions}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ModalFooter>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
          
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "outline"}
              onClick={action.onClick}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Button>
          ))}
          
          {onEdit && (
            <Button variant="default" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Exam
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

// Generic Item Detail Modal
interface ItemDetailModalProps extends BaseDetailModalProps {
  item: {
    [key: string]: any;
  };
  fields: Array<{
    key: string;
    label: string;
    type: 'text' | 'date' | 'number' | 'badge' | 'boolean' | 'array';
    render?: (value: any) => React.ReactNode;
  }>;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  item,
  fields,
  onEdit,
  actions = []
}) => {
  const renderFieldValue = (field: typeof fields[0], value: any) => {
    if (field.render) {
      return field.render(value);
    }

    switch (field.type) {
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'boolean':
        return (
          <Badge className={value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {value ? 'Yes' : 'No'}
          </Badge>
        );
      case 'badge':
        return <Badge variant="secondary">{value}</Badge>;
      case 'array':
        return Array.isArray(value) ? value.join(', ') : value;
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      default:
        return value?.toString() || '-';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
    >
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {field.label}
                  </p>
                  <div className="text-sm">
                    {renderFieldValue(field, item[field.key])}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ModalFooter>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "outline"}
              onClick={action.onClick}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Button>
          ))}
          
          {onEdit && (
            <Button variant="default" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};