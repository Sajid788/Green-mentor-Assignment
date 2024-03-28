import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import LoginForm from '../Componant/LoginForm';
import MainLayout from '../layout/MainLayout'


const Login = () => {
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || null;

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <MainLayout>
        <LoginForm redirectUrl={redirectUrl} />
      </MainLayout>
    </>
  )
}

export default Login