import React, { useState, useEffect } from 'react';
import moment, { calendarFormat, weekdays } from 'moment';
import { Link } from "react-router-dom";


export default function CalendarDay() {

  
  const [value, setValue] = useState(moment());
  const [hours, setHours] = useState([]);


  const startHour = value.clone().startOf('day');
  const endHour = value.clone().endOf('day').add(1, 'hour');


  const ha = [];
  while (startHour.isBefore(endHour, 'hour')) {
    ha.push(
      Array(1).fill(0).map(() => startHour.add(1, 'hour').clone())
    );
  }


  useEffect(() => {
    setHours(ha);
  }, [value]);

  function currentDayName() {
    return value.format('DD');
  }

  function currentMonth() {
    return value.format('MMMM');
  }

  function prevDay() {
    return value.clone().subtract(1, 'day');
  }

  function nextDay() {
    return value.clone().add(1, 'Day');
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
                onClick={() => setValue(prevDay())}>
                {String.fromCharCode(171)}</div>
              <h2 className="current col text-center font-weight-bolder ">
                {currentDayName()} {currentMonth()}
              </h2>
              <div className="next col ">
                <div className="float-right" onClick={() => setValue(nextDay())}>
                  {String.fromCharCode(187)}
                </div>
              </div>
            </div>
          </div>

    

        <div className="container">
        <div className="row  border border-dark">
     
     <div  className="col p-0">

          {hours.map((day) => (
            <div >
              {day.map((hour) => (

                <div className="hour  border border-dark" onClick={() => setValue(hour)}>
                  <div className={value.isSame(hour, 'hour') ? 'table-primary' : ''} >

                    {hour.format('kk').toString()}
                
                      
                    
                      <div  className="col ">dsad
                      </div>

         
                
                    

               
                </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        </div>
          
        </div>
    </div>
  );
}