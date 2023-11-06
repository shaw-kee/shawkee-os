import useCurrentDate from '@/hooks/useCurrentDate';

const Clock = () => {
  const { date } = useCurrentDate();
  return <div className='whitespace-pre'>{date}</div>;
};

export default Clock;
