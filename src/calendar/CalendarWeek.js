import React, { useState } from 'react';
import moment from 'moment';

import CalendarHeader from './CalendarHeader';
import WeekdayIndicator from './indicators/WeekdayIndicator';
import DateWeekIndicator from './indicators/DateWeekIndicator';
import GoToCalendarButtons from './GoToCalendarButtons';
import WeekIndicator from './indicators/WeekIndicator';
import '../sass/_calendar.scss';


export default function CalendarWeek() {

  const [selectDate, setSelectDate] = useState(moment().toDate());

  return (
    <div className="container">
      <GoToCalendarButtons />
      <CalendarHeader selectDate={selectDate} />

      <div className="calendar-container">
        <WeekdayIndicator />

        <DateWeekIndicator
          selectDate={selectDate}
          setSelectDate={setSelectDate}
        />
      </div>
      <WeekIndicator
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />
    </div>
  );
}