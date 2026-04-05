import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar as CalendarIcon, Plus, Clock } from 'lucide-react';

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Meeting with Investor - Tech Startup',
      start: '2026-04-10T10:00:00',
      end: '2026-04-10T11:00:00',
      color: '#10b981',
    },
  ]);

  const [availabilitySlots, setAvailabilitySlots] = useState([
    { id: 1, day: 'Monday', time: '10:00 AM - 12:00 PM' },
    { id: 2, day: 'Wednesday', time: '02:00 PM - 04:00 PM' },
  ]);

  const handleDateClick = (arg: any) => {
    const title = prompt('Meeting title enter karo:');
    if (title) {
      setEvents([
        ...events,
        {
          id: Date.now().toString(),
          title,
          start: arg.dateStr,
          end: arg.dateStr + 'T11:00:00',
          color: '#3b82f6',
        },
      ]);
      alert('Meeting request bhej diya gaya hai!');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Meeting Calendar</h1>
        </div>
        <button
          onClick={() => alert('Availability slots edit karne ka modal khulega (Week 1)')}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Add Availability Slot
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl p-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={events}
            dateClick={handleDateClick}
            height="650px"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={3}
            weekends={true}
            eventClick={(info) => {
              alert(`Meeting: ${info.event.title}\nStatus: Confirmed`);
            }}
          />
        </div>

        {/* Sidebar - Availability + Confirmed Meetings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Availability Slots */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5" />
              Your Availability
            </h3>
            {availabilitySlots.map((slot) => (
              <div key={slot.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl mb-3">
                <div>
                  <p className="font-medium">{slot.day}</p>
                  <p className="text-sm text-gray-600">{slot.time}</p>
                </div>
                <button className="text-red-500 text-sm hover:underline">Remove</button>
              </div>
            ))}
          </div>

          {/* Confirmed Meetings */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Confirmed Meetings</h3>
            {events.map((event) => (
              <div key={event.id} className="border-l-4 border-green-500 pl-4 mb-4">
                <p className="font-medium text-sm">{event.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(event.start).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CalendarPage };