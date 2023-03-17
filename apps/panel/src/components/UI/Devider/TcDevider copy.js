const TcDevider = ({ className, orientation = 'right', children, ...props }) => {
  return (
    <div className={`flex items-center mt-8 mb-2 ${className} `} {...props}>
      {orientation !== 'right' && <hr className='w-full' />}
      <h4 className={` ${orientation === 'right' && 'ml-4'} ${orientation === 'left' && 'mr-4'} ${orientation === 'center' && 'mx-4'}  whitespace-nowrap text-t-primary-color`}>
        {children}
      </h4>
      {orientation !== 'left' && <hr className='w-full' />}
    </div>
  );
  // return (
  //   <Divider
  //     className={` mt-8 mb-6 col-span-full ${className}`}
  //     style={{ borderTopColor: 'rgba(0, 0, 0, 0.15)', fontSize: '0.75rem', color: 'rgb(107, 114, 128)' }}
  //     orientation={orientation}
  //     {...props}>
  //     {children}
  //   </Divider>
  // );
};

export default TcDevider;
