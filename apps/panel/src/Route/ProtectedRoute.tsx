import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';

export interface protectedRoute {
  type?: any;
  accessRole?: any;
  path?: any;
  component?: any;
  [x: string]: any;
}

const ProtectedRoute: FC<protectedRoute> = ({ type, accessRole, path, component: Component, ...props }) => {
  const isLoggedIn = useSelector((state: any) => state.login.value).isLoggedIn;
  const dispatch = useDispatch();
  if (!isLoggedIn && type === 'guest') {
    return <Route path={path} {...props} render={() => <Component />} />;
  } else if (isLoggedIn && type === 'private') {
    return (
      <Route
        {...props}
        render={() => {
          if (!accessRole) {
            dispatch(setNotificationData({ message: 'حساب کاربری شما به این صفحه دسترسی ندارد', type: 'error', time: 5000 }));
            return <Redirect to='/dashboard' />;
          } else {
            return <Component />;
          }
        }}
      />
    );
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
