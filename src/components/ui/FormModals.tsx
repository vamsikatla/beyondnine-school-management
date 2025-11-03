import * as React from "react";
import { Modal, ModalFooter } from "./Modal";
import { Button } from "./Button";
import { Input, SearchInput } from "./Input";
import { Select } from "./Select";
import { Card, CardContent } from "./Card";
import { cn } from "@/lib/utils";
import { UserRole, User } from "@/types";
import { 
  User as UserIcon, 
  Users, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Save, 
  X,
  Upload,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit
} from "lucide-react";

// Base Form Modal Interface
interface BaseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void | Promise<void>;
  title: string;
  submitText?: string;
  isLoading?: boolean;
  initialData?: any;
  mode?: "create" | "edit";
}

// User Form Modal (Students, Teachers, Parents, etc.)
interface UserFormModalProps extends BaseFormModalProps {
  userType: "student" | "teacher" | "parent" | "school-admin" | "staff";
  schools?: Array<{ id: string; name: string; code: string }>;
  classes?: Array<{ id: string; name: string; grade: string }>;
  subjects?: Array<{ id: string; name: string }>;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  submitText = "Save",
  isLoading = false,
  initialData,
  mode = "create",
  userType,
  schools = [],
  classes = [],
  subjects = []
}) => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    schoolId: "",
    classId: "",
    rollNumber: "",
    admissionDate: "",
    parentPhone: "",
    parentEmail: "",
    bloodGroup: "",
    emergencyContact: "",
    subjects: [] as string[],
    qualifications: "",
    experience: "",
    salary: "",
    department: "",
    joinDate: "",
    ...initialData
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [avatar, setAvatar] = React.useState<File | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const renderUserTypeFields = () => {
    switch (userType) {
      case "student":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Class"
                value={formData.classId}
                onValueChange={(value) => handleChange("classId", value)}
                required
              >
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name} - {cls.grade}</option>
                ))}
              </Select>
              
              <Input
                label="Roll Number"
                value={formData.rollNumber}
                onChange={(e) => handleChange("rollNumber", e.target.value)}
                placeholder="Enter roll number"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Admission Date"
                type="date"
                value={formData.admissionDate}
                onChange={(e) => handleChange("admissionDate", e.target.value)}
                required
              />
              
              <Select
                label="Blood Group"
                value={formData.bloodGroup}
                onValueChange={(value) => handleChange("bloodGroup", value)}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Parent Phone"
                value={formData.parentPhone}
                onChange={(e) => handleChange("parentPhone", e.target.value)}
                placeholder="Parent phone number"
                required
              />
              
              <Input
                label="Parent Email"
                type="email"
                value={formData.parentEmail}
                onChange={(e) => handleChange("parentEmail", e.target.value)}
                placeholder="Parent email address"
                required
              />
            </div>

            <Input
              label="Emergency Contact"
              value={formData.emergencyContact}
              onChange={(e) => handleChange("emergencyContact", e.target.value)}
              placeholder="Emergency contact number"
              required
            />
          </>
        );

      case "teacher":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Department"
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                placeholder="Department"
                required
              />
              
              <Input
                label="Join Date"
                type="date"
                value={formData.joinDate}
                onChange={(e) => handleChange("joinDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subjects</label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {subjects.map(subject => (
                  <label key={subject.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.subjects.includes(subject.id)}
                      onChange={(e) => {
                        const updatedSubjects = e.target.checked
                          ? [...formData.subjects, subject.id]
                          : formData.subjects.filter(id => id !== subject.id);
                        handleChange("subjects", updatedSubjects);
                      }}
                      className="rounded"
                    />
                    {subject.name}
                  </label>
                ))}
              </div>
            </div>

            <Input
              label="Qualifications"
              value={formData.qualifications}
              onChange={(e) => handleChange("qualifications", e.target.value)}
              placeholder="Educational qualifications"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Experience (Years)"
                type="number"
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                placeholder="Years of experience"
                min="0"
              />
              
              <Input
                label="Salary"
                type="number"
                value={formData.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
                placeholder="Monthly salary"
                min="0"
              />
            </div>
          </>
        );

      case "parent":
        return (
          <>
            <Input
              label="Occupation"
              value={formData.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
              placeholder="Occupation"
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Children</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {/* This would be populated with student selection */}
                <p className="text-sm text-muted-foreground">
                  Select associated students after creating the parent account
                </p>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      className="max-h-[90vh] overflow-y-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {avatar ? (
              <img 
                src={URL.createObjectURL(avatar)} 
                alt="Avatar" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <UserIcon className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              id="avatar-upload"
            />
            <label htmlFor="avatar-upload">
              <Button type="button" variant="outline" size="sm" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </span>
              </Button>
            </label>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="First name"
            required
          />
          
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Last name"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email address"
            required
          />
          
          <Input
            label="Phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Phone number"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            required
          />
          
          <Select
            label="School"
            value={formData.schoolId}
            onValueChange={(value) => handleChange("schoolId", value)}
            required
          >
            <option value="">Select School</option>
            {schools.map(school => (
              <option key={school.id} value={school.id}>{school.name}</option>
            ))}
          </Select>
        </div>

        <Input
          label="Address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="Complete address"
        />

        {/* User Type Specific Fields */}
        {renderUserTypeFields()}

        {/* Password for new users */}
        {mode === "create" && (
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Password"
              required
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
          </div>
        )}

        <ModalFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {submitText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

// Class/Course Form Modal
interface ClassFormModalProps extends BaseFormModalProps {
  teachers?: Array<{ id: string; name: string; subject: string }>;
  subjects?: Array<{ id: string; name: string }>;
}

export const ClassFormModal: React.FC<ClassFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  submitText = "Save",
  isLoading = false,
  initialData,
  teachers = [],
  subjects = []
}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    grade: "",
    section: "",
    capacity: "",
    room: "",
    classTeacherId: "",
    subjects: [] as string[],
    schedule: "",
    academicYear: "",
    ...initialData
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Class Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., Mathematics"
            required
          />
          
          <Input
            label="Grade"
            value={formData.grade}
            onChange={(e) => handleChange("grade", e.target.value)}
            placeholder="e.g., 10"
            required
          />
          
          <Input
            label="Section"
            value={formData.section}
            onChange={(e) => handleChange("section", e.target.value)}
            placeholder="e.g., A"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => handleChange("capacity", e.target.value)}
            placeholder="Max students"
            min="1"
            required
          />
          
          <Input
            label="Room"
            value={formData.room}
            onChange={(e) => handleChange("room", e.target.value)}
            placeholder="Room number"
            required
          />
          
          <Input
            label="Academic Year"
            value={formData.academicYear}
            onChange={(e) => handleChange("academicYear", e.target.value)}
            placeholder="e.g., 2024-2025"
            required
          />
        </div>

        <Select
          label="Class Teacher"
          value={formData.classTeacherId}
          onValueChange={(value) => handleChange("classTeacherId", value)}
          required
        >
          <option value="">Select Class Teacher</option>
          {teachers.map(teacher => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name} ({teacher.subject})
            </option>
          ))}
        </Select>

        <div className="space-y-2">
          <label className="text-sm font-medium">Subjects</label>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {subjects.map(subject => (
              <label key={subject.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.subjects.includes(subject.id)}
                  onChange={(e) => {
                    const updatedSubjects = e.target.checked
                      ? [...formData.subjects, subject.id]
                      : formData.subjects.filter(id => id !== subject.id);
                    handleChange("subjects", updatedSubjects);
                  }}
                  className="rounded"
                />
                {subject.name}
              </label>
            ))}
          </div>
        </div>

        <ModalFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {submitText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

// Exam Form Modal
export const ExamFormModal: React.FC<BaseFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  submitText = "Save",
  isLoading = false,
  initialData
}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    type: "",
    startDate: "",
    endDate: "",
    duration: "",
    totalMarks: "",
    passingMarks: "",
    instructions: "",
    classes: [] as string[],
    subjects: [] as string[],
    ...initialData
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Exam Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., Mid Term Examination"
            required
          />
          
          <Select
            label="Exam Type"
            value={formData.type}
            onValueChange={(value) => handleChange("type", value)}
            required
          >
            <option value="">Select Type</option>
            <option value="unit-test">Unit Test</option>
            <option value="mid-term">Mid Term</option>
            <option value="final">Final Exam</option>
            <option value="assignment">Assignment</option>
            <option value="project">Project</option>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            required
          />
          
          <Input
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Duration (minutes)"
            type="number"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            placeholder="120"
            min="1"
            required
          />
          
          <Input
            label="Total Marks"
            type="number"
            value={formData.totalMarks}
            onChange={(e) => handleChange("totalMarks", e.target.value)}
            placeholder="100"
            min="1"
            required
          />
          
          <Input
            label="Passing Marks"
            type="number"
            value={formData.passingMarks}
            onChange={(e) => handleChange("passingMarks", e.target.value)}
            placeholder="40"
            min="1"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Instructions</label>
          <textarea
            className="w-full h-24 px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            value={formData.instructions}
            onChange={(e) => handleChange("instructions", e.target.value)}
            placeholder="Exam instructions for students..."
          />
        </div>

        <ModalFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {submitText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

// Quick Add Modal for common entities
interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  entity: "subject" | "announcement" | "assignment" | "event";
  title: string;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  entity,
  title
}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    date: "",
    dueDate: "",
    priority: "medium"
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ name: "", description: "", date: "", dueDate: "", priority: "medium" });
  };

  const renderEntityFields = () => {
    switch (entity) {
      case "subject":
        return (
          <>
            <Input
              label="Subject Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Mathematics"
              required
            />
            <Input
              label="Subject Code"
              value={formData.code}
              onChange={(e) => handleChange("code", e.target.value)}
              placeholder="e.g., MATH101"
              required
            />
          </>
        );
      
      case "announcement":
        return (
          <>
            <Input
              label="Title"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Announcement title"
              required
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                className="w-full h-24 px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Announcement message..."
                required
              />
            </div>
            <Select
              label="Priority"
              value={formData.priority}
              onValueChange={(value) => handleChange("priority", value)}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </Select>
          </>
        );

      case "assignment":
        return (
          <>
            <Input
              label="Assignment Title"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Assignment title"
              required
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full h-24 px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Assignment description..."
                required
              />
            </div>
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              required
            />
          </>
        );

      case "event":
        return (
          <>
            <Input
              label="Event Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Event name"
              required
            />
            <Input
              label="Event Date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              required
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full h-24 px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Event description..."
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="default"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderEntityFields()}
        
        <ModalFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            <Plus className="w-4 h-4 mr-2" />
            Add {entity}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};