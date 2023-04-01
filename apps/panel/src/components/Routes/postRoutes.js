import routes from 'global/Constants/routes';
import React from 'react';

const Post = React.lazy(() => import('../pages/Post/Post'));
const PostCreate = React.lazy(() => import('../pages/Post/PostCreate'));
const PostUpdate = React.lazy(() => import('../pages/Post/PostUpdate'));

const postRoutes = () => [
  {
    path: routes.postEdit.path,
    component: PostUpdate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.postCreate.path,
    component: PostCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.post.path,
    component: Post,
    type: 'private',
    accessRole: true,
  },
];

export default postRoutes;
