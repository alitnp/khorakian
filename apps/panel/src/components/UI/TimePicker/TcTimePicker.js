import TimePicker from './MomentTimePicker';

const TcTimePicker = ({ ...props }) => {
  return (
    <TimePicker
      style={{ width: '100%', color: 'red !important' }}
      className='border-t-border-color-base bg-t-input-bg-color text-t-text-color'
      popupClassName='bg-t-bg-color text-t-text-color'
      popupStyle={{ backgroundColor: 'red !important' }}
      {...props}
    />
  );
};

export default TcTimePicker;
