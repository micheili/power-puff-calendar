
import React, {useContext, useState, useEffect} from 'react';

import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from "../utils/MomentUtils";
import { getDatesInMonthDisplay } from "../utils/DateUtils";
import { Context } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAlgolia, faCalendarPlus
} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

export default function DateIndicator({activeDates, selectDate, setSelectDate}){
  const [context, updateContext] = useContext(Context);

  
  let events = [
    ...context.myEvents,...context.invitedEvents
  ]
  

  // map start and stop to real date objects
  events = events.map((x) => ({
    ...x,
    start: new Date(x.start),
    stop: new Date(x.stop),
    length: Math.ceil(
      (new Date(x.stop).getTime() - new Date(x.start).getTime()) /
        (60 * 60 * 1000 * 24)
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
      start1Before.setHours(start1Before.getHours() - 24);

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
    setSelectDate(e.target.getAttribute("data-date"));
  };

  const datesInMonth = getDatesInMonthDisplay(
    getMonth(selectDate) + 1,
    getYear(selectDate)
  );

  resetStartedPrinting();

  const monthDates = datesInMonth.map((item, key) => {
    const selected =
      getMonthDayYear(selectDate) === getMonthDayYear(item.date)
        ? "selected"
        : "";
    const active =
      activeDates && activeDates[getMonthDayYear(item.date)] ? "active" : "";

    return (
      <div
        className={`date-icon ${selected} ${active}`}
        data-active-month={item.currentMonth}
        data-date={item.date.toString()}
        key={key}
        onClick={changeDate}
      >
        {getDayOfMonth(item.date)}
        {checkEvent(item.date)}
      </div>
    );
  });

  return <div className="date-indicator">{monthDates}</div>;
}
