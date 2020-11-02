import React, {useContext} from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from '../utils/MomentUtils';
import { getDatesInMonthDisplay } from '../utils/DateUtils';
import {Context} from '../../App';
import moment from "moment";

export default function DateIndicator({activeDates, selectDate, setSelectDate}){
  const [context] = useContext(Context);


  let events = [
    ...context.myEvents,...context.invitedEvents
  ]
  
  // map start and stop to real date objects
  events =events.map(x => ({
    ...x, 
    start: new Date(x.start), 
    stop: new Date(x.stop),
    length: Math.ceil ((new Date(x.stop).getTime() - new Date(x.start).getTime()) / (60 * 60 * 1000 *24))
    
  }));



  function resetStartedPrinting(){
    for(let event of events){
      event.startedPrinting = false;
    }
  }
  
  function checkEvent(date){
    let info = [];


    for(let event of events){
      let start1Before = new Date(event.start.getTime());
      start1Before.setHours(start1Before.getHours() -24);
      
      if(date >= start1Before && date <= event.stop){        
        console.log("dateindicator event length", event.title, " ", event.length)
        for (var i = 0; i < event.length; i++) {        
          info.push(
           <div className="events" data-date={date.toString()} key={event.id} style={{position: 'relative'}}>
                {event.title.substr(0,10) + '...'}
           </div>
         ); 
         return  <>{info}</> ; 
         }
         
         }  
      }
     
     
   }

  //    {event.start.getHours() + '.' + (event.start.getMinutes() + '').padStart(2, '0')} -
  //{event.stop.getHours() + '.' +  (event.stop.getMinutes() + '').padStart(2, '0')}


  //------------------------------------

    // EVENT HANDLING CALLBACK
    const changeDate = (e) => {
      setSelectDate(e.target.getAttribute('data-date'));
    };

    const datesInMonth = getDatesInMonthDisplay(
      getMonth(selectDate) + 1,
      getYear(selectDate)
    );

    resetStartedPrinting();

      const monthDates = datesInMonth.map((item, key) => {
       const selected =
      getMonthDayYear(selectDate) === getMonthDayYear(item.date) ? 'selected' : '';
        const active =
      activeDates && activeDates[getMonthDayYear(item.date)] ? 'active' : '';
       
      return (
          <div
            className={`date-icon ${selected} ${active}`}
            data-active-month={item.currentMonth}
            data-date={item.date.toString()}
            key={key}
         
            onClick={changeDate}
          >
            {getDayOfMonth(item.date)}
            {checkEvent(item.date)}
          </div>
        );
      });

      return <div className="date-indicator">{monthDates}</div>;



}