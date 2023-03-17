const TcLoginLayout = ({ children }) => {
  return (
    <div className='flex flex-col justify-center h-screen pt-8 mx-auto bg-t-body-bg' style={{ maxWidth: '500px' }}>
      {/* <img src={igtLogo} className='block mx-auto' width='250' alt='سامانه Level Up' /> */}
      {children}
    </div>
  );
};

export default TcLoginLayout;
