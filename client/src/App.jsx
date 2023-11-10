import { useEffect, useState } from 'react'
import { MyContext } from '../MyContext';
import { BrowserRouter, Route, Routes, json } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Details from './components/Details';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Checkout from './components/Checkout';
import SearchResults from './components/SearchResults';
import OrdersPage from './components/OrdersPage';
import Profile from './components/Profile';
import AdminPage from './components/AdminPage';
import VegetableAnalytics from './components/VegetableAnalytics';
import Footer from './components/Footer';
import axiosInstance from './api/axios';

function App() {
  const [toggle, setToggle] = useState(false);
  const [signOpt, setSignOpt] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [fruits, setFruits] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [detailed, setDetailed] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // function to initially fetch for vegetables from server
  const fetchVeggies = async () => {
    try {
      const veggies = await axiosInstance.get("/api/fruits");
      if (veggies) {
        setFruits(veggies.data);
        setInitializing(false);
      }
    } catch (err) {
      setInitializing(false);
      toast.error("Unable to connect to the server!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  //user details from local storage
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const fetchDetailsInLocalStorage = async () => {
    const dt = await JSON.parse(localStorage.getItem("userDetails"));
    if (dt) setUserDetails(dt);
  };

  useEffect(() => {
    // console.log("TOKKEN : ", token);
    fetchDetailsInLocalStorage();
    fetchVeggies();
  }, []);
  return (
    <>
      <MyContext.Provider
        value={{
          cartItems,
          setCartItems,
          total,
          setTotal,
          fruits,
          searchVal,
          setSearchVal,
          detailed,
          setDetailed,
          showSuggestion,
          setShowSuggestion,
          userDetails,
          setUserDetails
        }}
      >
        <BrowserRouter>
          <ToastContainer/>
          <Navbar toggle={toggle} setToggle={setToggle}/>
          {toggle && signOpt && (
          <Signup
            signOpt={signOpt}
            setSignOpt={setSignOpt}
            setToggle={setToggle}
          />
        )}
        {toggle && !signOpt && (
          <Login
            signOpt={signOpt}
            setSignOpt={setSignOpt}
            setToggle={setToggle}
          />
        )}
        {detailed != null && <Details />}
        {initializing&&
        <div className='fixed top-0 left-0 h-screen w-screen bg-[#0007] backdrop-blur-[2px] flex justify-center items-center z-[9]'>
          <h1 className='text-4xl text-white font-semibold'>Server initializing ...</h1>
        </div>
        }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/prediction" element={<VegetableAnalytics />} />
        </Routes>
        <Footer />
        </BrowserRouter>
      </MyContext.Provider>
    </>
  )
}

export default App
