import { useContext, useState } from 'react'
import { MyContext } from '../../MyContext';
import AdminDashboard from './AdminDashboard';
import AddProduct from './AddProduct';
import AllProducts from './AllProducts';
import AllOrders from './AllOrders';

function AdminPage() {
    const { userDetails } = useContext(MyContext);
    const [tab, setTab] = useState(0);
    if (userDetails != null)
        return (
            <div className='flex flex-col w-full bg-[#216e]'>
                <div className='h-[7rem] md:h-[3.8rem] w-full' id='dashboard'></div>
                <div className='flex flex-col md:flex-row'>
                    <div className='flex flex-row md:flex-col border-t-1 border-black md:justify-start justify-between w-[220px] lg:max-xl:w-[205px]  xl:w-[195px]'></div>
                    <div className='w-full flex flex-col items-center justify-center h-full min-h-[40rem]'>
                        {tab == 0 && <AdminDashboard />}
                        {tab == 3 && <AddProduct />}
                        {tab == 2 && <AllProducts />}
                        {tab == 1 && <AllOrders />}
                    </div>
                </div>
                <div className='absolute md:fixed left-0 top-[3.8rem] bg-[#aafa] flex flex-row md:flex-col border-t-1 border-black md:justify-start justify-between md:pr-[2rem] md:h-screen w-full md:w-auto'>
                        <h2 className={`sm:px-[2rem] py-[1rem] md:my-[0.5rem] md:rounded-r-full cursor-pointer ${tab==0&&"bg-[#22f8] text-gray-300"} hover:bg-[#00f8] hover:text-white w-full text-sm md:text-[16px] text-center md:text-start`} onClick={() => setTab(0)}>Dashboard</h2>
                        <h2 className={`sm:px-[2rem] py-[1rem] md:my-[0.5rem] md:rounded-r-full cursor-pointer ${tab==1&&"bg-[#22f8] text-gray-300"} hover:bg-[#00f8] hover:text-white w-full text-sm md:text-[16px] text-center md:text-start`} onClick={() => setTab(1)}>Sales</h2>
                        <h2 className={`sm:px-[2rem] py-[1rem] md:my-[0.5rem] md:rounded-r-full cursor-pointer ${tab==2&&"bg-[#22f8] text-gray-300"} hover:bg-[#00f8] hover:text-white w-full text-sm md:text-[16px] text-center md:text-start`} onClick={() => setTab(2)}>Products</h2>
                        <h2 className={`sm:px-[2rem] py-[1rem] md:my-[0.5rem] md:rounded-r-full cursor-pointer ${tab==3&&"bg-[#22f8] text-gray-300"} hover:bg-[#00f8] hover:text-white w-full text-sm md:text-[16px] text-center md:text-start`} onClick={() => setTab(3)}>New</h2>
                </div>
            </div>
        )
    else
        return (
            <div className='min-h-[60vh] flex flex-col items-center justify-center'>
                <div className='w-full h-[3.8rem]'>
                </div>
                <h1>You need to be logged in to view this page</h1>
            </div>
        )
}

export default AdminPage