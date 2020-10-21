import React, { useState, useEffect } from 'react';
import moment, { calendarFormat } from 'moment';
import { Link } from "react-router-dom";


export default function CalendarMonth() {

  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());


  const startDay = value.clone().startOf('month').startOf('week');
  const endDay = value.clone().endOf('month').endOf('week');

  const ca = [];
  while (startDay.isBefore(endDay, 'day')) {
    ca.push(
      Array(7).fill(0).map(() => startDay.add(1, 'day').clone())
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
          <Link to="/calendarday">
          <button className="btn btn-primary btn-lg btn-block my-2" >Day</button>
          </Link>
          </div>
          <div className="col text-center">
          <Link to="/calendarweek">
          <button className="btn btn-primary btn-lg btn-block my-2" >Week</button>
         </Link>
           
          </div>
          <div className="col text-center">
          <Link to="/calendar">
          <button className="btn btn-primary btn-lg btn-block my-2" >Month</button>
         </Link>
          </div>
        </div>
      </div>

      
          <div className="container border border-dark">
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



      <div className="container border border-dark">
        <div className="row border border-dark bg-dark text-white">
          <div className="col mt-2 mb-2">
            W
    </div>
          <div className="col mt-2 mb-2">
            Mo
    </div>
          <div className="col mt-2 mb-2">
            Tu
    </div>
          <div className="col mt-2 mb-2">
            We
    </div>
          <div className="col mt-2 mb-2">
            Th
    </div>
          <div className="col mt-2 mb-2">
            Fr
    </div>
          <div className="col mt-2 mb-2">
            Sa
    </div>
          <div className="col mt-2 mb-2">
            Su
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