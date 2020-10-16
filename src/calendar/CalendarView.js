import React, { useState, useEffect } from 'react';
import moment, { calendarFormat } from 'moment';
import buildCalendar from './BuildCalendar';



export default function CalendarView() {

  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  useEffect(() => {
    setCalendar(buildCalendar(value));
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
          <a className="btn btn-primary btn-lg btn-block my-2" href="/weeks" role="button">Weeks</a>
        </div>
        <div className="col text-center">
          <a className="btn btn-primary btn-lg btn-block my-2" href="/months" role="button">Months</a>
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

              <div className="next col "
              >
                <div className="float-right" onClick={() => setValue(nextMonth())}>
                  {String.fromCharCode(187)}
                </div>
              </div>

            </div>

          </div>

          <table className="table mt-4">

            <thead className="thead-dark">
              <tr>

                <th scope="col">Su</th>
                <th scope="col">Mo</th>
                <th scope="col">Tu</th>
                <th scope="col">We</th>
                <th scope="col">Th</th>
                <th scope="col">Fr</th>
                <th scope="col">Sa</th>

              </tr>

            </thead>

            <tbody>



              {calendar.map((week) => (
                <tr >
                  {week.map((day) => (
                    <td className='day' scope="col" onClick={() => setValue(day)}>

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