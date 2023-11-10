import { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../MyContext';
import { BiArrowBack } from "react-icons/bi";
import axiosInstance from '../api/axios';
import LineChart from './LineChart';

const SERVER_URL = 'https://vegetable-price-prediction-server.onrender.com/';

function VegetableAnalytics() {
    const { fruits } = useContext(MyContext);
    const [vegetable, setVegetable] = useState('');
    const [pastPrices, setPastPrices] = useState([]);
    const [predictedPrice, setPredictedPrice] = useState(0);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchChange = (e) => {
        setVegetable(e.target.value);
        setShowSuggestion(true);
    }
    const searchHandler = async (e) => {
        e.preventDefault();
        const pastResults = await axiosInstance.get(SERVER_URL + '/getprice', {
            params: {
                name: vegetable,
            }
        });
        if (pastResults && pastResults.data) setPastPrices(pastResults.data)
        else {
            toast.error("Unable to fetch data!", { position: toast.POSITION.TOP_CENTER })
            return;
        }
        // console.log(pastResults.data);
    }
    const predictPrice = async () => {
        setIsLoading(true);
        const priceResult = await axiosInstance.get(SERVER_URL + '/predict', {
            params: {
                name: vegetable,
            }
        });
        // console.log(priceResult.data)
        if (priceResult && priceResult.data) {
            setPredictedPrice(priceResult.data);
            setIsLoading(false);
        }
        else {
            toast.error("Unable to fetch data!", { position: toast.POSITION.TOP_CENTER })
            return
        }
    }
    const [initializing, setInitializing] = useState(true)
    const initializeServer = async()=>{
        try{
            const response = await axiosInstance.get(SERVER_URL)
            if(response){
                // alert(response.data)
                setInitializing(false)
            };
        }
        catch(err){
            setInitializing(false);
            toast.error("Unable to connect to the server!", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    useEffect(()=>{
        initializeServer();
    },[])

    return (
        <div className='flex flex-col items-center justify-center min-h-[67.1vh] prediction'>
            {initializing&&
            <div className='fixed top-[3.8rem] left-0 flex justify-center items-center w-screen h-screen bg-[#0007] backdrop-blur-[2px] z-[99]'>
                <h1 className='text-4xl font-bold text-white'>Connecting to server...</h1>
            </div>
            }
            <div className='h-[3.8rem] w-full'></div>
            {pastPrices.length > 0 ?
                <div className='w-full text-center flex flex-col items-center'>
                    <BiArrowBack className='text-white scale-[2] absolute left-[1rem] top-[6rem] cursor-pointer hover:text-skyblue' onClick={() => {
                        setPredictedPrice(0);
                        setPastPrices([])
                    }} />
                    <div className='w-full flex flex-col text-white items-center justify-center'>
                        <h1 className='p-2 text-xl font-bold bg-[#0008] rounded-md m-2'>{vegetable}</h1>
                        <LineChart pastPrices={pastPrices} />
                    </div>
                    {/* {isLoading && <img style={{ scale: '0.2', padding: 0 }} src={Loader} />} */}
                    {predictedPrice == 0?
                        <button disabled={isLoading} className='bg-green-400 rounded-md border-0 py-[1rem] px-[2rem] m-[1rem] cursor-pointer text-white font-semibold text-md hover:shadow-[1px 1px 1px skyblue]' onClick={predictPrice}>
                            {
                            isLoading?
                            "Loading..."
                            :
                            "Predict Price"
                            }
                        </button>
                        :
                        <h2 className='text-2xl text-gray-800 font-bold m-4 bg-[#fff8] w-[15rem] py-3 rounded-md'>₹{predictedPrice}</h2>
                    }
                </div>
                :
                <form className='h-[25rem] flex flex-col items-center justify-end' onSubmit={searchHandler}>
                    <h1 className='text-white text-2xl font-semibold py-16'>ML based Price Prediction</h1>
                    <div className="flex items-center">
                        <input className='rounded-l-md p-2' type="text" value={vegetable} onChange={searchChange} placeholder='Search for Vegetable' />
                        <button className='p-2 rounded-r-md bg-green-400 hover:bg-green-300' type='submit'>Search</button>
                    </div>
                    <div className='min-h-[10rem] my-1'>
                        {vegetable != "" && showSuggestion &&
                            <div className="flex flex-col">
                                {
                                    fruits.filter(item => { return item.name.toLowerCase().startsWith(vegetable.toLowerCase()); })
                                        .map(i => {
                                            return (
                                                <div className='bg-[#0008] text-white p-[0.3rem] cursor-pointer hover:bg-[#fff5] w-[15rem]'>
                                                    <p className="suggestion-ml" onClick={() => { setVegetable(i.name); setShowSuggestion(false) }}>{i.name}</p>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        }
                    </div>
                </form>
            }

        </div>
    )
}

export default VegetableAnalytics