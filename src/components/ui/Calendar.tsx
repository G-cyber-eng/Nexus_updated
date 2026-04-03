// src/components/ui/Calendar.tsx
import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
  backgroundColor?: string;
  extendedProps: {
    type: 'availability' | 'meeting' | 'request';
    status?: 'pending' | 'confirmed' | 'declined';
    with?: string;
  };
}

interface CalendarProps {
  role?: 'entrepreneur' | 'investor';
}

const Calendar: React.FC<CalendarProps> = ({ role = 'entrepreneur' }) => {
  const calendarRef = useRef<any>(null);

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Pitch Meeting - TechWave',
      start: '2026-04-05T10:00:00',
      end: '2026-04-05T11:00:00',
      backgroundColor: '#4f46e5',
      extendedProps: { type: 'meeting', status: 'confirmed', with: 'Michael Chen' }
    },
    {
      id: '2',
      title: 'My Availability',
      start: '2026-04-07T14:00:00',
      end: '2026-04-07T16:00:00',
      backgroundColor: '#10b981',
      extendedProps: { type: 'availability' }
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [eventType, setEventType] = useState<'availability' | 'meeting'>('meeting');
  const [partnerName, setPartnerName] = useState('');

  const handleDateSelect = (selectInfo: any) => {
    setEventTitle('');
    setPartnerName('');
    setEventType('meeting');
    setEventStart(selectInfo.startStr);
    setEventEnd(selectInfo.endStr || selectInfo.startStr);
    setShowModal(true);
  };

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    const ext = event.extendedProps;

    if (ext.status === 'pending') {
      if (window.confirm(`Accept meeting with ${ext.with || 'User'}?`)) {
        event.setProp('backgroundColor', '#10b981');
        event.setExtendedProp('status', 'confirmed');
        alert('✅ Meeting Confirmed');
      }
    } else {
      alert(`Event: ${event.title}`);
    }
  };

  const handleAddEvent = () => {
    if (!eventTitle.trim() || !eventStart) {
      alert('Title aur Time fill karein');
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title: eventTitle,
      start: eventStart,
      end: eventEnd || eventStart,
      backgroundColor: eventType === 'availability' ? '#10b981' : '#4f46e5',
      extendedProps: {
        type: eventType,
        status: eventType === 'meeting' ? 'pending' : undefined,
        with: partnerName.trim() || undefined,
      }
    };

    calendarRef.current?.getApi().addEvent(newEvent);
    setShowModal(false);
    alert(eventType === 'availability' ? 'Availability Added!' : 'Meeting Scheduled!');
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col h-full overflow-hidden">
      {/* Compact Header */}
      <div className="px-5 py-4 border-b dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-7 h-7 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Meetings</h2>
        </div>

        <Button 
          onClick={() => setShowModal(true)} 
          leftIcon={<Plus size={17} />}
          size="sm"
        >
          New
        </Button>
      </div>

      {/* Calendar - Bahut Chhoti Height */}
      <div className="flex-1 p-2" style={{ height: '450px' }}>   {/* ← Ab yeh aur chhoti hai */}
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          events={events}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={2}
          editable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          height="100%"
          slotMinTime="08:00:00"
          slotMaxTime="19:00:00"
          nowIndicator={true}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg">
            <div className="px-8 pt-8 pb-4 border-b dark:border-gray-700">
              <h3 className="text-2xl font-semibold">
                {eventType === 'availability' ? 'Add Availability' : 'New Meeting'}
              </h3>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEventType('meeting')}
                    className={`flex-1 py-3 rounded-2xl border ${eventType === 'meeting' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-300 dark:border-gray-600'}`}
                  >
                    Meeting
                  </button>
                  <button
                    type="button"
                    onClick={() => setEventType('availability')}
                    className={`flex-1 py-3 rounded-2xl border ${eventType === 'availability' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-300 dark:border-gray-600'}`}
                  >
                    Availability
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {eventType === 'meeting' ? 'Meeting Title' : 'Slot Title'}
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-indigo-500"
                  placeholder={eventType === 'meeting' ? "Pitch Meeting" : "Available Slot"}
                />
              </div>

              {eventType === 'meeting' && (
                <div>
                  <label className="block text-sm font-medium mb-2">With</label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Michael Chen"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start</label>
                  <input
                    type="datetime-local"
                    value={eventStart}
                    onChange={(e) => setEventStart(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End</label>
                  <input
                    type="datetime-local"
                    value={eventEnd}
                    onChange={(e) => setEventEnd(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={handleAddEvent}>
                {eventType === 'availability' ? 'Add Slot' : 'Schedule'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;