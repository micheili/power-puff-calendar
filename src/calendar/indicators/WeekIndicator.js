import React from 'react';
import { getWeek } from '../utils/MomentUtils';
import { getWeekSet } from '../utils/DateUtils';

export default function WeekIndicator({ selectDate, setSelectDate }){

    const changeWeek = (e) => {
        setSelectDate(e.target.getAttribute('data-date'));
      };

      const weekSet = getWeekSet(selectDate);

      return (
        <div className="month-indicator container">
           <div className="row  ">
          <h5 className="col prev p-0 m-0 text-right align-self-center " data-date={weekSet.prev} onClick={changeWeek}>
          {String.fromCharCode(171)} {[getWeek(weekSet.prev)]}
          </h5>
          <h1 className="col text-center font-weight-bold p-0">{[getWeek(weekSet.current)]}</h1>
          <h5 className="col next p-0 m-0 text-left align-self-center" data-date={weekSet.next} onClick={changeWeek}>
            {[getWeek(weekSet.next)]} {String.fromCharCode(187)}
          </h5>
          </div>
        </div>
      );
}