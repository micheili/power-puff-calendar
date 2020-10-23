import React, { useState } from 'react';
import moment from 'moment';
import CalendarHeader from './CalendarHeader';
import GoToCalendarButtons from './GoToCalendarButtons';


export default function CalendarDay() {

  const [selectDate, setSelectDate] = useState(moment().toDate());

  return (
    <div className="container">
      <GoToCalendarButtons />
      <CalendarHeader selectDate={selectDate} />

      <div className="calendar-container">
        

      
      </div>
     
    </div>
  );
}