import {
  ApiDataListResponse,
  IImage,
  IPost,
  IPostRead,
  ISocialMediaRead,
} from '@my/types';
import webConfig from '@/global/constants/webConfig';
import { memo, useEffect, useState } from 'react';
import PostDetailSlider from '@/components/post/postDetail/PostDetailSlider';
import { serverSideFetch } from '@/global/utils/webFetch';
import webEndpointUrls from '@/global/constants/webEndpointUrls';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type postDetailProps = {
  defaultTexts: Record<string, string>;
  defaultImages: Record<string, IImage>;
  socialMedias: ISocialMediaRead[];
  postDetailData: IPost[];
};

const PostDetail = () => {
  //state
  const [postDetailsList, setPostDetailsList] = useState<any>();

  //hook
  const { query } = useRouter();

  //effect
  useEffect(() => {
    query?.id && getPostDetail(query.id as string);
    console.log(query.id);
  }, [query]);

  //func
  const getPostDetail = async (id: string) => {
    const item: ApiDataListResponse<IPost> = await serverSideFetch(
      webEndpointUrls.getPostDetail + id
    );
    if (!item) {
      console.log('error fetch : ' + webEndpointUrls.getPostDetail + id);
    } else {
      setPostDetailsList(item);
    }
  };

  console.log(postDetailsList);

  return (
    <>
      <main>
        <PostDetailSlider />
      </main>
    </>
  );
};

export default memo(PostDetail);
