import { useLocation } from 'react-router';
import packageJson from '../../../../package.json';

const TcFooter = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`text-xs mt-auto  ${
          pathname.includes('login') || pathname.includes('forgetPassword') ? 'w-full ' : 'w-[98%] sm:w-11/12'
        } mx-auto justify-between block sm:flex sm:items-center bg-t-bg-color rounded-md p-2 px-4 border shadow-md print:hidden sm:print:hidden`}>
        <span>Level Up - {new Date().getFullYear()}</span>
        <span>
          پنل مدیریتی Level Up - نسخه:
          {packageJson.version}
        </span>
      </div>
    </>
  );
};

export default TcFooter;
