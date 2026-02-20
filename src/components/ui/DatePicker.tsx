import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format, parse, isValid } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useLanguage } from '../../contexts/LanguageContext';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

export function DatePicker({ value, onChange, placeholder = 'Seleccionar fecha' }: DatePickerProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const locale = language === 'es' ? es : enUS;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handleDateClick = (day: number | null) => {
    if (day === null) return;
    
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    const formattedDate = format(newDate, 'yyyy-MM-dd');
    setInputValue(formattedDate);
    onChange(formattedDate);
    setIsOpen(false);
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Try to parse the date
    const parsed = parse(value, 'yyyy-MM-dd', new Date());
    if (isValid(parsed)) {
      setSelectedDate(parsed);
      onChange(value);
    }
  };

  const clearDate = () => {
    setInputValue('');
    setSelectedDate(null);
    onChange('');
    setIsOpen(false);
  };

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthName = format(currentMonth, 'MMMM', { locale });
  const year = currentMonth.getFullYear();

  return (
    <div ref={containerRef} className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={handleManualInput}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              placeholder-slate-400 dark:placeholder-slate-500"
          />
          <CalendarIcon 
            size={20} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {selectedDate && (
          <button
            type="button"
            onClick={clearDate}
            className="p-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            title="Limpiar fecha"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 w-80">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={goToPrevMonth}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
            >
              ←
            </button>
            <span className="font-semibold text-slate-900 dark:text-white capitalize">
              {monthName} {year}
            </span>
            <button
              type="button"
              onClick={goToNextMonth}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
            >
              →
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map((day, index) => (
              <div key={index} className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="p-2" />;
              }

              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const isSelected = selectedDate && 
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();
              
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateClick(day)}
                  className={`
                    p-2 text-sm rounded-lg transition-colors
                    ${isSelected 
                      ? 'bg-blue-600 text-white' 
                      : isToday 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Quick buttons */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
            <button
              type="button"
              onClick={() => {
                const today = format(new Date(), 'yyyy-MM-dd');
                setInputValue(today);
                setSelectedDate(new Date());
                onChange(today);
                setIsOpen(false);
              }}
              className="flex-1 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentMonth(new Date());
              }}
              className="flex-1 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Mes actual
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
