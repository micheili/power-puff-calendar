import React from 'react';
import moment from 'moment';
import buildCalendar from './BuildCalendar';

export default function CalendarWeeks(){

    const value = moment();
    const startDay = value.clone().startOf('week');
    const endDay = value.clone().endOf('week');

    const day = startDay.clone().subtract(1, 'day');
     const c = [];
     //isbefore = method from moment, (endday is when the loop stops, day is the interval)
     while(day.isBefore(endDay, 'day')){
         c.push(
             Array(7).fill(0).map(() => day.add(1, 'day').clone())
         );
     }


    return(
        <div>
            <h1>weeks</h1>
         

            {c.map((week) => (
                <div>
                  {week.map((day) => (
                  
                      <div >         
                        {day.format('D').toString()}                   
                      </div>                    
                    
                  ))}               
                </div>
              ))}

      
        </div>
    );
}