import React from 'react';
import moment from 'moment';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
  getWeek,
  getToday
} from '../utils/MomentUtils';
import { getDatesInWeekDisplay } from '../utils/DateUtils';


export default function DateWeekIndicator({ activeDates, selectDate, setSelectDate }) {

  // EVENT HANDLING CALLBACK
  const changeDate = (e) => {
    setSelectDate(e.target.getAttribute('data-date'));
  };

  const datesInWeek = getDatesInWeekDisplay(selectDate);
 
  const weekDates = datesInWeek.map((item, key) => {
    const selected =
      getMonthDayYear(selectDate) === getMonthDayYear(item.date) ? 'selected' : '';
    const active =
      activeDates && activeDates[getMonthDayYear(item.date)] ? 'active' : '';

    return (
      <div
        className={"date-week-icon"}
        data-date={item.date.toISOString().split('T')[0]}
        key={key}
        data-active-month={item.currentMonth}
        onClick={changeDate}
      >
        {getDayOfMonth(item.date)}
      </div>
    );
  });

  return <div className="date-week-indicator">{weekDates}</div>;


}