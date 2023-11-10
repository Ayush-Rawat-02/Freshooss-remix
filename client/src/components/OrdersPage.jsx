import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../MyContext';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Order from './Order';
import { toast } from 'react-toastify';


function OrdersPage() {
    const [ordersList, setOrdersList] = useState([]);
    const { userDetails } = useContext(MyContext)
    const fetchOrders = async () => {
        try {
            const orders = await axiosInstance.get("/api/orders", {
                params: {
                    user_id: userDetails.id,
                }
            });
            if (orders) {
                console.log(orders.data);
                setOrdersList(orders.data);
            }
        } catch (err) {
            toast.error("Unable to connect to the server!", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };
    useEffect(() => {
        fetchOrders();
    }, [])
    if (userDetails != null)
        return (
            <div className='bg-[#002045] sm:p-[2rem] flex flex-col items-center min-h-[58vh]'>
                <div className='h-[3.8rem] w-full'></div>
                {
                    ordersList.map((item, i) => {
                        return (
                            <Order key={i} order={item} idx={i} />
                        )
                    })
                }
                {ordersList.length == 0 &&
                    <div className='flex-1 flex flex-col items-center justify-center'>
                        <h1 className='m-[1rem]'>No Orders Placed !</h1>
                        <h1 className='m-[1rem]'><Link to="/dashboard" >Start shopping</Link> to place Orders</h1>
                    </div>
                }
            </div >
        )
    else
        return (
            <div className='flex flex-col min-h-[60vh] items-center justify-center'>
                <div className='h-[3.8rem] w-full'>
                </div>
                <h1>You need to be logged in to view this page</h1>
            </div>
        )
}

export default OrdersPage