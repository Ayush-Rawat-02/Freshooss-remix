import { useContext } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MyContext } from '../../MyContext'
import { toast } from 'react-toastify';

const BASE_URL = "https://freshooss-backend.onrender.com/";

function Details() {
    const { detailed, setDetailed, cartItems, setCartItems, total, setTotal, userDetails } = useContext(MyContext);
    const AddToCart = () => {
        var alreadyPresent = cartItems.find(item => item.name == detailed.name)
        if (alreadyPresent) {
            setCartItems(cartItems.map(item => {
                return item.name == detailed.name ? {
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
                name: detailed.name,
                img: detailed.img,
                price: detailed.price,
                qty: 1
            }]);
            toast.success("1 item added to cart", { position: toast.POSITION.TOP_CENTER });
        }
        setTotal(total + detailed.price);
    }
    return (
      <div onClick={() => setDetailed(null)} className="fixed top-[3.8rem] left-0 flex justify-center py-[4rem] w-screen h-screen overflow-y-scroll md:h-[93vh] bg-[#0007] backdrop-blur-[2px] z-[8]">
        <div onClick={(e)=> e.stopPropagation()} className='flex flex-col lg:flex-row bg-gray-100 w-3/4 h-fit'>
        <div className='flex lg:hidden justify-between px-6 py-2'>
            <h1 className='text-lg font-bold'>{detailed.name}</h1>
            <AiOutlineCloseCircle className='w-[1.4rem] h-[1.4rem] cursor-pointer' onClick={() => setDetailed(null)} />
        </div>
            <div className='flex-1'>
                <img className='w-full h-full' src={BASE_URL + detailed.img} alt="" />
            </div>
            <div className='flex-1 flex flex-col justify-bewteen py-8 lg:py-0'>
                <div className='hidden lg:flex justify-end px-6 py-6'><AiOutlineCloseCircle className='w-[1.4rem] h-[1.4rem] cursor-pointer' onClick={() => setDetailed(null)} /></div>
                <div className="flex flex-col px-8 gap-4">
                  <h1 className='hidden lg:block text-4xl font-bold'>{detailed.name}</h1>
                  <h2 className='text-lg font-semibold'>Price : ₹ {detailed.price-detailed.discount} / Kg</h2>
                  <h2 className='text-lg font-semibold'>You Save : ₹ {detailed.discount}</h2>
                  <p className='font-semibold'>{detailed.description}</p>
                  <button disabled={userDetails && userDetails.isAdmin == true} className='bg-blue-300 h-[2.5rem] my-[2rem]' onClick={AddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
      </div>
    )
}

export default Details