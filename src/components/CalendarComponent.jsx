import {
    Calendar,
    dateFnsLocalizer,
} from "react-big-calendar";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";

import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function SquadronCalendar({ events }) {
    return (
        <div className="mt-2">

            <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-[#d41367]" />
                    <span className="text-xs font-bold tracking-[0.3em] text-[#d41367]">
                        FLIGHT SCHEDULE
                    </span>
                </div>

                <h2
                    className="mt-5 text-4xl font-black text-slate-900"
                    style={{
                        fontFamily: "'Rajdhani','Inter',sans-serif",
                    }}
                >
                    DISTRICT OPERATIONS CALENDAR
                </h2>
            </div>

            <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white p-4 shadow-sm">

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 700 }}
                    eventPropGetter={(event) => ({
                        style: {
                            backgroundColor: event.color,
                            borderRadius: "8px",
                            border: "none",
                            color: "white",
                            fontWeight: 700,
                        },
                    })}
                />

            </div>
        </div>
    );
}