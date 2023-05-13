import routes from 'global/Constants/routes';
import React from 'react';

const PageItemEdit = React.lazy(() => import('../pages/PageItem/PageITemUpdate'));
const PageItemCreate = React.lazy(() => import('../pages/PageItem/PageITemCreate'));
const PageItem = React.lazy(() => import('../pages/PageItem/PageITem'));

const pageItemRoutes = () => [
  {
    path: routes.pageItemEdit.path,
    component: PageItemEdit,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.pageItemCreate.path,
    component: PageItemCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.pageItem.path,
    component: PageItem,
    type: 'private',
    accessRole: true,
  },
];

export default pageItemRoutes;
