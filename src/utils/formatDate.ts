const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type FormatDateParams = { date: Date; onlyTime?: boolean };

export const formatDate = ({ date, onlyTime = false }: FormatDateParams) => {
  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  let hour = date.getHours();
  const minute = date.getMinutes();
  const meridiem = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;
  hour = hour === 0 ? 12 : hour;
  const minutePadded = minute < 10 ? '0' + minute : minute;

  if (onlyTime) {
    return `${hour}:${minutePadded}`;
  }

  return `${dayOfWeek} ${month} ${day}  ${hour}:${minutePadded} ${meridiem}`;
};
