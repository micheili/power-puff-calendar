import React, {useContext} from 'react';
import { Context } from "../../App";

export default function WeekdayIndicator(){

  const [context] = useContext(Context);

    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const weekdayIcons = weekdays.map((day, key) => {
        return (
          <div className="weekday-indicator-icon" key={key}>
            {day}
          </div>
        );
      });

      return <div className={`weekday-indicators ${context.colorTheme}`}>{weekdayIcons}</div>;

}