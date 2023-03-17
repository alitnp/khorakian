import ArticleViewer from 'components/UI/ArticleViewer/ArticleViewer';
import { useState } from 'react';

const TcGuideViewer = ({ data }) => {
  //states
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className='flex flex-col gap-2 sm:flex-row'>
      {data.length > 1 && (
        <div className='shrink-0 sm:min-w-[150px] sm:max-w-[200px] overflow-y-auto overflow-x-hidden border rounded-md bg-t-body-bg sm:min-h-[400px] sm:h-[70vh]'>
          {data.map((item, index) => (
            <p
              key={index}
              className={`px-2 whitespace-nowrap py-2 mb-0 cursor-pointer hover:bg-t-bg-color ${
                selectedIndex === index && 'bg-gradient-to-b from-t-bg-color dark:from-t-layer-bg-color dark:to-t-bg-color to-t-layer-bg-color border-y'
              } ${selectedIndex === 0 && 'border-t-0'}`}
              onClick={() => setSelectedIndex(index)}>
              {item.article.title}
            </p>
          ))}
        </div>
      )}
      <div className='w-full overflow-y-auto border rounded-md shadow-inner bg-t-body-bg min-h-[400px] h-[70vh] '>
        <div className='px-4'>
          <ArticleViewer content={data[selectedIndex].article.articleElements} />
        </div>
      </div>
    </div>
  );
};

export default TcGuideViewer;
