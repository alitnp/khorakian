import { IPostRead } from '@my/types';
import { moveItemInArray } from '@my/helpers';
import { FC, memo, useState, useCallback } from 'react';
import PlusBox from 'components/UI/PlusBox/PlusBox';
// import ImagePickerModal from 'components/UI/Image/ImagePickerModal';
// import ImageItem from 'components/UI/Image/ImageItem';
import PostPickerModal from 'components/UI/Post/PostPickerModal';
import PostItem from 'components/UI/Post/PostItem';

interface IAddPost {
  posts: IPostRead[];
  setPosts: React.Dispatch<React.SetStateAction<IPostRead[]>>;
  singlePost?: boolean;
}

const AddPosts: FC<IAddPost> = ({ posts, setPosts, singlePost = false }) => {
  //states
  const [showPostPicker, setShowPostPicker] = useState<boolean>(false);

  //functions
  const toggleShowVideoPicker = useCallback(() => setShowPostPicker((prevState) => !prevState), []);
  const addPost = useCallback(
    (post: IPostRead) => {
      if (singlePost) setPosts([post]);
      else
        setPosts((posts) => {
          if (posts.some((vid) => vid._id === post._id)) return posts;
          return [...posts, post];
        });
    },
    [posts]
  );
  const removePost = useCallback(
    (_id: string) => {
      const tempPosts = posts.filter((post) => post._id !== _id);
      setPosts([...tempPosts]);
    },
    [posts]
  );

  // const handleReArrange = useCallback((oldIndex: number, newIndex: number) => setPosts((posts: IPost[]) => [...moveItemInArray(posts, oldIndex, newIndex)]), [posts]);

  return (
    <>
      <div className='flex flex-wrap items-center gap-4 my-4'>
        {posts.map((post, index) => (
          <div key={post._id} className='flex flex-col items-center gap-1'>
            <div className={`${index === 0 && 'border border-t-secondary-color rounded-xl p-1'}`}>
              {/* <TcCount count={index} setCount={(newIndex: number) => handleReArrange(index, newIndex)} /> */}
              <PostItem post={post} onRemove={removePost} />
            </div>
            {/* <span className={`text-t-secondary-color color-inherit ${index !== 0 ? 'opacity-0' : ''}`}>
              <HomeOutlined />
            </span> */}
          </div>
        ))}
        <PlusBox onClick={toggleShowVideoPicker} />
      </div>
      <PostPickerModal visible={showPostPicker} close={toggleShowVideoPicker} handlePick={addPost} />
    </>
  );
};

export default memo(AddPosts);
