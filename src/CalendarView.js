import React, {} from 'react';
import moment, { calendarFormat } from 'moment';




export default function CalendarView(){

    const value = moment();
    //startday for month
    const startDay = value.clone().startOf('month').startOf('week');
    //endDay of month
    const endDay = value.clone().endOf('month').endOf('week');
    
    //iterator, get all dates between startday and endday
    //containing weeks and weeks containing days
    const day = startDay.clone().subtract(1, 'day');
    const calendar = [];
     //isbefore = method from moment, (endday is when the loop stops, day is the interval)

     while(day.isBefore(endDay, 'day')){
         calendar.push(
             Array(7).fill(0).map(() => day.add(1, 'day').clone())
         )
     }

 return(    
 <div>
  
<div className="jumbotron mb-0">
 <h1 className="display-4">
 {day.format('MM/DD')}</h1>

  
  <a className="btn btn-primary btn-lg" href="/" role="button">Days</a>
  <a className="btn btn-primary btn-lg" href="/weeks" role="button">Weeks</a>
  <a className="btn btn-primary btn-lg" href="/months" role="button">Months</a>

  </div>

  <div class="table-responsive">
<table className="table mt-4">
  <thead className="thead-dark">
    <tr>

    <th scope="col">sunday</th>
      <th scope="col">Monday</th>
      <th scope="col">onsdag</th>
      <th scope="col">torsdag</th>
      <th scope="col">fredag</th>
      <th scope="col">lördag</th>
      <th scope="col">söndag</th>
      
    </tr>
    
  </thead>

  <tbody>
  
  
  
    {calendar.map((week) =>
        <tr>
            {week.map((day) =>
             <td scope="col">{day.format('D').toString()}</td>
            )}
       </tr>
    )}




   
    
  </tbody>
</table>

 
</div>
 </div>
 );
    
    
  
}