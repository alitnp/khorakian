import FullScreen from 'components/Layout/Content/components/FullScreen';
import { useSelector } from 'react-redux';

const TcContent = ({ children }) => {
  //state
  const { fullScreen } = useSelector((state) => state.setting);

  return (
    <>
      <div
        className={` h-full mx-auto  print:flex-grow print:w-full sm:print:w-full ${
          fullScreen ? 'z-40 fixed w-full bg-t-body-bg top-0 left-0 sm:p-4 overflow-y-auto' : 'w-[98%] sm:w-11/12 mb-4 flex-grow-0 '
        }`}
        style={{ pageBreakBefore: 'avoid', breakBefore: 'avoid', breakInside: 'avoid', pageBreakInside: 'avoid' }}>
        {children}
      </div>

      <div className='fixed z-50 flex flex-col gap-2 left-4 bottom-6 print:hidden'>
        <FullScreen />
      </div>
    </>
  );
};

export default TcContent;
