import useCurrentDate from '@/hooks/useCurrentDate';

const Clock = () => {
  const { date, time } = useCurrentDate();
  return <div className='whitespace-pre'>{`${date}  ${time}`}</div>;
};

export default Clock;
