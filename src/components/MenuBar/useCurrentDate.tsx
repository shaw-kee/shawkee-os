import { useEffect, useState } from 'react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const useCurrentDate = () => {
  const [date, setDate] = useState(() => new Date('2023-11-01 00:05'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(() => new Date('2023-11-01 00:05'));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  const formatDate = () => {
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    let hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;
    const minutePadded = minute < 10 ? '0' + minute : minute;
    return `${dayOfWeek} ${month} ${day}  ${hour}:${minutePadded} ${ampm}`;
  };

  return { date: formatDate() };
};

export default useCurrentDate;
