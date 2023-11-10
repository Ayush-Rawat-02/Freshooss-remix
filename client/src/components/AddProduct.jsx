import { useState } from 'react'
import axiosInstance from '../api/axios';

function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [discount, setDiscount] = useState();
    const [descr, setDescr] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [percentageLoaded, setPercentageLoaded] = useState(null);
    const[uploading, setUploading] = useState(false);
    // const onUploadProgress = async (progressEvent) => {
    //     console.log("THis Called!")
    //     const { loaded, total } = progressEvent
    //     setPercentageLoaded(Math.floor((loaded * 100) / total));
    // }
    const submitHandler = async (e) => {
        e.preventDefault();
        // alert("You submitted the form")
        const data = new FormData();
        data.append('file', selectedFile, selectedFile.name);
        data.append('name', name);
        data.append('price', price);
        data.append('discount', discount);
        data.append('description', descr);
        // We can also use set function - check difference between append and set in formdata object methods
        console.log(selectedFile);
        // const response = await axiosInstance.post('/api/product/add', data, {
        //     onUploadProgress: async (progressEvent) => {
        //         console.log("THis Called!")
        //         const { loaded, total } = progressEvent
        //         setPercentageLoaded(Math.floor((loaded * 100) / total));
        //     }
        // });
        const response = await axiosInstance.post('/api/product/add', data, {
            onUploadProgress: async (progressEvent) => {
                console.log("THis Called!")
                const { loaded, total } = progressEvent
                setPercentageLoaded(Math.floor((loaded * 100) / total));
            }
        });
        alert(response.statusText);
        console.log(response)
    }

    const submitHandler2 = async (e) => {
        e.preventDefault();
        setUploading(true);
        const data = new FormData();
        const res = await axiosInstance.post('/api/product/add', data);
        setUploading(false);
    }

    return (
        <div className='w-full h-full min-h-[40rem] flex flex-col items-center justify-center adminbg'>
            <form className='flex flex-col py-8 px-4 bg-[#fff6] backdrop-blur-[4px] rounded-xl gap-6' onSubmit={submitHandler}>
            <h2 className='text-xl text-black font-semibold'>Add new Product to your website!</h2>
                <input className='rounded-sm px-2 py-1 bg-blue-50' type="text" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input className='rounded-sm px-2 py-1 bg-blue-50' type="number" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                <input className='rounded-sm px-2 py-1 bg-blue-50' type="textarea" placeholder='Something about your Product' value={descr} onChange={(e) => setDescr(e.target.value)} />
                <input className='rounded-sm px-2 py-1 bg-blue-50' type="number" placeholder='Discount' value={discount} onChange={(e) => setDiscount(e.target.value)} />
                <input className='rounded-sm px-2 py-1 text-white bg-[#0008]' type="file" accept='image/*' onChange={(e) => setSelectedFile(e.target.files[0])} />
                <button className='bg-blue-300 hover:bg-blue-200 p-2 text-black font-semibold text-md' type='submit'>Add Product</button>
            </form>
            {uploading&&<p className='scale-[1.5] text-white'>{Math.round(percentageLoaded)}%</p>}
        </div>
    )
}

export default AddProduct