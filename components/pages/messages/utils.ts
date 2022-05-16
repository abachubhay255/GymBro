import {differenceInCalendarDays, format, isToday, isYesterday} from 'date-fns';

export const formattedDate = (date: Date, noTime?: boolean): string => {
  if (isToday(date)) {
    return format(date, 'h:mm a');
  }
  if (isYesterday(date)) {
    return noTime ? 'Yesterday' : 'Yesterday, ' + format(date, 'h:mm a');
  }
  const diff = differenceInCalendarDays(new Date(), date);
  if (diff > 0 && diff <= 6) {
    return format(date, noTime ? 'eeee' : 'eeee, h:mm a');
  }
  return format(date, noTime ? 'M/d/yy' : 'M/d/yy, h:mm a');
};
