import { useEffect, useState } from 'react'
import axiosInstance from '../api/axios';
import Order from './Order';
import { toast } from 'react-toastify';

function AllOrders() {
    const [allOrders, setAllOrders] = useState([]);
    const getAllOrders = async () => {
        const response = await axiosInstance.get('/api/admin/orders/all');
        if (response) {
            console.log(response.data)
            setAllOrders(response.data);
            return;
        }
        else {
            toast.error("Error connecting the server!", { position: toast.POSITION.TOP_CENTER });
            return;
        }
    }
    useEffect(() => {
        getAllOrders();
    }, []);
    return (
        <div className='h-full min-h-[40rem] w-full'>
            {allOrders.map((item, i) => {
                return (
                    <Order key={i} order={item} idx={i} admin={true} />
                )
            })}
        </div>
    )
}

export default AllOrders