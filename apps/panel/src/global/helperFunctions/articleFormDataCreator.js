export const articleFormDataCreator = (title, articleTypeId, detail = []) => {
  if (!title || detail.length === 0) return null;
  const formData = new FormData();
  formData.append('title', title);
  articleTypeId && formData.append('articleTypeId', articleTypeId);
  let photoFound = 0;
  const tempDetails = detail.map((item) => {
    if (item.articleElementTypeId !== 3) {
      return { articleElementTypeId: item.articleElementTypeId, content: item.content };
    } else {
      // formData.append('files', item.content);
      return { articleElementTypeId: item.articleElementTypeId, content: `${photoFound++}` };
    }
  });
  formData.append('detail', JSON.stringify(tempDetails));
  detail.forEach((item) => {
    if (item.articleElementTypeId === 3) {
      formData.append('files', item.content);
    }
  });
  return formData;
};
