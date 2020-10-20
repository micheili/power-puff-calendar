import React, { useState, useEffect } from 'react';
import moment, { calendarFormat } from 'moment';




export default function CalendarMonth() {

  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  

  const startDay = value.clone().startOf('month').startOf('week');
  const endDay = value.clone().endOf('month').endOf('week');


  //iterator, get all dates between startday and endday
  //containing weeks and weeks containing days
  const day = startDay.clone().subtract(0, 'day');
  const ca = [];
  //isbefore = method from moment, (endday is when the loop stops, day is the interval)
  while (day.isBefore(endDay, 'day')) {
    ca.push(
      Array(7).fill(0).map(() => day.add(1, 'day').clone())
    );

  }


  useEffect(() => {
    setCalendar(ca);
  }, [value]);


  function currentMonthName() {
    return value.format('MMMM');
  }

  function currentYear() {
    return value.format('YYYY');
  }

  function prevMonth() {
    return value.clone().subtract(1, 'month');
  }

  function nextMonth() {
    return value.clone().add(1, 'month');
  }



  return (
    <div>

      <div className="container -sm">
        <div className="row justify-content-md-center bg-secondary">
          <div className="col text-center">
            <a className="btn btn-primary btn-lg btn-block my-2" href="/" role="button">Days</a>
          </div>
          <div className="col text-center">
            <a className="btn btn-primary btn-lg btn-block my-2" href="#" role="button">Weeks</a>
          </div>
          <div className="col text-center">
            <a className="btn btn-primary btn-lg btn-block my-2" href="#" role="button">Months</a>
          </div>
        </div>
      </div>

      <div className="container -sm">
        <div className="row border border-dark bg-dark text-white">
          <div className="col mt-2 mb-2">
            Week
    </div>
          <div className="col mt-2 mb-2">
            Monday
    </div>
          <div className="col mt-2 mb-2">
            Tuesday
    </div>
          <div className="col mt-2 mb-2">
            Wednesday
    </div>
          <div className="col mt-2 mb-2">
            Thursday
    </div>
          <div className="col mt-2 mb-2">
            Friday
    </div>
          <div className="col mt-2 mb-2">
            Saturday
    </div>
          <div className="col mt-2 mb-2">
            Sunday
    </div>
        </div>


        {calendar.map((week) => (

          <div className="row">

            <div className="col mt-2 mb-2">
              {value.format('WW').toString()}
            </div>

            {week.map((day) => (
              <div className='day col border border-dark' onClick={() => setValue(day)}>
                <div className={value.isSame(day, 'day') ? 'table-primary' : ''}>

                  {day.format('D').toString()}
                </div>
              </div>
            ))}
          </div>
        ))}

      </div>

    </div>
  );



}