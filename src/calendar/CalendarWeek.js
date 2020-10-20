import React, { useState, useEffect } from 'react';
import moment, { calendarFormat, weekdays } from 'moment';


export default function CalendarWeek() {

  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const [hours, setHours] = useState([]);

  const startDay = value.clone().startOf('week');
  const endDay = value.clone().endOf('week');

  const startHour = value.clone().startOf('day');
  const endHour = value.clone().endOf('day').add(1, 'hour');


  const ha = [];
  while (startHour.isBefore(endHour, 'hour')) {
    ha.push(
      Array(1).fill(0).map(() => startHour.add(1, 'hour').clone())
    );
  }


  const ca = [];
  //isbefore = method from moment, (endday is when the loop stops, day is the interval)
  while (startDay.isBefore(endDay, 'day')) {
    ca.push(
      Array(7).fill(0).map(() => startDay.add(1, 'day').clone())
    );
  }

  useEffect(() => {
    setCalendar(ca);
    setHours(ha);
  }, [value]);

  function currentWeekName() {
    return value.format('WW');
  }

  function currentYear() {
    return value.format('YYYY');
  }

  function prevWeek() {
    return value.clone().subtract(1, 'week');
  }

  function nextWeek() {
    return value.clone().add(1, 'week');
  }
  console.log(calendar)
  console.log(hours)

  return (
    <div>

      <div className="container">
        <div className="row justify-content-md-center bg-secondary">
          <div className="col text-center">
            <a className="btn btn-primary btn-lg btn-block my-2" href="/" role="button">Day</a>
          </div>
          <div className="col text-center">
            <a className="btn btn-primary btn-lg btn-block my-2" href="#" role="button">Week</a>
          </div>
          <div className="col text-center">
            <a className="btn btn-primary btn-lg btn-block my-2" href="#" role="button">Month</a>
          </div>
        </div>
      </div>

     

          <div className="container border border-dark">
            <div className="row">
              <div className="previous col"
                onClick={() => setValue(prevWeek())}>
                {String.fromCharCode(171)}</div>
              <h2 className="current col text-center font-weight-bolder ">
                {currentWeekName()} {currentYear()}
              </h2>
              <div className="next col ">
                <div className="float-right" onClick={() => setValue(nextWeek())}>
                  {String.fromCharCode(187)}
                </div>
              </div>
          

          <table className="table mt-4">
            <thead className="thead-dark">

              {calendar.map((week) => (
                <tr>
                  <th>tid</th>
                  {week.map((day) => (
                    <th scope="col">
                      <div >

                        {day.format('dd') + ' ' + day.format('D').toString()}

                      </div>
                    </th>
                  ))}


                </tr>
              ))}
            </thead>
            <tbody>

            {calendar.map((week) => (
                <tr>

                  {week.map(() => (
                    <td>
                      {hours.map((day) => (
                        <div >
                          {day.map((hour) => (

                            <div className='hour' scope="col" onClick={() => setValue(hour)}>
                              <div className={value.isSame(hour, 'hour') ? 'table-primary' : ''} >

                                {hour.format('kk').toString()}

                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}


           
            </tbody>
          </table>
        </div>
      </div>





      <div className="container border border-dark">
        
        {calendar.map((week) => (
                <div className="row border border-dark bg-dark text-white">
                  <div className="col mt-2 mb-2">tid</div>
                  {week.map((day) => (
                   
                      <div className="col mt-2 mb-2">

                        {day.format('dd') + ' ' + day.format('D').toString()}

                      </div>
                    
                  ))}


                </div>
              ))}
         
        

         <div className="row  border border-dark">
     
                 <div  className="col p-0">

                      {hours.map((day) => (
                        <div >
                          {day.map((hour) => (

                            <div className="hour  border border-dark" onClick={() => setValue(hour)}>
                              <div className={value.isSame(hour, 'hour') ? 'table-primary' : ''} >

                                {hour.format('kk').toString()}
                                <div  className="row p-0">
                                  
                                  <div  className="col p-0">
                                  </div>
                                  <div  className="col p-0">dsad
                                  </div>
                                  <div  className="col p-0">smon
                                  </div>
                                  <div  className="col p-0">ghtr
                                  </div>
                                  <div  className="col p-0">rttt
                                  </div>
                                  <div  className="col p-0">rewr
                                  </div>
                                  <div  className="col p-0">sasa
                                  </div>
                                  <div  className="col p-0">jyhj
                                  </div>
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