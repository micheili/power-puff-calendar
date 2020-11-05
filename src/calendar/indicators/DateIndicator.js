import React, {useContext, useState, useEffect} from 'react';
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
import moment from 'moment';

export default function DateIndicator({activeDates, selectDate, setSelectDate}){
  const [context] = useContext(Context);
  const [info, setInfo] = useState([]);

  const getdayInfo = async() =>{
    const response = await fetch
    (`https://cors-anywhere.herokuapp.com/http://history.muffinlabs.com/date/${dateQuery}`);
    const data = await response.json();
    setInfo(data);
    console.log('data from api', data)
  };


  const dateQuery = moment(selectDate).format("M/D")

  console.log('date query', dateQuery)
  console.log('selected day in calendar', selectDate)

  useEffect(()=>{
    getdayInfo();
  }, []);

  const fullstring = (`https://cors-anywhere.herokuapp.com/http://history.muffinlabs.com/date/${dateQuery}`);
  console.log(fullstring)

  console.log('the day', info.date, 'info', info.data)

  
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