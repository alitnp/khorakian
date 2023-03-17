import { FC } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ITcToast {
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  time: number;
}

const TcToast: FC<ITcToast> = ({ message, type, time }) => {
  let toastNotification = null;

  if (type === 'success') {
    toastNotification = toast.success;
  } else if (type === 'error') {
    toastNotification = toast.error;
  } else if (type === 'info') {
    toastNotification = toast.info;
  } else if (type === 'warning') {
    toastNotification = toast.warning;
  }
  toastNotification &&
    toastNotification(message, {
      position: 'bottom-center',
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      pauseOnFocusLoss: false,
      progress: undefined,
      transition: Slide,
    });

  return (
    <ToastContainer position='bottom-left' autoClose={time} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={true} pauseOnFocusLoss draggable pauseOnHover limit={3} />
  );
};

export default TcToast;
