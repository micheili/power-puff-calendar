import React, {useContext} from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from '../utils/MomentUtils';
import { getDatesInMonthDisplay } from '../utils/DateUtils';
import {Context} from '../../App';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAlgolia, faCalendarPlus
} from "@fortawesome/free-solid-svg-icons";

export default function DateIndicator({activeDates, selectDate, setSelectDate}){
  const [context, updateContext] = useContext(Context);



  let events = [
    ...context.myEvents,...context.invitedEvents
  ]
  
  // map start and stop to real date objects
  events =events.map(x => ({
    ...x, 
    start: new Date(x.start), 
    stop: new Date(x.stop),
    length: Math.ceil ((new Date(x.stop).getDate() - new Date(x.start).getDate()))
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
        !event.startedPrinting && info.push(
          <div className="events" data-date={date.toString()} key={event.id} >     
          *{event.title.substr(0,10) + '...'}
          </div>
        );
        
        event.startedPrinting = true;
      }
    }
    return info.length ? <>{info}</> : null;
  }

  //    {event.start.getHours() + '.' + (event.start.getMinutes() + '').padStart(2, '0')} -
  //{event.stop.getHours() + '.' +  (event.stop.getMinutes() + '').padStart(2, '0')}


  //------------------------------------

    // EVENT HANDLING CALLBACK
    const changeDate = (e) => {
      setSelectDate(e.target.getAttribute('data-date'));
      updateContext({ showEditEvent: false  });
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