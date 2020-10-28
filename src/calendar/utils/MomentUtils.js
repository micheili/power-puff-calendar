import moment from 'moment';

//export formating moment-dates!
export const getSpecificDate = ( month, dayOfMonth, year ) => {
  return moment(`${month}-${dayOfMonth}-${year}`, 'MM-DD-YYYY').toDate();
};

export const getSpecificWeek = ( week, year ) => {
  return moment(`${week}-${year}`, 'WW-YYYY').toDate();
};

export const getSpecificWeekDay = ( day, year ) => {
  return moment(`${day}-${year}`, 'dddd-YYYY').toDate();
};

export const getSpecificDay = ( day, year ) => {
  return moment(`${day}-${year}`, 'DD-YYYY').toDate();
};



export const getDayOfMonth = (date) => moment(date).date();

export const getHourOfDay = (date) => moment(date).format('HH');

export const getMonth = (date) => moment(date).month();

export const getWeek = (date) => moment(date).isoWeek();

export const getYear = (date) => moment(date).year();

export const getDay = (date) => moment(date).format('Do'); 

export const getDayWithoutZero = (date) => moment(date).format('D');

export const getToday = () => moment().toDate();

export const getReadableWeekday = (date) => moment(date).format('dddd');

export const getReadableWeekdayAndDate = (date) => moment(date).format('dddd Do');

export const getReadableMonthDate = (date) => moment(date).format('MMMM Do');

export const getReadableMonth = (date) => moment(date).format('MMM');

export const getMonthDayYear = (date) => moment(date).format('MM-DD-YYYY');

export const getMonthDayYearHour = (date) => moment(date).format('MM-DD-YYYY HH');

export const getMonthDay = (date) => moment(date).format('MM-DD');

//export const getReadableMonth = (date) => moment(date).format('DD');