import { createReactEditorJS } from 'react-editor-js';
import Table from '@editorjs/table';
// import Image from '@editorjs/image';
import Header from '@editorjs/header';
import CheckList from '@editorjs/checklist';
import SimpleImage from '@editorjs/simple-image';
import Paragraph from '@editorjs/paragraph';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import List from '@editorjs/list';
import Alert from 'editorjs-alert';
import ColorPlugin from 'editorjs-text-color-plugin';
import { useCallback, useState } from 'react';
import Delimiter from '@editorjs/delimiter';
// import ApiService, { DOMAIN } from 'config/API/ApiService';
// import endpointUrls from 'global/Constants/endpointUrls';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: ['bold', 'italic', 'Color'],
    tunes: ['textAlignment'],
  },
  header: {
    class: Header,
    inlineToolbar: ['italic', 'Color'],
    tunes: ['textAlignment'],
  },
  table: {
    class: Table,
    inlineToolbar: ['bold', 'italic', 'Color'],
    // tunes: ['textAlignment'],
  },
  list: {
    class: List,
    inlineToolbar: ['bold', 'italic', 'Color'],
  },
  // image: {
  //   class: Image,
  //   config: {
  //     uploader: {
  //       /**
  //        * Upload file to the server and return an uploaded image data
  //        * @param {File} file - file selected from the device or pasted by drag-n-drop
  //        * @return {Promise.<{success, file: {url}}>}
  //        */
  //       uploadByFile(file) {
  //         // your own uploading logic here
  //         const formData = new FormData();
  //         formData.append('image', file);
  //         return ApiService.post(endpointUrls.uploadProcessImage, formData).then((res) => {
  //           return {
  //             success: 1,
  //             file: {
  //               url: DOMAIN + res.data.path,
  //               // any other image data you want to store, such as width, height, color, extension, etc
  //             },
  //           };
  //         });
  //       },
  //     },
  //     // endpoints: {
  //     //   byFile: BASE_URL + endpointUrls.uploadProcessImage,
  //     //   //byUrl: 'http://localhost:8008/fetchUrl',
  //     // },
  //     // additionalRequestHeaders: {
  //     //   Authorization: cookie.get('token'),
  //     // },
  //   },
  // },
  alert: {
    class: Alert,
    inlineToolbar: ['bold', 'italic', 'Color'],
    config: {
      defaultType: 'primary',
      messagePlaceholder: 'متن پیام را وارد کنید',
    },
  },
  Delimiter: {
    class: Delimiter,
  },
  // marker: Marker,
  checklist: {
    class: CheckList,
    inlineToolbar: ['bold', 'italic', 'Color'],
    // tunes: ['textAlignment'],
  },
  Color: {
    class: ColorPlugin,
    config: {
      colorCollections: ['var(--text-color)', 'var(--primary-color)', 'var(--secondary-color)', 'var(--success-color)', 'var(--warning-color)', 'var(--error-color)'],
      defaultColor: 'var(--text-color)',
      type: 'text',
    },
  },
  simpleImage: SimpleImage,
  textAlignment: {
    class: AlignmentTuneTool,
    config: {
      default: 'right',
    },
  },
};
const RichTextEditor = ({ editorRef, initialData }) => {
  //states
  const [data, setData] = useState(initialData || null);

  const ReactEditorJS = createReactEditorJS();

  //effects
  // useEffect(() => {
  //   initialData && setData(initialData);
  // }, [initialData]);

  const handleInitialize = useCallback((instance) => {
    editorRef.current = instance;
  }, []);

  //!in parent component save like below, where "editorRef" is the passed ref
  // const handleSave = useCallback(async () => {
  //   const savedData = await editorRef.current.save();
  //   setSavedData(savedData);
  // }, []);

  return (
    <>
      <div className='relative py-4 my-4 overflow-hidden border rounded-md shadow-inner border-t-border-color-base bg-t-body-bg focus-within:border-t-primary-color hover:border-t-primary-color '>
        <ReactEditorJS tools={EDITOR_JS_TOOLS} onInitialize={handleInitialize} data={data} onChange={setData} />
      </div>
    </>
  );
};

export default RichTextEditor;
