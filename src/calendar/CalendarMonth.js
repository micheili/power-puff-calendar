import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import WeekdayIndicator from './indicators/WeekdayIndicator';
import DateIndicator from './indicators/DateIndicator';
import MonthIndicator from './indicators/MonthIndicator';
import GoToCalendarButtons from './GoToCalendarButtons';
import moment from "moment-timezone";
import '../sass/_calendar.scss';


export default function CalendarMonth() {


    const [selectDate, setSelectDate] = useState(moment().toDate()); //prop
    


  return (
  

    <div className="container">
      <GoToCalendarButtons />
      <CalendarHeader selectDate={selectDate}/>
     
      <div className="calendar-container">
      <WeekdayIndicator />
     
      <DateIndicator
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />
     </div>
     <MonthIndicator 
        selectDate={selectDate} 
        setSelectDate={setSelectDate}
      />
    </div>



  );



}