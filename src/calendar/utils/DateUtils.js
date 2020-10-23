import moment from 'moment';
import {
  getSpecificDate,
  getSpecificWeek,
  getMonth,
  getYear,
  getMonthDayYear,
  getWeek
} from '../utils/MomentUtils';



export const getHoursInDay = (selectDate) => {
  const hourStart = moment(selectDate).startOf('day');

  const hours = [];
  for (let i = 0; i <= 23; i++) {
    hours.push({
      date:moment(hourStart).add(i, 'hour').toDate()});
  }

  return hours;
}


export const getDatesInWeekDisplay = (selectDate) =>{
 
  const weekStart = moment(selectDate).startOf('week').add(1, "day");
  
  const days = [];
  for (let i = 0; i <= 6; i++) {
    days.push({
      date:moment(weekStart).add(i, 'days').toDate()});
  }

  return days;

}

export const getDaySet = (selectDate) => {

}

export const getWeekSet = (selectDate) => {
  const week = getWeek(selectDate);
      
  const result = {
    current: selectDate,
    prev: getSpecificWeek(week - 1, getYear(selectDate)),
    next: getSpecificWeek(week + 1,  getYear(selectDate)),
  };

  if (week === 1) {
    result.prev = getSpecificWeek(52, getYear(selectDate) - 1);
  }


 /* if (week === 53 || week === 52) {
    result.next = getSpecificWeek(1, getYear(selectDate) + 1);
  }*/

  return result;
};

  



 export const getDatesInMonthDisplay = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstWeekday = getFirstWeekdayOfMonth(month, year);
    const result = [];
    const prev = getPrevMonthYear(month, year);
    const prevDaysInMonth = getDaysInMonth(
      prev.month, 
      prev.year
    );
    // Add prev overflow dates... 
    for (let j = firstWeekday - 1; j >= 0; j--) {
      result.push({
        date: moment(
          `${prev.month}-${prevDaysInMonth - j}-${prev.year}`, 
          'MM-DD-YYYY'
        ).toDate(),
        currentMonth: false
      })
    }
    // Add current month's dates
    for (let i = 1; i <= daysInMonth; i++) {
      result.push({
        date:moment(`${month}-${i}-${year}`, 'MM-DD-YYYY').toDate(),
        currentMonth: true
      });
    }
    // Overflow dates for next month to meet 42 days per month display   requirement
    if (result.length < 42) {
      const daysToAdd = 42 - result.length;
      const next = getNextMonthYear(month, year);
  for (let k = 1; k <= daysToAdd; k++) {
        result.push({
          date: moment(
            `${next.month}-${k}-${next.year}`, 
            'MM-DD-YYYY'
          ).toDate(),
          currentMonth: false
        })
      }
    }

    //result is an array of date objects
    return result;
  }

 export const getMonthSet = (selectDate) => {
    const month = getMonth(selectDate) + 1;
    
    const result = {
      current: selectDate,
      prev: getSpecificDate(month - 1, 1, getYear(selectDate)),
      next: getSpecificDate(month + 1, 1, getYear(selectDate)),
    };
  
    if (month === 1) {
      result.prev = getSpecificDate(12, 1, getYear(selectDate) - 1);
    }
  
    if (month === 12) {
      result.next = getSpecificDate(1, 1, getYear(selectDate) + 1);
    }
  
    return result;
  };

 
  const getDaysInMonth = (month, year) => {
    return moment(`${month}-${year}`, 'MM-YYYY').daysInMonth();
  }
 

  const getFirstWeekdayOfMonth = (month, year) => {
    return moment(
      `${month}-${year}`, 
      'MM-YYYY'
    ).startOf('month').subtract(1, 'day').weekday()
  }

  const getPrevMonthYear = (month, year) => {
    // If it is January... prev month is Dec of the previous year
    if (month === 1) { 
      return {
        month: 12,
        year: year - 1
      }
    }
    // Otherwise, same year, but month - 1
    return {
      month: month - 1,
      year
    }
  }
  const getNextMonthYear = (month, year) => {
    // If it is January... prev month is Dec of the previous year
    if (month === 1) { 
      return {
        month: month + 1,
        year
      }
    }
  // Otherwise, same year, but month - 1
    return {
      month: 12,
      year: year + 1
    }
  }


  