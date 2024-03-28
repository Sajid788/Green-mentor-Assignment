import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
const Home = () => {
  return (
    <>
      <MainLayout>
          <div className='relative bg-gradient-to-br from-blue-300 to-blue-300 text-white min-h-screen flex flex-col justify-center items-center px-8 '>
          <h1 className='text-4xl mb-8'>Welcome to Task Manager App</h1>
          <Link to="/signup" className='text-xl block space-x-2 hover:space-x-4'>
            <span className='transition-[margin]'>Join now to manage your tasks</span>
            <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
          </Link>
        </div>
        
      </MainLayout>
    </>
  )
}

export default Home
