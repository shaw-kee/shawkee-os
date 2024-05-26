import { formatDate } from '@/utils/formatDate';
import { useEffect, useState } from 'react';

const useCurrentDate = ({ onlyTime = false }: { onlyTime?: boolean } = {}) => {
  const [date, setDate] = useState(() => new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(() => new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return { date: formatDate({ date, onlyTime }) };
};

export default useCurrentDate;
