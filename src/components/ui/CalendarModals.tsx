import * as React from "react";
import { Modal, ModalFooter } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Users,
  MapPin,
  Bell,
  Repeat,
  Save,
  X,
  Check,
  AlertCircle,
  Star,
  Circle,
  Square
} from "lucide-react";

// Calendar/Date Picker Modal
interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: Date | Date[]) => void;
  selectedDate?: Date | Date[];
  mode?: "single" | "multiple" | "range";
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  title?: string;
  showTime?: boolean;
  availableTimeSlots?: string[];
  selectedTimeSlot?: string;
  onTimeSlotSelect?: (timeSlot: string) => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  onDateSelect,
  selectedDate,
  mode = "single",
  minDate,
  maxDate,
  disabledDates = [],
  title = "Select Date",
  showTime = false,
  availableTimeSlots = [],
  selectedTimeSlot,
  onTimeSlotSelect
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [internalSelectedDate, setInternalSelectedDate] = React.useState<Date | Date[]>(
    selectedDate || (mode === "single" ? new Date() : [])
  );
  const [internalSelectedTimeSlot, setInternalSelectedTimeSlot] = React.useState(selectedTimeSlot || "");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some(disabledDate => 
      disabledDate.toDateString() === date.toDateString()
    );
  };

  const isDateSelected = (date: Date) => {
    if (mode === "single") {
      return internalSelectedDate instanceof Date && 
             internalSelectedDate.toDateString() === date.toDateString();
    } else if (mode === "multiple") {
      return Array.isArray(internalSelectedDate) &&
             internalSelectedDate.some(d => d.toDateString() === date.toDateString());
    } else if (mode === "range") {
      if (Array.isArray(internalSelectedDate) && internalSelectedDate.length === 2) {
        const [start, end] = internalSelectedDate;
        return date >= start && date <= end;
      }
      return Array.isArray(internalSelectedDate) &&
             internalSelectedDate.some(d => d.toDateString() === date.toDateString());
    }
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (mode === "single") {
      setInternalSelectedDate(date);
    } else if (mode === "multiple") {
      const currentDates = Array.isArray(internalSelectedDate) ? internalSelectedDate : [];
      const dateExists = currentDates.some(d => d.toDateString() === date.toDateString());
      
      if (dateExists) {
        setInternalSelectedDate(currentDates.filter(d => d.toDateString() !== date.toDateString()));
      } else {
        setInternalSelectedDate([...currentDates, date]);
      }
    } else if (mode === "range") {
      const currentDates = Array.isArray(internalSelectedDate) ? internalSelectedDate : [];
      
      if (currentDates.length === 0 || currentDates.length === 2) {
        setInternalSelectedDate([date]);
      } else if (currentDates.length === 1) {
        const [start] = currentDates;
        if (date < start) {
          setInternalSelectedDate([date, start]);
        } else {
          setInternalSelectedDate([start, date]);
        }
      }
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newMonth;
    });
  };

  const handleConfirm = () => {
    onDateSelect(internalSelectedDate);
    if (showTime && onTimeSlotSelect && internalSelectedTimeSlot) {
      onTimeSlotSelect(internalSelectedTimeSlot);
    }
    onClose();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Previous month's trailing days
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <button
          key={`prev-${i}`}
          className="p-2 text-muted-foreground/50 hover:bg-muted/30 rounded"
          disabled
        >
          {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), -firstDay + i + 1).getDate()}
        </button>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = isDateDisabled(date);
      const isSelected = isDateSelected(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          disabled={isDisabled}
          className={cn(
            "p-2 rounded transition-colors",
            isDisabled && "text-muted-foreground/30 cursor-not-allowed",
            !isDisabled && !isSelected && "hover:bg-muted/50",
            isSelected && "bg-primary text-primary-foreground",
            isToday && !isSelected && "ring-1 ring-primary",
          )}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="default"
    >
      <div className="space-y-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h3 className="font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>

        {/* Time Slots */}
        {showTime && availableTimeSlots.length > 0 && (
          <div className="space-y-3 border-t pt-4">
            <h4 className="text-sm font-medium">Available Time Slots</h4>
            <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
              {availableTimeSlots.map(timeSlot => (
                <Button
                  key={timeSlot}
                  variant={internalSelectedTimeSlot === timeSlot ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInternalSelectedTimeSlot(timeSlot)}
                  className="justify-start"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {timeSlot}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Date Display */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium mb-1">Selected:</p>
          <p className="text-sm text-muted-foreground">
            {mode === "single" && internalSelectedDate instanceof Date
              ? internalSelectedDate.toLocaleDateString()
              : mode === "multiple" && Array.isArray(internalSelectedDate)
              ? internalSelectedDate.length > 0
                ? `${internalSelectedDate.length} dates selected`
                : "No dates selected"
              : mode === "range" && Array.isArray(internalSelectedDate)
              ? internalSelectedDate.length === 2
                ? `${internalSelectedDate[0].toLocaleDateString()} - ${internalSelectedDate[1].toLocaleDateString()}`
                : internalSelectedDate.length === 1
                ? `From ${internalSelectedDate[0].toLocaleDateString()}`
                : "No range selected"
              : "No date selected"
            }
            {showTime && internalSelectedTimeSlot && (
              <span className="ml-2 text-primary">at {internalSelectedTimeSlot}</span>
            )}
          </p>
        </div>
      </div>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleConfirm}
          disabled={
            (mode === "single" && !internalSelectedDate) ||
            (mode !== "single" && Array.isArray(internalSelectedDate) && internalSelectedDate.length === 0) ||
            (showTime && availableTimeSlots.length > 0 && !internalSelectedTimeSlot)
          }
        >
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Event Scheduling Modal
interface EventSchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: any) => void;
  initialEvent?: {
    id?: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    startTime: string;
    endTime?: string;
    location?: string;
    attendees?: string[];
    priority?: "low" | "medium" | "high";
    category?: string;
    isRecurring?: boolean;
    recurrencePattern?: "daily" | "weekly" | "monthly" | "yearly";
    reminderMinutes?: number;
  };
  availableAttendees?: Array<{ id: string; name: string; email: string }>;
  categories?: string[];
}

export const EventSchedulingModal: React.FC<EventSchedulingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialEvent,
  availableAttendees = [],
  categories = ["Meeting", "Class", "Assignment", "Exam", "Holiday", "Other"]
}) => {
  const [eventData, setEventData] = React.useState({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: undefined as Date | undefined,
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    attendees: [] as string[],
    priority: "medium" as "low" | "medium" | "high",
    category: "",
    isRecurring: false,
    recurrencePattern: "weekly" as "daily" | "weekly" | "monthly" | "yearly",
    reminderMinutes: 15,
    ...initialEvent
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [showCalendar, setShowCalendar] = React.useState<"start" | "end" | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!eventData.title.trim()) {
      newErrors.title = "Event title is required";
    }

    if (!eventData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (eventData.endTime && eventData.startTime >= eventData.endTime) {
      newErrors.endTime = "End time must be after start time";
    }

    if (eventData.endDate && eventData.startDate > eventData.endDate) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(eventData);
      onClose();
    }
  };

  const handleDateSelect = (field: "start" | "end", date: Date) => {
    if (field === "start") {
      setEventData(prev => ({ ...prev, startDate: date }));
    } else {
      setEventData(prev => ({ ...prev, endDate: date }));
    }
    setShowCalendar(null);
  };

  const handleAttendeeToggle = (attendeeId: string) => {
    setEventData(prev => ({
      ...prev,
      attendees: prev.attendees.includes(attendeeId)
        ? prev.attendees.filter(id => id !== attendeeId)
        : [...prev.attendees, attendeeId]
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900/50";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50";
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900/50";
      default:
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/50";
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={initialEvent?.id ? "Edit Event" : "Create Event"}
        size="lg"
      >
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label="Event Title"
                value={eventData.title}
                onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title"
                error={errors.title}
                required
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full h-20 px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring mt-1"
                value={eventData.description}
                onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Event description..."
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Date & Time</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <Button
                  variant="outline"
                  onClick={() => setShowCalendar("start")}
                  className="w-full justify-start mt-1"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {eventData.startDate.toLocaleDateString()}
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium">End Date (Optional)</label>
                <Button
                  variant="outline"
                  onClick={() => setShowCalendar("end")}
                  className="w-full justify-start mt-1"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {eventData.endDate?.toLocaleDateString() || "Select date"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Time"
                type="time"
                value={eventData.startTime}
                onChange={(e) => setEventData(prev => ({ ...prev, startTime: e.target.value }))}
                error={errors.startTime}
                required
              />

              <Input
                label="End Time (Optional)"
                type="time"
                value={eventData.endTime}
                onChange={(e) => setEventData(prev => ({ ...prev, endTime: e.target.value }))}
                error={errors.endTime}
              />
            </div>
          </div>

          {/* Location & Category */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Location"
              value={eventData.location}
              onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Event location"
              leftIcon={<MapPin className="h-4 w-4" />}
            />

            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                className="w-full h-10 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring mt-1"
                value={eventData.category}
                onChange={(e) => setEventData(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority & Recurrence */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Priority</label>
              <div className="flex gap-2 mt-1">
                {["low", "medium", "high"].map(priority => (
                  <Button
                    key={priority}
                    variant={eventData.priority === priority ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEventData(prev => ({ ...prev, priority: priority as any }))}
                    className={eventData.priority === priority ? getPriorityColor(priority) : ""}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Reminder</label>
              <select
                className="w-full h-10 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring mt-1"
                value={eventData.reminderMinutes}
                onChange={(e) => setEventData(prev => ({ ...prev, reminderMinutes: Number(e.target.value) }))}
              >
                <option value={0}>No reminder</option>
                <option value={5}>5 minutes before</option>
                <option value={15}>15 minutes before</option>
                <option value={30}>30 minutes before</option>
                <option value={60}>1 hour before</option>
                <option value={1440}>1 day before</option>
              </select>
            </div>
          </div>

          {/* Recurring */}
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={eventData.isRecurring}
                onChange={(e) => setEventData(prev => ({ ...prev, isRecurring: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm font-medium">Recurring event</span>
            </label>

            {eventData.isRecurring && (
              <div>
                <label className="text-sm font-medium">Repeat</label>
                <select
                  className="w-full h-10 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring mt-1"
                  value={eventData.recurrencePattern}
                  onChange={(e) => setEventData(prev => ({ ...prev, recurrencePattern: e.target.value as any }))}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            )}
          </div>

          {/* Attendees */}
          {availableAttendees.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Attendees</h4>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {availableAttendees.map(attendee => (
                  <label
                    key={attendee.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={eventData.attendees.includes(attendee.id)}
                      onChange={() => handleAttendeeToggle(attendee.id)}
                      className="rounded"
                    />
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{attendee.name}</p>
                      <p className="text-xs text-muted-foreground">{attendee.email}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            {initialEvent?.id ? "Update Event" : "Create Event"}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Calendar Sub-Modal */}
      {showCalendar && (
        <CalendarModal
          isOpen={true}
          onClose={() => setShowCalendar(null)}
          onDateSelect={(date) => handleDateSelect(showCalendar, date as Date)}
          selectedDate={showCalendar === "start" ? eventData.startDate : eventData.endDate}
          title={showCalendar === "start" ? "Select Start Date" : "Select End Date"}
          mode="single"
        />
      )}
    </>
  );
};

// Time Slot Selection Modal
interface TimeSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTimeSlot: (timeSlot: { date: Date; startTime: string; endTime: string; duration: number }) => void;
  availableSlots: Array<{
    date: Date;
    startTime: string;
    endTime: string;
    duration: number; // in minutes
    isBooked?: boolean;
    bookedBy?: string;
  }>;
  title?: string;
  selectedDate?: Date;
}

export const TimeSlotModal: React.FC<TimeSlotModalProps> = ({
  isOpen,
  onClose,
  onSelectTimeSlot,
  availableSlots,
  title = "Select Time Slot",
  selectedDate
}) => {
  const [selectedSlot, setSelectedSlot] = React.useState<typeof availableSlots[0] | null>(null);

  const groupSlotsByDate = (slots: typeof availableSlots) => {
    const grouped = slots.reduce((acc, slot) => {
      const dateKey = slot.date.toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(slot);
      return acc;
    }, {} as Record<string, typeof availableSlots>);

    // Sort slots within each date by start time
    Object.keys(grouped).forEach(dateKey => {
      grouped[dateKey].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    return grouped;
  };

  const groupedSlots = groupSlotsByDate(availableSlots);
  const filteredDates = selectedDate 
    ? [selectedDate.toDateString()].filter(date => groupedSlots[date])
    : Object.keys(groupedSlots).sort();

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  const handleConfirm = () => {
    if (selectedSlot && !selectedSlot.isBooked) {
      onSelectTimeSlot({
        date: selectedSlot.date,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        duration: selectedSlot.duration
      });
      onClose();
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
        {filteredDates.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No available time slots</p>
          </div>
        ) : (
          filteredDates.map(dateKey => {
            const date = new Date(dateKey);
            const slots = groupedSlots[dateKey];
            
            return (
              <div key={dateKey} className="space-y-3">
                <h4 className="font-medium text-sm border-b pb-2">
                  {date.toLocaleDateString(undefined, { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {slots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => !slot.isBooked && setSelectedSlot(slot)}
                      disabled={slot.isBooked}
                      className={cn(
                        "p-3 rounded-lg border text-left transition-all duration-200",
                        slot.isBooked 
                          ? "bg-muted/50 text-muted-foreground cursor-not-allowed opacity-60" 
                          : selectedSlot === slot
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "hover:bg-muted/50 hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-sm font-medium">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                        {slot.isBooked ? (
                          <X className="h-3 w-3 text-red-500" />
                        ) : selectedSlot === slot ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Circle className="h-3 w-3" />
                        )}
                      </div>
                      
                      <div className="text-xs opacity-75">
                        Duration: {formatDuration(slot.duration)}
                      </div>
                      
                      {slot.isBooked && slot.bookedBy && (
                        <div className="text-xs text-red-600 mt-1">
                          Booked by {slot.bookedBy}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}

        {selectedSlot && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <h4 className="font-medium mb-2">Selected Time Slot</h4>
            <div className="text-sm space-y-1">
              <p><strong>Date:</strong> {selectedSlot.date.toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selectedSlot.startTime} - {selectedSlot.endTime}</p>
              <p><strong>Duration:</strong> {formatDuration(selectedSlot.duration)}</p>
            </div>
          </div>
        )}
      </div>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleConfirm} 
          disabled={!selectedSlot || selectedSlot.isBooked}
        >
          Book Time Slot
        </Button>
      </ModalFooter>
    </Modal>
  );
};