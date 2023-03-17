import classes from './style.module.css';
import { SearchOutlined } from '@ant-design/icons';

const TcLink = ({ link, children, className }) => {
  return (
    <div className={`${classes['link']} ${className}`}>
      <p>{children}</p>
      <a href={link || ''} target='_blank' rel='noreferrer' className={`${classes['content']}`}>
        {children}
      </a>
      <div className={`${classes['icon']}`}>
        <SearchOutlined />
      </div>
    </div>
  );
};

export default TcLink;
