import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 1500)
  })

  return (
    <div className=' relative'>
      <div className='absolute inset-0 -z-10 bg-bg2 min-h-screen bg-cover bg-no-repeat bg-center'></div>
    </div>
  )
}

export default NotFound