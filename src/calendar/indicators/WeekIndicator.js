import React, {useContext} from 'react';
import { getWeek } from '../utils/MomentUtils';
import { getWeekSet } from '../utils/DateUtils';
import { Context } from "../../App";

export default function WeekIndicator({ selectDate, setSelectDate }){

  const [context] = useContext(Context);

    const changeWeek = (e) => {
        setSelectDate(e.target.getAttribute('data-date'));
      };

      const weekSet = getWeekSet(selectDate);

      return (
        <div className={`month-indicator container ${context.colorTheme}  `}>
           <div className="row  ">
          <h5 className={`col prev ${context.colorTheme} p-0 m-0 text-right align-self-center`} data-date={weekSet.prev} onClick={changeWeek}>
          {String.fromCharCode(171)} {[getWeek(weekSet.prev)]}
          </h5>
          <h1 className={`col current ${context.colorTheme} text-center font-weight-bold`}>{[getWeek(weekSet.current)]}</h1>
          <h5 className={`col next ${context.colorTheme} p-0 m-0 text-left align-self-center`} data-date={weekSet.next} onClick={changeWeek}>
            {[getWeek(weekSet.next)]} {String.fromCharCode(187)}
          </h5>
          </div>
        </div>
      );
}