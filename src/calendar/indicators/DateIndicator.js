import React from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from '../utils/MomentUtils';
import { getDatesInMonthDisplay } from '../utils/DateUtils';

export default function DateIndicator({activeDates, selectDate, setSelectDate}){

    // EVENT HANDLING CALLBACK
    const changeDate = (e) => {
      setSelectDate(e.target.getAttribute('data-date'));
    };

    const datesInMonth = getDatesInMonthDisplay(
      getMonth(selectDate) + 1,
      getYear(selectDate)
    );

      const monthDates = datesInMonth.map((item, key) => {
        const selected =
      getMonthDayYear(selectDate) === getMonthDayYear(item.date) ? 'selected' : '';
        const active =
      activeDates && activeDates[getMonthDayYear(item.date)] ? 'active' : '';
       
      return (
          <div
            className={"date-icon"}
            data-active-month={item.currentMonth}
            data-date={item.date.toISOString().split('T')[0]}
            key={key}
         
            onClick={changeDate}
          >
            {getDayOfMonth(item.date)}
          </div>
        );
      });

      return <div className="date-indicator">{monthDates}</div>;



}