import React, {useContext} from 'react';
import { getDay } from '../utils/MomentUtils';
import { getDaySet } from '../utils/DateUtils';
import { Context } from "../../App";

export default function DayIndicator({ selectDate, setSelectDate }){

  const [context] = useContext(Context);

    const changeDay = (e) => {
        setSelectDate(e.target.getAttribute('data-date'));
      };

      const daySet = getDaySet(selectDate);

      return (
        <div className={`month-indicator container ${context.colorTheme}  `}>
           <div className="row  ">
          <h5 className={`col prev ${context.colorTheme} p-0 m-0 text-right align-self-center`} data-date={daySet.prev} onClick={changeDay}>
          {String.fromCharCode(171)} {[getDay(daySet.prev)]}
          </h5>
          <h1 className="col text-center font-weight-bold">  {[getDay(daySet.current)]}</h1>
          <h5 className={`col next ${context.colorTheme} p-0 m-0 text-left align-self-center`} data-date={daySet.next} onClick={changeDay}>
          {[getDay(daySet.next)]} {String.fromCharCode(187)}
          </h5>
          </div>
        </div>
      );
}