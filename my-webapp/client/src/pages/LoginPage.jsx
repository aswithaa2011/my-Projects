import { useState } from "react";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [input, setInput] = useState("");
  const [error,setError]=useState("")

  const navigate=useNavigate();

  const HandleChange = (e) => {
    setInput(e.target.value);
    setError("")

  
  };

 const HandleClick = () => {


  const userdatas = {inputemail:input,status:true}
  const changedata = JSON.stringify(userdatas)
 
  if(input === ""){
    setError("Email is required")
  } 
  else if(input.includes(" ")){
    setError("Email should not contain space")
  }
  else if(!input.includes("@") || !input.includes(".")){
    setError("Email should contain @ and .")
  }
  else{
    localStorage.setItem("auth",changedata)
    navigate("/otp")
  }


  
 }
  




  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      
    
      <img src={logo} className="w-52 mb-6" alt="logo" />

  
      <div className="bg-white shadow-lg rounded-xl p-8 w-87.5 text-center">
        
        <h2 className="text-gray-500 font-bold mb-4">
          Login Or Signup
        </h2>

        <input
          onChange={HandleChange}
          className="border w-full p-2 rounded mb-4 outline-none focus:ring-2 focus:ring-[#8E1C9D]"
          type="email"
          placeholder="Enter Email ID"
        />
                <p className="text-red-500 text-sm mb-3">{error}</p>

        <h5>{input}</h5>

        <button onClick={HandleClick} className="bg-[#8E1C9D] hover:bg-[#7a1787] text-white w-full p-3 rounded-xl mb-4">
          Continue
        </button>

        <div className="text-sm text-gray-600">
          <p>Buying for work?</p>
          <a href="#" className="text-[#8E1C9D] font-medium">
            Create a free business account
          </a>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;