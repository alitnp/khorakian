import TcTooltip from 'components/UI/Tooltip/TcTooltip';
import { separator } from 'global/default';

const LinePercent = ({ data }) => {
  const total = data.reduce((current, next) => current + parseInt(next.count), 0);
  const getPercentOfTotal = (count) => {
    return count / (total * 0.01);
  };
  const getTooltipTitle = () => {
    return (
      <div>
        <p className='mb-0 text-xs'>{'مجموع:‌' + separator(total)}</p>
        {data.map((item) => {
          return (
            <p className='mb-0 text-xs' key={item.title}>
              {item.title + ':' + getPercentOfTotal(item.count).toFixed(2) + '%'}
            </p>
          );
        })}
      </div>
    );
  };
  return (
    <TcTooltip title={getTooltipTitle()} overlayInnerStyle={{ fontSize: '12px', textAlign: 'center' }}>
      <div className='flex w-full h-3 mt-2 overflow-hidden border-4 rounded-full border-t-bg-color opacity-60'>
        {data.map((item, index) => {
          return (
            <div
              key={item.title}
              className={`${item.color}  h-full ${index !== 0 && 'border-r-[3px]'} border-t-bg-color `}
              style={{ width: `${Math.max(getPercentOfTotal(item.count), 2)}%` }}
            />
          );
        })}
      </div>
    </TcTooltip>
  );
};

export default LinePercent;
