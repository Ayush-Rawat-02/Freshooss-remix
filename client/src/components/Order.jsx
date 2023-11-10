import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axios';

const BASE_URL = "https://freshooss-backend.onrender.com/";

function Order({ order, idx, admin}) {
    const [placedOn, setPlacedOn] = useState(new Date(order.createdAt));
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [listOrders, setListOrders] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [status, setStatus] = useState(order.status);
    const updateHandler = async () => {
        const response = await axiosInstance.put('/api/admin/orders/update', {
            params: {
                payment_id: order._id,
                update_val: status,
            }
        });
        if (response) {
            console.log(response)
            order.status = status;
            toast.success("Successfully Updated Order Status!", { position: toast.POSITION.TOP_CENTER })
            setShowMenu(false);
        }
        else {
            toast.error("Unable to Update Order Status!", { position: toast.POSITION.TOP_CENTER })
        }
    }
    const cancelHandler = () => {
        setStatus(order.status);
        setShowMenu(false);
    }
    return (
        <div className='w-full'>
            {showMenu &&
            <div onClick={cancelHandler} className="fixed top-0 right-0 flex justify-center items-center w-screen h-screen bg-[#fff3] backdrop-blur-[2px] z-[99]">
                <div onClick={(e)=>e.stopPropagation()} className='flex flex-col w-[15rem] h-[25rem] bg-[#caea] border-1 justify-center p-[2rem]'>
                    <h2>Update Order Status</h2>
                    <select className='my-[1rem] p-[1rem] cursor-pointer' value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Order Placed">Order Placed</option>
                        <option value="Order Processed">Order Processed</option>
                        <option value="Order Delivered">Order Delivered</option>
                        <option value="Order Canceled">Order Canceled</option>
                    </select>
                    <button className='bg-green-400 rounded-md my-[1rem] p-[1rem] cursor-pointer' onClick={updateHandler}>Save</button>
                    <button className='bg-red-500 rounded-md my-[1rem] p-[1rem] cursor-pointer' onClick={cancelHandler}>Cancel</button>
                </div>
            </div>
            }
            <div style={{ backgroundColor: listOrders ? "black" : "#0008" }} className='flex flex-col md:flex-row text-white mt-[1rem] p-[1rem] sm:px-[1rem] sm:py-[1.5rem] justify-between cursor-pointer hover:text-skyblue' onClick={() => setListOrders(!listOrders)}>
                <p>{idx + 1}.</p>
                <p>Order ID : {order.razorpayDetails.orderId}</p>
                <p>Total : ₹{order.total}</p>
                {admin && <p onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(true)}
                }
                className='text-blue-400 hover:text-blue-200 w-fit'>Update Status</p>}
                <p>Placed on : {placedOn.getDate()} {months[placedOn.getMonth()]}, {placedOn.getFullYear()} - {placedOn.getHours() % 12}:{placedOn.getMinutes()} {placedOn.getHours() < 12 ? "AM" : "PM"}</p>
            </div>
            {
                listOrders &&
                < table  className='w-full h-full bg-gray-900 text-white'>
                    {/* <th className='flex justify-center p-[1rem] border-b-1 items-center bg-[#0004]'> */}
                    <th className='flex justify-between p-[0.5rem] xl:p-[1rem] border-b-[1px] border-gray items-center bg-[#00000015]'>
                        <td className='w-[2rem] text-sm xl:text-md xl:w-[10rem] text-start xl:text-center'>S.No.</td>
                        <td className='w-[3.8rem] text-sm xl:text-md xl:w-[10rem] text-start xl:text-center'>Item</td>
                        <td className='w-[3.5em] text-sm xl:text-md xl:w-[10rem] text-start xl:text-center'>Name</td>
                        <td className='w-[3.5rem] text-sm xl:text-md xl:w-[10rem] text-start xl:text-center'>Quantity</td>
                        <td className='w-[3.5rem] text-sm xl:text-md xl:w-[10rem] text-start xl:text-center'>Amount</td>
                        <td className='w-[3.5rem] text-sm xl:text-md xl:w-[10rem] text-start xl:text-center'>Status</td>
                    </th>
                    {
                        order.cartItems.map((item, i) => {
                            return (
                                // <tr className='flex justify-center p-[1rem] border-b-1 items-center' key={i}>
                                <tr className='flex justify-between p-[1rem] border-b-[1px] border-gray items-center' key={i}>
                                    <td className='w-[2rem] text-sm xl:text-md xl:w-[10rem] text-start xl:text-center'>{i + 1}</td>
                                    <td className='w-[3.8rem] p-[0.2rem] text-sm xl:text-md md:w-[10rem] text-start xl:text-center'><img className='h-[50px] sm:h-[70px] sm:w-auto w-[60px]' style={{ marginRight: '1rem' }} src={BASE_URL + item.img} alt="" /></td>
                                    <td className='w-[3.5rem] text-sm xl:text-md xl:w-[10rem] text-center'>{item.name}</td>
                                    <td className='w-[3.5rem] text-sm xl:text-md xl:w-[10rem] text-center'>{item.qty}</td>
                                    <td className='w-[3.5rem] text-sm xl:text-md xl:w-[10rem] text-center'>₹{item.qty * item.price}</td>
                                    <td className='w-[3.5rem] text-sm xl:text-md xl:w-[10rem] text-start xl:text-center'>{order.status}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            }
        </div>
    )
}

export default Order