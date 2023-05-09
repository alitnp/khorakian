import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideFetch } from '@/global/utils/webFetch';
import webEndpointUrls from '@/global/constants/webEndpointUrls';
import {
  ApiDataListResponse,
  ApiDataResponse,
  IDefaultText,
  IPageItemConents,
} from '@my/types';
import webConfig from '@/global/constants/webConfig';
import { memo, useMemo } from 'react';
import MainTitle from '@/components/experience/MainTitle';
import ExperienceTips from '@/components/experience/ExperienceTips';

export const getStaticProps: GetStaticProps = async () => {
  const pageItems: ApiDataResponse<IPageItemConents> = await serverSideFetch(
    webEndpointUrls.pageItemWithContent
  );
  if (!pageItems) {
    console.log('error fetch : ' + webEndpointUrls.pageItemWithContent);
  }
  const defaultTexts: ApiDataListResponse<IDefaultText> = await serverSideFetch(
    webEndpointUrls.defautlTextGetAll + '?pageSize=200'
  );
  if (!pageItems) {
    console.log('error fetch : ' + webEndpointUrls.pageItemWithContent);
  }
  const defaultTextsObject: Record<string, string> = {};
  defaultTexts.data.map((item) => {
    defaultTextsObject[item.key] = item.text;
  });

  return {
    props: {
      pageItems: pageItems.data,
      defaultTexts: defaultTextsObject,
    },

    revalidate: webConfig.dataRevalidateTime,
  };
};

const Experience = ({
  pageItems,
  defaultTexts,
}: {
  pageItems: IPageItemConents[];
  defaultTexts: Record<string, string>;
}) => {
  console.log('asldfkjhasldfkj');
  // const renderPageItems = (
  // useMemo(
  // () =>
  // pageItems.map((pageItem, index) => {
  //   if (pageItem.type.title === 'mainTitle')
  //     return
  // <MainTitle
  // key={pageItem._id}
  // data={pageItem}
  //   />
  // );
  //     }),
  //   []
  // );
  return (
    <main>
      <MainTitle />
      <ExperienceTips />
    </main>
  );
};

export default memo(Experience);
