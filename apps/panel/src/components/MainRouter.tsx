import React, { useEffect, memo, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute, { protectedRoute } from '../Route/ProtectedRoute';
import { useSelector } from 'react-redux';
import LoginLayout from './Layout/Login/LoginLayout';
import TcLoading from 'components/UI/Loading/TcLoading';
import TcLayout from 'components/Layout/TcLayout';
import routes from 'global/Constants/routes';
import TcPageListWrapper from 'components/UI/TcPageListWrapper/TcPageListWrapper';
import TcCreatePage from 'components/UI/TcCreatePage/TcCreatePage';
import TcEditPage from 'components/UI/TcEditPage/TcEditPage';
import genericModels from 'global/Models/genericRoutesModels';
import signalRoutes from 'components/Routes/signalRoutes';
import paymentRoutes from 'components/Routes/paymentRoutes';
import userRoutes from 'components/Routes/userRoutes';
import contentRoutes from 'components/Routes/contentRoutes';

const LoginForm = React.lazy(() => import('./pages/Login/LoginForm'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const Setting = React.lazy(() => import('./pages/Setting/Setting'));

function MainRouter() {
  const user = useSelector((state: any) => state.login.value);
  const isLoggedIn = user.isLoggedIn;
  const { theme } = useSelector((state: any) => state.setting);

  //defaultSettings
  useEffect(() => {
    if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'light');
    if (!localStorage.getItem('filterWrapperStatus')) localStorage.setItem('filterWrapperStatus', 'open');
  }, []);

  useEffect(() => {
    const root = document.querySelector(':root');
    root?.setAttribute('color-scheme', theme);
    theme === 'dark' && root?.classList.add('dark');
    theme === 'light' && root?.classList.remove('dark');
  }, [theme]);

  const routesList: protectedRoute[] = [
    {
      path: routes.profile.path,
      component: Profile,
      type: 'private',
      accessRole: true,
    },
    {
      path: routes.dashboard.path,
      component: Dashboard,
      type: 'private',
      accessRole: true,
    },
    {
      path: routes.dashboard.path,
      component: Dashboard,
      type: 'private',
      accessRole: true,
    },
    {
      path: routes.setting.path,
      component: Setting,
      type: 'private',
      accessRole: true,
    },

    //signals
    ...signalRoutes(),

    //payment
    ...paymentRoutes(),

    //user
    ...userRoutes(),

    //content
    ...contentRoutes(),
  ];

  const genericRoute: protectedRoute[] = [];
  genericModels.map((model) => {
    genericRoute.push({
      path: model.createRoute,
      component: (
        <TcCreatePage backRoute={model.ListRoute} submitEndpoint={model.createEndpoint} title={model.title}>
          {model.inputs}
        </TcCreatePage>
      ),
      type: 'private',
      accessRole: true,
    });
    genericRoute.push({
      path: model.editRoute,
      component: (
        <TcEditPage backRoute={model.ListRoute} getEndpoint={model.listEndpoint} submitEndpoint={model.editEndpoint} title={model.title}>
          {model.inputs}
        </TcEditPage>
      ),
      type: 'private',
      accessRole: true,
    });
    genericRoute.push({
      path: model.ListRoute,
      component: (
        <TcPageListWrapper
          columns={model.columns}
          createRoute={model.createRoute}
          deleteEndpoint={model.deleteEndpoint}
          filterItems={model.filterInputs}
          getListEndpoint={model.listEndpoint}
          title={model.title}
        />
      ),
      type: 'private',
      accessRole: true,
    });
  });

  const loginRoutes: protectedRoute[] = [
    {
      path: routes.login.path,
      component: LoginForm,
      type: 'guest',
      accessRole: true,
    },
    {
      path: routes.register.path,
      component: Register,
      type: 'guest',
      accessRole: true,
    },
  ];

  return (
    <>
      {isLoggedIn ? (
        <TcLayout>
          <Suspense fallback={<TcLoading className='grid h-screen place-items-center' />}>
            <Switch>
              {routesList.map((route) => (
                <ProtectedRoute key={route.path} {...route} />
              ))}
              {genericRoute.map((route) => (
                <Route path={route.path} render={() => route.component} key={route.path} />
              ))}
              <ProtectedRoute routeProps={{ render: () => <Redirect to={routes.dashboard.path} /> }} />
            </Switch>
          </Suspense>
        </TcLayout>
      ) : (
        <LoginLayout>
          <Suspense fallback={<TcLoading className='grid h-screen place-items-center' />}>
            <Switch>
              {loginRoutes.map((route) => (
                <ProtectedRoute key={route.path} {...route} />
              ))}
              <ProtectedRoute render={() => <Redirect to={routes.login.path} />} />
            </Switch>
          </Suspense>
        </LoginLayout>
      )}
    </>
  );
}

export default memo(MainRouter);
