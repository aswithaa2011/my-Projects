import React, { useMemo, useState } from 'react'

const Arrayofnumbers = () => {

    const [theme,setTheme]=useState(false)
    const [number,setNumber]=useState([])
    

    const handleclick=()=>{

setTheme(!theme)


}
    

const handleChange=(e)=>{

const arr=e.target.value.split(",").map(Number)
setNumber(arr)
}


const ascendingOrder=useMemo(()=>{

   return [...number].sort((a,b)=>(a-b))
},[number])
    

    

return(

    <>
     <div className={theme?"bg-blue-600 p-2":"bg-violet-500 p-2"}>
 <button  className='bg-green-400 p-2 m-3 rounded-xl' onClick={handleclick}>Theme change</button>
 </div>

 <div className='p-2 m-5 '>
 

         <input type="text" className='bg-black text-white p-2' onChange={handleChange} />

<p>{ascendingOrder.join(", ")}</p>

 </div>
    </>
)
}

export default Arrayofnumbers


