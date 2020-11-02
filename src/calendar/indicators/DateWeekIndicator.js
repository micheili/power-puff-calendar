import React, {useContext} from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
} from '../utils/MomentUtils';
import { getDatesInWeekDisplay } from '../utils/DateUtils';
import {Context} from '../../App';



export default function DateWeekIndicator({ activeDates, selectDate, setSelectDate }) {
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
        console.log("dateweek event length", event.length)
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

  const datesInWeek = getDatesInWeekDisplay(selectDate);
 
  resetStartedPrinting();

  const weekDates = datesInWeek.map((item, key) => {
    const selected =
      getMonthDayYear(selectDate) === getMonthDayYear(item.date) ? 'selected' : '';
    const active =
      activeDates && activeDates[getMonthDayYear(item.date)] ? 'active' : '';

    return (
      <div
        className={`date-week-icon ${selected} ${active}`}
        data-date={item.date.toString()}
        key={key}
        data-active-month={item.currentMonth}
        onClick={changeDate}
      >
        {getDayOfMonth(item.date)}
        {checkEvent(item.date)}
      </div>
    );
  });

  return <div className="date-week-indicator">{weekDates}</div>;


}