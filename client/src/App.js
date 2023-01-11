import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './routes/home/Home';
import ProfileNotification from './routes/profileNotification/ProfileNotification';
import Login from './routes/login/Login';
import AddListMissingItem from './routes/addListMissingItem/AddListMissingItem';
import AddListLostItem from './routes/addListLostItem/AddListLostItem';
import Admin from './routes/admin/Admin';
import Dashboard from './routes/admin/dashboard/Dashboard';
import AdminUser from './routes/admin/adminUser/AdminUser';
import { useSelector } from 'react-redux'
import { authSelector } from './store/slices/authSlice';
import * as loadingData from "./loading.json";
import axios from 'axios';
import InfoMissingItem from './routes/InfoMissingItem/InfoMissingItem';
import EditMissingItem from './routes/InfoMissingItem/EditMissingItem';
import Lottie from 'react-lottie'
import { useEffect, useState } from 'react';
import InfoLosingItem from './routes/InfoLosingItem/InfoLosingItem';
import InfoLosingItemEdit from './routes/InfoLosingItem/InfoLosingItemEdit';
import Location from './routes/admin/location/location';
import Report from './routes/admin/report/Report';
import ListMissing from './routes/admin/listMissing/ListMissing';
import ListLosing from './routes/admin/listLosing/ListLosing';

function App() {
  const authReducer = useSelector(authSelector)
  const [pageLoading, setPageLoading] = useState(true)
  axios.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
      config.headers['Access-Control-Allow-Origin'] = '*'
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  

  useEffect(() => {

    const onPageLoad = () => {
      // setTimeout(()=>{

      // }, 2000)
      setPageLoading(false);
    };

    if (document.readyState === 'complete') {
      onPageLoad()
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad);
    }

  }, [])


  return (
    <>
      {pageLoading ?
          <div className='w-full h-full fixed top-0 left-0 bg-white grid place-items-center'>
            <div className='flex flex-col items-center'>
              <Lottie options={defaultOptions} height={300} width={300} />
              <h1 className='mt-5 text-2xl font-bold'>กรุณารอสักครู่...</h1>
            </div>
          </div>
        :
        <Routes>
          <Route path="/" element={<Home />} />
          {!authReducer.isLoggedIn &&
            <>
              <Route path="/login" element={<Login />} />
            </>
          }
          {authReducer.isLoggedIn &&
            <>
              <Route path="/profileNotification" element={<ProfileNotification />} />

              <Route path="/admin" element={<Admin />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='users' element={<AdminUser />} />
                <Route path='location' element={<Location />} />
                <Route path='report' element={<Report />} />
                
                <Route path='listMissing' element={<ListMissing />} />
                <Route path='listLosing' element={<ListLosing />} />
              </Route>
            </>
          }
          
          <Route path="/addlistmissingitem" element={<AddListMissingItem />} />
          <Route path="/infolosingitem/:itemId" element={<InfoLosingItem />} />
          <Route path="/infolosingitem/:itemId/edit" element={<InfoLosingItemEdit />} />
          <Route path="/infomissingitem/:itemId" element={<InfoMissingItem />} />
          <Route path="/infomissingitem/:itemId/edit" element={<EditMissingItem />} />
          <Route path="/addlistlostitem" element={<AddListLostItem />} />

          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>}

    </>
  );
}

export default App;
