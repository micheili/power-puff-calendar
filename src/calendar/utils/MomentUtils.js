import moment from 'moment';

//export formating moment-dates!
export const getSpecificDate = (year, month, dayOfMonth ) => {
  return moment(`${year}-${month}-${dayOfMonth}`, 'YYYY-MM-DD').toDate();
};

export const getDayOfMonth = (date) => moment(date).date();

export const getMonth = (date) => moment(date).month();

export const getYear = (date) => moment(date).year();

export const getToday = () => moment().toDate();

export const getReadableWeekday = (date) => moment(date).format('dddd');

export const getReadableMonthDate = (date) => moment(date).format('MMMM Do');

export const getMonthDayYear = (date) => moment(date).format('MM-DD-YYYY');