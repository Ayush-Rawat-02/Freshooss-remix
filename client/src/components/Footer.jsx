import { Link } from 'react-router-dom';

function Footer() {
    return (
          <>
            <footer className='relative bottom-0 bottom-0 bg-black text-white flex flex-col items-center justify-center px-12 py-4 z-[7]'>
                <div className='flex justify-between w-full flex-wrap mb-8'>
                    <div className='flex flex-col gap-4 min-w-[9rem] sm:min-w-[12rem] my-8'>
                        <h2 className='text-lg font-semibold text-gray-400'>Company</h2>
                        <a className='font-thin text-gray-300 cursor-pointer'>About us</a>
                        <a className='font-thin text-gray-300 cursor-pointer'>Our Services</a>
                        <a className='font-thin text-gray-300 cursor-pointer'>Privacy policy</a>
                        <a className='font-thin text-gray-300 cursor-pointer'>Affiliate program</a>
                    </div>
                    <div className='flex flex-col gap-4 min-w-[9rem] sm:min-w-[12rem] my-8'>
                        <h2 className='text-lg font-semibold text-gray-400'>Partners</h2>
                        <a className='font-thin text-gray-300 cursor-pointer'>Freshooss</a>
                        <a className='font-thin text-gray-300 cursor-pointer'>Big Basket</a>
                        <a className='font-thin text-gray-300 cursor-pointer'>FoodJunkies</a>
                    </div>
                    <div className='flex flex-col gap-4 min-w-[9rem] sm:min-w-[12rem] my-8'>
                        <h2 className='text-lg font-semibold text-gray-400'>Address</h2>
                        <p className='font-thin text-gray-300'>Building no. 35</p>
                        <p className='font-thin text-gray-300'>Jolly Grant</p>
                        <p className='font-thin text-gray-300'>Doiwala</p>
                        <p className='font-thin text-gray-300'>Uttarakhand</p>
                    </div>
                </div>
                <p className='text-sm font-thin text-gray-400'>&copy; 2023 Freshooss. All rights reserved.</p>
            </footer>
          </>
    )
}

export default Footer