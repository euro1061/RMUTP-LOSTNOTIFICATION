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
import axios from 'axios';

function App() {
  const authReducer = useSelector(authSelector)

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

  return (
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
          </Route>
        </>
      }

      <Route path="/addlistmissingitem" element={<AddListMissingItem />} />
      <Route path="/addlistlostitem" element={<AddListLostItem />} />

      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
}

export default App;
