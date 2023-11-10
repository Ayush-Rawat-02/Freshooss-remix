import React, { useContext, useState } from 'react'
import { MyContext } from '../../MyContext'
import { AiOutlineClose, AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
    const BASE_URL = "https://freshooss-backend.onrender.com/";
    const { cartItems, setCartItems, total, setTotal} = useContext(MyContext);
    const increment = (i) => {
        setCartItems(cartItems.map(item => {
            return item == i ? {
                name: item.name,
                img: item.img,
                price: item.price,
                qty: item.qty + 1,
            } : item
        }));
        setTotal(total + i.price);
    }
    const decrement = (i) => {
        if (i.qty > 1) {
            setCartItems(cartItems.map(item => {
                return item == i ? {
                    name: item.name,
                    img: item.img,
                    price: item.price,
                    qty: item.qty - 1,
                } : item
            }));
        }
        else {
            setCartItems(cartItems.filter(item => {
                if (item != i) return item;
            }))
            toast.success("1 item removed from cart", { position: toast.POSITION.TOP_CENTER })
        }
        setTotal(total - i.price);
    }
    const navigate = useNavigate();
    const checkout = () => {
        navigate('/checkout')
    }
    return (
        <div className='absolute top-[3.8rem] right-[0.7vw] bg-blue-50 max-h-[26.6rem] w-[37rem]'>
            {cartItems.length == 0 && <div className='bg-white m-2 h-[5rem] flex items-center justify-center text-black'>
                <p>Your cart is empty</p>
            </div>
            }
            {cartItems.length > 0 &&
                <div className='flex flex-col text-black p-2 bg-gray-50'>
                    <div className="flex flex-col overflow-x-hidden overflow-y-scroll max-h-[22rem]">
                      {
                          cartItems.map((item,i) => {
                              return (
                                  <div key={i} className='hidden md:flex bg-[#eea5] p-2 border-[1px] border-[#0006] justify-between w-full'>
                                      <div className='flex items-center justify-between'>
                                          <img className='h-[70px] w-[100px]' style={{ marginRight: '1rem' }} src={BASE_URL + item.img} alt="" />
                                          <div className='flex w-[12rem] justify-between'>
                                              <h3 className='text-lg font-semibold'>{item.name}</h3>
                                              <p className='text-lg'>{item.qty}x{item.price}</p>
                                          </div>
                                      </div>
                                      <div className='flex gap-4 items-center w-[5rem]'>
                                          <AiOutlineMinusCircle className='cursor-pointer h-[1rem] w-[1rem]' onClick={() => decrement(item)} />
                                          {item.qty}
                                          <AiOutlinePlusCircle className='cursor-pointer h-[1rem] w-[1rem]' onClick={() => increment(item)} />
                                      </div>
                                      <div className='flex items-center text-lg w-[6rem]'>
                                          <p style={{ marginRight: '1rem' }}><strong>₹</strong> {item.qty * item.price}</p>
                                      </div>
                                      {/* <AiOutlineClose onClick={removeItem(item)} /> */}
                                  </div>
                              )
                          })
                      }
                    </div>
                    < div className='flex items-center justify-between bg-[#122] text-white px-4 py-2'>
                        <div className='flex gap-2 text-lg font-semibold p-3'>
                            <h2>Total :</h2>{" "}
                            <h2>₹{total}</h2>
                        </div>
                        <button className='bg-blue-300 text-black h-[2.2rem] w-[6rem] rounded-md' onClick={checkout}>Checkout</button>
                    </div>
                </div>
            }
        </div >
    )
}

export default Cart