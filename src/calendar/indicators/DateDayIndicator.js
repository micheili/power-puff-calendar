import React from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
  getWeek,
  getToday,
  getHourOfDay
} from '../utils/MomentUtils';
import { getHoursInDayDisplay } from '../utils/DateUtils';

let events = [
  {id: 1, userId: 1, title: "Möte", description: "Viktigt möte", start: '2020-10-26 12:20', stop: '2020-10-26 15:05'},
  {id: 2, userId: 1, title: "Möte2", description: "Viktigt möte", start: '2020-10-26 17:30', stop: '2020-10-26 18:20'},
  {id: 3, userId: 1, title: "Möte3", description: "Viktigt möte", start: '2020-10-26 17:40', stop: '2020-10-26 17:55'}
]
// map start and stop to real date objects
events =events.map(x => ({
  ...x, 
  start: new Date(x.start), 
  stop: new Date(x.stop),
  length: Math.ceil ((new Date(x.stop).getTime() - new Date(x.start).getTime()) / (60 * 60 * 1000))
}));
console.log(events)
function resetStartedPrinting(){
  for(let event of events){
    event.startedPrinting = false;
  }
}

function checkEvent(date){
  let info = [];
  for(let event of events){
    let start1Before = new Date(event.start.getTime());
    start1Before.setHours(start1Before.getHours() - 1);
    if(date >= start1Before && date <= event.stop){
      !event.startedPrinting && info.push(
        <div key={event.id} style={{position: 'relative'}}>
          <div style={{position: 'absolute', top: 0, left: 0, 
            borderLeft:'3px solid #999', height: (event.length + 1) * 100 + 'px'}}></div>
          {event.title}
          {event.start.getHours() + '.' + (event.start.getMinutes() + '').padStart(2, '0')} -
          {event.stop.getHours() + '.' +  (event.stop.getMinutes() + '').padStart(2, '0')}
        </div>
      );
      event.startedPrinting = true;
    }
  }
  return info.length ? <>{info}</> : null;
}

export default function DateWeekIndicator({ activeDates, selectDate, setSelectDate }) {

 
  const hoursInDay = getHoursInDayDisplay(selectDate);

  resetStartedPrinting();

  const dayHours = hoursInDay.map((item, key) => {

    return (
      <div
        className={"date-day-icon"}
        data-date={item.date.toISOString()}
        key={key}
      >
        {getHourOfDay(item.date)}
        {checkEvent(item.date)}
      </div>
    );
  });

  return <div className="date-day-indicator">{dayHours}</div>;




}