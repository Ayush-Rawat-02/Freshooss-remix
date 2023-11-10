import React, { useContext } from 'react'
import { MyContext } from '../../MyContext';
import { FiExternalLink } from "react-icons/fi";
import About from './About';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const navigate = useNavigate();
  const BASE_URL = "https://freshooss-backend.onrender.com/";
  const { cartItems, setCartItems, total, setTotal, fruits, setDetailed, userDetails } = useContext(MyContext);
  const addToCart = (n) => {
    // alert("You clicked")
    var alreadyPresent = cartItems.find(item => item.name == fruits[n].name)
    if (alreadyPresent) {
        // alert("already in cart")
        setCartItems(cartItems.map(item => {
            return item.name == fruits[n].name ? {
                name: item.name,
                img: item.img,
                price: item.price,
                qty: item.qty + 1
            } : item
        }));
        toast.success("Added more quantity of same item!", { position: toast.POSITION.TOP_CENTER });
    }
    else {
        setCartItems([...cartItems, {
            name: fruits[n].name,
            img: fruits[n].img,
            price: fruits[n].price,
            qty: 1
        }]);
        toast.success("1 item added to cart", { position: toast.POSITION.TOP_CENTER });
    }
    setTotal(total + fruits[n].price);
}
  return (
    <div>
                <div id='home' className="h-[100vh] bg-red-300 overflow-hidden bg-[url('Main.png')]">
                    {/* <img className='w-[150vw]' src="Main.png" alt="VeggieCart" /> */}
                    <h4 className='text-blue-400 text-start my-[12rem] mx-8 w-[22rem] sm:max-lg:w-[32rem] lg:w-[40rem] text-[26px] sm:max-lg:text-4xl lg:text-5xl font-semibold'>Get premium quality veggies at best price</h4>
                    <div 
                        className="group flex w-fit h-[4rem] items-center justify-center cursor-pointer"
                        onClick={()=>navigate('/prediction')}
                    >
                        <p className='group-hover:bg-[#aafa] text-black text-start my-[12rem] ml-8 text-xl font-semibold bg-[#fff5] pl-3 py-2'>Predict Price for vegetables!</p>
                        <FiExternalLink className='group-hover:bg-[#aafa] bg-[#fff5] p-3 w-[2.8rem] h-[2.8rem]'/>
                    </div>
                </div>
                <div className="bg-[#238e] min-h-screen sm:px-4 pt-8" id="market">
                    <h2 className='text-2xl px-4 pb-8 text-white'>Explore Marketplace</h2>
                    <div className="flex lg:flex-row flex-col flex-wrap md:px-8 justify-center items-center">
                        {fruits.map((item, i) => {
                            return <div className='flex lg:flex-col w-full lg:w-auto bg-white p-4 lg:p-4 lg:m-8 border-b-2 lg:border-0 lg:items-start items-center justify-between' key={i} onClick={() => setDetailed(item)}>
                                <img className='lg:w-[15rem] lg:h-[10rem] sm:max-lg:w-[12rem] sm:max-lg:h-[8rem] w-[7rem] h-[4.8rem]' src={BASE_URL + item.img} alt={item.name} />
                                <div className='flex flex-col sm:max-lg:flex-row w-full pl-8 lg:pl-0 justify-between'>
                                    <h2 className="text-lg font-semibold py-2">{item.name}</h2>
                                    <div className="flex justify-between items-center lg:w-full">
                                        <div className='flex items-center justify-between gap-1'>
                                            <strong>₹</strong>
                                            <h3 className="line-through text-lg font-semibold">{item.price}
                                            </h3>
                                            <h3 className="text-red-700 font-semibold text-lg">{item.price-item.discount}</h3>
                                            <h3 className='text-lg font-semibold'>/kg</h3>
                                        </div>
                                        <button disabled={userDetails && userDetails.isAdmin == true} className='bg-blue-400 h-[1.8rem] w-[4rem] rounden-lg mx-4 sm:max-lg:mx-12 lg:mx-0' onClick={(e) =>{
                                            e.stopPropagation()
                                            addToCart(i)
                                        }}>Add</button>
                                    </div>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-4 bg-gray-800 text-white py-12'>
                    <div>
                        <h3>Subscribe for freshoo blogs and top deals</h3>
                    </div>
                    <div className='flex items-center w-full px-8 justify-center'>
                        <input name='email' autoComplete='true' className='bg-[#fff5] text-white p-2 rounded-l-md sm:w-[60%]' type="email" placeholder='Email' />
                        <button className='bg-blue-400 hover:bg-blue-300 p-2 rounded-r-md sm:w-[10%]'>Submit</button>
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-4 px-4 sm:px-8 py-6 bg-gray-800 text-white'>
                    <div>
                        <h2>HURRY UP!</h2>
                        <br />
                        <h3>Visit our fresh farms for exclusive discounts!</h3>
                    </div>

                    <iframe className='h-[10rem] sm:h-[18rem]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.469876979767!2d78.18952227525615!3d30.195133874848047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390925cb4f7f8be5%3A0x7018c089cc1f61f7!2sJolly%20Grant%20Airport%20-%20Dehradun!5e0!3m2!1sen!2sin!4v1692911491892!5m2!1sen!2sin"allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <About />
        </div >
  )
}

export default Home