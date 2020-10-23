import React, { useState } from 'react';
import moment from 'moment';
import CalendarHeader from './CalendarHeader';
import GoToCalendarButtons from './GoToCalendarButtons';
import DateDayIndicator from './indicators/DateDayIndicator';
import DayIndicator from './indicators/DayIndicator';
import {
  getReadableWeekday,
} from './utils/MomentUtils';
import '../sass/_calendar.scss';


export default function CalendarDay() {

  const [selectDate, setSelectDate] = useState(moment().toDate());

  return (
    <div className="container">
      <GoToCalendarButtons />
      <CalendarHeader selectDate={selectDate} />

      <div className="calendar-container">
        <div className="weekday-indicator">
        {getReadableWeekday(selectDate)}
        </div>

        <DateDayIndicator 
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />
      </div>
      <DayIndicator 
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />
     
    </div>
  );
}