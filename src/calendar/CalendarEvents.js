import React, { useContext } from "react";
import { Context } from "../App";

export default function getEventsToCalendar(date) {
  const [context, updateContext] = useContext(Context);

  let info = [];

  let events = [...context.myEvents, ...context.invitedEvents];

  // map start and stop to real date objects
  events = events.map((x) => ({
    ...x,
    start: new Date(x.start),
    stop: new Date(x.stop),
    length: Math.ceil(
      (new Date(x.stop).getTime() - new Date(x.start).getTime()) /
        (60 * 60 * 1000)
    ),
  }));

  for (let event of events) {
    event.startedPrinting = false;
  }

  for (let event of events) {
    let start1Before = new Date(event.start.getTime());
    start1Before.setMinutes(start1Before.getMinutes() - 59);

    if (date >= start1Before && date <= event.stop) {
      !event.startedPrinting &&
        info.push(
          <div key={event.id} style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                borderLeft: "3px solid #999",
                height: (event.length + 1) * 100 + "px",
              }}
            ></div>
            {event.title}
          </div>
        );

      event.startedPrinting = true;
    }
  }
  return info.length ? <>{info}</> : null;

  //    {event.start.getHours() + '.' + (event.start.getMinutes() + '').padStart(2, '0')} -
  //{event.stop.getHours() + '.' +  (event.stop.getMinutes() + '').padStart(2, '0')}
}
