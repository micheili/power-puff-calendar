import React from 'react';
import moment from 'moment';
import {
    getReadableMonthDate,
    getReadableWeekday,
    getYear,
  } from './utils/MomentUtils';


export default function CalendarHeader ({ selectDate }) {

  return (
<div className="calendar-header text-center">
        <h7>{getReadableMonthDate(selectDate)} {getYear(selectDate)}</h7>
    </div>
  );
}
