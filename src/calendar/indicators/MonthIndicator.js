import React from "react";
import { getMonth } from "../utils/MomentUtils";
import { getMonthSet } from "../utils/DateUtils";

export default function MonthIndicator({ selectDate, setSelectDate }) {
  const monthsFull = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const changeMonth = (e) => {
    setSelectDate(e.target.getAttribute("data-date"));
  };

  const monthSet = getMonthSet(selectDate);

  return (
    <div className="month-indicator container">
      <div className="row  ">
        <h5
          className="col prev p-0 m-0 text-right align-self-center "
          data-date={monthSet.prev}
          onClick={changeMonth}
        >
          {String.fromCharCode(171)} {monthsFull[getMonth(monthSet.prev)]}{" "}
        </h5>

        <h1 className="col current text-center font-weight-bold">
          {monthsFull[getMonth(monthSet.current)]}
        </h1>

        <h5
          className="col next p-0 m-0 text-left align-self-center"
          data-date={monthSet.next}
          onClick={changeMonth}
        >
          {monthsFull[getMonth(monthSet.next)]} {String.fromCharCode(187)}
        </h5>
      </div>
    </div>
  );
}
