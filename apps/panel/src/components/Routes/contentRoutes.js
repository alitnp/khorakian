import routes from 'global/Constants/routes';
import React from 'react';

const Content = React.lazy(() => import('../pages/Content/Content'));
const CreateContent = React.lazy(() => import('../pages/Content/CreateContent'));
const UpdateContent = React.lazy(() => import('../pages/Content/UpdateContent'));

const contentRoutes = () => [
  {
    path: routes.contentCreate.path,
    component: CreateContent,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.contentEdit.path,
    component: UpdateContent,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.content.path,
    component: Content,
    type: 'private',
    accessRole: true,
  },
];

export default contentRoutes;
