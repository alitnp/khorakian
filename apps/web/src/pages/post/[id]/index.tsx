import { GetStaticProps } from 'next';
import {
  IAboutMeRead,
  IImage,
  IPageItemConents,
  IPostRead,
  ISocialMediaRead,
} from '@my/types';
import webConfig from '@/global/constants/webConfig';
import { memo, useMemo } from 'react';
import HomeSlider from '@/components/home/HomeSlider';
import HomeCards from '@/components/home/HomeCards';
import TimeLine from '@/components/global/TimeLine/TimeLine';
import HomeWideCards from '@/components/home/HomeWideCards';
import HomeTextOnlyCards from '@/components/home/HomeTextOnlyCards ';
import HomeImageOnlyCards from '@/components/home/HomeImageOnlyCards';
import HomeIdeaExpLink from '@/components/home/HomeIdeaExpLink';
import HomeAboutMe from '@/components/home/HomeAboutMe';
import {
  getAllSocialMedias,
  getHomeAboutMePosts,
  getHomeDefaultImages,
  getHomeDefaultTexts,
  getHomePageItems,
} from '@/components/home/homeFunctions';
import Footer from '@/components/global/Footer/Footer';

type homeProps = {
  pageItems: IPageItemConents[];
  defaultTexts: Record<string, string>;
  defaultImages: Record<string, IImage>;
  aboutMePosts: IAboutMeRead[];
  socialMedias: ISocialMediaRead[];
};

export const getStaticProps: GetStaticProps = async () => {
  const pageItems = await getHomePageItems();
  const defaultTextsObject = await getHomeDefaultTexts();
  const defaultImagesObject = await getHomeDefaultImages();
  const aboutMePosts = await getHomeAboutMePosts();
  const socialMedias = await getAllSocialMedias();

  const props: homeProps = {
    pageItems: pageItems.data,
    defaultTexts: defaultTextsObject,
    defaultImages: defaultImagesObject,
    aboutMePosts,
    socialMedias,
  };

  return {
    props,
    revalidate: webConfig.dataRevalidateTime,
  };
};

const PostDetail = ({
  pageItems,
  defaultTexts,
  defaultImages,
  aboutMePosts,
  socialMedias,
}: homeProps) => {
  console.log('asldfkjhasldfkj');
  const renderPageItems = useMemo(
    () =>
      pageItems.map((pageItem, index) => {
        if (pageItem.type.title === 'slider')
          return <HomeSlider key={pageItem._id} data={pageItem} />;
      }),
    []
  );

  return (
    <>
      <main></main>
      <Footer
        {...defaultTexts}
        footer_image={defaultImages.footer_image}
        socialMedias={socialMedias}
      />
    </>
  );
};

export default memo(PostDetail);
