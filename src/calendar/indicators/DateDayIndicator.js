
import React, {useContext} from 'react';
import {
  getMonthDayYearHour,
  getHourOfDay
} from '../utils/MomentUtils';
import { getHoursInDayDisplay } from '../utils/DateUtils';
import {Context} from '../../App';





export default function DateWeekIndicator({ activeDates, selectDate, setSelectDate }) {

  const [context, updateContext] = useContext(Context);

  let events = [...context.myEvents, ...context.invitedEvents];

  // map start and stop to real date objects
  events = events.map((x) => ({
    ...x,
    start: new Date(x.start),
    stop: new Date(x.stop),
    length: Math.ceil(
      (new Date(x.stop).getTime() - new Date(x.start).getTime()) /
        (60 * 60 * 1000)
    ),
  }));

  function resetStartedPrinting() {
    for (let event of events) {
      event.startedPrinting = false;
    }
  }

  function checkEvent(date) {
    let info = [];
    for (let event of events) {
      let start1Before = new Date(event.start.getTime());
      start1Before.setMinutes(start1Before.getMinutes() - 59);

      if (date >= start1Before && date <= event.stop) {        
        info.push(
          <div
            className={`${event.className ? `events w-100 ${event.className}` : "events w-100"}`}
            data-date={date.toString()}
            key={event.id}
            style={{ position: "relative" }}
          >
            {event.title.substr(0, 10) + "..."}
          </div>
        );
      }
    }
    return <>{info}</>;
  }

  //------------------------------------

   // EVENT HANDLING CALLBACK
   const changeDate = (e) => {
    setSelectDate(e.target.getAttribute('data-date'));
    updateContext({ showEditEvent: false  });
  };

  const hoursInDay = getHoursInDayDisplay(selectDate);

  resetStartedPrinting();

  const dayHours = hoursInDay.map((item, key) => {
    const selected =
      getMonthDayYearHour(selectDate) === getMonthDayYearHour(item.date)
        ? "selected"
        : "";
    const active =
      activeDates && activeDates[getMonthDayYearHour(item.date)]
        ? "active"
        : "";

    return (
      <div
        className={`date-day-icon ${selected} ${active}`}
        data-date={item.date.toString()}
        key={key}
        onClick={changeDate}
      >
        {getHourOfDay(item.date)}
        {checkEvent(item.date)}
      </div>
    );
  });

  return <div className="date-day-indicator">{dayHours}</div>;
}
