import React from 'react'

function About() {
  return (
    <div className='flex flex-col bg-gray-800 text-white p-4'>
      <h1 className='text-2xl p-4'>About</h1>
      <div className="flex flex-col sm:flex-row h-full sm:items-center gap-4 p-4">
        <h1 className='text-green-400 font-bold   text-2xl'>Freshooss</h1>
        <p>
        At Freshooss, we are passionate about providing you with the freshest and highest-quality groceries that cater to your everyday needs. We believe that everyone deserves access to fresh and healthy food, and we are committed to making your grocery shopping experience a delightful one.Welcome to our online vegetable market! Discover the freshest, locally sourced produce right at your fingertips. Explore a colorful array of seasonal vegetables, handpicked to bring nature's goodness to your table. With a commitment to quality and sustainability, we're here to make your healthy choices convenient and delightful. Start your journey towards healthier living with us today!
        </p>
      </div>
    </div>
  )
}

export default About