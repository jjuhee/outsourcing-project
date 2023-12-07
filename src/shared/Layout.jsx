import axios from 'axios';
import Footer from 'components/Footer';
import Header from 'components/Header';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate()
  const [isRender, setIsRender] = useState(false)

  useEffect(()=> {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken')
      try {
        const { data } = await axios.get('http://moneyfulpublicpolicy.co.kr/user', {
          headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${accessToken}`,
            }
        })
        console.log('============================');
        console.log(data);
        console.log('============================');
      } catch(error) {
        alert('알 수 없는 오류가 발생하였습니다.')
        localStorage.removeItem('accessToken')
        navigate('/login')
      }
    };
    checkAuth();
  },[])
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
