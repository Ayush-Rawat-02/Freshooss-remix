import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import Order from './Order';
import axiosInstance from '../api/axios';
import { MyContext } from '../../MyContext';

function AdminDashboard() {
    const { userDetails } = useContext(MyContext)
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalEarning, setTotalEarning] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);
    const loadAdminDashboard = async () => {
        const response = await axiosInstance.get('api/admin/dashboard');
        if (response && response.data) {
            console.log(response.data);
            setTotalOrders(response.data.orders.length);
            setTotalEarning(response.data.earning);
            setRecentOrders(response.data.orders.filter(item => {
                return item.status != "Order Delivered";
            }))
        }
        else {
            toast.error("Failed to fetch Data!", { position: toast.POSITION.TOP_CENTER })
            return;
        }
    }
    useEffect(() => {
        loadAdminDashboard();
    }, [])
    return (
        <div className='h-auto w-full py-[2rem] py-[1rem] px-[0.2rem] lg:max-xl:px-[2rem] xl:px-[4rem]'>
            <div className='bg-[#efefef] bg-white w-[95%] mx-2 sm:max-md:mx-4 md:max-xl:mx-5 xl:mx-6 h-fit rounded-2xl flex items-center justify-center gap-[5vw] lg:gap-[15vw]'>
                <img className='rounded-2xl w-[15rem] sm:max-lg:w-[20rem] lg:max-xl:w-[25rem] xl:w-[30rem]' src="Admin.jpeg" alt="Admin" />
                <div className="flex flex-col justify-center items-center gap-8">
                    <h1 className='text-lg sm:max-lg:text-xl lg:text-3xl font-bold'>Admin Panel</h1>
                    <h2 className='text-lg sm:max-lg:text-xl lg:text-2xl font-bold'>Welcome <span className='text-violet-800'>{userDetails.name}</span></h2>
                </div>
            </div>
            <div className='flex'>
                <div className='bg-[#aada] p-[1rem] border-4 border-black rounded-2xl m-[1rem] w-full'>
                    <h2>Profit Rate</h2>
                    <hr />
                    <h2>45%</h2>
                </div>
                <div className='bg-[#aada] p-[1rem] border-4 border-black rounded-2xl m-[1rem] w-full'>
                    <h2>Total Earning</h2>
                    <hr />
                    <h2>₹{totalEarning}</h2>
                </div>
                <div className='bg-[#aada] p-[1rem] border-4 border-black rounded-2xl m-[1rem] w-full'>
                    <h2>Total Orders</h2>
                    <hr />
                    <h2>{totalOrders}</h2>
                </div>
            </div>
            <div className='flex bg-[#aada] m-[1rem] rounded-xl items-center'>
                <h1>Total Orders</h1>
            </div>
            <div className='flex flex-col bg-[#aada] m-[1rem] rounded-xl items-center py-2'>
                <h2 className='text-lg font-semibold'>Recent Orders</h2>
                {recentOrders.map((item, i) => {
                    return (
                        <Order order={item} idx={i} />
                    )
                })}
            </div>
        </div>
    )
}

export default AdminDashboard