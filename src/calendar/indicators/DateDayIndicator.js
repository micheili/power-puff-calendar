import React from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
  getWeek,
  getToday,
  getHourOfDay
} from '../utils/MomentUtils';
import { getHoursInDayDisplay } from '../utils/DateUtils';


export default function DateWeekIndicator({ activeDates, selectDate, setSelectDate }) {

 
const hoursInDay = getHoursInDayDisplay(selectDate);

  const dayHours = hoursInDay.map((item, key) => {


    return (
      <div
        className={"date-day-icon"}
        data-date={item.date.toString()}
        key={key}
    
      >
        {getHourOfDay(item.date)}
      </div>
    );
  });

  return <div className="date-day-indicator">{dayHours}</div>;




}