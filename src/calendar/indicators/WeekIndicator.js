import React from 'react';
import { getWeek } from '../utils/MomentUtils';
import { getWeekSet } from '../utils/DateUtils';

export default function WeekIndicator({ selectDate, setSelectDate }){

    const changeWeek = (e) => {
        setSelectDate(e.target.getAttribute('data-date'));
      };

      const weekSet = getWeekSet(selectDate);

      return (
        <div className="month-indicator">
          <h4 data-date={weekSet.prev} onClick={changeWeek}>
            {[getWeek(weekSet.prev)]}
          </h4>
          <h3>{[getWeek(weekSet.current)]}</h3>
          <h4 data-date={weekSet.next} onClick={changeWeek}>
            {[getWeek(weekSet.next)]}
          </h4>
        </div>
      );
}