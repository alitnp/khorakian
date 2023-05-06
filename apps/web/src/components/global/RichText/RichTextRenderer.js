import {
  renderAlert,
  renderChecklist,
  renderHeading,
  renderImage,
  renderListItems,
  renderParagraph,
  renderSimpleImage,
  renderTable,
} from 'components/UI/RichText/richTextRendererFunctions';
import { Fragment } from 'react';

const RichTextRenderer = ({ data }) => {
  if (!data) return null;

  //functions
  const handleRenderData = (data) => {
    return Object.values(data.blocks)?.map((block) => (
      <Fragment key={block.id}>
        {block.type === 'paragraph' && renderParagraph(block)}
        {block.type === 'header' && renderHeading(block)}
        {block.type === 'table' && renderTable(block)}
        {block.type === 'list' && renderListItems(block)}
        {block.type === 'alert' && renderAlert(block)}
        {block.type === 'Delimiter' && <div className='py-6 text-4xl font-bold text-center'>* * *</div>}
        {block.type === 'checklist' && renderChecklist(block)}
        {block.type === 'simpleImage' && renderSimpleImage(block)}
        {block.type === 'image' && renderImage(block)}
      </Fragment>
    ));
  };

  return (
    <div className='min-h-[150px]'>
      <div className='max-w-2xl mx-auto rich-text-renderer'>{handleRenderData(data)}</div>
    </div>
  );
};

export default RichTextRenderer;
