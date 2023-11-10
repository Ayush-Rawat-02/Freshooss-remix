import React, { useContext, useState } from 'react'
import { MyContext } from '../../MyContext'
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Logo from '/Logo.jpeg'
import { toast } from 'react-toastify';




function Checkout() {
    const { cartItems, setCartItems,userDetails, total, setTotal } = useContext(MyContext);
    const BASE_URL = "https://freshooss-backend.onrender.com/";


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    // function loadRazorpay(src) {
    //     return new Promise(resolve => {
    //         var script = document.createElement("script");
    //         script.src = src;
    //         document.body.appendChild(script);
    //         script.onload = () => {
    //             resolve(true)
    //         }
    //         script.onerror = () => {
    //             resolve(false)
    //         }
    //         document.body.appendChild(script)
    //     })
    // }

    async function displayRazorpay() {
        const res = await loadScript(
            'https://checkout.razorpay.com/v1/checkout.js'
        );
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }
        const result = await axiosInstance.post('/api/payment/orders', {
            amt: total,
        });
        if (!result) {
            alert('Server error. Are you online?');
            return;
        }
        const { amount, id: order_id, currency } = result.data;
        const options = {
            // for Create-react-app
            // key: process.env.REACT_APP_RZP_KEYID, // Enter the Key ID generated from the Dashboard
            //for Vite
            key: import.meta.env.REACT_APP_RZP_KEYID, // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: 'Freshooss Private Limited',
            description: 'Test Transaction',
            image: { Logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    user_id: userDetails.id,
                    cartItems: cartItems.map(item => { return item }),
                    total: total,
                };

                const result = await axiosInstance.post('/api/payment/success', data);
                // alert(result.data.msg);
                toast.success(`${result.data.msg}\nOrder Placed!`, { position: toast.POSITION.TOP_CENTER });
                toast.success(`Order Id : ${result.data.orderId}`, { position: toast.POSITION.TOP_CENTER });
                toast.success(`Payment Id : ${result.data.paymentId}`, { position: toast.POSITION.TOP_CENTER });
                setCartItems([]);
                setTotal(0);
            },
            prefill: {
                // name: 'Rishi Sunak',
                // email: 'example@example.com',
                // contact: '9999999999',
            },
            notes: {
                address: 'Doiwala, Uttarakhand',
            },
            theme: {
                color: '#61dafb',
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }




    // async function displayRazorpay() {
    //     var res = await loadRazorpay("http:/checkout.razorpay.com/v1/checkout.js");
    //     if (!res) {
    //         alert("Razorpay SDK failed!")
    //         return;
    //     }

    //     var options = {
    //         key: "rzp_test_FDr6Rfzn9Ftu18",
    //         // The smallest currency in which payment can be made
    //         // amount: amount.toString(),
    //         amount: "50000",
    //         // currency: currency,
    //         currency: "INR",
    //         name: "Freshooss by CodeHub",
    //         description: "Test Transaction",
    //         image: { Logo },
    //         // order_id: order_id,
    //         order_id: "order_834ADFG9335",
    //         handler: async function (response) {
    //             const data = {
    //                 // orderCreationId: order_id,
    //                 razorpayPaymentId: response.razorpay_payment_id,
    //                 razorpayOrderId: response.razorpay_order_id,
    //                 razorpaySignature: response.razorpay_signature,
    //             }
    //             // This api is for saving the data above to the backend database
    //             // const result = await axiosInstance.post('/api/payment/success', data);
    //             // alert(result.data.msg);
    //             alert(data)
    //         },
    //         prefill: {
    //             name: "Rishi Sunak",
    //             email: "Rishi@example.com",
    //             contact: "9876543210"
    //         },
    //         // notes: {
    //         //     address: "Freshooss official limited"
    //         // },
    //         // theme: {
    //         //     color: "#61dafb"
    //         // }
    //     }
    //     const paymentObject = new window.Razorpay(options);
    //     paymentObject.open();
    // }


    if (userDetails != null)
        return (
            <div className='bg-gray-800 sm:p-[2rem] flex flex-col items-center min-h-[70vh]'>
                <div className='h-[3.8rem] w-full'></div>
                <div className='bg-[#0004] text-white w-full p-[2rem] mb-[1rem]'>
                    <h2>Billing details</h2>
                    <p>User id: {userDetails.id}</p>
                    <p>Name : {userDetails.name}</p>
                    <p>Email: {userDetails.email}</p>
                </div>
                {cartItems.length > 0 ?
                    <div className='w-full text-center'>
                        <h2 className='text-white'>All items</h2>
                        <table className='w-full h-full bg-gray-900 text-white lg:m-[1rem] my-[1rem]'>
                            <thead>
                                <tr className='flex justify-between p-[0.5rem] lg:p-[1rem] border-b-[1px] border-gray items-center bg-[#00000015]'>
                                    <td className='w-[2rem] text-sm lg:text-md lg:w-[10rem] text-start lg:text-center'>S.No.</td>
                                    <td className='w-[3.8rem] text-sm lg:text-md lg:w-[10rem] text-center'>Item</td>
                                    <td className='w-[3.5rem] text-sm lg:text-md lg:w-[10rem] text-start lg:text-center'>Name</td>
                                    <td className='w-[3.5rem] text-sm lg:text-md lg:w-[10rem] text-center'>Price</td>
                                    <td className='w-[3.5rem] text-sm lg:text-md lg:w-[10rem] text-start lg:text-center'>Quantity</td>
                                    <td className='w-[3.5rem] text-sm lg:text-md lg:w-[10rem] text-start lg:text-center'>Amount</td>
                                </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item, i) => {
                                return (
                                    <tr key={i} className='flex justify-between p-[1rem] border-b-[1px] border-gray items-center'>
                                        <td className='w-[2rem] text-sm lg:text-md lg:w-[10rem] text-start lg:text-center'>{i + 1}</td>
                                        <td className='w-[3.8rem] px-[0.2rem] text-sm lg:text-md lg:w-[10rem] text-center'><img height="70px" style={{ marginRight: '1rem' }} src={BASE_URL + item.img} alt="" /></td>
                                        <td className='w-[3.5rem] text-sm lg:text-md lg:w-[10rem] text-start lg:text-center'>{item.name}</td>
                                        <td className='w-[3.5rem] text-sm lg:text-md lg:w-[10rem] text-center'>₹{item.price}</td>
                                        <td className='w-[3.5rem] text-sm lg:text-md lg:w-[10rem] text-center'>{item.qty}</td>
                                        <td className='w-[3.5rem] text-sm lg:text-md lg:w-[10rem] text-center'>₹{item.qty * item.price}</td>
                                    </tr>
                                )
                            })}
                            <tr className='flex justify-between p-[1rem] border-b-[1px] border-gray items-center bg-[#0001]'>
                                {/* <div className='flex items-center'> */}
                                    <td className='w-[8rem] sm:w-[10rem] text-sm sm:text-md text-center font-bold'>Total Amount : ₹{total}</td>
                                {/* </div> */}
                                <td className='w-[8rem] sm:w-[10rem] text-sm sm:text-md text-center'><button className='text-black bg-blue-300 sm:h-[2.2rem] sm:w-[5rem] h-[2rem] w-full rounded-md font-bold' onClick={displayRazorpay}>Pay Now</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='w-screen h-[58vh] flex flex-col items-center py-[10rem] gap-3'>
                        <h1 className='text-2xl sm:text-3xl'>Your Cart seems to be empty !</h1>
                        <h1 className='text-2xl sm:text-3xl'><Link className='text-blue-200' to="/dashboard" >Start shopping</Link> to place Orders</h1>
                    </div>
                }
            </div>
        )
    else
        return (
            <div className='p-8 h-[95vh] flex justify-center py-[20rem]'>
                <h1 className='text-3xl'>You need to be logged in to view this page</h1>
            </div>
        )
}

export default Checkout