import { useContext } from 'react'
import { MyContext } from '../../MyContext';
import { toast } from 'react-toastify';

const BASE_URL = "https://freshooss-backend.onrender.com/";

function SearchResults() {
    const { cartItems, setCartItems, total, setTotal, fruits, searchVal, setDetailed, userDetails} = useContext(MyContext);

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

        <div className='bg-green-200'>
            <div className='w-full h-[3.8rem] bg-[#0005] mb-10'></div>
            <h1 className='w-full text-center text-xl font-semibold'>Search Results for : {searchVal}</h1>
            <div className='flex flex-wrap justify-center sm:max-md:p-2 md:max-lg:p-8 lg:p-0'>
                {fruits.map((item, i) => {
                    return item.name.toLowerCase().startsWith(searchVal.toLowerCase()) ?
                      <div className='flex lg:flex-col w-full lg:w-auto bg-white p-4 lg:p-4 lg:m-8 border-b-2 lg:border-0 lg:items-start items-center justify-between' key={i} onClick={() => setDetailed(item)}>
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
                        : null
                })}
            </div>
        </div>
    )
}

export default SearchResults