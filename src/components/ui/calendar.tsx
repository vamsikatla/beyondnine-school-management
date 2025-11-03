import React from 'react';
import { cn } from '@/lib/utils';

interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  selected?: Date;
  onSelect?: (date: Date) => void;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, selected, onSelect, ...props }, ref) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = selected && date.toDateString() === selected.toDateString();
      const isToday = date.toDateString() === today.toDateString();
      
      days.push(
        <button
          key={day}
          className={cn(
            "p-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground",
            isSelected && "bg-primary text-primary-foreground",
            isToday && !isSelected && "bg-accent text-accent-foreground font-semibold"
          )}
          onClick={() => onSelect?.(date)}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn("p-3", className)}
        {...props}
      >
        <div className="grid grid-cols-7 gap-1 text-center">
          <div className="p-2 text-sm font-medium">Sun</div>
          <div className="p-2 text-sm font-medium">Mon</div>
          <div className="p-2 text-sm font-medium">Tue</div>
          <div className="p-2 text-sm font-medium">Wed</div>
          <div className="p-2 text-sm font-medium">Thu</div>
          <div className="p-2 text-sm font-medium">Fri</div>
          <div className="p-2 text-sm font-medium">Sat</div>
          {days}
        </div>
      </div>
    );
  }
);
Calendar.displayName = "Calendar";

export { Calendar };