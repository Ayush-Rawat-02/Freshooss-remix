import { useContext, useState } from 'react'
import { MyContext } from '../../MyContext'
import { FaUserTie } from "react-icons/fa";
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';

function Profile() {
    const { userDetails } = useContext(MyContext);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(userDetails ? userDetails.name : "");
    const [email, setEmail] = useState(userDetails ? userDetails.email : "");
    const saveChanges = async () => {
        var res = null;
        try {
            res = await axiosInstance.post('/api/user/update', {
                id: userDetails.id,
                name: name,
                email: email,
            })
            if (res) {
                toast.success("User Details Updated!", { position: toast.POSITION.TOP_CENTER });
            }
        }
        catch (err) {
            toast.error(err.response.data, { position: toast.POSITION.TOP_CENTER });
            return;
        }
        setEdit(false);
    }
    const cancelChanges = () => {
        setName(userDetails.name);
        setEmail(userDetails.email);
        setEdit(false);
    }
    if (userDetails != null)
        return (
            <div className='flex flex-col sm:min-h-[70vh] items-center justify-center home'>
                <div className='h-[3.8rem] w-full'></div>
                <div className='flex flex-col justify-between bg-[#fff5] backdrop-blur-[5px] items-center border-1 w-[22rem] sm:w-[50rem] min-h-[15rem] p-[1rem] my-[4rem] sm:my-[8rem]'>
                    <h1 className='text-2xl mb-6'>Profile</h1>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='m-[0.5rem] bg-[#3d4] w-[10rem] h-[10rem] flex items-center justify-center rounded-full m-[1rem]'>
                            <FaUserTie className='scale-[5]' />
                        </div>
                        <div className='m-[0.5rem]'>
                            <label htmlFor="name">Name : </label>
                            <input className='bg-[#0009] disabled:text-gray-300 text-white px-2 py-1' type="text" value={name} disabled={!edit} name='name' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='m-[0.5rem]'>
                            <label htmlFor="email">Email : </label>
                            <input className='bg-[#0009] disabled:text-gray-300 text-white px-2 py-1' type="email" value={email} disabled={!edit} name='email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {edit ?
                            <div className='flex gap-8'>
                                <button className='bg-green-300 h-[2rem] w-[5rem] rounded-md' onClick={saveChanges} >Done</button>
                                <button className='bg-red-300 h-[2rem] w-[5rem] rounded-md' onClick={cancelChanges}>Cancel</button>
                            </div>
                            :
                            <button className='bg-blue-300 h-[2rem] w-[5rem] rounded-md' onClick={() => setEdit(true)}>Edit</button>
                        }
                    </div>
                </div>
            </div>
        )
    else
        return (
          <div className=' h-[92vh] flex justify-center py-[20rem]'>
          <h1 className='text-3xl'>You need to be logged in to view this page</h1>
      </div>
        )
}

export default Profile