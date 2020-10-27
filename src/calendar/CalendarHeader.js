import React from 'react';
import moment from 'moment';
import {
    getReadableMonthDate,
    getReadableWeekday,
    getYear,
  } from './utils/MomentUtils';


export default function CalendarHeader ({ selectDate }) {

  return (
<div className="calendar-header">
      <div className="left-container">
        <h1>{getReadableMonthDate(selectDate)}</h1>
      </div>
      <div className="right-container">
        <h3>{getYear(selectDate)}</h3>
      </div>
    </div>
  );
}
