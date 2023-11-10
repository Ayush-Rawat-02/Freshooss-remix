import { TiShoppingCart } from "react-icons/ti";
import { BsFillPersonCheckFill, BsPersonCheck } from "react-icons/bs";
import { HiMenuAlt1, HiOutlineX } from "react-icons/hi";
import { useContext, useState } from "react";
import { MyContext } from "../../MyContext";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import Suggestions from "./Suggestions";
import { toast } from "react-toastify";

function Navbar({ toggle, setToggle }) {
  const {
    searchVal,
    setSearchVal,
    showSuggestion,
    setShowSuggestion,
    userDetails,
    setUserDetails,
  } = useContext(MyContext);
  const searchChange = (e) => {
    setSearchVal(e.target.value);
    setShowSuggestion(true);
  };
  const navigate = useNavigate();
  const dashboardRedirect = ()=>{
    setOptions(false)
    if(userDetails!=null&&userDetails.isAdmin)
      navigate('/admin')
    else
      navigate('/dashboard')
  }
  const logoutHandler = () => {
    setUserDetails(null)
    localStorage.removeItem("userDetails")
    setOptions(false);
    navigate("/");
    toast.success("Logged out!", { position: toast.POSITION.TOP_RIGHT });
  };

  const [options, setOptions] = useState(false)
  return (
    <>
      <nav className="pr-2 sm:pr-0 fixed top-0 w-full flex justify-between items-center h-[3.8rem] bg-[#66f2] backdrop-blur-[6px] z-[9] text-white">
        <div className="flex items-center justify-start">
          <h2 className="text-green-200 text-xl font-bold mx-16">Freshooss</h2>
          <div className="hidden xl:flex justify-between items-center gap-8">
            <Link to="/">Home</Link>
            <a href="#market" onClick={() => navigate("/")}>
              Market
            </a>
            {/* <Link to="/#market">Market</Link> */}
            <p className='cursor-pointer' onClick={dashboardRedirect}>Dashboard</p>
            {userDetails != null ? (
              <div className="group">
                <div className="flex gap-2 items-center h-full">
                  <BsFillPersonCheckFill className="h-[3.8rem] w-[1.5rem]" />
                  <p className="cursor-default">{userDetails.name}</p>
                </div>
                <div className="hidden group-hover:flex bg-[#0009] text-white flex-col w-[6rem] gap-1 fixed top-[3.8rem]">
                  <Link className="border-b-[1px] px-2 hover:bg-[#fff4] text-md py-1" to="/account">Account</Link>
                  <Link className="border-b-[1px] px-2 hover:bg-[#fff4] text-md py-1" to="/orders">Orders</Link>
                  <a href="#" onClick={logoutHandler} className="px-2 hover:bg-[#fff4] text-md py-1">Logout</a>
                </div>
              </div>
            ) : (
              <button className="bg-green-300 text-black border-none rounded-3xl flex items-center justify-center w-[4.8rem] h-[2rem]" onClick={() => setToggle(!toggle)}>Sign in</button>
            )}
          </div>
          {
          options&&
          <div className="xl:hidden flex flex-col absolute bg-[#0018] text-white right-0 top-[3.8rem] py-2 w-[10rem] gap-3 rounded-bl-xl">
            <Link className="text-lg border-b-[1px] px-4" onClick={()=>setOptions(false)} to="/">Home</Link>
            <a className="text-lg border-b-[1px] px-4" href="#market" onClick={() => {
                setOptions(false)
                navigate("/")
              }}>
              Market
            </a>
            {/* <Link className="text-lg border-b-[1px] px-4" onClick={()=>setOptions(false)} to="#market">Market</Link> */}
            <p className='cursor-pointer text-lg border-b-[1px] px-4' onClick={dashboardRedirect}>Dashboard</p>
            {userDetails != null ?
            <>
              <Link className="text-lg border-b-[1px] px-4" onClick={()=>setOptions(false)} to="/account">Account</Link>
              <Link className="text-lg px-4 border-b-[1px]" onClick={()=>setOptions(false)} to="/orders">Orders</Link>
              <a href="#" onClick={logoutHandler} className="text-lg px-4 border-b-[1px]">Logout</a>
            </>
            :
            <button className="bg-green-300 border-none rounded-3xl flex items-center justify-center w-[80%] h-[1.8rem] mx-4" onClick={() => {
              setToggle(!toggle)
              setOptions(false)
            }}>Sign in</button>
          }
          </div>
          }

        </div>
        <div className="flex items-center justify-end">
          <div className="hidden md:flex mx-8 items-center">
            <input
              name="searchString"
              type="text"
              className="px-4 border-none rounded-md h-[2.2rem] mx-2 text-black"
              placeholder="Search for vegetables..."
              value={searchVal}
              onChange={searchChange}
            />
            {searchVal != "" && showSuggestion && <Suggestions />}
            <button
              className="bg-green-300 px-4 rounded-md h-[2.2rem] text-black"
              onClick={() => {
                setShowSuggestion(false)
                searchVal != "" && navigate("/search")
              }}
            >
              Search
            </button>
          </div>
          {userDetails!=null&&userDetails.isAdmin&&(
          <div className="md:block hidden h-[3rem] w-[5rem]"></div>
          )}
          {options?
          <HiOutlineX className="block xl:hidden scale-[3.78] p-1 mx-4 text-gray-400" onClick={()=>setOptions(!options)} />
          :
          <HiMenuAlt1 className="block xl:hidden scale-[3.78] p-1 mx-4 text-gray-400" onClick={()=>setOptions(!options)} />}
          {(userDetails == null || userDetails.isAdmin == false)&&
           (
            <div className="group">
              <TiShoppingCart 
                className="scale-[3.78] p-1 mx-4 sm:mx-8 group-hover:bg-white rounded-t-sm text-gray-400"
                onClick={()=>navigate('/checkout')}
              />
              <div className="hidden sm:group-hover:flex">
                <Cart />
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
