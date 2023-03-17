import { RightOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface ITcBack {
  to?: string;
  onClick?: () => void;
}

const TcBack: FC<ITcBack> = ({ to, onClick }) => {
  //hooks
  const history = useHistory();
  const location = useLocation();

  //functions
  const elements = () => (
    <div className='flex items-center gap-x-2'>
      <RightOutlined />
      <p className='mb-0 '>بازگشت</p>
    </div>
  );

  const handleBack = () => {
    if (location.key) {
      history.goBack();
    } else {
      history.goBack();
      window.close();
    }
  };

  //constants
  const wrapperClassNames =
    'flex items-center h-full px-4 mb-0 ml-auto border border-r rounded-md cursor-pointer bg-gradient-to-b dark:from-t-layer-bg-color dark:to-t-bg-color from-t-bg-color to-t-layer-bg-color hover:from-t-layer-bg-color dark:hover:to-t-layer-bg-color gap-x-2';

  if (to)
    return (
      <Link className={wrapperClassNames} to={to}>
        {elements()}
      </Link>
    );

  return (
    <div onClick={onClick ? onClick : handleBack} className={wrapperClassNames}>
      {elements()}
    </div>
  );
};

export default TcBack;
