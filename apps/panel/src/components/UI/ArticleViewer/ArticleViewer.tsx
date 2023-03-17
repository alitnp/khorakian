import { DOMAIN } from 'config/API/ApiService';
import { FC } from 'react';

interface IArticleViewier {
  content: [{ articleElementTypeId: number; content: string }];
}

const ArticleViewer: FC<IArticleViewier> = ({ content }) => {
  return (
    <div className='max-w-[700px] mx-auto py-10'>
      {content?.map((item) => {
        if (item.articleElementTypeId === 1 && item.content) return <h1 className='text-2xl font-bold text-inherit'>{item.content}</h1>;
        if (item.articleElementTypeId === 2 && item.content) return <p className='text-inherit'>{item.content}</p>;
        if (item.articleElementTypeId === 3 && item.content)
          return <img className='w-full mb-6' src={typeof item.content === 'string' ? `${DOMAIN}` + item.content : URL?.createObjectURL(item.content)} />;
      })}
    </div>
  );
};

export default ArticleViewer;
