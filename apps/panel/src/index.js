import 'assets/css/color.css';
import 'assets/css/global.css';
import 'assets/css/antCustomizations.css';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/css/editorjsCustomizations.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import fa from 'antd/es/locale/fa_IR';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import App from './components/App';
import { store } from './redux/store';
import { HelmetProvider } from 'react-helmet-async';
import './config.js';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <ConfigProvider
    locale={fa}
    direction='rtl'
    theme={{
      token: {
        fontFamily: 'iranyekan',
        colorPrimary: '#0369a1',
        fontSizeBase: 14,
      },
    }}>
    <HelmetProvider>
      <Provider store={store}>
        <Router>
          {/* <React.StrictMode> */}
          <App className='rtl-grid' />
          {/* </React.StrictMode> */}
        </Router>
      </Provider>
    </HelmetProvider>
  </ConfigProvider>
);

// ReactDOM.render(
//   <ConfigProvider
//     locale={fa}
//     direction='rtl'
//     theme={{
//       token: {
//         fontFamily: 'iranyekan',
//         colorPrimary: '#007141',
//         fontSizeBase: 14,
//       },
//     }}>
//     <Provider store={store}>
//       <Router>
//         <App className='rtl-grid' />
//       </Router>
//     </Provider>
//   </ConfigProvider>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
