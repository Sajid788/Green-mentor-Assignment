import React from 'react'



const MainLayout = ({ children }) => {
  return (
    <>
      <div  className='relative bg-gradient-to-br from-blue-400 to-indigo-100 min-h-screen  backdrop-filter backdrop-blur-lg overflow-x-hidden'  id ="kurale-regular">
        {children}
      </div>
    </>
  )
}

export default MainLayout;