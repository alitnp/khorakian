import React from 'react';

type indexType = number | undefined;
type contentType = object[];
type setContentType = React.Dispatch<any>;
type setAppearingIndexType = React.Dispatch<any>;
type setDisppearingIndexType = React.Dispatch<any>;
type disappearingIndexType = number[];

export const addTitleFunction = (index: indexType, content: contentType, setContent: setContentType, setAppearingIndex: setAppearingIndexType): void => {
  const newContentIndex = index !== undefined ? index + 1 : content.length;
  setAppearingIndex([newContentIndex]);
  const tempContent = [...content];
  tempContent.splice(newContentIndex, 0, {
    type: 'title',
    articleElementTypeId: 1,
    content: '',
    key: 'title' + newContentIndex + Date.now(),
  });
  setContent(tempContent);
};
export const addParagraphFunction = (index: indexType, setAppearingIndex: setAppearingIndexType, content: contentType, setContent: setContentType): void => {
  const newContentIndex = index !== undefined ? index + 1 : content.length;
  setAppearingIndex([newContentIndex]);
  const tempContent = [...content];
  tempContent.splice(newContentIndex, 0, {
    type: 'paragraph',
    articleElementTypeId: 2,
    content: '',
    key: 'paragraph' + newContentIndex + Date.now(),
  });
  setContent(tempContent);
};
export const addImageFunction = (
  value: any | null | undefined,
  setImageInputIndex: (a: number | undefined) => void,
  imageInputIndex: number | undefined,
  content: contentType,
  setContent: setContentType,
  setAppearingIndex: setAppearingIndexType,
  fileInputRef: any
) => {
  if (!value || !value?.target?.files[0]) return setImageInputIndex(undefined);
  const newContentIndex = imageInputIndex !== undefined ? imageInputIndex + 1 : content.length;
  setAppearingIndex([newContentIndex]);
  const tempContent = [...content];
  tempContent.splice(newContentIndex, 0, {
    type: 'image',
    articleElementTypeId: 3,
    content: value.target.files[0],
    key: 'image' + newContentIndex + Date.now(),
  });
  setContent(tempContent);
  setImageInputIndex(undefined);
  fileInputRef.current.value = null;
};

export const moveItemDownFunction = (
  index: indexType = 0,
  disappearingIndex: disappearingIndexType,
  setDisappearingIndex: setDisppearingIndexType,
  content: contentType,
  setContent: setContentType,
  setAppearingIndex: setAppearingIndexType
) => {
  if (disappearingIndex.length > 0) return;
  setDisappearingIndex([index, index + 1]);
  setTimeout(() => {
    const tempContent = [...content];
    tempContent[index] = content[index + 1];
    tempContent[index + 1] = content[index];
    setContent(tempContent);
    setAppearingIndex([index, index + 1]);
  }, 500);
};
export const moveItemUpFunction = (
  index: indexType = 0,
  disappearingIndex: disappearingIndexType,
  setDisappearingIndex: setDisppearingIndexType,
  content: contentType,
  setContent: setContentType,
  setAppearingIndex: setAppearingIndexType
) => {
  if (disappearingIndex.length > 0) return;
  setDisappearingIndex([index, index - 1]);
  setTimeout(() => {
    const tempContent = [...content];
    tempContent[index] = content[index - 1];
    tempContent[index - 1] = content[index];
    setContent(tempContent);
    setAppearingIndex([index, index - 1]);
  }, 500);
};
