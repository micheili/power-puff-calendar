import React from "react";

export default function WeekdayIndicator() {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const weekdayIcons = weekdays.map((day, key) => {
    return (
      <div className="weekday-indicator-icon" key={key}>
        {day}
      </div>
    );
  });

  return <div className="weekday-indicators">{weekdayIcons}</div>;
}
