import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';
import { basicActors } from 'global/Models/globalModels';

export interface content extends basicActors {
  id: 0;
  title: 'string';
  description: 'string';
  contentTypeId: 0;
  text: 'string';
  thumbnailUrl: 'string';
  isFeatured: true;
  videoUrl: 'string';
  imageList: contentImage[];
}

export interface contentImage extends basicActors {
  id: 0;
  contentId: 0;
  title: 'string';
  imageUrl: 'string';
}

export const contentColumns = (handleDelete: (_id: number) => void) => [
  { title: 'عنوان', key: 'title', dataIndex: 'title' },
  { title: 'شرح', key: 'description', dataIndex: 'description' },
  {
    title: 'عملیات',
    key: 'operation',
    dataIndex: 'operation',
    render: (_text: any, record: any) => (
      <div>
        <TcEditIcon to={routes.contentEdit.path + '/' + record.id} />
        <TcDeleteIcon onConfirm={() => handleDelete(record.id)} />
      </div>
    ),
  },
];
