import ChangePassword from 'components/pages/Profile/ChangePassword';
import TcModal from 'components/UI/Modal/TcModal';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/reducer/Login/loginReducer';

const ChangePasswordModal = ({ visible }) => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

  return (
    <TcModal visible={visible} footer={false} title='تغییر رمز عبور' onCancel={handleLogout}>
      <p>
        برای اطمینان از امنیت حساب کاربری خود، لطفا رمز عبور خود را تغییر دهید.
        <br />
        لطفا از استفاده از شماره ملی یا شماره تماس خود به عنوان رمز عبور خودداری کنید.
      </p>

      <ChangePassword fullWidth />
    </TcModal>
  );
};

export default ChangePasswordModal;
