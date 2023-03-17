const TcInfo = ({ right, left, rightClassName, leftClassName }) => {
  return (
    <div className='flex items-center justify-between p-0 m-0'>
      <p className={`m-0 p-0 text-xs whitespace-nowrap min-w-[60px] ${rightClassName}`}>{right + ' : '}</p>
      <p className={`m-0 p-0 text-xs text-t-text-color ${leftClassName}`}>{!left && left !== 0 ? 'ثبت نشده' : left}</p>
    </div>
  );
};

export default TcInfo;
