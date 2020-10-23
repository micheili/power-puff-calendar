import React from 'react';
import { getDayOfMonth, getReadableWeekdayAndDate, getDay, getToday, getReadableWeekday } from '../utils/MomentUtils';
import { getDaySet } from '../utils/DateUtils';

export default function DayIndicator({ selectDate, setSelectDate }){

    const changeDay = (e) => {
        setSelectDate(e.target.getAttribute('data-date'));
      };

      const daySet = getDaySet(selectDate);

      return (
        <div className="month-indicator">
          <h4 data-date={daySet.prev} onClick={changeDay}>
          {[getDay(daySet.prev)]}
          </h4>
          <h3>  {[getDay(daySet.current)]}</h3>
          <h4 data-date={daySet.next} onClick={changeDay}>
          {[getDay(daySet.next)]}
          </h4>
        </div>
      );
}