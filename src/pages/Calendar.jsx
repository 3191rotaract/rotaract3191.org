import React from 'react';
import SquadronCalendar from '../components/CalendarComponent';
import { districtCalendarEvents } from '../data/calendar';

const CALENDAR_DATA = [
  { month: 'July 2026', color: '#ef4444', events: [{ date: '5th July', title: '4th Rotaract District Installation - Vikrant' }] },
  { month: 'August 2026', color: '#8b5cf6', events: [{ date: '30th August', title: 'District Learning Assembly' }] },
  { month: 'September 2026', color: '#eab308', events: [{ date: '11th to 13th September', title: 'SEARIC Summit - Sri Lanka' }] },
  {
    month: 'October 2026', color: '#ef4444', events: [
      { date: '4th October', title: 'Rotaract Alumni Meet' },
      { date: '24th October', title: 'World Polio Day' },
      { date: '30th & 31st Oct, 1st Nov', title: 'Nodi Namma Ooru 3.0 (Incoming RIDE)' },
    ]
  },
  { month: 'November 2026', color: '#8b5cf6', events: [{ date: '22nd November', title: 'Nadda Habba (Kannada Rajyotsava)' }] },
  { month: 'December 2026', color: '#3b82f6', events: [{ date: '6th December', title: 'Tarang (Cultural Fest for Govt. School Kids)' }] },
  {
    month: 'January 2027', color: '#f97316', events: [
      { date: '3rd January 2027', title: 'DRRN Elections' },
      { date: '30th & 31st January 2027', title: 'District Sports Meet' }
    ]
  },
  { month: 'February 2027', color: '#8b5cf6', events: [{ date: '4th, 5th, 6th & 7th February', title: 'Rotasia 2027 - Indore' }] },
  {
    month: 'March 2027', color: '#eab308', events: [
      { date: '7th to 13th March 2027', title: 'World Rotaract Week' },
      { date: '13th & 14th March 2027', title: '4th Annual District Conference - Vaayu' }
    ]
  },
  { month: 'April / May 2027', color: '#ef4444', events: [{ date: '30th Apr, 1st & 2nd May', title: 'Rota Camp' }] },
  { month: 'June 2027', color: '#a855f7', events: [{ date: '27th June 2027', title: '4th Rotaract District Awards' }] },
];

export default function Calendar() {
  return (
    <div className="flex flex-col gap-4 py-8 px-4 sm:px-8 md:px-12 w-full max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}>
          YEAR CALENDAR
        </h1>
        <p className="text-slate-600 text-lg md:text-xl font-medium tracking-wide uppercase">
          Rotaract District 3191 • RY 2026-27
        </p>
        <div className="mx-auto w-24 h-1 rounded-full bg-linear-to-r from-orange-500 to-pink-600 mt-6" />
      </div>

      {/* <SquadronCalendar
        events={districtCalendarEvents}
      /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {CALENDAR_DATA.map((item, idx) => (
          <div key={idx} className="
group relative overflow-hidden
rounded-4xl
border border-slate-200
bg-white
p-6
shadow-sm
transition-all duration-300
hover:-translate-y-1
hover:shadow-xl
">
            {/* Background accent line */}
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: item.color }} />

            <h2
              className="mb-6 text-3xl font-black uppercase tracking-[0.25em]"
              style={{
                color: item.color,
                fontFamily: "'Rajdhani','Inter',sans-serif",
              }}
            >
              {item.month}
            </h2>

            <div className="flex-1 space-y-5">
              {item.events.map((event, eIdx) => (
                <div key={eIdx} className="relative pl-4 border-l-2" style={{ borderColor: `${item.color}40` }}>
                  <div className="absolute -left-1.25 top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <p className="text-sm font-semibold text-slate-500 mb-1">{event.date}</p>
                  <p className="text-slate-800 font-medium leading-snug">{event.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="/assets/RI Dist. 3191 - Squadron Year Calendar - RY 2026-27.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition shadow-lg hover:shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download PDF Calendar
        </a>
      </div>
    </div>
  );
}
