import MainRouter from './MainRouter';
import { ToastContainer } from 'react-toastify';

function App({ className }) {
  return (
    <div className={`${className}`}>
      <ToastContainer />
      <MainRouter />
    </div>
  );
}

export default App;
