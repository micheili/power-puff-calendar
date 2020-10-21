import React from 'react';

export default function WeekdayIndicator(){


    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const weekdayIcons = weekdays.map((day, key) => {
        return (
          <th className="weekday-indicator-icon" key={key}>
            {day}
          </th>
        );
      });

      return <tr className="weekday-indicators">{weekdayIcons}</tr>;

}