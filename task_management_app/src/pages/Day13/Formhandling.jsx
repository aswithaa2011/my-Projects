import {  useState } from "react"

const Formhandling = () => {


    const [data,setdata]=useState(["apple","mango","orange"])

    const[save,setSave]=useState([])

    // const [input ,setInput]=use("")

    
  const handleChange=(e)=>{

    setdata([...data,e.target.value])
    
  }

  const handleClick=(e)=>{

   e.preventDefault()
   setSave(data)
  }
  



 
  return (
    <div className="flex flex-col  w-40 m-20 gap-5">
    


<input type="text"  name="" onChange={handleChange} placeholder="Enter the skilll"/>



<button  onClick={handleClick} className="rounded bg-black text-white">click</button>


<div className="flex flex-col gap-2 p-2">{save.map((e,i)=>(
      <div key={i} >
 <h1>{e}</h1>


        </div>
))}</div>

    </div>
  )
}

export default Formhandling
