import classes from './style.module.css';
import { CloseOutlined } from '@ant-design/icons';

const TcElevateView = ({ children, close, width, ...props }) => {
  return (
    <div
      {...props}
      className={`fixed top-0 pt-16 left-0 z-50 w-full h-full overflow-y-auto ${classes['t-elevate-view']}`}
      onMouseDown={(e) => {
        e.stopPropagation();
        close();
      }}>
      <div className='flex items-center justify-center'>
        <div
          style={{ width }}
          className={`px-12 py-4 relative  mb-10 bg-t-bg-color rounded-md ${classes['t-elevate-view-wrapper']}`}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}>
          <div className='absolute mb-3 left-14'>
            <CloseOutlined onMouseDown={close} className='cursor-pointer' />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default TcElevateView;
