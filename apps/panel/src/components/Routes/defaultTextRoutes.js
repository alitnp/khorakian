import routes from 'global/Constants/routes';
import React from 'react';

const DefaultText = React.lazy(() => import('components/pages/DefaultText/DefaultText'));
const DefaultTextCreate = React.lazy(() => import('components/pages/DefaultText/DefaultTextCreate'));
const DefaultTextUpdate = React.lazy(() => import('components/pages/DefaultText/DefaultTextUpdate'));

const textRoutes = () => [
  {
    path: routes.defaultTextEdit.path,
    component: DefaultTextUpdate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.defaultTextCreate.path,
    component: DefaultTextCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.defaultText.path,
    component: DefaultText,
    type: 'private',
    accessRole: true,
  },
];

export default textRoutes;
