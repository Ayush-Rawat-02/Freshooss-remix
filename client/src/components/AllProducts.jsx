import { useContext } from 'react'
import { MyContext } from '../../MyContext';

// const BASE_URL = "http://localhost:8000";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function AllProducts() {
    const { fruits,setDetailed } = useContext(MyContext)
    const BASE_URL = "https://freshooss-backend.onrender.com/";
    return (
        <div className='w-full h-full'>
            <table className='w-full'>
                <th className='bg-gray-300 flex justify-between w-full md:px-[2rem] border-b-[1px] border-black'>
                    <td className='w-[3rem]'>S.No</td>
                    <td className='w-[5rem]'>Item</td>
                    <td className='w-[5rem]'>Name</td>
                    <td className='w-[3rem]'>Price</td>
                    <td className='w-[6rem]'>Created On</td>
                </th>
                {fruits.map((item, i) => {
                    return (
                        <tr className='bg-blue-100 flex justify-between w-full md:px-[2rem] border-b-[1px] border-black' onClick={() => setDetailed(item)}>
                            <td className='w-[3rem] text-center'>{i + 1}</td>
                            <td className='w-[5rem]'><img className='w-[7rem] h-[4.8rem]' src={BASE_URL + item.img} alt={item.name} /></td>
                            <td className='w-[5rem] text-center'>{item.name}</td>
                            <td className='w-[3rem] text-center'>{item.price}</td>
                            <td className='w-[6rem] text-center'>{months[new Date(item.createdAt).getMonth()]}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default AllProducts