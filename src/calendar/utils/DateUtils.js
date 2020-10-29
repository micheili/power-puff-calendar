import moment from 'moment';
import {
  getSpecificDate,
  getMonth,
  getYear,
} from '../utils/MomentUtils';



//DAY
export const getHoursInDayDisplay = (selectDate) => {
  const hourStart = moment(selectDate).startOf('day');

  const hours = [];
  for (let i = 0; i <= 23; i++) {
    hours.push({
      date:moment(hourStart).add(i, 'hour').toDate()});
  }
  return hours;
};

export const getDaySet = (selectDate) => {
  // daysInMs -> number of milliseconds in a day
   let dayInMs = 24 * 60 * 60 * 1000;

   // today -> this day at midnight 
   let today = new Date(selectDate);
   today.setHours(0,0,0,0);

   let prev = new Date(today.getTime() - dayInMs);
   // prev -> next Monday at midnight
   let next = new Date(today.getTime() + dayInMs);
   return { current: today, prev, next };
};



//WEEK
export const getDatesInWeekDisplay = (selectDate) =>{

  const days = [];
  const weekStart = moment(selectDate).startOf('isoWeek');
  for (let i = 0; i <= 6; i++) {
    days.push({
      date:moment(weekStart).add(i, 'days').toDate(),
      currentMonth: true
    });
  }
  return days;
};


export const getWeekSet = (selectDate) => {
  // daysInMs -> number of milliseconds in a day
   let dayInMs = 24 * 60 * 60 * 1000;
   // thisMonday -> this Monday at midnight 
   let thisMonday = new Date(selectDate);
   thisMonday.setHours(0,0,0,0);
   
   while (thisMonday.getDay() !== 1) {
     thisMonday = new Date(thisMonday.getTime() - dayInMs);
   }
   // prev -> previous Monday at midnight
   let prev = new Date(thisMonday.getTime() - dayInMs * 7);
   // prev -> next Monday at midnight
   let next = new Date(thisMonday.getTime() + dayInMs * 7);
   return { current: thisMonday, prev, next };
  
};

  

//MONTH
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
    for (let j = firstWeekday -2; j >= 0; j--) {
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
    ).startOf('month').isoWeekday();
  }

    const getPrevMonthYear = (month, year) => {
    // If it is January... prev month is Dec of the previous year
    if (month === 1) {
      return {
        month: 12,
        year: year - 1,
      };
    } else {
      return {
        month: month - 1,
        year,
      };
    }
  }
  const getNextMonthYear = (month, year) => {
    if (month === 12) {
      return {
        month: 1,
        year: year + 1,
      };
    } else {
      return {
        month: month + 1,
        year,
      };
    }
  }

  

  