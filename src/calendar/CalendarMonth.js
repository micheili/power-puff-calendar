import React, { useState } from 'react';
import moment from 'moment';

import CalendarHeader from './CalendarHeader';
import WeekdayIndicator from './WeekdayIndicator';
import DateIndicator from './DateIndicator';


export default function CalendarMonth() {


    const [selectDate, setSelectDate] = useState(moment().toDate()); //prop
    


  return (
  

    <div className="calendar-container">
      <CalendarHeader selectDate={selectDate}/>
      <table>
      <thead className="thead-dark"> 
      <WeekdayIndicator />
      </thead>
      <tbody>
      <DateIndicator
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />
      </tbody>
      </table>
    </div>



  );



}