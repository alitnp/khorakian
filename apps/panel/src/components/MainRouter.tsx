import React, { useEffect, memo, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute, { protectedRoute } from '../Route/ProtectedRoute';
import { useSelector } from 'react-redux';
import LoginLayout from './Layout/Login/LoginLayout';
import TcLoading from 'components/UI/Loading/TcLoading';
import TcLayout from 'components/Layout/TcLayout';
import routes from 'global/Constants/routes';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';
import TcCreatePage from 'components/UI/TcCreatePage/TcCreatePage';
import TcEditPage from 'components/UI/TcEditPage/TcEditPage';
import genericModels from 'global/Models/genericRoutesModels';
import postRoutes from 'components/Routes/postRoutes';
import userRoutes from 'components/Routes/userRoutes';
import videoRoutes from 'components/Routes/videoRoutes';
import imageRoutes from 'components/Routes/imageRoutes';
import ideaRoutes from 'components/Routes//ideaRoutes';
import userIdeaRoutes from 'components/Routes/userIdeaRoutes';
import experienceRoutes from 'components/Routes/experienceRoutes';
import userExperienceRoutes from 'components/Routes/userExperienceRoutes';
import defaultImageRoutes from 'components/Routes/defaultImageRoutes';
import pageItemRoutes from 'components/Routes/pageItemRoutes';
import socialMedia from 'components/Routes/socialMediaRoutes';
import aboutMe from 'components/Routes/aboutMeRoutes';
import sliderRoutes from 'components/Routes/sliderRoutes';
import defaultTextRoutes from 'components/Routes/defaultTextRoutes';
import directMessageRoutes from 'components/Routes/directMessageRoutes';
import historyRoutes from 'components/Routes/historyRoutes';

const LoginForm = React.lazy(() => import('./pages/Login/LoginForm'));
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

    //defaultImage
    ...defaultImageRoutes(),

    //user
    ...userRoutes(),

    //post
    ...postRoutes(),

    //video
    ...videoRoutes(),

    //image
    ...imageRoutes(),

    //idea
    ...ideaRoutes(),

    //userIdea
    ...userIdeaRoutes(),

    //experience
    ...experienceRoutes(),

    //pageItem
    ...pageItemRoutes(),

    //userExperience
    ...userExperienceRoutes(),

    //socialMedia
    ...socialMedia(),

    //aboutMe
    ...aboutMe(),

    //slider
    ...sliderRoutes(),
    //defaultTextRoutes
    ...defaultTextRoutes(),

    //directMessageRoutes
    ...directMessageRoutes(),
    //historyRoutes
    ...historyRoutes(),
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
        <TcEditPage backRoute={model.ListRoute} getEndpoint={model.detailEndpoint} submitEndpoint={model.editEndpoint} title={model.title}>
          {model.inputs}
        </TcEditPage>
      ),
      type: 'private',
      accessRole: true,
    });
    genericRoute.push({
      path: model.ListRoute,
      component: (
        <TcListPageWrapper
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
