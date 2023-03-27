import { FC } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { setSettingFullScreen } from 'redux/reducer/Setting/settingReducer';
import { useDispatch, useSelector } from 'react-redux';
import TcTooltip from 'components/UI/Tooltip/TcTooltip';
import { AppDispatch, RootState } from 'redux/store';

const FullScreen: FC = () => {
  //state
  const { fullScreen } = useSelector((state: RootState) => state.setting);

  //hooks
  const dispatch: AppDispatch = useDispatch();

  //function
  const toggleFullScreen = () => dispatch(setSettingFullScreen(!fullScreen));

  return (
    <TcTooltip title='نمایش تمام تصویر' placement='right'>
      <div
        className='flex items-center justify-center border rounded-md shadow-lg cursor-pointer border-t-border-color-base w-7 h-7 bg-t-bg-color print:hidden color-inherit hover:text-t-primary-color'
        onClick={toggleFullScreen}>
        {!fullScreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
      </div>
    </TcTooltip>
  );
};

export default FullScreen;
