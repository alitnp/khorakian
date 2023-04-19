import routes from 'global/Constants/routes';
import React from 'react';

const Idea = React.lazy(() => import('../pages/Idea/Idea'));
const IdeaCreate = React.lazy(() => import('../pages/Idea/IdeaCreate'));
const IdeaUpdate = React.lazy(() => import('../pages/Idea/IdeaUpdate'));

const ideaRoutes = () => [
  {
    path: routes.ideaEdit.path,
    component: IdeaUpdate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.ideaCreate.path,
    component: IdeaCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.idea.path,
    component: Idea,
    type: 'private',
    accessRole: true,
  },
];

export default ideaRoutes;
