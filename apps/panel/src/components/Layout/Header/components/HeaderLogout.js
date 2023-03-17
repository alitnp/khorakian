import { Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/reducer/Login/loginReducer';
import { LogoutOutlined } from '@ant-design/icons';

const HeaderLogout = () => {
  //hooks
  const dispatch = useDispatch();
  //functions
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Tooltip placement='bottom' title='خروج از حساب'>
      <div
        className='flex items-center justify-center p-2 text-center transition-all duration-500 rounded-md cursor-pointer hover:bg-t-layer-bg-color-hovered bg-t-layer-bg-color '
        onClick={handleLogout}>
        <LogoutOutlined className='' />
      </div>
    </Tooltip>
  );
};

export default HeaderLogout;
