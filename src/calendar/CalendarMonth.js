import React, { useState, useEffect } from 'react';
import moment, { calendarFormat } from 'moment';




export default function CalendarMonth() {

  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  //startday for month
  const startDay = value.clone().startOf('month').startOf('week');
  //endDay of month
  const endDay = value.clone().endOf('month').endOf('week');

        //iterator, get all dates between startday and endday
   //containing weeks and weeks containing days
 const day = startDay.clone().subtract(0, 'day');
 const ca = [];
 //isbefore = method from moment, (endday is when the loop stops, day is the interval)
 while(day.isBefore(endDay, 'day')){
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
    
    <div className="container">
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

      <div className="table-responsive">
        <div className="border border-dark">
          <div className="container ">
            <div className="row">
              <div className="previous col"
                onClick={() => setValue(prevMonth())}>
                {String.fromCharCode(171)}</div>
              <h2 className="current col text-center font-weight-bolder ">
                {currentMonthName()} {currentYear()}
              </h2>
              <div className="next col ">
                <div className="float-right" onClick={() => setValue(nextMonth())}>
                  {String.fromCharCode(187)}
                </div>
              </div>
            </div>
          </div>
          <table className="table mt-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Monday</th>
                <th scope="col">Tuesday</th>
                <th scope="col">Wednesday</th>
                <th scope="col">Thursday</th>
                <th scope="col">Friday</th>
                <th scope="col">Saturday</th>
                <th scope="col">Sunday</th>
              </tr>
            </thead>
            <tbody>
              {calendar.map((week) => (
                <tr >
                  {week.map((day) => (
                    <td className='day' scope="col"  onClick={() => setValue(day)}>
                      <div className={value.isSame(day, 'day') ? 'table-primary' : ''}>         
                        {day.format('D').toString()}                   
                      </div>                    
                    </td>
                  ))}               
                </tr>
              ))}
                
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );



}