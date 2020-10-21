import React from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from './utils/MomentUtils';
import { getDatesInMonthDisplay } from './utils/DateUtils';

export default function DateIndicator({selectDate, setSelectDate}){


    const datesInMonth = getDatesInMonthDisplay(
        getMonth(selectDate) + 1,
        getYear(selectDate)
      );

      const monthDates = datesInMonth.map((i, key) => {
        return (
          <td
            className={"date-icon"}
            data-active-month={i.currentMonth}
            data-date={i.date.toString()}
            key={key}
           
          >
            {getDayOfMonth(i.date)}
          </td>
        );
      });

      return <tr className=" row date-indicator">{monthDates}</tr>;



}