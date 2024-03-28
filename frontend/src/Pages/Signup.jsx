import React, { useEffect } from 'react'
import SignupForm from '../Componant/SignupForm';
import MainLayout from '../layout/MainLayout'

const Signup = () => {

  useEffect(() => {
    document.title = "Signup";
  }, []);
  return (
    <>
      <MainLayout>
        <SignupForm />
      </MainLayout>
    </>
  )
}

export default Signup