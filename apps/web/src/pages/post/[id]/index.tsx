import {
  ApiDataListResponse,
  ApiDataResponse,
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
import WebApiService, { errorResponse } from '@/global/utils/WebApiService';
import { webApiCatch, webApiThenGeneric } from '@/global/utils/webApiThen';
import { AnyAaaaRecord } from 'dns';

type postDetailProps = {
  defaultTexts: Record<string, string>;
  defaultImages: Record<string, IImage>;
  socialMedias: ISocialMediaRead[];
  postDetailData: IPost[];
};

const PostDetail = () => {
  //state
  const [postDetailsList, setPostDetailsList] = useState<IPost>();
  const [loading, setLoading] = useState<boolean>(false);

  //hook
  const { query } = useRouter();

  //effect
  useEffect(() => {
    query?.id && getPostDetail(query.id as string);

    console.log(query.id);
  }, [query]);

  //func
  const getPostDetail = async (id: string) => {
    setLoading(true);
    await WebApiService.get(webEndpointUrls.getPostDetail(id))
      .then((res: ApiDataResponse<IPost>) =>
        webApiThenGeneric<ApiDataResponse<IPost>, IPost>({
          res,
          onSuccessData: (data) => {
            setPostDetailsList(data);
          },
          notifFail: true,
          notifSuccess: true,
        })
      )
      .catch(() => webApiCatch(errorResponse));
    setLoading(false);
  };

  console.log(postDetailsList);

  return (
    <>
      <main>
        <PostDetailSlider images={postDetailsList?.images} />
      </main>
    </>
  );
};

export default memo(PostDetail);
