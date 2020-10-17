//import { calendarFormat } from "moment";

export default function BuildCalendar(value) {
  //startday for month
  const startDay = value.clone().startOf("month").startOf("week");
  //endDay of month
  const endDay = value.clone().endOf("month").endOf("week");

  //iterator, get all dates between startday and endday
  //containing weeks and weeks containing days
  const day = startDay.clone().subtract(1, "day");
  const calendar = [];
  //isbefore = method from moment, (endday is when the loop stops, day is the interval)
  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  return calendar;
}
