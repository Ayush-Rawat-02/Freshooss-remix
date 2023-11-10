import { AiOutlineCloseCircle } from "react-icons/ai";
import { useContext, useState } from 'react';
import { MyContext } from '../../MyContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

function Signup({ signOpt, setSignOpt, setToggle }) {
    const { setUserDetails } = useContext(MyContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
      setLoading(true)
      e.preventDefault();
      try {
          const response = await axiosInstance.post('/api/authenticate', {
              email: email,
              password: password
          })
        //   console.log(response.data);
          const details = {
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
              token: response.data.token,
              isAdmin: response.data.isAdmin,
          };
          setLoading(false)
          toast.success("Welcome!", { position: toast.POSITION.TOP_RIGHT });;
          setToggle(false);
          localStorage.setItem("userDetails", JSON.stringify(details));
          setUserDetails(details);
          if (response.data.isAdmin == false) navigate("/dashboard", { state: details });
          else navigate('/admin', { state: details })
      }
      catch (err) {
          setLoading(false)
          console.log(err.response.data);
          toast.error(err.response.data.error, { position: toast.POSITION.TOP_RIGHT });
      }
    }
    return (
        <div onClick={() => setToggle(false)} className="fixed top-[3.8rem] left-0 flex justify-center h-[93vh] w-screen lg:py-[3.5rem] py-[1rem] bg-[#fff3] backdrop-blur-[2px] z-[9] overflow-y-scroll">
            <div onClick={(e)=>e.stopPropagation()} className="flex flex-col w-3/4 h-[80vh] lg:h-fit bg-white rounded-xl">
                <div className='flex justify-end w-full px-6 py-4'>
                    <AiOutlineCloseCircle id='cross' className="w-[1.4rem] h-[1.4rem] cursor-pointer" onClick={() => setToggle(false)} />
                    {/* <button onClick={() => setToggle(false)}>Close</button> */}
                </div>
                <div className="flex flex-col lg:flex-row">
                    <img className="rounded-xl hidden lg:block flex-1 w-[20vw]" src="LoginImage.jpeg" alt="" />
                    <form className="flex-1 flex flex-col p-8 justify-center gap-8 items-center" onSubmit={handleLogin}>
                        <h2>Welcome back!</h2>
                        <div className="flex flex-col gap-8 w-full items-center">
                          <input name="email" className="w-full sm:w-8/12 h-[1.8rem] px-3 rounded-md bg-blue-100" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          <input name="password" className="w-full sm:w-8/12 h-[1.8rem] px-3 rounded-md bg-blue-100" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <p>Don't have an account? <a className="cursor-pointer" onClick={() => setSignOpt(!signOpt)}>Sign up</a>
                        </p>
                        <button disabled={loading} className="bg-blue-300 h-[2rem] w-[8rem] rounded-md" type="submit">
                            {loading?"Logging in...":"Sign in"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup