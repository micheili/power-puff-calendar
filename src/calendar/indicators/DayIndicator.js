import React from 'react';
import { getDayOfMonth, getReadableWeekdayAndDate, getDay, getToday, getReadableWeekday } from '../utils/MomentUtils';
import { getDaySet } from '../utils/DateUtils';

export default function DayIndicator({ selectDate, setSelectDate }){

    const changeDay = (e) => {
        setSelectDate(e.target.getAttribute('data-date'));
      };

      const daySet = getDaySet(selectDate);

      return (
        <div className="month-indicator container">
           <div className="row  ">
          <h5 className="col prev p-0 m-0 text-right align-self-center " data-date={daySet.prev} onClick={changeDay}>
          {String.fromCharCode(171)} {[getDay(daySet.prev)]}
          </h5>
          <h1 className="col text-center font-weight-bold">  {[getDay(daySet.current)]}</h1>
          <h5 className="col next p-0 m-0 text-left align-self-center" data-date={daySet.next} onClick={changeDay}>
          {[getDay(daySet.next)]} {String.fromCharCode(187)}
          </h5>
          </div>
        </div>
      );
}